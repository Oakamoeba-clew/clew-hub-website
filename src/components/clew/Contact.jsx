import { useState } from "react";
import Reveal from "./Reveal";
import { Check, Mail, Phone, AlertTriangle } from "lucide-react";

const WEB3FORMS_KEY = "62e561d9-0f87-4fca-80a0-e27ac9071dc5";

// Web3Forms delivers to the mailbox tied to each access key — there is no
// per-submission "to" field on the free plan. To route Accounting separately,
// create a second Web3Forms form using accounting@clewindustries.com and drop
// its key in below. Until then both keys are the same and everything lands in
// the sales inbox.
const WEB3FORMS_KEY_ACCOUNTING = WEB3FORMS_KEY;

const ROUTES = {
  Sales: { key: WEB3FORMS_KEY, inbox: "sales@clewindustries.com" },
  Accounting: { key: WEB3FORMS_KEY_ACCOUNTING, inbox: "accounting@clewindustries.com" },
  Other: { key: WEB3FORMS_KEY, inbox: "sales@clewindustries.com" },
};
const DEFAULT_ROUTE = ROUTES.Sales;

const REASON_OPTIONS = [
  { value: "Sales", label: "Sales" },
  { value: "Accounting", label: "Accounting" },
  { value: "Other", label: "Other" },
];

const EMPTY = {
  contact_name: "",
  company_name: "",
  email: "",
  reason: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!form.reason) {
      setError("Choose Sales, Accounting, or Other.");
      return;
    }
    setError("");
    setStatus("submitting");

    const route = ROUTES[form.reason] || DEFAULT_ROUTE;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: route.key,
          subject: `[${form.reason}] CLEW contact — ${form.company_name.trim() || "General"}`,
          from_name: "CLEW Industries website",
          routed_to: route.inbox,
          contact_name: form.contact_name.trim(),
          company_name: form.company_name.trim(),
          email: form.email.trim(),
          reason: form.reason,
          message: form.message.trim(),
          botcheck: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error(data.message || "The message didn't send. Please try again.");
      }
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(err?.message || "The message didn't send. Please try again.");
    }
  };

  const inputCls =
    "w-full bg-transparent border-0 border-b border-foreground/20 px-0 py-3 text-base text-foreground placeholder:text-foreground/35 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-1";

  return (
    <section
      id="contact"
      className="relative w-full border-t border-border overflow-hidden offer-stage"
    >
      <div className="offer-stage-atmosphere" aria-hidden="true" />

      <div className="relative z-10 px-[8vw] py-[12vh] md:py-[14vh] max-w-[1500px] mx-auto">
        <Reveal
          as="p"
          className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6"
        >
          Contact
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-12 md:gap-16 lg:gap-20 items-start">
          <Reveal>
            <h2 className="font-display font-semibold tracking-tightest text-foreground text-[1.85rem] sm:text-[2.25rem] md:text-[2.55rem] leading-[1.08] text-balance max-w-[16ch]">
              Put us in touch.
            </h2>
            <p className="mt-5 text-base md:text-lg text-foreground/75 leading-relaxed max-w-[42ch]">
              No queue or ticket number.
            </p>

            <p className="mt-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors duration-300"
              >
                Prefer to see it live? Request a demo
                <span aria-hidden="true">→</span>
              </button>
            </p>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="flex items-start gap-2.5 text-base text-foreground/80 leading-[1.6] max-w-[42ch]">
                <AlertTriangle className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <span>
                  <span className="font-semibold text-foreground">Notice:</span> Clew
                  Industries will never ask for drawings, specs, or other
                  non-public proprietary information.
                </span>
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-2">
              <a
                href="mailto:info@clewindustries.com"
                className="inline-flex items-center gap-2.5 text-base text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
              >
                <Mail size={17} className="flex-shrink-0" />
                info@clewindustries.com
              </a>
              <a
                href="tel:+14842059663"
                className="inline-flex items-center gap-2.5 text-base text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
              >
                <Phone size={17} className="flex-shrink-0" />
                (484) 205-9663
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative contact-panel p-6 md:p-8 lg:p-9">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
              {status === "success" ? (
                <div className="flex flex-col items-start py-6 md:pt-0 pt-4">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                    <Check className="text-accent" size={24} />
                  </div>
                  <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                    Message sent.
                  </p>
                  <p className="mt-2 text-foreground/65 text-base md:text-lg">
                    We&apos;ll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls} htmlFor="c_name">
                        Name
                      </label>
                      <input
                        id="c_name"
                        type="text"
                        required
                        value={form.contact_name}
                        onChange={update("contact_name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="c_company">
                        Company
                      </label>
                      <input
                        id="c_company"
                        type="text"
                        required
                        value={form.company_name}
                        onChange={update("company_name")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="c_email">
                      Email
                    </label>
                    <input
                      id="c_email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <p className={labelCls}>Reason</p>
                    <div className="flex flex-wrap gap-2">
                      {REASON_OPTIONS.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          className={`px-3.5 py-2 text-sm font-semibold tracking-wide border-2 transition-colors duration-300 ${
                            form.reason === r.value
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-transparent text-foreground/60 border-foreground/15 hover:border-accent hover:text-accent"
                          }`}
                          onClick={() => {
                            setError("");
                            setForm((f) => ({ ...f, reason: r.value }));
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="c_message">
                      Message
                    </label>
                    <textarea
                      id="c_message"
                      value={form.message}
                      onChange={update("message")}
                      rows={4}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !form.reason}
                    className="w-full md:w-auto inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_24px_-12px_hsl(var(--accent)/0.85)]"
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
