import { CheckCircle2, FileText, Shield } from "lucide-react";
import Reveal from "./Reveal";

const SCATTERED = [
  "Old website, 2019",
  "Cert PDF on desktop",
  "CAGE on SAM.gov",
  "Outdated directory",
];

export default function FoundationSection() {
  return (
    <section id="foundation" className="relative w-full bg-background border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          Get found
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[10vw] leading-[0.95] md:text-[4.2vw] md:leading-[1] max-w-[12ch]"
        >
          Foundation.
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-5 max-w-[42ch] text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          What you can do, and what the market can see, finally match.
        </Reveal>

        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center">
          {/* Scattered */}
          <div className="border border-border p-6 md:p-8 min-h-[320px] flex flex-col">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-6">
              Scattered
            </p>
            <div className="relative flex-1 min-h-[180px]">
              {SCATTERED.map((label, i) => (
                <div
                  key={label}
                  className="absolute border border-foreground/25 bg-background px-3 py-3 w-[72%] max-w-[220px] shadow-sm"
                  style={{
                    top: `${i * 18}%`,
                    left: `${i * 7}%`,
                    transform: `rotate(${i % 2 === 0 ? -3 : 4}deg)`,
                    zIndex: i + 1,
                  }}
                >
                  <FileText size={14} className="text-foreground/35 mb-2" strokeWidth={1.5} />
                  <p className="text-xs text-foreground/75 leading-snug">{label}</p>
                  <div className="mt-2 space-y-1">
                    <div className="h-px w-full bg-foreground/10" />
                    <div className="h-px w-4/5 bg-foreground/10" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-foreground/65 leading-relaxed max-w-[34ch]">
              No clear picture of what you make — or if you&apos;re still certified.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:px-2" aria-hidden="true">
            <span className="text-accent text-3xl md:text-4xl font-display leading-none">→</span>
          </div>

          {/* One page */}
          <div className="border border-border p-6 md:p-8 min-h-[320px] flex flex-col">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-6">
              One page
            </p>

            <div className="border border-foreground/20 flex-1 p-4 md:p-5">
              <p className="font-display font-semibold text-foreground text-sm tracking-tight">
                Your Shop Name
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["AS9100D", "ITAR"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.65rem] font-semibold text-accent border border-accent/40 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-x-3 gap-y-2 text-[0.65rem]">
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5">NAICS</p>
                  <p className="text-foreground font-medium">332710</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5">CAGE</p>
                  <p className="text-foreground font-medium">7X8K2</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5">UEI</p>
                  <p className="text-foreground font-medium">H4YRJ3KLMN89</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5">SAM.gov</p>
                  <p className="text-emerald-700 font-medium inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2">
                {["Machining", "Materials", "Quality"].map((label) => (
                  <div key={label} className="text-center">
                    {label === "Quality" ? (
                      <Shield size={14} className="mx-auto text-foreground/50 mb-1" strokeWidth={1.5} />
                    ) : (
                      <div className="mx-auto mb-1 h-3.5 w-3.5 border border-foreground/30" />
                    )}
                    <p className="text-[0.55rem] uppercase tracking-wide text-muted-foreground font-semibold">
                      {label}
                    </p>
                    <div className="mt-1.5 space-y-1">
                      <div className="h-px bg-foreground/15 mx-auto w-full" />
                      <div className="h-px bg-foreground/15 mx-auto w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-foreground/65 leading-relaxed max-w-[36ch]">
              Government IDs, certs, and capabilities — one page a buyer can check in thirty seconds.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="text-sm text-accent font-medium tracking-wide text-center">
            From scattered to verifiable.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <p className="font-display font-semibold text-foreground text-lg">$89/mo</p>
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
    </section>
  );
}
