import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Monitor, Phone } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    id: "intake",
    n: "1",
    title: "Intake",
    body: "Email, phone, and web land in one place.",
    visual: "intake",
  },
  {
    id: "board",
    n: "2",
    title: "Board",
    body: "Every open RFQ, visible at once.",
    visual: "board",
  },
  {
    id: "stall",
    n: "3",
    title: "Stall flag",
    body: "Quiet quotes surface after 48 hours.",
    visual: "stall",
  },
  {
    id: "followup",
    n: "4",
    title: "Follow-up",
    body: "A nudge goes out — nobody watching the clock.",
    visual: "followup",
  },
  {
    id: "closed",
    n: "5",
    title: "Won or lost",
    body: "Closed clean. Nothing left open.",
    visual: "closed",
  },
];

function StepVisual({ type, active }) {
  if (type === "intake") {
    return (
      <div className={`flex items-center gap-2.5 ${active ? "text-foreground" : "text-foreground/70"}`}>
        <div className="flex flex-col gap-2">
          {[Mail, Phone, Monitor].map((Icon, i) => (
            <span
              key={i}
              className="inline-flex h-7 w-7 items-center justify-center border-2 border-foreground/35 bg-background"
            >
              <Icon size={14} strokeWidth={2} />
            </span>
          ))}
        </div>
        <div className="flex-1 h-[2px] bg-foreground/35" />
        <div className="border-2 border-foreground/45 bg-foreground text-background px-2.5 py-2 text-[0.65rem] uppercase tracking-wider font-semibold">
          Inbox
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-center gap-2 border-2 px-2.5 py-2 ${
              active ? "border-foreground/40 bg-background" : "border-foreground/25 bg-background/70"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
            <span className="h-[2px] flex-1 bg-foreground/25" />
            <span className="h-[2px] w-8 bg-foreground/15" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "stall") {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-2 px-2.5 py-2 border-2 ${
              i === 2
                ? "border-accent bg-accent text-accent-foreground shadow-[0_0_0_3px_hsl(var(--accent)/0.18)]"
                : active
                ? "border-foreground/30 bg-background"
                : "border-foreground/20 bg-background/70"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${i === 2 ? "bg-accent-foreground" : "bg-foreground/40"}`} />
            {i === 2 ? (
              <span className="text-[0.7rem] font-bold tracking-wide">48 hrs</span>
            ) : (
              <span className="h-[2px] flex-1 bg-foreground/20" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (type === "followup") {
    return (
      <div className="flex items-center gap-2.5">
        <div
          className={`flex-1 border-2 px-3 py-2.5 text-[0.7rem] leading-snug font-medium ${
            active
              ? "border-accent/50 bg-accent/10 text-foreground"
              : "border-foreground/30 bg-background text-foreground/80"
          }`}
        >
          Nudge: Following up on RFQ-1038.
        </div>
        <span className="text-accent text-xl font-semibold leading-none" aria-hidden="true">
          →
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2.5 py-1">
      <div
        className={`h-11 w-11 rounded-full border-[2.5px] flex items-center justify-center ${
          active
            ? "border-accent bg-accent text-accent-foreground"
            : "border-foreground/40 text-foreground/70 bg-background"
        }`}
      >
        <Check size={20} strokeWidth={2.25} />
      </div>
      <span
        className={`text-[0.7rem] uppercase tracking-[0.2em] font-bold ${
          active ? "text-accent" : "text-foreground/65"
        }`}
      >
        Closed
      </span>
    </div>
  );
}

export default function FrameworkSection() {
  const [active, setActive] = useState(2);

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
          className="mt-5 max-w-[40ch] text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          Every RFQ tracked until won or lost.
        </Reveal>

        {/* Desktop: all five panels */}
        <div className="mt-12 md:mt-14 hidden md:grid grid-cols-5 border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)]">
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(i)}
                className={`text-left p-5 lg:p-6 transition-all duration-300 relative ${
                  i < STEPS.length - 1 ? "border-r border-foreground/12" : ""
                } ${isActive ? "bg-accent/[0.07]" : "hover:bg-foreground/[0.02]"}`}
              >
                {isActive && (
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
                )}
                <p className="text-accent font-display font-bold text-base mb-3">{step.n}</p>
                <p className="font-display font-semibold text-foreground text-base lg:text-lg tracking-tight mb-5">
                  {step.title}
                </p>
                <div className="min-h-[96px] mb-5">
                  <StepVisual type={step.visual} active={isActive} />
                </div>
                <p className={`text-sm leading-snug ${isActive ? "text-foreground/80" : "text-foreground/60"}`}>
                  {step.body}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile: one slide at a time */}
        <div className="mt-10 md:hidden border-2 border-foreground/15 bg-background shadow-[0_14px_40px_-24px_rgba(0,0,0,0.3)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={STEPS[active].id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 relative"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
              <p className="text-accent font-display font-bold text-base mb-3">{STEPS[active].n}</p>
              <p className="font-display font-semibold text-foreground text-xl tracking-tight mb-5">
                {STEPS[active].title}
              </p>
              <div className="min-h-[110px] mb-5">
                <StepVisual type={STEPS[active].visual} active />
              </div>
              <p className="text-base text-foreground/75 leading-relaxed">{STEPS[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Framework steps">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Step ${step.n}: ${step.title}`}
                onClick={() => setActive(i)}
                className={`rounded-full border-2 transition-all duration-200 ${
                  active === i
                    ? "h-3 w-3 bg-accent border-accent"
                    : "h-2.5 w-2.5 bg-transparent border-foreground/40 hover:border-accent"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-accent font-semibold tracking-wide text-center">
            All records. All seen. Until won or lost.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-2">
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
    </section>
  );
}
