const FLIPS = ["product", "specs", "cost", "contact"];
const ALIASES = { spec: "specs", files: "cost", top: "product" };

const stage = document.querySelector("[data-p1-stage]");
const cards = [...document.querySelectorAll("[data-flip]")];
const tabs = [...document.querySelectorAll("[data-flip-tab]")];
const prevBtn = document.querySelector("[data-flip-prev]");
const nextBtn = document.querySelector("[data-flip-next]");

function idFromHash() {
  const raw = (location.hash || "#product").slice(1).toLowerCase();
  const mapped = ALIASES[raw] || raw;
  return FLIPS.includes(mapped) ? mapped : "product";
}

function setFlip(id, { hash = true } = {}) {
  const next = FLIPS.includes(id) ? id : "product";
  cards.forEach((card) => {
    const on = card.dataset.flip === next;
    card.classList.toggle("is-on", on);
    card.classList.toggle("is-leave-left", !on);
    card.setAttribute("aria-hidden", on ? "false" : "true");
    card.inert = !on;
  });
  tabs.forEach((tab) => {
    const on = tab.dataset.flipTab === next;
    if (on) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  if (prevBtn) {
    const onFirst = next === FLIPS[0];
    prevBtn.hidden = onFirst;
    prevBtn.setAttribute("aria-hidden", onFirst ? "true" : "false");
  }
  if (hash && location.hash !== `#${next}`) {
    history.replaceState(null, "", `#${next}`);
  }
}

function step(delta) {
  const i = FLIPS.indexOf(idFromHash());
  const nextIndex = i + delta;
  if (nextIndex < 0 || nextIndex >= FLIPS.length) return;
  setFlip(FLIPS[nextIndex]);
}

prevBtn?.addEventListener("click", () => step(-1));
nextBtn?.addEventListener("click", () => step(1));
window.addEventListener("hashchange", () => setFlip(idFromHash(), { hash: false }));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") step(-1);
  if (event.key === "ArrowRight") step(1);
});

let startX = 0;
let tracking = false;

function fromModel(target) {
  return Boolean(target && target.closest && target.closest("model-viewer"));
}

stage?.addEventListener(
  "pointerdown",
  (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (fromModel(event.target)) return;
    tracking = true;
    startX = event.clientX;
  },
  { passive: true },
);

stage?.addEventListener(
  "pointerup",
  (event) => {
    if (!tracking) return;
    tracking = false;
    if (fromModel(event.target)) return;
    const dx = event.clientX - startX;
    if (Math.abs(dx) < 56) return;
    step(dx < 0 ? 1 : -1);
  },
  { passive: true },
);

const viewer = document.querySelector("model-viewer");
function paintPlate() {
  const material = viewer?.model?.materials?.[0];
  if (!material) return false;
  material.pbrMetallicRoughness.setBaseColorFactor([0.13, 0.12, 0.11, 1]);
  material.pbrMetallicRoughness.setMetallicFactor(0.22);
  material.pbrMetallicRoughness.setRoughnessFactor(0.55);
  return true;
}
viewer?.addEventListener("load", paintPlate);
if (!paintPlate()) {
  const wait = window.setInterval(() => {
    if (paintPlate()) window.clearInterval(wait);
  }, 100);
  window.setTimeout(() => window.clearInterval(wait), 5000);
}

function stopSpin() {
  viewer?.removeAttribute("auto-rotate");
}
viewer?.addEventListener("camera-change", (event) => {
  if (event.detail?.source === "user-interaction") stopSpin();
});
window.setTimeout(stopSpin, 32000);

setFlip(idFromHash(), { hash: true });
