import { CheckCircle2, FileText, Shield } from "lucide-react";
import Reveal from "./Reveal";

const SCATTERED = [
  { label: "Old website, 2019", rotate: -8, top: "2%", left: "0%", z: 1 },
  { label: "Cert PDF on desktop", rotate: 6, top: "20%", left: "20%", z: 2 },
  { label: "CAGE on SAM.gov", rotate: -5, top: "40%", left: "4%", z: 3 },
  { label: "Outdated directory", rotate: 7, top: "56%", left: "24%", z: 4 },
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
          {/* Scattered — messier, more muted */}
          <div className="border-2 border-foreground/12 bg-foreground/[0.045] p-6 md:p-8 min-h-[380px] flex flex-col">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-6">
              Scattered
            </p>
            <div className="relative flex-1 min-h-[210px] opacity-90">
              {SCATTERED.map((item) => (
                <div
                  key={item.label}
                  className="absolute border-2 border-foreground/25 bg-card/90 px-3.5 py-3.5 w-[80%] max-w-[248px] shadow-[3px_4px_0_0_rgba(0,0,0,0.08)]"
                  style={{
                    top: item.top,
                    left: item.left,
                    transform: `rotate(${item.rotate}deg)`,
                    zIndex: item.z,
                  }}
                >
                  <FileText size={16} className="text-foreground/45 mb-2" strokeWidth={1.75} />
                  <p className="text-[0.85rem] text-foreground/75 leading-snug font-medium">{item.label}</p>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="h-[2px] w-full bg-foreground/12" />
                    <div className="h-[2px] w-[85%] bg-foreground/10" />
                    <div className="h-[2px] w-[55%] bg-foreground/8" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-foreground/60 leading-relaxed max-w-[34ch]">
              No clear picture of what you make — or if you&apos;re still certified.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:px-3" aria-hidden="true">
            <span className="inline-flex h-14 w-14 items-center justify-center border-2 border-accent bg-accent text-accent-foreground text-3xl font-display leading-none shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]">
              →
            </span>
          </div>

          {/* One page — brighter, more lit */}
          <div className="border-2 border-accent bg-card p-6 md:p-8 min-h-[380px] flex flex-col shadow-[0_20px_55px_-20px_rgba(0,0,0,0.35)] ring-1 ring-accent/20">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold mb-6">
              One page
            </p>

            <div className="border-2 border-foreground/20 bg-background flex-1 p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display font-bold text-foreground text-base tracking-tight">
                  Your Shop Name
                </p>
                <span className="text-[0.65rem] font-bold uppercase tracking-wide text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-1 whitespace-nowrap">
                  Verified
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["AS9100D", "ITAR"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-bold text-accent-foreground bg-accent border border-accent px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t-2 border-border grid grid-cols-2 gap-x-3 gap-y-3 text-[0.7rem]">
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem] font-semibold">NAICS</p>
                  <p className="text-foreground font-bold">332710</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem] font-semibold">CAGE</p>
                  <p className="text-foreground font-bold">7X8K2</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem] font-semibold">UEI</p>
                  <p className="text-foreground font-bold">H4YRJ3KLMN89</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-muted-foreground mb-0.5 text-[0.6rem] font-semibold">SAM.gov</p>
                  <p className="text-emerald-700 font-bold inline-flex items-center gap-1">
                    <CheckCircle2 size={14} strokeWidth={2.25} /> Active
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-border grid grid-cols-3 gap-2.5">
                {["Machining", "Materials", "Quality"].map((label) => (
                  <div key={label} className="text-center border-2 border-accent/25 bg-accent/[0.04] px-1.5 py-2.5">
                    {label === "Quality" ? (
                      <Shield size={16} className="mx-auto text-accent mb-1.5" strokeWidth={2} />
                    ) : (
                      <div className="mx-auto mb-1.5 h-4 w-4 border-2 border-accent" />
                    )}
                    <p className="text-[0.55rem] uppercase tracking-wide text-foreground font-bold">
                      {label}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="h-[2px] bg-foreground/25 mx-auto w-full" />
                      <div className="h-[2px] bg-foreground/18 mx-auto w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-foreground/75 leading-relaxed max-w-[36ch]">
              Government IDs, certs, and capabilities — one page a buyer can check in thirty seconds.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="text-sm text-accent font-semibold tracking-wide text-center">
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
