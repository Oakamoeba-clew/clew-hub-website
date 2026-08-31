import Reveal from "./Reveal";

const BEATS = [
  {
    n: "01",
    title: "A copy of the RFQ shows up as a card",
    body: "sales@ and info@ stay yours. A copy becomes a Received card. No URL to type.",
  },
  {
    n: "02",
    title: "You keep quoting how you quote",
    body: "Write the quote the way you already do. Move the card when you send it.",
  },
  {
    n: "03",
    title: "The weekday sitting picture is the door",
    body: "If cards sit in Received or Review, a weekday morning email shows the picture. The rust button opens the board.",
  },
];

export default function HowItStarts() {
  return (
    <section id="start" className="relative w-full bg-foreground/[0.035] border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          How it starts
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.95] md:text-[3.6vw] md:leading-[1] max-w-[14ch]"
        >
          No new inbox. No URL to remember.
        </Reveal>

        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)]">
          {BEATS.map((beat, i) => (
            <div
              key={beat.n}
              className={`p-6 md:p-8 ${
                i < BEATS.length - 1 ? "border-b md:border-b-0 md:border-r border-foreground/12" : ""
              }`}
            >
              <p className="text-accent font-display font-bold text-base mb-3">{beat.n}</p>
              <p className="font-display font-semibold text-foreground text-lg md:text-xl tracking-tight mb-3">
                {beat.title}
              </p>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{beat.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[52ch] text-sm text-foreground/55 leading-relaxed">
          We do not write the quote, chase the buyer, bring in new RFQs, or rebuild the website.
          Closed work archives after 30 days.
        </p>
      </div>
    </section>
  );
}
