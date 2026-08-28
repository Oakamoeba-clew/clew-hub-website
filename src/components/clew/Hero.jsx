import { motion } from "framer-motion";

const HERO_IMG = "/hero.jpg";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex items-center overflow-hidden lens-cursor"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="An American machine shop floor with a flag hanging against a brick wall"
          className="h-full w-full object-cover object-right"
        />
        {/* Left-weighted gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/40" />
      </div>

      {/* Left-aligned content column */}
      <div className="relative z-10 w-full px-[8vw] py-[18vh] flex flex-col items-start text-left max-w-[1150px]">
        {/* Headline — dominant */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display font-semibold tracking-tightest text-foreground text-balance max-w-[15ch] text-[10vw] leading-[0.94] md:text-[6.2vw] md:leading-[0.96] drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)]"
        >
          American manufacturing is not short on capability. It's short on{" "}
          <span className="clarity-word text-accent">clarity</span>.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mt-7 max-w-[52ch] text-lg md:text-xl text-foreground/80 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.2)]"
        >
          CLEW Framework keeps every RFQ moving — and Foundation gets your shop seen by the buyers who send them.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-9"
        >
          <button
            onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
            className="inline-flex items-center justify-center bg-accent text-accent-foreground px-9 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
          >
            Book a free demo
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 right-[8vw] z-10 hidden md:flex items-center gap-3 text-muted-foreground">
        <span className="text-[0.7rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-12 h-px bg-muted-foreground/50" />
      </div>
    </section>
  );
}