import { AnimatePresence, motion } from "framer-motion";

export default function SittingEmail({ sittingCards, onOpenBoard, opened }) {
  const count = sittingCards.length;
  const subject =
    count === 0
      ? "Nothing sitting this morning"
      : count === 1
        ? "Still sitting — 1 quote"
        : `Still sitting — ${count} quotes`;

  return (
    <div className="w-full">
      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2.5">
        The only email
      </p>
      <div className="product-email-window border-2 border-foreground/15 bg-background overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-foreground/[0.045] border-b border-foreground/10">
          <span className="h-2 w-2 rounded-full bg-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="ml-2 font-mono text-[0.68rem] text-muted-foreground tracking-tight">
            Tuesday 7:14 AM · Inbox
          </span>
        </div>

        <div className="px-4 sm:px-5 py-4">
          <div className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 text-[0.8rem]">
            <span className="text-muted-foreground">From</span>
            <span className="text-foreground font-medium">Clew · sitting picture</span>
            <span className="text-muted-foreground">To</span>
            <span className="text-foreground/80">sales@</span>
            <span className="text-muted-foreground">Subject</span>
            <motion.span
              key={subject}
              initial={{ opacity: 0.35, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground font-semibold"
            >
              {subject}
            </motion.span>
          </div>

          <div className="mt-4 border-2 border-foreground/12 bg-foreground/[0.03] p-3">
            {count === 0 ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-foreground/65 leading-relaxed"
              >
                No cards in Received or Review. On a real weekday, there would be no email.
              </motion.p>
            ) : (
              <>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-accent font-semibold mb-2">
                  Sitting picture
                </p>
                <div className="flex flex-col gap-1.5">
                  <AnimatePresence initial={false} mode="popLayout">
                    {sittingCards.map((card) => (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -12, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-baseline justify-between gap-2 border border-accent/35 bg-background px-2.5 py-2 shadow-[inset_3px_0_0_0_hsl(var(--accent))]"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.8rem] font-semibold text-foreground truncate">
                            {card.buyer}
                          </p>
                          <p className="text-[0.7rem] text-foreground/60 truncate">{card.part}</p>
                        </div>
                        <span className="text-[0.65rem] uppercase tracking-wide text-accent font-semibold flex-shrink-0">
                          {card.column === "review" ? "Review" : "Received"}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenBoard}
            className="mt-4 w-full inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-3.5 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 shadow-[0_10px_24px_-12px_hsl(var(--accent)/0.85)]"
          >
            Open the board
          </button>
          <p className="mt-2 text-[0.7rem] text-muted-foreground leading-relaxed">
            {opened
              ? "That's the door. Nothing was sent from this page."
              : "If something is still sitting, this is the only email. The rust button opens the board. This is a picture — not a live send."}
          </p>
        </div>
      </div>
    </div>
  );
}
