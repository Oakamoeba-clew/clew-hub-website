import { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import { Check, Folder, ShieldCheck, Server, Inbox, LayoutGrid, Bell } from "lucide-react";
import ServiceInquiry from "./ServiceInquiry";
import FoundationChoice from "./FoundationChoice";

const BOOK_BG =
  "https://media.base44.com/images/public/6a662525657c49d632625bac/c40fb8b3_generated_image.png";

const TIERS = [
  {
    name: "Foundation",
    pillar: "Clarity to the Market",
    priceMonthly: "$89/mo",
    priceAnnual: "$76/mo",
    annualNote: "or $908/year",
    choice: true,
    variant: "foundation",
    tagline: "Your shop's full capability — equipment, processes, certifications, past work — in one place a buyer can find and verify.",
    blurb: "Not a brochure site. A working record of what your shop can do, built and maintained for you.",
    chips: ["Capability record", "Verification", "Upkeep"],
    featureGroups: [
      {
        label: "Capability record",
        icon: Folder,
        items: ["Equipment, processes, materials, tolerances — structured the way buyers search", "Capability statement, written and kept current"],
      },
      {
        label: "Verification",
        icon: ShieldCheck,
        items: ["Certifications and past performance, verifiable without a call"],
      },
      {
        label: "Upkeep",
        icon: Server,
        items: ["Hosting, uptime, and security — you never touch it"],
      },
    ],
    note: "Cancel anytime",
  },
  {
    name: "Framework",
    pillar: "Clarity in the Shop",
    priceMonthly: "$299/mo",
    priceAnnual: "$254/mo",
    annualNote: "or $3,050/year",
    tagline: "Every RFQ from the moment it lands to won or lost. One system, not four inboxes and a spreadsheet.",
    blurb: "Works with any site — plug in Foundation, or connect what you already have.",
    chips: ["Intake", "Pipeline", "Follow-up"],
    featureGroups: [
      {
        label: "Intake",
        icon: Inbox,
        items: ["Tolerances, specs, and lead times captured the same way every time", "Routed to the right person with the due date attached"],
      },
      {
        label: "Pipeline",
        icon: LayoutGrid,
        items: ["Received → Engineering Review → Quoted → Won/Lost"],
      },
      {
        label: "Follow-up",
        icon: Bell,
        items: ["Stalled quotes flagged automatically — nothing sits open forever"],
      },
    ],
    note: "Cancel anytime",
  },
];

export default function Service() {
  const [activeTier, setActiveTier] = useState(null);
  const [foundationVariant, setFoundationVariant] = useState(null);
  const [billing, setBilling] = useState("monthly"); // "monthly" | "annual"

  return (
    <section id="service" className="relative w-full bg-background flex items-center">
      <div className="absolute inset-0 opacity-[0.14]">
        <Image src={BOOK_BG} alt="" fittingType="fill" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-background" />

      <div className="relative px-[8vw] py-[14vh] md:py-[16vh] w-full">
        <Reveal as="p" className="text-[0.8rem] uppercase tracking-[0.35em] text-muted-foreground font-semibold mb-8">
          Pricing
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.95] md:text-[4.4vw] md:leading-[0.98] text-balance max-w-[24ch]"
        >
          Seen clearly outside. Run clearly inside.
        </Reveal>

        <Reveal
          as="p"
          delay={160}
          className="mt-6 text-base md:text-lg text-foreground/70 leading-[1.6] max-w-[46ch]"
        >
          Which product fits how your shop runs?
        </Reveal>

        {/* Billing toggle */}
        <Reveal delay={200}>
          <div className="mt-8 inline-flex items-center border border-border">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                billing === "monthly"
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Annual
              <span
                className={`text-[0.65rem] uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                  billing === "annual"
                    ? "bg-accent-foreground/20 text-accent-foreground"
                    : "bg-accent/15 text-accent"
                }`}
              >
                Save 15%
              </span>
            </button>
          </div>
        </Reveal>

        {/* Pricing tiers — pillar shown as an eyebrow on each card */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              id={`tier-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className={`group relative flex flex-col h-full border bg-card/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg p-7 md:p-8 ${
                t.choice ? "border-accent/40" : "border-border"
              }`}
              onClick={() =>
                t.choice
                  ? setFoundationVariant(t.variant || "foundation")
                  : setActiveTier({
                      ...t,
                      price: billing === "annual" ? t.priceAnnual : t.priceMonthly,
                      billing,
                    })
              }
            >
              <div className="flex flex-col">
                {t.pillar && (
                  <p className="mb-3 text-[0.7rem] uppercase tracking-[0.25em] text-accent font-semibold">
                    {t.pillar}
                  </p>
                )}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-semibold tracking-tight text-foreground text-2xl md:text-3xl">
                    {t.name}
                  </h3>
                  <span className="flex flex-col items-end">
                    <span className="font-display font-semibold tracking-tightest text-accent text-2xl md:text-3xl bg-accent/10 border border-accent/30 rounded-md px-3 py-1">
                      {billing === "annual" ? t.priceAnnual : t.priceMonthly}
                    </span>
                  </span>
                </div>

                {t.chips && (
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {t.chips.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2.5 py-1 rounded-full bg-foreground/[0.06] border border-foreground/15 text-foreground/85 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-3 text-base md:text-lg text-foreground/80 font-medium leading-snug max-w-[70ch]">
                  {t.tagline}
                </p>

                {t.blurb && (
                  <p className="mt-3 text-sm md:text-base text-foreground/60 leading-[1.6] max-w-[70ch]">
                    {t.blurb}
                  </p>
                )}
              </div>

              <div className="h-px w-full bg-border my-7" />

              <div className="flex flex-col">
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-4">
                  What you get
                </p>

                <div className="flex flex-col gap-4">
                  {t.featureGroups.map((g) => (
                    <div key={g.label}>
                      <div className="flex items-center gap-2 mb-2">
                        <g.icon className="text-accent" size={18} />
                        <span className="text-sm md:text-base font-semibold text-foreground">
                          {g.label}
                        </span>
                      </div>
                      <ul className="space-y-1.5 pl-[26px]">
                        {g.items.map((f) => (
                          <li key={f} className="text-sm md:text-base text-foreground/70 leading-snug">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-foreground transition-colors">
                  Put us in touch
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                {t.note && (
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {t.note}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal as="p" delay={200} className="mt-10 text-center text-sm md:text-base text-muted-foreground max-w-[44ch] mx-auto leading-[1.7]">
          No contracts. No hidden fees. No guesswork dressed up as fact. Month-to-month, cancel anytime.
        </Reveal>
      </div>

      {activeTier && (
        <ServiceInquiry tier={activeTier} onClose={() => setActiveTier(null)} />
      )}

      {foundationVariant && (
        <FoundationChoice
          variant={foundationVariant}
          onClose={() => setFoundationVariant(null)}
        />
      )}
    </section>
  );
}
