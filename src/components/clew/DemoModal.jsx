import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, PlayCircle, HelpCircle, Check } from "lucide-react";

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

const PREFERENCES = ["Mornings", "Afternoons", "Either works"];

export default function DemoModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", company: "", contact: "" });
  const [preference, setPreference] = useState("Either works");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
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
          subject: `[Demo request] ${form.company.trim() || "General"} — ${preference}`,
          from_name: "CLEW Industries website",
          availability: preference,
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
    setForm({ name: "", company: "", contact: "" });
    setPreference("Either works");
    setStatus("idle");
    setError("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = "";
    };
  }, [open]);

  const inputCls =
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-[5vw] py-[6vh] bg-foreground/40 backdrop-blur-sm"
          onClick={handleClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="relative w-full max-w-[880px] max-h-[88vh] overflow-y-auto bg-background border border-border shadow-2xl p-7 sm:p-8 md:p-12"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <X size={22} />
            </button>

            <p id="demo-modal-title" className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8">
              Demo
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-start max-w-[46ch] py-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Check className="text-accent" size={24} />
                </div>
                <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                  Request sent.
                </p>
                <p className="mt-2 text-foreground/70 text-base md:text-lg">
                  We'll email you a time and a Zoom link within one business day.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14">
                {/* What we'll cover */}
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3">
                    15 minutes
                  </p>
                  <h3 className="font-display font-semibold text-foreground text-xl md:text-2xl mb-6">
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

                {/* Form */}
                <form onSubmit={onSubmit} className="flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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

                  <div className="mb-6">
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

                  <div className="mb-7">
                    <p className={labelCls}>When works best?</p>
                    <div className="flex flex-wrap gap-2">
                      {PREFERENCES.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPreference(p)}
                          className={`text-sm px-4 py-2 border transition-colors duration-300 ${
                            preference === p
                              ? "border-accent bg-accent/10 text-accent font-medium"
                              : "border-border-strong text-foreground/70 hover:border-accent/50"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive mb-4">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-accent text-accent-foreground py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Request a demo"}
                  </button>

                  <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                    We'll email you a time and a Zoom link within one business day.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
