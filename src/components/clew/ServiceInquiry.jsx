import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const WEB3FORMS_KEY = "62e561d9-0f87-4fca-80a0-e27ac9071dc5";

const EMPTY = { contact_name: "", company_name: "", contact_method: "Email", contact_info: "" };

export default function ServiceInquiry({ tier, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          subject: `CLEW inquiry — ${tier?.name || "Service"} — ${form.company_name.trim()}`,
          from_name: "CLEW Industries website",
          contact_name: form.contact_name.trim(),
          company_name: form.company_name.trim(),
          contact_method: form.contact_method,
          contact_info: form.contact_info.trim(),
          tier: tier?.name || "",
          price: tier?.price || "",
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

  const inputCls =
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-[480px] bg-background border border-border p-8 md:p-10 shadow-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                <Check className="text-accent" size={24} />
              </div>
              <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                Sales@clewindustries.com
              </p>
              <p className="mt-2 text-foreground/70 text-lg">
                will be in touch shortly :)
              </p>
              <button
                onClick={onClose}
                className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent font-semibold mb-2">
                {tier?.name}{tier?.billing === "annual" ? " Annual" : ""}{tier?.price ? ` — ${tier.price}` : ""}
              </p>
              <h3 className="font-display font-semibold tracking-tightest text-foreground text-2xl md:text-3xl leading-tight">
                Put us in touch.
              </h3>
              <p className="mt-2 text-sm text-foreground/60">
                A few details and we'll reach out with next steps.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-6">
                <div>
                  <label className={labelCls} htmlFor="si_name">Your name</label>
                  <input
                    id="si_name"
                    type="text"
                    required
                    value={form.contact_name}
                    onChange={update("contact_name")}
                    className={inputCls}
                    placeholder=""
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="si_company">Company</label>
                  <input
                    id="si_company"
                    type="text"
                    required
                    value={form.company_name}
                    onChange={update("company_name")}
                    className={inputCls}
                    placeholder=""
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="si_method">Preferred contact method</label>
                  <select
                    id="si_method"
                    value={form.contact_method}
                    onChange={update("contact_method")}
                    className={inputCls}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="si_info">Contact info</label>
                  <input
                    id="si_info"
                    type="text"
                    required
                    value={form.contact_info}
                    onChange={update("contact_info")}
                    className={inputCls}
                    placeholder=""
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Submit"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}