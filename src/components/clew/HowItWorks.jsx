import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

const TRACKS = [
  {
    pillar: "Clarity to the Market",
    product: "Foundation",
    img: "https://media.base44.com/images/public/6a662525657c49d632625bac/1435f421c_generated_image.png",
    steps: [
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
  },
  {
    pillar: "Clarity in the Shop",
    product: "Framework",
    img: "https://media.base44.com/images/public/6a662525657c49d632625bac/f4fe04599_generated_image.png",
    steps: [
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
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative w-full bg-foreground/[0.06] border-y border-border">
      <div className="px-[8vw] py-[14vh] md:py-[16vh]">
        <Reveal as="p" className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-6">
          Our Process
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[1] md:text-[3.6vw] md:leading-[1.05] text-balance max-w-[20ch] mb-14 md:mb-16"
        >
          One process. Two systems.
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-14">
          {TRACKS.map((t, ti) => (
            <div key={t.product} className="flex flex-col">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent font-semibold mb-3">
                {t.pillar}
              </p>
              <h3 className="font-display font-semibold tracking-tight text-foreground text-2xl md:text-3xl mb-6">
                {t.product}
              </h3>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: ti * 0.1 }}
                className="relative min-h-[32vh] md:min-h-[36vh] overflow-hidden mb-8"
              >
                <Image
                  src={t.img}
                  alt={`${t.product} \u2014 ${t.pillar}`}
                  className="absolute inset-0 h-full w-full"
                  fittingType="fill"
                />
                <div className="absolute inset-0 bg-foreground/15" />
              </motion.div>

              <div className="flex flex-col gap-7">
                {t.steps.map((s, si) => (
                  <Reveal key={s.n} delay={200 + ti * 100 + si * 80}>
                    <div className="flex gap-4">
                      <span className="font-display text-accent text-sm font-semibold tracking-[0.2em] pt-0.5 flex-shrink-0">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-lg md:text-xl leading-snug">
                          {s.title}
                        </p>
                        <p className="mt-1.5 text-sm md:text-base text-foreground/70 leading-[1.6]">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
