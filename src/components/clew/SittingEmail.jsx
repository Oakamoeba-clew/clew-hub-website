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
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
        The only email
      </p>
      <div className="border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-foreground/[0.04] border-b border-foreground/10">
          <span className="h-2 w-2 rounded-full bg-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="ml-2 text-[0.7rem] text-muted-foreground">Tuesday 7:14 AM · Inbox</span>
        </div>

        <div className="px-4 sm:px-5 py-4">
          <div className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 text-[0.8rem]">
            <span className="text-muted-foreground">From</span>
            <span className="text-foreground font-medium">Clew · sitting picture</span>
            <span className="text-muted-foreground">To</span>
            <span className="text-foreground/80">sales@ — the inbox you already use</span>
            <span className="text-muted-foreground">Subject</span>
            <span className="text-foreground font-semibold">{subject}</span>
          </div>

          <div className="mt-4 border-2 border-foreground/12 bg-foreground/[0.03] p-3">
            {count === 0 ? (
              <p className="text-sm text-foreground/65 leading-relaxed">
                No cards in Received or Review. On a real weekday, there would be no email.
              </p>
            ) : (
              <>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-accent font-semibold mb-2">
                  Sitting picture
                </p>
                <div className="flex flex-col gap-1.5">
                  {sittingCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-baseline justify-between gap-2 border border-accent/30 bg-background px-2.5 py-2"
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
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenBoard}
            className="mt-4 w-full inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
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
