import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

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

const PRODUCT_OPTIONS = ["Foundation", "Visibility Brief", "Capability Assessment", "Other"];
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

const inputCls =
  "w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors duration-300";
const labelCls =
  "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";
const selectCls =
  "w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors duration-300";

export default function ContactModal({ open, onClose }) {
  const [customerType, setCustomerType] = useState("new"); // "new" | "existing"
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setCustomerType("new");
      setForm(EMPTY);
      setStatus("idle");
      setError("");
    }
  }, [open]);

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
        throw new Error(data.message || "The request didn't send. Please try again.");
      }
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(err?.message || "The request didn't send. Please try again.");
    }
  };

  const toggleBtnCls = (active) =>
    `flex-1 px-4 py-3 text-sm font-semibold tracking-wide border transition-colors duration-300 ${
      active
        ? "bg-accent text-accent-foreground border-accent"
        : "bg-transparent text-foreground/70 border-border hover:border-accent/50"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] bg-background border border-border border-l-2 border-l-accent p-6 md:p-7 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Check className="text-accent" size={22} />
                </div>
                <p className="font-display font-semibold text-foreground text-xl tracking-tight">
                  Message sent.
                </p>
                <p className="mt-2 text-foreground/70 text-sm">
                  We'll be in touch shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-sm text-accent font-medium hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display font-semibold tracking-tightest text-foreground text-xl md:text-2xl leading-tight">
                  Contact Us
                </h3>

                <div className="mt-4 flex gap-2">
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

                {(
                  <>
                    <div className="my-5 h-px w-full bg-border" />

                    <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                        <label className={labelCls} htmlFor="cm_name">Name</label>
                        <input
                          id="cm_name"
                          type="text"
                          required
                          value={form.contact_name}
                          onChange={update("contact_name")}
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className={labelCls} htmlFor="cm_company">Company</label>
                        <input
                          id="cm_company"
                          type="text"
                          required
                          value={form.company_name}
                          onChange={update("company_name")}
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className={labelCls} htmlFor="cm_email">Email</label>
                        <input
                          id="cm_email"
                          type="email"
                          required
                          value={form.email}
                          onChange={update("email")}
                          className={inputCls}
                        />
                      </div>

                      {customerType === "new" && (
                        <div>
                          <label className={labelCls} htmlFor="cm_product">Product</label>
                          <select
                            id="cm_product"
                            required
                            value={form.product}
                            onChange={update("product")}
                            className={selectCls}
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
                          <p className="mt-2 text-xs text-muted-foreground">
                            {REASON_OPTIONS.map((r) => r.label).join(" · ")}
                          </p>
                        </div>
                      )}

                      <div>
                        <label className={labelCls} htmlFor="cm_message">Message</label>
                        <textarea
                          id="cm_message"
                          value={form.message}
                          onChange={update("message")}
                          rows={3}
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
                        className="w-full inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? "Sending…" : "Submit"}
                      </button>

                      <p className="pt-1 text-center text-sm text-muted-foreground">
                        Or call{" "}
                        <a
                          href="tel:+14842059663"
                          className="text-foreground/80 font-medium hover:text-accent transition-colors duration-300"
                        >
                          (484) 205-9663
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
