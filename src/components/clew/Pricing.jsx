import Reveal from "./Reveal";

const INCLUDES = [
  "Keep Outlook, Gmail, or sales@ — no new inbox to remember.",
  "We set it up and walk your team through it once.",
  "Weekday sitting picture when quotes stall.",
  "Month-to-month. Cancel anytime.",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full bg-foreground/[0.045] border-t border-border">
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
          <div className="mt-12 md:mt-14 border-2 border-foreground/20 bg-background p-7 md:p-10 shadow-[0_22px_55px_-28px_rgba(0,0,0,0.35)] max-w-[720px]">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-2">
                  Framework
                </p>
                <p className="font-display font-semibold text-foreground text-3xl md:text-4xl tracking-tight">
                  $299
                  <span className="text-lg md:text-xl text-foreground/55 font-medium">/mo</span>
                </p>
              </div>
              <p className="text-sm text-foreground/60 max-w-[28ch] leading-relaxed">
                Hosting and upkeep included.
              </p>
            </div>

            <ul className="mt-7 flex flex-col gap-3.5">
              {INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm md:text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
              >
                Request a demo
              </button>
              <a
                href="tel:+14842059663"
                className="text-sm md:text-base font-medium text-foreground/75 hover:text-accent transition-colors tabular-nums"
              >
                (484) 205-9663
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
