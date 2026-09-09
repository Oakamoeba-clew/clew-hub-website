import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import QuoteBoard, { HERO_COLUMNS, TUESDAY_RFQ_ID } from "./QuoteBoard";

const HERO_IMG = "/hero.jpg";

/** Fixed showcase board — never tied to the interactive product board. */
const HERO_CARDS = [
  {
    id: TUESDAY_RFQ_ID,
    buyer: "Easton Tooling",
    part: "Fixture plate, 6061",
    qty: 2,
    due: "last Tue",
    column: "received",
    lifted: false,
  },
  {
    id: "rfq-1044",
    buyer: "Valley Hydraulics",
    part: "Manifold block, 4140",
    qty: 8,
    due: "Fri",
    column: "received",
    lifted: false,
  },
  {
    id: "rfq-1041",
    buyer: "Keystone Motion",
    part: "Shaft, 17-4",
    qty: 24,
    due: "Sep 18",
    column: "review",
    lifted: false,
  },
  {
    id: "rfq-1039",
    buyer: "Miller Gear",
    part: "Gear blank, steel",
    qty: 10,
    due: "Sep 25",
    column: "quoted",
    lifted: false,
  },
  {
    id: "rfq-1036",
    buyer: "Apex Castings",
    part: "Housing, iron",
    qty: 4,
    due: "Sep 22",
    column: "won",
    lifted: false,
  },
  {
    id: "rfq-1031",
    buyer: "Northline Fab",
    part: "Bracket, aluminum",
    qty: 6,
    due: "Oct 1",
    column: "lost",
    lifted: false,
  },
];

const BEATS = {
  idle: 0,
  callout: 1,
  warn: 2,
  highlight: 3,
};

export default function Hero() {
  const [beat, setBeat] = useState(BEATS.idle);
  const boardWrapRef = useRef(null);
  const [noteArrow, setNoteArrow] = useState("");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setBeat(BEATS.highlight);
      return undefined;
    }

    const timers = [
      window.setTimeout(() => setBeat(BEATS.callout), 1400),
      window.setTimeout(() => setBeat(BEATS.warn), 2200),
      window.setTimeout(() => setBeat(BEATS.highlight), 3200),
    ];

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  useLayoutEffect(() => {
    const wrap = boardWrapRef.current;
    if (!wrap) return undefined;

    const layout = () => {
      const card = wrap.querySelector(`#card-hero-${TUESDAY_RFQ_ID}`);
      const note = wrap.querySelector(".hero-sticky--hero-note");
      if (!card || !note) {
        setNoteArrow("");
        return;
      }

      const wr = wrap.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const nr = note.getBoundingClientRect();
      const x1 = nr.left - wr.left + nr.width * 0.32;
      const y1 = nr.bottom - wr.top - 2;
      const x2 = cr.left - wr.left + cr.width * 0.42;
      const y2 = cr.top - wr.top + 4;
      setNoteArrow(
        `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${(y1 + 22).toFixed(1)}, ${x2.toFixed(1)} ${(y2 - 22).toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
      );
    };

    layout();
    const frame = window.requestAnimationFrame(layout);
    const observer = new ResizeObserver(layout);
    observer.observe(wrap);
    window.addEventListener("resize", layout);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, [beat]);

  const warnId = beat >= BEATS.warn ? TUESDAY_RFQ_ID : null;
  const focusId = beat >= BEATS.highlight ? TUESDAY_RFQ_ID : null;

  return (
    <section id="top" className="relative w-full min-h-[100dvh] overflow-x-hidden bg-background">
      {/* Soft shop atmosphere — left-weighted, board stays on cream */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full xl:w-[58%] z-0" aria-hidden="true">
        <img
          src={HERO_IMG}
          alt=""
          className="h-full w-full object-cover object-[center_40%] opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/55" />
      </div>

      <div className="relative z-10 box-border min-h-[100dvh] flex items-center px-[6vw] xl:px-[7vw] pt-20 pb-10">
        <div className="w-full mx-auto max-w-[1480px] grid grid-cols-1 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 sm:gap-14 xl:gap-14 2xl:gap-16 items-center">
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-semibold tracking-tightest text-foreground text-balance max-w-[15ch] text-[2.45rem] leading-[1.02] sm:text-[3rem] sm:leading-[1.02] xl:text-[3.35rem] xl:leading-[1.03] 2xl:text-[3.75rem]"
            >
              American manufacturing is not short on capability. It&apos;s short on{" "}
              <span className="text-accent">clarity</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="mt-6 sm:mt-7 max-w-[36ch] text-[0.95rem] sm:text-lg text-foreground/80 leading-relaxed"
            >
              You run the shop. We keep the RFQs moving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="mt-8 sm:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
              >
                Request a demo
              </button>
              <a
                href="/#framework"
                className="text-sm sm:text-base font-semibold text-foreground/70 hover:text-accent transition-colors duration-300"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="relative min-w-0 overflow-visible"
          >
            <div ref={boardWrapRef} className="relative overflow-visible pt-[6.75rem]">
              <motion.aside
                initial={{ opacity: 0, y: -20, rotate: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, rotate: -2.5, scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                className="hero-sticky hero-sticky--hero-note"
                aria-hidden="true"
              >
                <p className="hero-sticky-text">
                  If an RFQ sits 48 hours, the owner gets a notice.
                </p>
              </motion.aside>

              <div className="hero-window select-none pointer-events-none">
                <div className="hero-window-bar" aria-hidden="true">
                  <span className="hero-window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <p>Framework · sales@ · Tuesday 7:14 AM</p>
                </div>
                <div className="hero-board-panel hero-board-panel--pro relative z-0">
                  <QuoteBoard
                    cards={HERO_CARDS}
                    onCardsChange={() => {}}
                    selectedId={null}
                    onSelect={() => {}}
                    warnId={warnId}
                    focusId={focusId}
                    columns={HERO_COLUMNS}
                    compact
                    polished
                    showIntro={false}
                    interactive={false}
                    idPrefix="hero-"
                  />
                </div>
              </div>

              <motion.aside
                initial={{ opacity: 0, y: 16, rotate: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
                className="hero-sticky hero-sticky--hero-bottom"
                aria-hidden="true"
              >
                <p className="hero-sticky-text">Every RFQ on one board</p>
              </motion.aside>

              {noteArrow ? (
                <svg className="hero-note-arrow" aria-hidden="true">
                  <defs>
                    <marker
                      id="hero-note-arrowhead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0 0.6 7.5 4 0 7.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                  </defs>
                  <path d={noteArrow} markerEnd="url(#hero-note-arrowhead)" />
                </svg>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
