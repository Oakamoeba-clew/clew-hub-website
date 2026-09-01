import Reveal from "./Reveal";

const INCLUDES = [
  "Keep Outlook, Gmail, or sales@ — no new inbox to remember.",
  "We set it up and walk your team through it once.",
  "Weekday sitting picture when quotes stall.",
  "Month-to-month. Cancel anytime.",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full bg-foreground/[0.07] border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          Pricing
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[10vw] leading-[0.95] md:text-[4vw] md:leading-[1] max-w-[12ch]"
        >
          One board. One price.
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-5 max-w-[42ch] text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          Framework keeps every RFQ moving until won or lost. No quoting ERP. No long contract.
        </Reveal>

        <Reveal delay={160}>
          <div className="relative mt-12 md:mt-14 border-2 border-foreground/25 bg-[hsl(40_10%_22%)] text-background p-7 md:p-10 lg:p-12 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-start">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-4">
                  Framework
                </p>
                <p className="font-display font-semibold text-background tracking-tightest leading-none text-[4.25rem] sm:text-[5rem] md:text-[5.5rem]">
                  $299
                  <span className="ml-1.5 text-xl sm:text-2xl md:text-3xl text-background/80 font-medium tracking-tight">
                    /mo
                  </span>
                </p>
                <p className="mt-5 text-base text-background/90 leading-relaxed max-w-[28ch]">
                  Month-to-month. No setup invoice. Hosting and upkeep included.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                    className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm md:text-base font-semibold tracking-wide hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    Request a demo
                  </button>
                </div>
              </div>

              <div className="lg:border-l lg:border-background/20 lg:pl-12">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-background/65 font-semibold mb-5">
                  Included
                </p>
                <ul className="flex flex-col gap-4">
                  {INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm md:text-base text-background leading-relaxed"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
