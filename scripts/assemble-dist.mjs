import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Framework is parked. Ship it again with:
//   npm run build:framework && CLEW_SHIP_FRAMEWORK=1 npm run build
// Plus restore public/_redirects and the P1 footer/sitemap/robots entries.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BRAND_FILES = [
  "hero.jpg",
  "og-image.png",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "logo-clew.png",
  "manifest.json",
];

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function copyDir(src, dest, { exclude = new Set() } = {}) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude.has(ent.name)) continue;
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      copyDir(from, to, { exclude });
    } else if (ent.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function emptyDirExcept(dir, keep) {
  if (!exists(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (keep.has(name)) continue;
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

export function assembleDist() {
  const sibling = process.env.CLEW_P1_OUT || path.join(ROOT, "..", "CLEW P1", "out");
  const staged = path.join(ROOT, "p1-export");
  const p1Src = exists(sibling) ? sibling : exists(staged) ? staged : null;
  const shipFramework = process.env.CLEW_SHIP_FRAMEWORK === "1";

  if (!p1Src) {
    throw new Error("P1 export not found. Build CLEW P1 or commit p1-export/.");
  }

  const frameworkDir = path.join(DIST, "framework");
  if (shipFramework && !exists(frameworkDir)) {
    throw new Error("dist/framework missing. Run npm run build:framework first.");
  }

  console.log(
    `Assembling P1 from ${p1Src} onto ${DIST}${
      shipFramework ? " (keeping /framework)" : " (Framework parked)"
    }`
  );
  emptyDirExcept(DIST, shipFramework ? new Set(["framework"]) : new Set());
  copyDir(p1Src, DIST, { exclude: new Set(["framework"]) });
  if (!shipFramework && exists(frameworkDir)) {
    fs.rmSync(frameworkDir, { recursive: true, force: true });
  }

  const industries = path.join(ROOT, "public", "p1", "industries");
  if (exists(industries)) {
    copyDir(industries, path.join(DIST, "p1", "industries"), {
      exclude: new Set(["industries.css"]),
    });
  }

  const redirects = path.join(ROOT, "public", "_redirects");
  if (exists(redirects)) {
    fs.copyFileSync(redirects, path.join(DIST, "_redirects"));
  }

  if (shipFramework) {
    for (const file of BRAND_FILES) {
      const from = path.join(ROOT, "public", file);
      if (exists(from)) {
        fs.copyFileSync(from, path.join(frameworkDir, file));
      }
    }
  }

  const rootIndex = path.join(DIST, "index.html");
  if (!exists(rootIndex)) {
    throw new Error("Assemble failed: dist/index.html was not written.");
  }

  console.log(
    shipFramework
      ? "Assembled. Root is P1. Framework is /framework/."
      : "Assembled. Root is P1. Framework is parked (set CLEW_SHIP_FRAMEWORK=1 to ship)."
  );
}

const isDirect = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirect) {
  assembleDist();
}
