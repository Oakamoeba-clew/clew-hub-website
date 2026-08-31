import { useMemo, useState } from "react";
import QuoteBoard, { SAMPLE_RFQS, isSitting } from "./QuoteBoard";
import SittingEmail from "./SittingEmail";

export default function FrameworkSection() {
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
    const el = document.getElementById("quote-board");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightSitting(false), 2600);
  };

  const tryBoard = (cardId) => {
    setSelectedId(cardId);
    setNudgeId(cardId);
    window.setTimeout(() => setNudgeId(null), 900);
  };

  return (
    <section id="framework" className="relative w-full bg-background">
      <div className="px-[8vw] pb-12 md:pb-16 max-w-[1500px] mx-auto">
        <QuoteBoard
          cards={cards}
          onCardsChange={setCards}
          highlightSitting={highlightSitting}
          selectedId={selectedId}
          onSelect={setSelectedId}
          nudgeId={nudgeId}
          onTryBoard={tryBoard}
          onQuotedFromSitting={() => {
            setLesson("Quoted. The morning email goes quiet.");
            setPlayed(true);
          }}
        />

        {lesson && (
          <p className="mt-4 text-base md:text-lg font-display font-semibold text-accent">
            {lesson}
          </p>
        )}

        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-10 items-start">
          <SittingEmail
            sittingCards={sittingCards}
            onOpenBoard={openBoardFromEmail}
            opened={emailOpened}
          />

          <div className="lg:pt-8">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
              The only ping
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-[40ch]">
              {sittingCards.length} still sitting. Move one to Quoted and watch this number drop.
            </p>
          </div>
        </div>

        {played && (
          <div className="mt-10 md:mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
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
  );
}
