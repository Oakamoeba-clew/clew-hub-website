import { motion } from "framer-motion";
import QuoteBoard, { HERO_COLUMNS } from "./QuoteBoard";

const HERO_IMG = "/hero.jpg";

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
  return (
    <section id="top" className="relative w-full min-h-[100dvh] overflow-hidden bg-background">
      <div className="absolute inset-0 xl:right-[46%] pointer-events-none">
        <img
          src={HERO_IMG}
          alt="An American machine shop floor with a flag hanging against a brick wall"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background xl:to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/35" />
      </div>

      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="w-full px-[6vw] xl:px-[7vw] pt-28 pb-16 sm:pt-32 sm:pb-20 xl:pt-28 xl:pb-16">
          <div className="mx-auto max-w-[1480px] grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-12 sm:gap-14 xl:gap-16 2xl:gap-20 items-center">
            <div className="min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-semibold tracking-tightest text-foreground text-balance max-w-[16ch] text-[2.05rem] leading-[1.05] sm:text-[2.45rem] sm:leading-[1.04] xl:text-[2.55rem] xl:leading-[1.06] 2xl:text-[2.85rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)]"
              >
                American manufacturing is not short on capability. It&apos;s short on{" "}
                <span className="clarity-word text-accent">clarity</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="mt-6 sm:mt-7 max-w-[36ch] text-[0.95rem] sm:text-lg text-foreground/80 leading-relaxed"
              >
                You run the shop. We keep the RFQs moving.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="mt-5 sm:mt-6 text-sm sm:text-[0.95rem] text-foreground/65 leading-relaxed max-w-[34ch]"
              >
                Last Tuesday’s RFQ is still sitting.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="min-w-0"
            >
              <div className="hero-board-panel border-2 border-foreground/12 p-3 sm:p-4 xl:p-5 2xl:p-6">
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
      </div>
    </section>
  );
}
