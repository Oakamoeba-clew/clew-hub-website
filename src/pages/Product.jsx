import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Globe, MessageSquare } from "lucide-react";
import Nav from "@/components/clew/Nav";
import Footer from "@/components/clew/Footer";
import Reveal from "@/components/clew/Reveal";
import DemoModal from "@/components/clew/DemoModal";

const SCATTERED = [
  { label: "Old website, 2019", top: "10px", left: "0px", rotate: "-6deg" },
  { label: "Certs — PDF on desktop", top: "90px", left: "50px", rotate: "4deg" },
  { label: "CAGE / UEI — SAM.gov", top: "190px", left: "5px", rotate: "-3deg" },
  { label: "Directory listing, outdated", top: "280px", left: "45px", rotate: "5deg" },
];

const PROCESS = {
  foundation: [
    {
      n: "01",
      title: "Discover",
      body: "One call. What you make, who you sell to, and what's already public about your shop — so we know what's missing.",
    },
    {
      n: "02",
      title: "Build",
      body: "We pull what's already public and write the rest. You see it before anything goes live.",
    },
    {
      n: "03",
      title: "Maintain",
      body: "New machine, new certification, new customer — you tell us, we update it. Included in your subscription.",
    },
  ],
  framework: [
    {
      n: "01",
      title: "Discover",
      body: "We map how RFQs actually reach you today — email, phone, web — and where they get lost.",
    },
    {
      n: "02",
      title: "Build",
      body: "We set up intake and the pipeline, then walk your team through it once.",
    },
    {
      n: "03",
      title: "Maintain",
      body: "Stalled quotes get flagged automatically. Every RFQ closes out won or lost — nothing sits open.",
    },
  ],
};

function ProcessSteps({ steps }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-10 md:mt-12">
      {steps.map((s) => (
        <div key={s.n} className="flex gap-3">
          <span className="font-display text-accent text-sm font-semibold tracking-[0.2em] pt-0.5 flex-shrink-0">
            {s.n}
          </span>
          <div>
            <p className="font-display font-semibold text-foreground text-base md:text-lg leading-snug">
              {s.title}
            </p>
            <p className="mt-1.5 text-sm text-foreground/70 leading-[1.6]">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FoundationSequence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
      {/* Scattered fragments */}
      <div className="relative w-full md:w-[260px] h-[220px] md:h-[380px] flex-shrink-0">
        {SCATTERED.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ top: s.top, left: s.left, rotate: s.rotate, opacity: 1 }}
            animate={
              inView
                ? { top: "60px", left: "220px", rotate: "0deg", opacity: 0, scale: 0.3 }
                : {}
            }
            transition={{ duration: 0.8, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute border border-foreground/30 bg-foreground/[0.03] px-3 py-2 text-xs text-foreground/75 font-medium"
            style={{ top: s.top, left: s.left }}
          >
            {s.label}
          </motion.div>
        ))}
      </div>

      {/* Real website mockup */}
      <motion.div
        animate={inView ? { borderColor: "var(--accent)" } : {}}
        transition={{ duration: 0.4, delay: 1.3 }}
        className="flex-1 w-full shadow-2xl shadow-black/25"
      >
        <div className="overflow-hidden rounded-md ring-1 ring-black/10">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 flex items-center bg-white/10 rounded px-2.5 py-1 max-w-[220px]">
              <span className="text-[0.7rem] text-white/55">yourshop.com</span>
            </div>
          </div>

          <nav className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-neutral-100">
            <span className="font-display font-bold text-neutral-900 text-sm">Your Shop Name</span>
            <div className="hidden sm:flex gap-5 text-xs text-neutral-500">
              <span>Capabilities</span>
              <span>Certifications</span>
              <span>Contact</span>
            </div>
          </nav>

          <div className="bg-white px-6 py-7">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-neutral-900 text-xl md:text-2xl">
                  Precision CNC machining
                </h3>
                <p className="text-sm text-neutral-500 mt-1">Lehigh Valley, PA</p>
              </div>
              <motion.span
                animate={
                  inView
                    ? { backgroundColor: "var(--accent)", color: "#fff" }
                    : { backgroundColor: "rgb(245 245 245)", color: "rgb(163 163 163)" }
                }
                transition={{ delay: 1.3, duration: 0.4 }}
                className="text-[0.65rem] font-bold rounded px-3 py-1.5 whitespace-nowrap"
              >
                {inView ? "Verified" : "Pending"}
              </motion.span>
            </div>

            <AnimatePresence>
              {inView && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  className="flex flex-wrap gap-2 mb-5"
                >
                  {["AS9100D", "ITAR"].map((b) => (
                    <span
                      key={b}
                      className="text-[0.6rem] uppercase font-bold text-neutral-700 bg-neutral-100 border border-neutral-200 rounded px-2 py-1"
                    >
                      {b}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="border-t border-neutral-100 pt-4 mb-4">
              <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-2">Registration</p>
              <AnimatePresence>
                {inView && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500"
                  >
                    <span>NAICS 332710</span>
                    <span>CAGE 7X8K2</span>
                    <span>UEI H4YRJ3KLMN89</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {inView && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  className="border-t border-neutral-100 pt-4"
                >
                  <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-2">Capabilities</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500">
                    <span>5-axis milling</span>
                    <span>CMM inspection</span>
                    <span>Titanium &amp; Inconel</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              animate={{ opacity: 1 }}
              className="text-xs text-neutral-400 mt-4"
            >
              {inView ? "One page. Always current." : "Waiting on your information."}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FrameworkSequence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const [showQuoted, setShowQuoted] = useState(false);
  const [showWon, setShowWon] = useState(false);
  const [status, setStatus] = useState("Waiting for RFQs to arrive.");
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timers = [
      setTimeout(() => setStatus("RFQ-1042 received."), 1000),
      setTimeout(() => setShowQuoted(true), 2200),
      setTimeout(() => setStatus("No reply in 48 hours — flagged automatically."), 2300),
      setTimeout(() => setShowWon(true), 4000),
      setTimeout(() => setStatus("Nudge sent. Nobody had to remember."), 4100),
    ];

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref}>
      <div className="flex justify-center gap-14 md:gap-20 mb-8">
        {[
          { icon: Mail, label: "Email" },
          { icon: Globe, label: "Prime portal" },
          { icon: MessageSquare, label: "Text" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            animate={inView ? { y: 140, scale: 0.5, opacity: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1.5"
          >
            <c.icon className="text-foreground/60" size={22} />
            <span className="text-xs text-muted-foreground">{c.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="shadow-2xl shadow-black/25">
        <div className="overflow-hidden rounded-md ring-1 ring-black/10">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-sm text-white/60">Clew — RFQ Pipeline</span>
          </div>
          <div className="bg-white p-5 grid grid-cols-4 gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 border-b-2 border-neutral-200 pb-2 mb-2.5">
                Received
              </p>
              <AnimatePresence>
                {inView && !showQuoted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="border border-neutral-200 rounded px-2.5 py-2 text-xs font-bold bg-neutral-50"
                  >
                    RFQ-1042
                    <div className="font-normal text-neutral-500">Torque Dynamics</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 border-b-2 border-neutral-200 pb-2 mb-2.5">
                Review
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 border-b-2 border-neutral-200 pb-2 mb-2.5">
                Quoted
              </p>
              <AnimatePresence>
                {showQuoted && !showWon && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="border border-red-500 rounded px-2.5 py-2 text-xs font-bold bg-red-50 text-red-600"
                  >
                    RFQ-1042
                    <div className="font-normal">Stalled — 48 hrs</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-neutral-400 border-b-2 border-neutral-200 pb-2 mb-2.5">
                Won / lost
              </p>
              <AnimatePresence>
                {showWon && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="border border-emerald-600 rounded px-2.5 py-2 text-xs font-bold bg-emerald-50 text-emerald-700"
                  >
                    RFQ-1042
                    <div className="font-normal">Won — followed up</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">{status}</p>
    </div>
  );
}

export default function Product() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const openDemo = () => setDemoOpen(true);
    window.addEventListener("clew:open-demo", openDemo);
    return () => window.removeEventListener("clew:open-demo", openDemo);
  }, []);

  return (
    <div className="relative bg-background">
      <Nav />
      <main className="pt-[18vh]">
        <section className="px-[8vw] py-[10vh] md:py-[12vh]">
          <Reveal as="p" className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8">
            Product
          </Reveal>
          <Reveal
            as="h1"
            delay={80}
            className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.98] md:text-[3.6vw] md:leading-[1.05] max-w-[20ch] mb-16 md:mb-20 text-balance"
          >
            See it work, not just hear about it.
          </Reveal>

          <div className="mb-[16vh] md:mb-[20vh]">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              Clarity to the Market — Foundation
            </p>
            <FoundationSequence />
            <ProcessSteps steps={PROCESS.foundation} />
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              Clarity in the Shop — Framework
            </p>
            <FrameworkSequence />
            <ProcessSteps steps={PROCESS.framework} />
          </div>
        </section>
      </main>
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
