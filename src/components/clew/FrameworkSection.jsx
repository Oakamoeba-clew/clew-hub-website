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
  const muted = active ? "text-foreground" : "text-foreground/55";

  if (type === "intake") {
    return (
      <div className={`flex items-center gap-2 ${muted}`}>
        <div className="flex flex-col gap-1.5">
          <Mail size={14} strokeWidth={1.5} />
          <Phone size={14} strokeWidth={1.5} />
          <Monitor size={14} strokeWidth={1.5} />
        </div>
        <div className="flex-1 h-px bg-current opacity-40" />
        <div className="border border-current/40 px-2 py-1.5 text-[0.6rem] uppercase tracking-wider">
          Inbox
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className={`flex flex-col gap-1.5 ${muted}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 border border-current/25 px-2 py-1.5">
            <span className="h-px w-3 bg-current/40" />
            <span className="h-px flex-1 bg-current/20" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "stall") {
    return (
      <div className={`flex flex-col gap-1.5 ${muted}`}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-2 px-2 py-1.5 border ${
              i === 2
                ? "border-accent bg-accent text-accent-foreground"
                : "border-current/25"
            }`}
          >
            <span className={`h-px w-3 ${i === 2 ? "bg-accent-foreground/50" : "bg-current/40"}`} />
            {i === 2 ? (
              <span className="text-[0.6rem] font-semibold tracking-wide">48 hrs</span>
            ) : (
              <span className="h-px flex-1 bg-current/20" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (type === "followup") {
    return (
      <div className={`flex items-center gap-2 ${muted}`}>
        <div className="flex-1 border border-current/30 px-2.5 py-2 text-[0.65rem] leading-snug">
          Nudge: Following up on RFQ-1038.
        </div>
        <span className="text-accent text-lg leading-none" aria-hidden="true">
          →
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 py-1 ${muted}`}>
      <div
        className={`h-10 w-10 rounded-full border flex items-center justify-center ${
          active ? "border-accent text-accent" : "border-current/40"
        }`}
      >
        <Check size={18} strokeWidth={1.75} />
      </div>
      <span className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold">Closed</span>
    </div>
  );
}

export default function FrameworkSection() {
  const [active, setActive] = useState(1);

  return (
    <section id="framework" className="relative w-full bg-background border-t border-border">
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
        <div className="mt-12 md:mt-14 hidden md:grid grid-cols-5 border border-border">
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(i)}
                className={`text-left p-5 lg:p-6 transition-colors duration-300 ${
                  i < STEPS.length - 1 ? "border-r border-border" : ""
                } ${isActive ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.02]"}`}
              >
                <p className="text-accent font-display font-semibold text-sm mb-3">{step.n}</p>
                <p className="font-display font-semibold text-foreground text-base lg:text-lg tracking-tight mb-5">
                  {step.title}
                </p>
                <div className="min-h-[88px] mb-5">
                  <StepVisual type={step.visual} active={isActive} />
                </div>
                <p className="text-sm text-foreground/65 leading-snug">{step.body}</p>
              </button>
            );
          })}
        </div>

        {/* Mobile: one slide at a time */}
        <div className="mt-10 md:hidden border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={STEPS[active].id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6"
            >
              <p className="text-accent font-display font-semibold text-sm mb-3">{STEPS[active].n}</p>
              <p className="font-display font-semibold text-foreground text-xl tracking-tight mb-5">
                {STEPS[active].title}
              </p>
              <div className="min-h-[100px] mb-5">
                <StepVisual type={STEPS[active].visual} active />
              </div>
              <p className="text-base text-foreground/70 leading-relaxed">{STEPS[active].body}</p>
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
                className={`h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                  active === i
                    ? "bg-accent border-accent"
                    : "bg-transparent border-foreground/35 hover:border-accent"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-accent font-medium tracking-wide text-center">
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
