import { useState } from "react";
import Reveal from "./Reveal";
import { MessageCircle, PlayCircle, HelpCircle, ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";

const WEB3FORMS_KEY = "62e561d9-0f87-4fca-80a0-e27ac9071dc5";

const COVERAGE = [
  {
    icon: MessageCircle,
    text: "How RFQs reach you today, how many a month, and what breaks down.",
  },
  {
    icon: PlayCircle,
    text: "The real intake workflow, one RFQ start to finish.",
  },
  {
    icon: HelpCircle,
    text: "Your questions, pricing, and next step. You decide.",
  },
];

const SLOTS_THIS_WEEK = [
  "Wed 10:00 AM",
  "Wed 2:30 PM",
  "Thu 9:00 AM",
  "Thu 1:00 PM",
  "Fri 11:00 AM",
  "Fri 3:00 PM",
];

const SLOTS_NEXT_WEEK = [
  "Mon 9:30 AM",
  "Tue 1:00 PM",
  "Wed 10:30 AM",
  "Thu 2:00 PM",
  "Fri 9:00 AM",
  "Fri 12:30 PM",
];

export default function Demo() {
  const [step, setStep] = useState(1); // 1 = intro/button, 2 = pick a slot, 3 = confirm
  const [showNextWeek, setShowNextWeek] = useState(false);
  const [chosenSlot, setChosenSlot] = useState("");
  const [form, setForm] = useState({ name: "", company: "", contact: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const pickSlot = (slot) => {
    setChosenSlot(slot);
    setStep(3);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Demo booked] ${form.company.trim() || "General"} — ${chosenSlot}`,
          from_name: "CLEW Industries website",
          requested_slot: chosenSlot,
          name: form.name.trim(),
          company: form.company.trim(),
          contact: form.contact.trim(),
          botcheck: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error(data.message || "The request didn't send. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "The request didn't send. Please try again.");
    }
  };

  const reset = () => {
    setStep(1);
    setShowNextWeek(false);
    setChosenSlot("");
    setForm({ name: "", company: "", contact: "" });
    setStatus("idle");
    setError("");
  };

  const inputCls =
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";
  const slotBtnCls =
    "border border-border-strong bg-transparent px-2 py-2.5 text-xs font-medium text-foreground/80 hover:border-accent hover:text-accent transition-colors duration-300 text-center leading-tight";

  return (
    <section id="demo" className="relative w-full bg-background">
      <div className="px-[8vw] py-[14vh] md:py-[16vh]">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8"
        >
          Demo
        </Reveal>

        {step === 1 && (
          <Reveal>
            <h2 className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.95] md:text-[3.2vw] md:leading-[1] text-balance max-w-[18ch]">
              See it work before you decide anything.
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/70 leading-[1.6] max-w-[46ch]">
              Fifteen minutes. No pitch you haven't asked for — we show the
              real workflow and answer what you actually want to know.
            </p>
            <button
              onClick={() => setStep(2)}
              className="mt-8 inline-flex items-center justify-center bg-accent text-accent-foreground px-9 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
            >
              Book a free demo
            </button>
          </Reveal>
        )}

        {step === 2 && (
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3">
                  15 minutes
                </p>
                <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl mb-6">
                  What we'll cover
                </h3>
                <div className="flex flex-col gap-4">
                  {COVERAGE.map((c) => (
                    <div key={c.text} className="flex gap-3">
                      <c.icon className="text-accent flex-shrink-0 mt-0.5" size={19} />
                      <p className="text-sm md:text-base text-foreground/70 leading-snug">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Nothing to prepare. Just tell us what a normal week looks like.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                    {showNextWeek ? "Next week" : "This week"}
                  </p>
                  <button
                    onClick={() => setShowNextWeek((v) => !v)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-foreground transition-colors duration-300"
                  >
                    {showNextWeek ? (
                      <>
                        <ChevronLeft size={14} /> This week
                      </>
                    ) : (
                      <>
                        See next week <ChevronRight size={14} />
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(showNextWeek ? SLOTS_NEXT_WEEK : SLOTS_THIS_WEEK).map((slot) => (
                    <button key={slot} onClick={() => pickSlot(slot)} className={slotBtnCls}>
                      {slot.split(" ")[0]}
                      <br />
                      {slot.split(" ").slice(1).join(" ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {step === 3 && (
          <Reveal>
            {status === "success" ? (
              <div className="flex flex-col items-start max-w-[46ch]">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Check className="text-accent" size={24} />
                </div>
                <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                  Request sent for {chosenSlot}.
                </p>
                <p className="mt-2 text-foreground/70 text-base md:text-lg">
                  We'll follow up by email with a Zoom link to confirm.
                </p>
                <button
                  onClick={reset}
                  className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
                >
                  Book another time
                </button>
              </div>
            ) : (
              <div className="max-w-[520px]">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-300 mb-5"
                >
                  <ArrowLeft size={15} /> Back
                </button>
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
                  Confirming for
                </p>
                <h3 className="font-display font-semibold text-foreground text-2xl md:text-3xl mb-7">
                  {chosenSlot}
                </h3>

                <form onSubmit={onConfirm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls} htmlFor="d_name">Name</label>
                      <input
                        id="d_name"
                        type="text"
                        required
                        value={form.name}
                        onChange={update("name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="d_company">Company</label>
                      <input
                        id="d_company"
                        type="text"
                        required
                        value={form.company}
                        onChange={update("company")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="d_contact">Email or phone</label>
                    <input
                      id="d_contact"
                      type="text"
                      required
                      value={form.contact}
                      onChange={update("contact")}
                      className={inputCls}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Confirm booking"}
                  </button>
                </form>
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
