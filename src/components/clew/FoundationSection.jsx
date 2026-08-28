import { CheckCircle2, FileText, Shield } from "lucide-react";
import Reveal from "./Reveal";

const SCATTERED = [
  { label: "Old website, 2019", rotate: -7, top: "4%", left: "2%", z: 1 },
  { label: "Cert PDF on desktop", rotate: 5, top: "22%", left: "18%", z: 2 },
  { label: "CAGE on SAM.gov", rotate: -4, top: "42%", left: "6%", z: 3 },
  { label: "Outdated directory", rotate: 6, top: "58%", left: "22%", z: 4 },
];

export default function FoundationSection() {
  return (
    <section id="foundation" className="relative w-full bg-background border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-accent font-semibold mb-6"
        >
          Clarity to the Market
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
          {/* Scattered — muted, messy */}
          <div className="border border-border bg-foreground/[0.03] p-6 md:p-8 min-h-[360px] flex flex-col">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-6">
              Scattered
            </p>
            <div className="relative flex-1 min-h-[200px]">
              {SCATTERED.map((item) => (
                <div
                  key={item.label}
                  className="absolute border border-foreground/30 bg-card px-3.5 py-3.5 w-[78%] max-w-[240px] shadow-[2px_3px_0_0_rgba(0,0,0,0.06)]"
                  style={{
                    top: item.top,
                    left: item.left,
                    transform: `rotate(${item.rotate}deg)`,
                    zIndex: item.z,
                  }}
                >
                  <FileText size={15} className="text-foreground/40 mb-2" strokeWidth={1.5} />
                  <p className="text-[0.8rem] text-foreground/80 leading-snug font-medium">{item.label}</p>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="h-px w-full bg-foreground/15" />
                    <div className="h-px w-[85%] bg-foreground/12" />
                    <div className="h-px w-[60%] bg-foreground/10" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-foreground/65 leading-relaxed max-w-[34ch]">
              No clear picture of what you make — or if you&apos;re still certified.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:px-3" aria-hidden="true">
            <span className="inline-flex h-12 w-12 items-center justify-center border border-accent text-accent text-2xl font-display leading-none bg-accent/5">
              →
            </span>
          </div>

          {/* One page — crisp, verified */}
          <div className="border border-accent/35 bg-card p-6 md:p-8 min-h-[360px] flex flex-col shadow-[0_12px_40px_-18px_rgba(0,0,0,0.28)]">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-6">
              One page
            </p>

            <div className="border border-foreground/25 bg-background flex-1 p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display font-bold text-foreground text-base tracking-tight">
                  Your Shop Name
                </p>
                <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2 py-1 whitespace-nowrap">
                  Verified
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["AS9100D", "ITAR"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-semibold text-accent bg-accent/10 border border-accent/45 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-x-3 gap-y-3 text-[0.7rem]">
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem]">NAICS</p>
                  <p className="text-foreground font-semibold">332710</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem]">CAGE</p>
                  <p className="text-foreground font-semibold">7X8K2</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem]">UEI</p>
                  <p className="text-foreground font-semibold">H4YRJ3KLMN89</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem]">SAM.gov</p>
                  <p className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                    <CheckCircle2 size={13} /> Active
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2.5">
                {["Machining", "Materials", "Quality"].map((label) => (
                  <div key={label} className="text-center border border-border bg-card/80 px-1.5 py-2.5">
                    {label === "Quality" ? (
                      <Shield size={15} className="mx-auto text-accent mb-1.5" strokeWidth={1.75} />
                    ) : (
                      <div className="mx-auto mb-1.5 h-3.5 w-3.5 border-2 border-accent/50" />
                    )}
                    <p className="text-[0.55rem] uppercase tracking-wide text-foreground font-semibold">
                      {label}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="h-px bg-foreground/20 mx-auto w-full" />
                      <div className="h-px bg-foreground/15 mx-auto w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-foreground/70 leading-relaxed max-w-[36ch]">
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
