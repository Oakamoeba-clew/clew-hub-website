import { motion } from "framer-motion";

const HERO_IMG = "/hero.jpg";

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="An American machine shop floor with a flag hanging against a brick wall"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/35" />
      </div>

      <div className="relative z-10 w-full px-[8vw] pt-28 pb-8 md:pt-32 md:pb-10 max-w-[1150px]">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-semibold tracking-tightest text-foreground text-balance max-w-[16ch] text-[9vw] leading-[0.96] md:text-[3.8vw] md:leading-[1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)]"
        >
          American manufacturing is not short on capability. It&apos;s short on{" "}
          <span className="clarity-word text-accent">clarity</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-5 max-w-[46ch] text-base md:text-lg text-foreground/80 leading-relaxed"
        >
          You run the shop. We keep the RFQs moving.
        </motion.p>
      </div>
    </section>
  );
}
