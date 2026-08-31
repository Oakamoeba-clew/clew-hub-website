import { useMemo, useState } from "react";
import Hero from "./Hero";
import QuoteBoard, { SAMPLE_RFQS, isSitting } from "./QuoteBoard";
import SittingEmail from "./SittingEmail";

export default function ShopPlay() {
  const [cards, setCards] = useState(SAMPLE_RFQS);
  const [selectedId, setSelectedId] = useState(null);
  const [nudgeId, setNudgeId] = useState(null);
  const [highlightSitting, setHighlightSitting] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const [lesson, setLesson] = useState("");
  const [played, setPlayed] = useState(false);

  const sittingCards = useMemo(
    () => cards.filter((card) => isSitting(card.column)),
    [cards]
  );

  const openBoardFromEmail = () => {
    setEmailOpened(true);
    setHighlightSitting(true);
    const sitting = cards.find((c) => isSitting(c.column));
    if (sitting) setSelectedId(sitting.id);
    const el = document.getElementById("quote-board") || document.getElementById("hero-quote-board");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightSitting(false), 2600);
  };

  const tryBoard = (cardId) => {
    setSelectedId(cardId);
    setNudgeId(cardId);
    window.setTimeout(() => setNudgeId(null), 900);
  };

  const onQuotedFromSitting = () => {
    setLesson("Quoted. The morning email goes quiet.");
    setPlayed(true);
  };

  return (
    <>
      <Hero
        cards={cards}
        onCardsChange={setCards}
        highlightSitting={highlightSitting}
        selectedId={selectedId}
        onSelect={setSelectedId}
        nudgeId={nudgeId}
        onQuotedFromSitting={onQuotedFromSitting}
        onTryBoard={tryBoard}
      />

      <section id="framework" className="relative w-full bg-background">
        <div className="px-[8vw] pt-[12vh] md:pt-[14vh] pb-16 md:pb-24 max-w-[1500px] mx-auto">
          {lesson && (
            <p className="mb-8 md:mb-10 text-base md:text-lg font-display font-semibold text-accent">
              {lesson}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-14 items-start">
            <SittingEmail
              sittingCards={sittingCards}
              onOpenBoard={openBoardFromEmail}
              opened={emailOpened}
            />

            <div className="lg:pt-2">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
                The only ping
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-[40ch]">
                {sittingCards.length} still sitting. Move one to Quoted and watch this number drop.
              </p>
            </div>
          </div>

          {played && (
            <div className="mt-12 md:mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <p className="font-display font-semibold text-foreground text-lg">$299/mo</p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-7 py-3 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
              >
                Book a demo
              </button>
              <a
                href="tel:+14842059663"
                className="text-sm md:text-base font-medium text-foreground/80 hover:text-accent transition-colors tabular-nums"
              >
                (484) 205-9663
              </a>
            </div>
          )}
        </div>
      </section>

      <section id="full-board" className="relative w-full bg-background border-t border-border">
        <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
            The board
          </p>
          <p className="mb-8 md:mb-10 max-w-[46ch] text-base md:text-lg text-foreground/70 leading-relaxed">
            Won and Lost live here. Same cards as the first screen — keep moving them.
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
            idPrefix="full-"
          />
        </div>
      </section>
    </>
  );
}
