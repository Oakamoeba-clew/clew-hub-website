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

const PRODUCT_OPTIONS = ["Framework", "Other"];
const REASON_OPTIONS = [
  { value: "Sales", label: "Sales — product questions" },
  { value: "Accounting", label: "Accounting — billing or payment" },
  { value: "Other", label: "Other" },
];

const EMPTY = {
  contact_name: "",
  company_name: "",
  email: "",
  product: "",
  reason: "",
  message: "",
};

export default function Contact() {
  const [customerType, setCustomerType] = useState("new"); // "new" | "existing"
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    setError("");
    setStatus("submitting");

    const tag =
      customerType === "new"
        ? `New — ${form.product || "General"}`
        : `Existing — ${form.reason || "General"}`;

    const route =
      customerType === "existing" ? ROUTES[form.reason] || DEFAULT_ROUTE : DEFAULT_ROUTE;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: route.key,
          subject: `[${tag}] CLEW contact — ${form.company_name.trim() || "General"}`,
          from_name: "CLEW Industries website",
          routed_to: route.inbox,
          customer_type: customerType,
          contact_name: form.contact_name.trim(),
          company_name: form.company_name.trim(),
          email: form.email.trim(),
          product: customerType === "new" ? form.product : "",
          reason: customerType === "existing" ? form.reason : "",
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
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";
  const toggleBtnCls = (active) =>
    `flex-1 px-4 py-3 text-sm font-semibold tracking-wide border-b-2 transition-colors duration-300 ${
      active
        ? "bg-accent text-accent-foreground border-accent"
        : "bg-transparent text-foreground/70 border-transparent hover:border-accent/40"
    }`;

  return (
    <section id="contact" className="relative w-full bg-foreground/[0.06] border-t border-border">
      <div className="px-[8vw] py-[14vh] md:py-[16vh]">
        <Reveal
          as="p"
          className="text-[0.75rem] uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-8"
        >
          Contact
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          {/* Left — context, not sales copy */}
          <Reveal>
            <h2 className="font-display font-semibold tracking-tightest text-foreground text-[9vw] leading-[0.95] md:text-[3.2vw] md:leading-[1] text-balance max-w-[16ch]">
              Put us in touch.
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/70 leading-[1.6] max-w-[42ch]">
              No queue or ticket number. Write us — we read it in the
              Lehigh Valley.
            </p>

            <p className="mt-4">
              <button
                onClick={() => window.dispatchEvent(new Event("clew:open-demo"))}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors duration-300"
              >
                Prefer to see it live? Book a free demo
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

          {/* Right — the form */}
          <Reveal delay={120}>
            <div className="border border-border p-7 md:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-start py-6 border-t border-border md:border-t-0 md:pt-0 pt-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Check className="text-accent" size={24} />
                </div>
                <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                  Message sent.
                </p>
                <p className="mt-2 text-foreground/70 text-base md:text-lg">
                  We'll be in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setCustomerType("new");
                  }}
                  className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-7 border-b border-border">
                  <button
                    type="button"
                    className={toggleBtnCls(customerType === "new")}
                    onClick={() => setCustomerType("new")}
                  >
                    New Customer
                  </button>
                  <button
                    type="button"
                    className={toggleBtnCls(customerType === "existing")}
                    onClick={() => setCustomerType("existing")}
                  >
                    Existing Customer
                  </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls} htmlFor="c_name">Name</label>
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
                      <label className={labelCls} htmlFor="c_company">Company</label>
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
                    <label className={labelCls} htmlFor="c_email">Email</label>
                    <input
                      id="c_email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className={inputCls}
                    />
                  </div>

                  {customerType === "new" && (
                    <div>
                      <label className={labelCls} htmlFor="c_product">Product</label>
                      <select
                        id="c_product"
                        required
                        value={form.product}
                        onChange={update("product")}
                        className={inputCls}
                      >
                        <option value="" disabled>Select a product</option>
                        {PRODUCT_OPTIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {customerType === "existing" && (
                    <div>
                      <p className={labelCls}>Reason</p>
                      <div className="flex flex-wrap gap-2">
                        {REASON_OPTIONS.map((r) => (
                          <button
                            key={r.value}
                            type="button"
                            className={toggleBtnCls(form.reason === r.value)}
                            onClick={() => setForm((f) => ({ ...f, reason: r.value }))}
                          >
                            {r.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelCls} htmlFor="c_message">Message</label>
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
                    disabled={
                      status === "submitting" ||
                      (customerType === "existing" && !form.reason)
                    }
                    className="w-full md:w-auto inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </button>
                </form>
              </>
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
