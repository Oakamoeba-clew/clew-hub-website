import { useMemo, useState } from "react";
import Hero from "./Hero";
import QuoteBoard, { SAMPLE_RFQS, isSitting } from "./QuoteBoard";
import SittingEmail from "./SittingEmail";

/** Frozen snapshot for hero + daily email — never mutates with board play. */
const SHOWCASE_RFQS = SAMPLE_RFQS.map((card) => ({ ...card }));
const SHOWCASE_SITTING = SHOWCASE_RFQS.filter((card) => isSitting(card.column));

export default function ShopPlay() {
  const [cards, setCards] = useState(() => SAMPLE_RFQS.map((card) => ({ ...card })));
  const [selectedId, setSelectedId] = useState(null);
  const [nudgeId, setNudgeId] = useState(null);
  const [highlightSitting, setHighlightSitting] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const [lesson, setLesson] = useState("");

  const sittingOnBoard = useMemo(
    () => cards.filter((card) => isSitting(card.column)).length,
    [cards]
  );

  const openBoardFromEmail = () => {
    setEmailOpened(true);
    setHighlightSitting(true);
    const sitting = cards.find((c) => isSitting(c.column));
    if (sitting) setSelectedId(sitting.id);
    document
      .getElementById("product-quote-board")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightSitting(false), 2600);
  };

  const tryBoard = (cardId) => {
    setSelectedId(cardId);
    setNudgeId(cardId);
    window.setTimeout(() => setNudgeId(null), 900);
  };

  const onQuotedFromSitting = () => {
    setLesson("Quoted. On a real weekday, the morning email would go quiet.");
  };

  return (
    <>
      <Hero />

      <section id="framework" className="relative w-full bg-background border-t border-border">
        <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
          {lesson && (
            <p className="mb-8 md:mb-10 text-base md:text-lg font-display font-semibold text-accent">
              {lesson}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 xl:gap-14 items-start">
            <div>
              <SittingEmail
                sittingCards={SHOWCASE_SITTING}
                onOpenBoard={openBoardFromEmail}
                opened={emailOpened}
              />
              <div className="mt-6 lg:mt-8">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
                  The only ping
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-[40ch]">
                  A weekday picture of what&apos;s still sitting. The live board is on the right —
                  move cards there until every quote is closed.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
                The board
              </p>
              <p className="mb-6 max-w-[42ch] text-base text-foreground/70 leading-relaxed">
                Received through Lost. Keep moving them until every quote is closed.
                {sittingOnBoard > 0 ? (
                  <>
                    {" "}
                    <span className="text-foreground/90">
                      {sittingOnBoard} still sitting on this board.
                    </span>
                  </>
                ) : null}
              </p>
              <QuoteBoard
                cards={cards}
                onCardsChange={setCards}
                highlightSitting={highlightSitting}
                selectedId={selectedId}
                onSelect={setSelectedId}
                nudgeId={nudgeId}
                onQuotedFromSitting={onQuotedFromSitting}
                onTryBoard={tryBoard}
                idPrefix="product-"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
