import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import QuoteBoard, { SAMPLE_RFQS, isSitting } from "./QuoteBoard";
import SittingEmail from "./SittingEmail";

export default function FrameworkSection() {
  const [cards, setCards] = useState(SAMPLE_RFQS);
  const [selectedId, setSelectedId] = useState(null);
  const [highlightSitting, setHighlightSitting] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);

  const sittingCards = useMemo(
    () => cards.filter((card) => isSitting(card.column)),
    [cards]
  );

  const openBoardFromEmail = () => {
    setEmailOpened(true);
    setHighlightSitting(true);
    setSelectedId(null);
    const el = document.getElementById("quote-board");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightSitting(false), 2600);
  };

  return (
    <section id="framework" className="relative w-full bg-foreground/[0.035] border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          Clarity in the Shop
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[10vw] leading-[0.95] md:text-[4.2vw] md:leading-[1] max-w-[12ch]"
        >
          Framework.
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-5 max-w-[44ch] text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          Quotes that already landed in the shop&apos;s inbox don&apos;t die. They get answered,
          then marked won or lost.
        </Reveal>

        <div className="mt-12 md:mt-14">
          <QuoteBoard
            cards={cards}
            onCardsChange={setCards}
            highlightSitting={highlightSitting}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-10 items-start">
          <SittingEmail
            sittingCards={sittingCards}
            onOpenBoard={openBoardFromEmail}
            opened={emailOpened}
          />

          <div className="lg:pt-8">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
              What this is
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-[42ch]">
              You move the cards as you quote. If they sit in Received or Review, a weekday morning
              email is the only ping — a sitting picture, and a rust button into the board.
            </p>
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-[42ch]">
              Closed work archives after 30 days. We do not write the quote, chase the buyer, bring
              in new RFQs, or rebuild the website.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
              <p className="font-display font-semibold text-foreground text-lg">$299/mo</p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-7 py-3 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
              >
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
