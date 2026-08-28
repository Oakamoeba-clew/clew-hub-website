import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    q: "How do RFQs get into the system?",
    a: "However they already reach you. Web form, email, or someone types one in after a phone call. Every one lands on the same board with a due date attached, so there's one list instead of three inboxes and a legal pad.",
  },
  {
    q: "What happens when a quote goes quiet?",
    a: "After 48 hours with no movement, it flags itself and sends a nudge. Nobody has to remember to check. That single automation is the reason Framework exists — everything else on the board is there to support it.",
  },
  {
    q: "Who sets it up, and how long does it take?",
    a: "We do, start to finish. One call — about thirty minutes on what you make and how quotes reach you today — then we build it and walk your team through it once. You're not handed a login and a tutorial.",
  },
  {
    q: "What goes on the Foundation page?",
    a: "Everything a buyer checks before they call: your NAICS code, CAGE, UEI, SAM status, certifications, the processes and materials you actually run, and a capability statement they can download. Structured the way buyers search, not the way brochures are written.",
  },
  {
    q: "Do I need both products?",
    a: "No. Foundation is for getting found and verified. Framework is for not losing what comes in. Plenty of shops need one and not the other — if your site already shows what you run, start with Framework.",
  },
  {
    q: "What do you keep current after it's live?",
    a: "New machine, new certification, new customer, expired registration — you tell us, we update it. That's included, not an extra invoice. The whole point is a record that stays true without you maintaining it.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="relative w-full bg-background">
      <div className="px-[8vw] py-[14vh] md:py-[16vh]">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8"
        >
          FAQ
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.98] md:text-[3.6vw] md:leading-[1.05] max-w-[20ch] mb-12 md:mb-14 text-balance"
        >
          How it works.
        </Reveal>

        <Reveal delay={140}>
          <div className="max-w-[820px]">
            {ITEMS.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={item.q} className="border-b border-border">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-5 group"
                  >
                    <span className="flex gap-4 md:gap-5 items-baseline">
                      <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-base md:text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                        {item.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 mt-1 text-accent"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[15px] md:text-base text-foreground/70 leading-[1.7] pb-6 pl-8 md:pl-10 max-w-[64ch]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
