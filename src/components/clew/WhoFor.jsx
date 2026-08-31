import Reveal from "./Reveal";

const FOR = [
  "Owner or estimator at a small or mid-size job shop.",
  "Custom work quoted from Outlook, Gmail, or a shared sales@ / info@ inbox.",
  "RFQs already land. The problem is they sit.",
];

const NOT_FOR = [
  "A VP of digital looking for a new website or capability page.",
  "A 250-person plant that already quotes inside an ERP.",
  "Anyone expecting us to write the quote, chase the buyer, or bring in new RFQs.",
];

export default function WhoFor() {
  return (
    <section id="who" className="relative w-full bg-background border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          Who this is for
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.95] md:text-[3.6vw] md:leading-[1] max-w-[16ch]"
        >
          An Outlook shop. Not a quoting ERP.
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="mt-5 max-w-[46ch] text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          If you already have a system that owns the quote, you don&apos;t need this. If the quote
          still lives in email, you might.
        </Reveal>

        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)]">
          <div className="p-6 md:p-8 md:border-r border-foreground/12 border-b md:border-b-0">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-5">
              For
            </p>
            <ul className="flex flex-col gap-4">
              {FOR.map((item) => (
                <li key={item} className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-8 bg-foreground/[0.03]">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-5">
              Not for
            </p>
            <ul className="flex flex-col gap-4">
              {NOT_FOR.map((item) => (
                <li key={item} className="flex gap-3 text-sm md:text-base text-foreground/65 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/30 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
