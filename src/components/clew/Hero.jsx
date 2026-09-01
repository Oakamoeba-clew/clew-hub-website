import { motion } from "framer-motion";
import QuoteBoard, { HERO_COLUMNS, TUESDAY_RFQ_ID } from "./QuoteBoard";

const HERO_IMG = "/hero.jpg";

function StalledPointer() {
  return (
    <svg
      className="hero-callout-pointer"
      width="52"
      height="68"
      viewBox="0 0 52 68"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 2 L38 58" stroke="currentColor" strokeWidth="1.75" />
      <path d="M30 54.5 L39 59 L32 63 Z" fill="currentColor" />
    </svg>
  );
}

function DragPointer() {
  return (
    <svg
      className="hero-callout-pointer"
      width="22"
      height="38"
      viewBox="0 0 22 38"
      fill="none"
      aria-hidden="true"
    >
      <path d="M11 2 L11 30" stroke="currentColor" strokeWidth="1.75" />
      <path d="M5 26 L11 34 L17 26 Z" fill="currentColor" />
    </svg>
  );
}

export default function Hero({
  cards,
  onCardsChange,
  highlightSitting,
  selectedId,
  onSelect,
  nudgeId,
  onQuotedFromSitting,
  onTryBoard,
}) {
  const eastonSitting = cards.some(
    (card) => card.id === TUESDAY_RFQ_ID && card.column === "received"
  );

  return (
    <section id="top" className="relative w-full min-h-[100dvh] overflow-hidden bg-background">
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
        <div className="w-full mx-auto max-w-[1480px] grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-12 sm:gap-14 xl:gap-16 2xl:gap-20 items-center">
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

            <motion.aside
              initial={{ opacity: 0, y: -48, rotate: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotate: -3.5, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="hero-sticky mt-7 sm:mt-8 max-w-[15.5rem]"
              aria-label="Note"
            >
              <p className="hero-sticky-text">Manage all your RFQ&apos;s from one board</p>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="mt-8 sm:mt-9"
            >
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
              >
                Request a demo
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="relative min-w-0"
          >
            {eastonSitting && (
              <div className="hero-callout hero-callout--stalled" aria-hidden="true">
                <p className="hero-callout-line">48 hrs. Untouched.</p>
                <StalledPointer />
              </div>
            )}
            <div className="hero-callout hero-callout--drag" aria-hidden="true">
              <p className="hero-callout-line">Move it here.</p>
              <DragPointer />
            </div>
            <div className="hero-board-panel border-2 border-foreground/25 bg-background p-3 sm:p-4 xl:p-5 2xl:p-6 shadow-[0_24px_55px_-22px_rgba(0,0,0,0.42)]">
              <QuoteBoard
                cards={cards}
                onCardsChange={onCardsChange}
                highlightSitting={highlightSitting}
                selectedId={selectedId}
                onSelect={onSelect}
                nudgeId={nudgeId}
                onQuotedFromSitting={onQuotedFromSitting}
                onTryBoard={onTryBoard}
                columns={HERO_COLUMNS}
                compact
                showIntro={false}
                idPrefix="hero-"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
