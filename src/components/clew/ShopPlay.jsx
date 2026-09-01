import { useEffect, useMemo, useRef, useState } from "react";
import Hero from "./Hero";
import QuoteBoard, {
  BOARD_COLUMNS,
  SAMPLE_RFQS,
  TUESDAY_RFQ_ID,
  isSitting,
} from "./QuoteBoard";
import SittingEmail from "./SittingEmail";

function cardsByColumn(cards, columnId) {
  return cards.filter((card) => card.column === columnId);
}

function moveCardToQuoted(prev, cardId) {
  const card = prev.find((c) => c.id === cardId);
  if (!card || !isSitting(card.column)) return prev;

  const without = prev.filter((c) => c.id !== cardId);
  const destCards = cardsByColumn(without, "quoted");
  const moved = { ...card, column: "quoted", lifted: false };
  const destWithCard = [moved, ...destCards];

  return BOARD_COLUMNS.flatMap((col) =>
    col.id === "quoted" ? destWithCard : cardsByColumn(without, col.id)
  );
}

export default function ShopPlay() {
  const [cards, setCards] = useState(() => SAMPLE_RFQS.map((card) => ({ ...card })));
  const [selectedId, setSelectedId] = useState(null);
  const [nudgeId, setNudgeId] = useState(null);
  const [warnId, setWarnId] = useState(null);
  const [highlightSitting, setHighlightSitting] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const [lesson, setLesson] = useState("");
  const [pingNote, setPingNote] = useState("");
  const stageRef = useRef(null);
  const pingTimerRef = useRef(null);

  const sittingCards = useMemo(
    () => cards.filter((card) => isSitting(card.column)),
    [cards]
  );

  const sittingOnBoard = sittingCards.length;

  useEffect(() => {
    return () => {
      if (pingTimerRef.current) window.clearTimeout(pingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    const timers = [];
    let cancelled = false;
    let started = false;

    const playDemo = () => {
      if (cancelled || started) return;
      started = true;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setCards((prev) => moveCardToQuoted(prev, TUESDAY_RFQ_ID));
            setEmailOpened(true);
            setLesson("Quoted. On a real weekday, the morning email would go quiet.");
          }, 500)
        );
        return;
      }

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setWarnId(TUESDAY_RFQ_ID);
          setSelectedId(TUESDAY_RFQ_ID);
          setHighlightSitting(true);
        }, 450)
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setNudgeId(TUESDAY_RFQ_ID);
        }, 1200)
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setNudgeId(null);
          setWarnId(null);
          setHighlightSitting(false);
          setSelectedId(null);
          setCards((prev) => moveCardToQuoted(prev, TUESDAY_RFQ_ID));
          setEmailOpened(true);
          setLesson("Quoted. On a real weekday, the morning email would go quiet.");
        }, 2100)
      );
    };

    const isInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return rect.top < vh + 80 && rect.bottom > 40;
    };

    let observer = null;

    const kickoff = () => {
      if (cancelled || started) return;
      if (isInView()) {
        playDemo();
        observer?.disconnect();
      }
    };

    const hashTarget =
      typeof window !== "undefined" && window.location.hash === "#framework";

    if (hashTarget) {
      el.scrollIntoView({ block: "start" });
      timers.push(
        window.setTimeout(() => {
          if (cancelled || started) return;
          playDemo();
          observer?.disconnect();
        }, 280)
      );
    }

    kickoff();
    timers.push(window.setTimeout(kickoff, 120));
    timers.push(window.setTimeout(kickoff, 500));

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        playDemo();
      },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer?.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

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

  const onPing = (card) => {
    const name = card.ownerName || "the shop";
    setPingNote(`Pinged ${name} · follow-up on ${card.buyer}`);
    if (pingTimerRef.current) window.clearTimeout(pingTimerRef.current);
    pingTimerRef.current = window.setTimeout(() => setPingNote(""), 3200);
  };

  return (
    <>
      <Hero />

      <section
        ref={stageRef}
        id="framework"
        className="relative w-full border-t border-border overflow-hidden product-stage"
      >
        <div className="product-stage-atmosphere" aria-hidden="true" />

        <div className="relative z-10 px-[8vw] py-[11vh] md:py-[13vh] max-w-[1500px] mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
            How it works
          </p>
          <h2 className="font-display font-semibold tracking-tightest text-foreground text-[1.85rem] sm:text-[2.25rem] md:text-[2.55rem] leading-[1.08] max-w-[16ch]">
            One morning email. One board.
          </h2>
          <p className="mt-4 max-w-[46ch] text-base md:text-lg text-foreground/75 leading-relaxed">
            If something is still sitting, Clew sends a picture. Open the board and keep every
            quote moving until it&apos;s closed.
          </p>

          {lesson ? (
            <p className="mt-6 text-base md:text-lg font-display font-semibold text-accent product-lesson">
              {lesson}
            </p>
          ) : null}

          <div className="mt-9 md:mt-11 grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] gap-12 lg:gap-14 xl:gap-16 items-start">
            <div className="min-w-0">
              <div className="product-artifact">
                <SittingEmail
                  sittingCards={sittingCards}
                  onOpenBoard={openBoardFromEmail}
                  opened={emailOpened}
                />
                <div className="mt-5 px-0.5">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">
                    The only ping
                  </p>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-[40ch]">
                    A weekday picture of what&apos;s still sitting. The live board is next — move
                    cards and ping people until every quote is closed.
                  </p>
                </div>
              </div>

              <aside
                className="hero-sticky product-sticky product-sticky--email relative z-20 mx-auto mt-6 w-[min(17rem,88%)]"
                aria-label="Note"
              >
                <p className="hero-sticky-text">
                  1 email per day showing open RFQ&apos;s and where they stand.
                </p>
              </aside>
            </div>

            <div className="min-w-0">
              <div className="product-artifact">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">
                  The board
                </p>
                <p className="mb-5 max-w-[42ch] text-sm md:text-base text-foreground/70 leading-relaxed">
                  Received through Lost. Drag cards, tap to act, ping the owner for follow-up.
                  {sittingOnBoard > 0 ? (
                    <>
                      {" "}
                      <span className="text-foreground font-medium tabular-nums">
                        {sittingOnBoard} still sitting on this board.
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="text-accent font-medium">Nothing sitting.</span>
                    </>
                  )}
                </p>
                <QuoteBoard
                  cards={cards}
                  onCardsChange={setCards}
                  highlightSitting={highlightSitting}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  nudgeId={nudgeId}
                  warnId={warnId}
                  onQuotedFromSitting={onQuotedFromSitting}
                  onTryBoard={tryBoard}
                  onPing={onPing}
                  pingNote={pingNote}
                  idPrefix="product-"
                />
              </div>

              <aside
                className="hero-sticky product-sticky product-sticky--board relative z-20 mx-auto mt-6 w-[min(16rem,88%)]"
                aria-label="Note"
              >
                <p className="hero-sticky-text">custom board to alert / follow up</p>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
