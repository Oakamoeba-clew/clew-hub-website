import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Search, List, Building2, ChevronDown, Lock, CheckCircle2, AlertTriangle, Check, Zap } from "lucide-react";
import Reveal from "./Reveal";

export const PRODUCT_TABS = {
  foundation: {
    pillar: "Clarity to the Market",
    name: "Foundation",
    description:
      "Your shop's full capability — equipment, processes, certifications, past work — in one place a buyer can find and verify.",
    process: [
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
  framework: {
    pillar: "Clarity in the Shop",
    name: "Framework",
    description:
      "Every RFQ from the moment it lands to won or lost. One system, not four inboxes and a spreadsheet.",
    process: [
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
};

const TABS = PRODUCT_TABS;

const RFQ_ROWS = [
  { rfq: "1042", company: "Torque Dynamics", contact: "R. Voss", part: "Titanium bracket", status: "Received", time: "2 hrs", flagged: false },
  { rfq: "1041", company: "Meridian Aero", contact: "J. Cole", part: "Fixture plate", status: "Review", time: "5 hrs", flagged: false },
  { rfq: "1039", company: "Northbay Mfg", contact: "D. Reyes", part: "Shaft, 6061", status: "Quoted", time: "1 day", flagged: false },
  { rfq: "1038", company: "Acme Precision", contact: "T. Ahn", part: "Housing, Inconel", status: "Quoted", time: "48 hrs", flagged: true },
  { rfq: "1035", company: "Bellwether Ind.", contact: "M. Ford", part: "Spacers, qty 12", status: "Quoted", time: "6 hrs", flagged: false },
  { rfq: "1031", company: "Torque Dynamics", contact: "R. Voss", part: "Manifold block", status: "Won", time: "—", flagged: false },
];

const RECORD_STAGES = [
  { label: "Received", time: "Mon 9:14 AM", note: "via web form", tone: "muted" },
  { label: "Quoted", time: "Mon 2:40 PM", note: "$6,750 sent", tone: "muted" },
  { label: "Stalled", time: "Wed 2:40 PM", note: "48 hrs, no reply", tone: "danger" },
  { label: "Followed up", time: "Wed 2:41 PM", note: "nudge sent", tone: "accent" },
  { label: "Won", time: "Thu 11:02 AM", note: "buyer confirmed", tone: "success" },
];

const STATUS_STYLES = {
  Received: "text-neutral-500 bg-neutral-100",
  Review: "text-neutral-500 bg-neutral-100",
  Quoted: "text-accent bg-accent/10",
  Won: "text-emerald-700 bg-emerald-50",
};

export function ProcessSteps({ steps }) {
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

function SearchResultCard() {
  return (
    <div className="shadow-2xl shadow-black/25">
      <div className="overflow-hidden rounded-md ring-1 ring-black/10">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex items-center gap-1.5 bg-white/10 rounded px-2.5 py-1">
            <Search size={10} className="text-white/40" />
            <span className="text-[0.7rem] text-white/55 truncate">
              precision machining NAICS 332710 pennsylvania
            </span>
          </div>
        </div>

        <div className="bg-white px-6 py-6">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="h-[26px] w-[26px] rounded-full bg-neutral-100 flex-shrink-0" />
            <div>
              <p className="text-[13px] text-neutral-800 leading-tight">Your Shop Name</p>
              <p className="text-[12px] text-neutral-500">yourshop.com › capabilities</p>
            </div>
          </div>
          <p className="text-lg md:text-xl text-[#1a0dab] leading-snug mt-1.5 mb-1.5">
            Precision CNC Machining — AS9100D &amp; ITAR · Lehigh Valley, PA
          </p>
          <p className="text-[13.5px] text-neutral-600 leading-relaxed">
            5-axis milling, Swiss turning, and CMM inspection in titanium, Inconel, and 6061
            aluminum. AS9100D certified, ITAR registered. CAGE 7X8K2 · UEI H4YRJ3KLMN89.
          </p>
        </div>
      </div>
    </div>
  );
}

function CapabilityPage() {
  return (
    <div className="shadow-2xl shadow-black/25">
      <div className="overflow-hidden rounded-md ring-1 ring-black/10">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex items-center gap-1.5 bg-white/10 rounded px-2.5 py-1">
            <Lock size={10} className="text-white/40" />
            <span className="text-[0.7rem] text-white/55">yourshop.com</span>
          </div>
        </div>

        {/* Site nav */}
        <nav className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="h-[26px] w-[26px] rounded bg-neutral-200" />
            <span className="font-display font-bold text-neutral-900 text-sm">Your Shop Name</span>
          </div>
          <div className="hidden md:flex gap-5 text-xs text-neutral-600">
            <span>Capabilities</span>
            <span>Equipment</span>
            <span>Quality</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <span className="text-[0.65rem] font-bold text-white bg-accent rounded px-3.5 py-2 whitespace-nowrap">
            Request a quote
          </span>
        </nav>

        {/* Hero band */}
        <div className="bg-gradient-to-b from-neutral-50 to-white px-6 pt-8 pb-7 border-b border-neutral-100">
          <h3 className="font-display font-bold text-neutral-900 text-2xl md:text-3xl leading-tight tracking-tight max-w-[16ch]">
            Precision CNC machining
          </h3>
          <p className="text-sm text-neutral-500 mt-2.5 mb-4 max-w-[52ch] leading-relaxed">
            Tight-tolerance parts for aerospace, defense, and medical customers. Lehigh Valley,
            Pennsylvania.
          </p>
          <div className="flex flex-wrap gap-2">
            {["AS9100D certified", "ITAR registered"].map((c) => (
              <span
                key={c}
                className="text-[0.7rem] font-semibold text-accent bg-accent/10 border border-accent/25 rounded px-3 py-1.5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Government codes strip */}
        <div className="bg-white px-6 py-4 border-b border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "NAICS", value: "332710" },
            { label: "CAGE Code", value: "7X8K2" },
            { label: "UEI", value: "H4YRJ3KLMN89" },
          ].map((c) => (
            <div key={c.label}>
              <p className="text-[0.6rem] uppercase tracking-wide text-neutral-400 font-semibold mb-1">
                {c.label}
              </p>
              <p className="text-[13px] text-neutral-800 font-medium">{c.value}</p>
            </div>
          ))}
          <div>
            <p className="text-[0.6rem] uppercase tracking-wide text-neutral-400 font-semibold mb-1">
              SAM.gov
            </p>
            <p className="text-[13px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> Active
            </p>
          </div>
        </div>

        {/* Capabilities section */}
        <div className="bg-white px-6 py-6">
          <div className="flex items-start justify-between gap-6 mb-4">
            <div>
              <h4 className="font-display font-bold text-neutral-900 text-base">Capabilities</h4>
              <p className="text-xs text-neutral-400 mt-0.5">What we run, in-house.</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold text-white bg-accent rounded-md px-3.5 py-2.5 whitespace-nowrap">
                <Download size={13} /> Capability statement
              </span>
              <p className="text-[0.6rem] text-neutral-300 mt-1">PDF · updated 3 days ago</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Machining", items: ["5-axis milling", "Swiss turning", "Wire EDM"] },
              { label: "Materials", items: ["Titanium", "Inconel", "6061 Aluminum"] },
              { label: "Quality", items: ["CMM inspection", "First article (FAI)", "Full traceability"] },
            ].map((col) => (
              <div key={col.label} className="border border-neutral-100 rounded-lg p-3.5">
                <p className="text-[0.6rem] uppercase tracking-wide text-neutral-400 font-semibold mb-2">
                  {col.label}
                </p>
                <div className="text-[13px] text-neutral-700 leading-[1.7]">
                  {col.items.map((it) => (
                    <div key={it}>{it}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 border-t border-neutral-100 px-6 py-3.5 flex items-center justify-between gap-4">
          <p className="text-[0.65rem] text-neutral-400">© 2026 Your Shop Name · Lehigh Valley, PA</p>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-accent whitespace-nowrap">
            <CheckCircle2 size={12} /> Kept current by Clew
          </span>
        </div>
      </div>
    </div>
  );
}

export function FoundationPanel() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {/* 01 — What a buyer finds */}
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2.5">
          01 · What a buyer finds
        </p>
        <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl leading-tight mb-3 max-w-[18ch]">
          They check you out before they call.
        </h3>
        <p className="text-base text-foreground/70 leading-[1.6] max-w-[58ch] mb-7">
          A buyer searching your NAICS code, or checking you out after a referral, lands on something
          current — not a site that stopped being true three years ago.
        </p>

        <SearchResultCard />
      </div>

      {/* 02 — The capability page */}
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2.5">
          02 · One record, always current
        </p>
        <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl leading-tight mb-3 max-w-[20ch]">
          Everything a buyer verifies, in one place.
        </h3>
        <p className="text-base text-foreground/70 leading-[1.6] max-w-[58ch] mb-7">
          Registration numbers, certifications, and real capability — structured the way buyers
          actually check, and updated when your shop changes.
        </p>

        <CapabilityPage />
      </div>
    </div>
  );
}

function RecordCard() {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border">
      {/* Record header */}
      <div className="bg-card px-6 py-5 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-display font-semibold text-foreground text-lg">RFQ–1038</span>
              <span className="text-[0.65rem] font-medium text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-0.5">
                Won
              </span>
            </div>
            <p className="text-sm text-foreground/60 mt-1">
              Acme Precision · Housing, Inconel · qty 40
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display font-semibold text-foreground text-lg">$6,750</p>
            <p className="text-[0.7rem] text-muted-foreground mt-0.5">Closed in 3 days</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-background px-5 sm:px-6 pt-6 sm:pt-8 pb-6">
        {/* Mobile: vertical stack */}
        <div className="sm:hidden flex flex-col">
          {RECORD_STAGES.map((s, i) => (
            <div key={s.label} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`rounded-full flex-shrink-0 ${
                    s.tone === "danger"
                      ? "h-3 w-3 bg-red-500 ring-4 ring-red-500/15"
                      : s.tone === "success"
                      ? "h-3 w-3 bg-emerald-600 ring-4 ring-emerald-600/15"
                      : s.tone === "accent"
                      ? "h-2 w-2 bg-accent mt-0.5"
                      : "h-2 w-2 bg-muted-foreground mt-0.5"
                  }`}
                />
                {i < RECORD_STAGES.length - 1 && (
                  <div
                    className={`w-[2px] flex-1 min-h-[34px] ${
                      s.tone === "danger" || s.tone === "accent" ? "bg-red-500/60" : "bg-border-strong"
                    }`}
                  />
                )}
              </div>
              <div className="pb-4">
                <p
                  className={`text-[13px] font-medium flex items-center gap-1 ${
                    s.tone === "danger"
                      ? "text-red-600 font-semibold"
                      : s.tone === "success"
                      ? "text-emerald-700 font-semibold"
                      : s.tone === "accent"
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {s.tone === "danger" && <AlertTriangle size={13} />}
                  {s.tone === "success" && <Check size={13} />}
                  {s.label}
                </p>
                <p className={`text-[11px] mt-0.5 ${s.tone === "danger" ? "text-red-600/80" : "text-muted-foreground"}`}>
                  {s.time} · {s.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:block">
          <div className="flex items-center mb-3.5">
          <div className="flex-1 h-[2px] bg-border-strong" />
          <div className="h-2 w-2 rounded-full bg-muted-foreground flex-shrink-0" />
          <div className="flex-1 h-[2px] bg-border-strong" />
          <div className="h-2 w-2 rounded-full bg-muted-foreground flex-shrink-0" />
          <div className="flex-1 h-[2px] bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-red-500 flex-shrink-0 ring-4 ring-red-500/15" />
          <div className="flex-1 h-[2px] bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
          <div className="flex-1 h-[2px] bg-accent" />
          <div className="h-3 w-3 rounded-full bg-emerald-600 flex-shrink-0 ring-4 ring-emerald-600/15" />
          <div className="flex-1 h-[2px] bg-emerald-600" />
        </div>

          <div className="grid grid-cols-5 gap-1.5">
            {RECORD_STAGES.map((s) => (
              <div key={s.label} className={s.tone === "danger" ? "text-center" : ""}>
                <p
                  className={`text-[13px] font-medium m-0 flex items-center gap-1 ${
                    s.tone === "danger"
                      ? "text-red-600 font-semibold justify-center"
                      : s.tone === "success"
                      ? "text-emerald-700 font-semibold"
                      : s.tone === "accent"
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {s.tone === "danger" && <AlertTriangle size={13} />}
                  {s.tone === "success" && <Check size={13} />}
                  {s.label}
                </p>
                <p className={`text-[11px] mt-0.5 ${s.tone === "danger" ? "text-red-600/80" : "text-muted-foreground"}`}>
                  {s.time}
                </p>
                <p className={`text-[11px] ${s.tone === "danger" ? "text-red-600/80" : "text-muted-foreground"}`}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer takeaway */}
      <div className="bg-card border-t border-border px-6 py-3.5 flex items-center gap-2.5">
        <Zap size={15} className="text-accent flex-shrink-0" />
        <p className="text-[13px] text-foreground/70">
          The stall was caught and the nudge went out{" "}
          <strong className="text-foreground font-semibold">one minute apart</strong> — automatically,
          with nobody watching the clock.
        </p>
      </div>
    </div>
  );
}

export function FrameworkPanel() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {/* 01 — The board */}
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2.5">
          01 · The board
        </p>
        <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl leading-tight mb-3 max-w-[18ch]">
          Every quote, on one board.
        </h3>
        <p className="text-base text-foreground/70 leading-[1.6] max-w-[58ch] mb-7">
          Every RFQ the shop has open, what stage it's in, and how long it's been sitting there. The
          ones going cold surface on their own.
        </p>

        <div className="shadow-2xl shadow-black/25">
          <div className="overflow-hidden rounded-md ring-1 ring-black/10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-sm text-white/60">app.clewindustries.com</span>
            </div>

            <div className="flex bg-white min-h-[400px]">
              <div className="w-16 border-r border-neutral-100 py-4 flex flex-col items-center gap-5 flex-shrink-0">
                <div className="w-7 h-7 rounded-md bg-accent" />
                <div className="flex flex-col items-center gap-1 text-accent">
                  <List size={18} />
                  <span className="text-[9px]">RFQs</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-400">
                  <Building2 size={18} />
                  <span className="text-[9px]">Shops</span>
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-5 overflow-x-auto">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <p className="text-sm font-semibold text-neutral-900">RFQ Dashboard</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-100 rounded-md px-3 py-1.5 w-36">
                      <Search size={13} /> Search...
                    </div>
                    <span className="text-[0.65rem] font-bold text-white bg-accent rounded-md px-3 py-2 whitespace-nowrap">
                      + New RFQ
                    </span>
                    <div className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center text-[9px] font-semibold text-neutral-500">
                      FS
                    </div>
                  </div>
                </div>

                {/* Mobile: stacked cards */}
                <div className="sm:hidden flex flex-col gap-2">
                  {RFQ_ROWS.map((r) => (
                    <div
                      key={r.rfq}
                      className={`border rounded-lg p-3 ${
                        r.flagged ? "border-red-200 bg-red-50/40" : "border-neutral-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <span className="text-[13px] font-semibold text-neutral-800">{r.company}</span>
                          <span className="text-[11px] text-neutral-400 ml-1.5">#{r.rfq}</span>
                        </div>
                        <span className={`text-[10px] font-semibold rounded px-2 py-1 flex-shrink-0 ${STATUS_STYLES[r.status]}`}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-[12px] text-neutral-500 mb-2">{r.part}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-[12px] ${r.flagged ? "font-semibold text-red-600" : "text-neutral-500"}`}>
                          {r.flagged ? "⚠️ " : ""}
                          {r.time}
                        </span>
                        {r.flagged && (
                          <span className="text-[10px] text-red-600">Flagged for follow-up</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: full table */}
                <div className="hidden sm:block border border-neutral-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[60px_1fr_1fr_1fr_80px_140px] bg-neutral-50">
                    {["RFQ", "Company", "Contact", "Part", "Status", "Time in status"].map((h, i) => (
                      <div
                        key={h}
                        className={`flex items-center justify-between gap-1 text-[10px] uppercase tracking-wide text-neutral-400 px-2.5 py-2 ${
                          i < 5 ? "border-r border-neutral-100" : ""
                        }`}
                      >
                        <span>{h}</span>
                        <ChevronDown size={11} className="text-neutral-300" />
                      </div>
                    ))}
                  </div>

                  {RFQ_ROWS.map((r, i) => (
                    <div
                      key={r.rfq}
                      className={`grid grid-cols-[60px_1fr_1fr_1fr_80px_140px] text-[13px] text-neutral-800 ${
                        i < RFQ_ROWS.length - 1 ? "border-b border-neutral-100" : ""
                      } ${r.flagged ? "bg-red-50/40" : ""}`}
                    >
                      <div className="px-2.5 py-2.5 border-r border-neutral-50 text-neutral-400">{r.rfq}</div>
                      <div className="px-2.5 py-2.5 border-r border-neutral-50 font-medium">{r.company}</div>
                      <div className="px-2.5 py-2.5 border-r border-neutral-50 text-neutral-500">{r.contact}</div>
                      <div className="px-2.5 py-2.5 border-r border-neutral-50 text-neutral-500">{r.part}</div>
                      <div className="px-2.5 py-2.5 border-r border-neutral-50 flex items-center">
                        <span className={`text-[10px] font-semibold rounded px-2 py-1 ${STATUS_STYLES[r.status]}`}>
                          {r.status}
                        </span>
                      </div>
                      <div className="px-2.5 py-2 flex flex-col justify-center">
                        <span className={`text-[12px] ${r.flagged ? "font-semibold text-red-600" : "text-neutral-500"}`}>
                          {r.flagged ? "⚠️ " : ""}
                          {r.time}
                        </span>
                        {r.flagged && (
                          <span className="text-[10px] text-red-600 mt-0.5">Flagged for follow-up</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-2.5">
                  <p className="text-[10px] text-neutral-300">Showing 6 of 24 RFQs</p>
                  <p className="text-[10px] text-neutral-300">Synced 2 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 02 — One record */}
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2.5">
          02 · One record, start to finish
        </p>
        <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl leading-tight mb-3 max-w-[18ch]">
          Every handoff stays connected.
        </h3>
        <p className="text-base text-foreground/70 leading-[1.6] max-w-[58ch] mb-7">
          One RFQ arrives. It becomes a quote, then a follow-up, then a closed job — carrying its own
          history the whole way. Nobody retypes it into a spreadsheet at any point.
        </p>

        <RecordCard />
      </div>
    </div>
  );
}

export default function Product() {
  const [active, setActive] = useState("foundation");
  const tab = TABS[active];

  return (
    <section id="product" className="relative w-full bg-foreground/[0.06] border-y border-border">
      <div className="px-[8vw] py-[14vh] md:py-[16vh]">
        <Reveal as="p" className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8">
          Product
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.98] md:text-[3.6vw] md:leading-[1.05] max-w-[20ch] mb-14 md:mb-16 text-balance"
        >
          See it work, not just hear about it.
        </Reveal>

        {/* Tabs */}
        <div className="flex gap-2.5 mb-8">
          {Object.entries(TABS).map(([key, t]) => (
            <motion.button
              key={key}
              onClick={() => setActive(key)}
              animate={{ flexGrow: active === key ? 2 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`text-left px-5 py-3.5 rounded-lg border-[1.5px] transition-colors duration-300 ${
                active === key
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card/40 hover:border-accent/40"
              }`}
            >
              <span
                className={`text-[0.65rem] uppercase tracking-[0.1em] font-semibold ${
                  active === key ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {t.pillar}
              </span>
              <p
                className={`font-display font-semibold text-base mt-0.5 ${
                  active === key ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {t.name}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg text-foreground/70 leading-[1.6] max-w-[62ch] mb-10"
          >
            {tab.description}
          </motion.p>
        </AnimatePresence>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {active === "foundation" ? <FoundationPanel /> : <FrameworkPanel />}
            <ProcessSteps steps={tab.process} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
