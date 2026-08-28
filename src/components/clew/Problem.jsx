import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

const SHOP_IMG =
  "https://media.base44.com/images/public/6a662525657c49d632625bac/1435f421c_generated_image.png";

const ROWS = [
  {
    body: "Your NAICS code hasn't moved since the day you registered. The capability statement on file is a PDF from two RFPs ago. A buyer finds you — a referral, a SAM.gov search — and gives you thirty seconds to prove you're real. What he finds is a shop frozen in time: smaller, older, less capable than the one actually running the floor.",
    pillar: "Clarity to the Market",
    header: "What you can do, and what the market can see, don't match.",
    detail:
      "He found your site, couldn't tell in thirty seconds if you still ran the work he needed, and left.",
    href: "#tier-foundation",
  },
  {
    body: "One RFQ by email. One through a prime's portal. One texted from a regular customer, because that's just how he's always done it. Three inboxes, three formats, one person trying to hold it all in his head. Weeks pass. Then the phone rings: \u201cHey \u2014 did you guys ever get back to us on that quote?\u201d",
    pillar: "Clarity in the Shop",
    header: "What's coming in, and what your team can track, don't match.",
    detail: "You quoted the job. Then it sat. Nobody had to remember \u2014 until it was too late.",
    href: "#tier-framework",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative w-full bg-background">
      <div className="px-[8vw] py-[14vh] md:py-[16vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-10"
        >
          The Problem
        </Reveal>

        {/* Headline + photo */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-14 items-start mb-16 md:mb-20">
          <Reveal
            as="h2"
            delay={80}
            className="font-display font-semibold text-[9vw] leading-[0.98] md:text-[3.6vw] md:leading-[1.04] tracking-tightest"
          >
            <span className="block text-foreground/40">The work is there.</span>
            <span className="block text-foreground/40">The demand is there.</span>
            <span className="block text-foreground">Yet, they keep missing each other.</span>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full h-[220px] md:h-[300px] overflow-hidden rounded-sm ring-1 ring-black/5 opacity-55"
          >
            <Image
              src={SHOP_IMG}
              alt="Machine shop floor"
              fittingType="fill"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Two problems, side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.pillar}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              className="border-l-2 border-accent pl-6 md:pl-8"
            >
              <p className="text-base md:text-lg text-foreground/70 leading-[1.7] mb-7 max-w-[52ch]">
                {r.body}
              </p>

              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent font-semibold mb-2">
                {r.pillar}
              </p>
              <p className="font-display font-semibold text-foreground text-lg md:text-xl leading-snug mb-2 max-w-[26ch]">
                {r.header}
              </p>
              <p className="text-sm md:text-base text-foreground/70 leading-[1.6] mb-4 max-w-[46ch]">
                {r.detail}
              </p>
              <a
                href={r.href}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent font-semibold hover:text-foreground transition-colors duration-300"
              >
                <span aria-hidden="true">→</span> {r.pillar}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
