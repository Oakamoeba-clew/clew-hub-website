import Reveal from "./Reveal";

const INCLUDES = [
  {
    title: "Your inbox stays yours",
    body: "Keep Outlook, Gmail, or sales@ — no new inbox to remember.",
  },
  {
    title: "We set it up once",
    body: "We stand the board up and walk your team through it.",
  },
  {
    title: "Weekday sitting picture",
    body: "When quotes stall, a morning email shows what's still sitting.",
  },
  {
    title: "Month-to-month",
    body: "No long contract. Cancel anytime.",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full border-t border-border overflow-hidden offer-stage"
    >
      <div className="offer-stage-atmosphere" aria-hidden="true" />

      <div className="relative z-10 px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3"
        >
          The offer
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[1.85rem] sm:text-[2.25rem] md:text-[2.55rem] leading-[1.08] max-w-[14ch]"
        >
          One board. One price.
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-4 max-w-[46ch] text-base md:text-lg text-foreground/75 leading-relaxed"
        >
          Framework is the board plus the weekday sitting picture. Every RFQ stays moving until
          won or lost — without a quoting ERP or a long contract.
        </Reveal>

        <Reveal delay={160}>
          <div className="offer-panel mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-0 items-stretch">
            <div className="lg:pr-12 xl:pr-14">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-5">
                What you get
              </p>
              <ul className="flex flex-col gap-5 md:gap-6">
                {INCLUDES.map((item) => (
                  <li key={item.title} className="flex gap-3.5 items-start">
                    <span
                      className="mt-2 h-2 w-2 flex-shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-foreground text-[1.02rem] md:text-[1.08rem] leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm md:text-base text-foreground/70 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="offer-price relative lg:pl-12 xl:pl-14 lg:border-l lg:border-foreground/10 flex flex-col justify-between gap-8">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-accent font-semibold mb-3">
                  Framework
                </p>
                <p className="font-display font-semibold text-foreground tracking-tightest leading-none text-[3.75rem] sm:text-[4.5rem] md:text-[5rem]">
                  $299
                  <span className="ml-1.5 text-xl sm:text-2xl text-foreground/55 font-medium tracking-tight">
                    /mo
                  </span>
                </p>
                <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed max-w-[28ch]">
                  Month-to-month. No setup invoice. Hosting and upkeep included.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm md:text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 shadow-[0_10px_24px_-12px_hsl(var(--accent)/0.85)]"
                >
                  Request a demo
                </button>
                <p className="mt-3 text-[0.7rem] text-muted-foreground leading-relaxed max-w-[32ch]">
                  See the board with your shop’s flow. No pitch deck required.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
