import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ChevronDown, X } from "lucide-react";
import Reveal from "./Reveal";
import {
  FoundationPanel,
  FrameworkPanel,
  ProcessSteps,
  PRODUCT_TABS,
} from "./Product";

// Framework first — RFQ is the core product.
const CARDS = [
  {
    id: "framework",
    label: "Stop losing quotes",
    name: "Framework",
    description: "Every RFQ tracked. Stalled quotes flag themselves after 48 hours.",
    price: "$299/mo",
    snippet: (
      <div className="border border-red-200/80 bg-red-50/40 px-3.5 py-3">
        <p className="text-sm font-medium text-foreground leading-snug">
          RFQ-1038 · Acme Precision · Housing, Inconel
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-red-700 bg-red-100/90 px-2.5 py-1">
          <AlertTriangle size={12} aria-hidden="true" />
          Stalled — 48 hrs
        </span>
      </div>
    ),
  },
  {
    id: "foundation",
    label: "Get found",
    name: "Foundation",
    description: "A capability page a buyer can find and verify in thirty seconds.",
    price: "$89/mo",
    snippet: (
      <div className="border border-border bg-background px-3.5 py-3">
        <p className="text-sm font-medium text-foreground leading-snug">
          Precision CNC machining
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["AS9100D", "ITAR"].map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

function openDemo(e) {
  e.stopPropagation();
  window.dispatchEvent(new Event("clew:open-demo"));
}

export default function ProductCards() {
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!expanded || !panelRef.current) return;
    const id = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const toggle = (id) => {
    setExpanded((current) => (current === id ? null : id));
  };

  const tab = expanded ? PRODUCT_TABS[expanded] : null;

  return (
    <section id="product" className="relative w-full bg-background border-t border-border">
      <div className="px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8"
        >
          Products
        </Reveal>

        <Reveal
          as="h2"
          delay={60}
          className="font-display font-semibold tracking-tightest text-foreground text-[8vw] leading-[0.98] md:text-[3.2vw] md:leading-[1.05] max-w-[24ch] text-balance"
        >
          Seen clearly outside. Run clearly inside.
        </Reveal>

        <p className="text-base text-foreground/70 leading-relaxed max-w-[52ch] mt-5 mb-10 md:mb-12">
          Framework keeps every quote moving. Foundation puts your capability where buyers look.
          Open a product, then click around inside — the demos are live.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
          {CARDS.map((card) => {
            const isOpen = expanded === card.id;
            const isDimmed = expanded && !isOpen;

            return (
              <motion.article
                key={card.id}
                layout
                onClick={() => toggle(card.id)}
                className={`flex flex-col text-left border bg-card/50 p-6 md:p-7 transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "border-accent bg-card"
                    : "border-border hover:border-foreground/25"
                } ${isDimmed ? "opacity-45" : "opacity-100"}`}
              >
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent font-semibold">
                  {card.label}
                </p>
                <h3 className="mt-2 font-display font-semibold text-foreground text-2xl md:text-3xl tracking-tightest">
                  {card.name}
                </h3>
                <p className="mt-3 text-base text-foreground/70 leading-relaxed max-w-[36ch]">
                  {card.description}
                </p>

                <div className="mt-5" data-lens="hover">
                  {card.snippet}
                </div>

                <div className="mt-auto pt-6">
                  <p className="font-display font-semibold text-foreground text-xl">
                    {card.price}
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={openDemo}
                      className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
                    >
                      Book a demo
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(card.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-300"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide details" : "See how it works"}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {expanded && tab && (
            <motion.div
              key={expanded}
              id={`product-panel-${expanded}`}
              ref={panelRef}
              role="region"
              aria-label={`${tab.name} product details`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8 md:mt-10 border border-border bg-foreground/[0.04] p-5 sm:p-8 md:p-10">
                <div className="flex items-center justify-between gap-4 mb-8 md:mb-10 pb-5 border-b border-border">
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                    How {tab.name} works
                  </p>
                  <button
                    type="button"
                    onClick={() => setExpanded(null)}
                    aria-label="Close product details"
                    className="flex-shrink-0 h-10 w-10 inline-flex items-center justify-center border border-border text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {expanded === "foundation" ? <FoundationPanel /> : <FrameworkPanel />}
                <div className="mt-4 pt-2 border-t border-border">
                  <ProcessSteps steps={tab.process} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
