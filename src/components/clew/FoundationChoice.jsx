import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const WEB3FORMS_KEY = "62e561d9-0f87-4fca-80a0-e27ac9071dc5";

const INFO_EMPTY = { contact_name: "", company_name: "", email: "", phone: "", message: "" };
const INTAKE_EMPTY = {
  company_name: "",
  year_established: "",
  has_domain: "",
  domain_name: "",
  cage: "",
  uei: "",
  naics: "",
  equipment: "",
  certifications: "",
  proud_of: "",
  contact_name: "",
  email: "",
};

function Success({ onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
        <Check className="text-accent" size={24} />
      </div>
      <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
        Sales@clewindustries.com
      </p>
      <p className="mt-2 text-foreground/70 text-lg">will be in touch shortly :)</p>
      <button
        onClick={onClose}
        className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
      >
        Close
      </button>
    </div>
  );
}

export default function FoundationChoice({ onClose, variant = "foundation" }) {
  const isPlus = variant === "foundation-plus";
  const [step, setStep] = useState("choice"); // choice | intake
  const [infoForm, setInfoForm] = useState(INFO_EMPTY);
  const [infoStatus, setInfoStatus] = useState("idle");
  const [infoError, setInfoError] = useState("");
  const [intakeForm, setIntakeForm] = useState(INTAKE_EMPTY);
  const [intakeStatus, setIntakeStatus] = useState("idle");
  const [intakeError, setIntakeError] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const updateInfo = (k) => (e) => setInfoForm((f) => ({ ...f, [k]: e.target.value }));
  const updateIntake = (k) => (e) => setIntakeForm((f) => ({ ...f, [k]: e.target.value }));

  const submitInfo = async (e) => {
    e.preventDefault();
    if (infoStatus === "submitting") return;
    setInfoError("");
    setInfoStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `CLEW — Need more information — ${infoForm.company_name.trim()}`,
          from_name: "CLEW Industries website",
          contact_name: infoForm.contact_name.trim(),
          company_name: infoForm.company_name.trim(),
          email: infoForm.email.trim(),
          phone: infoForm.phone.trim() || "(none)",
          message: infoForm.message.trim() || "(none)",
          botcheck: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true)
        throw new Error(data.message || "The request didn't send. Please try again.");
      setInfoStatus("success");
    } catch (err) {
      setInfoStatus("error");
      setInfoError(err?.message || "The request didn't send. Please try again.");
    }
  };

  const submitIntake = async (e) => {
    e.preventDefault();
    if (intakeStatus === "submitting") return;
    setIntakeError("");
    setIntakeStatus("submitting");
    try {
      const fields = {
        access_key: WEB3FORMS_KEY,
        subject: `CLEW — Site Draft Intake${isPlus ? " (Foundation Plus)" : ""} — ${intakeForm.company_name.trim()}`,
        from_name: "CLEW Industries website",
        company_name: intakeForm.company_name.trim(),
        year_established: intakeForm.year_established.trim() || "(none)",
        has_domain: intakeForm.has_domain || "(not answered)",
        domain_name: intakeForm.has_domain === "Yes" ? (intakeForm.domain_name.trim() || "(not provided)") : "(none)",
        cage: intakeForm.cage.trim() || "(none)",
        uei: intakeForm.uei.trim() || "(none)",
        naics: intakeForm.naics.trim() || "(none)",
        equipment: intakeForm.equipment.trim() || "(none)",
        certifications: intakeForm.certifications.trim() || "(none)",
        proud_of: intakeForm.proud_of.trim() || "(none)",
        contact_name: intakeForm.contact_name.trim(),
        email: intakeForm.email.trim(),
        botcheck: "",
      };

      let res;
      if (isPlus && images.length > 0) {
        const fd = new FormData();
        Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
        images.forEach((file) => fd.append("attachments", file, file.name));
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });
      } else {
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(fields),
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true)
        throw new Error(data.message || "The request didn't send. Please try again.");
      setIntakeStatus("success");
    } catch (err) {
      setIntakeStatus("error");
      setIntakeError(err?.message || "The request didn't send. Please try again.");
    }
  };

  const inputCls =
    "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors duration-300";
  const labelCls =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1";
  const btnCls =
    "w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const maxW = step === "choice" ? "max-w-[860px]" : step === "intake" ? "max-w-[560px]" : "max-w-[480px]";

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
          key={step}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${maxW} bg-background border border-border p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto`}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* STEP: CHOICE */}
          {step === "choice" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:divide-x md:divide-border">
              {/* Ready now */}
              <div className="flex flex-col md:pr-8">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent font-semibold mb-2">
                  Ready now
                </p>
                <h3 className="font-display font-semibold tracking-tightest text-foreground text-2xl md:text-3xl leading-tight">
                  Ready now
                </h3>
                <p className="mt-3 text-sm md:text-base text-foreground/65 leading-[1.6]">
                  Fill out a short intake using info that's already public — CAGE, NAICS, equipment,
                  certifications — and we'll send you a preview of what your site could look like.
                </p>
                <button
                  onClick={() => setStep("intake")}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-base font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
                >
                  Start the intake
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Need more information */}
              <div className="md:pl-8">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent font-semibold mb-2">
                  Need more information
                </p>
                <h3 className="font-display font-semibold tracking-tightest text-foreground text-2xl md:text-3xl leading-tight">
                  Need more information
                </h3>
                <p className="mt-3 text-sm md:text-base text-foreground/65 leading-[1.6]">
                  Not ready to build yet? Leave your details and we'll reach out.
                </p>

                {infoStatus === "success" ? (
                  <div className="mt-6">
                    <Success onClose={onClose} />
                  </div>
                ) : (
                  <form onSubmit={submitInfo} className="mt-6 space-y-5">
                    <div>
                      <label className={labelCls} htmlFor="fc_name">Name</label>
                      <input
                        id="fc_name"
                        type="text"
                        required
                        value={infoForm.contact_name}
                        onChange={updateInfo("contact_name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="fc_company">Company</label>
                      <input
                        id="fc_company"
                        type="text"
                        required
                        value={infoForm.company_name}
                        onChange={updateInfo("company_name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="fc_email">Email</label>
                      <input
                        id="fc_email"
                        type="email"
                        required
                        value={infoForm.email}
                        onChange={updateInfo("email")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="fc_phone">Phone</label>
                      <input
                        id="fc_phone"
                        type="tel"
                        value={infoForm.phone}
                        onChange={updateInfo("phone")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="fc_msg">Message (optional)</label>
                      <textarea
                        id="fc_msg"
                        rows={2}
                        value={infoForm.message}
                        onChange={updateInfo("message")}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    {infoError && <p className="text-sm text-destructive">{infoError}</p>}
                    <button type="submit" disabled={infoStatus === "submitting"} className={btnCls}>
                      {infoStatus === "submitting" ? "Sending…" : "Get in touch"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* STEP: INTAKE */}
          {step === "intake" &&
            (intakeStatus === "success" ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Check className="text-accent" size={24} />
                </div>
                <p className="font-display font-semibold text-foreground text-xl md:text-2xl tracking-tight">
                  Thanks — we'll send your Site Draft preview soon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 text-sm text-accent font-medium hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent font-semibold mb-2">
                  Site Draft Intake
                </p>
                <h3 className="font-display font-semibold tracking-tightest text-foreground text-2xl md:text-3xl leading-tight">
                  Site Draft Intake
                </h3>
                <p className="mt-2 text-sm text-foreground/60">
                  Everything here is already public — we'll use it to build your Site Draft.
                </p>

                <div className="mt-5 border border-border bg-secondary/40 p-4 text-xs md:text-[0.8rem] text-foreground/65 leading-[1.6]">
                  <p>
                    This intake only asks for information that's already public — things like your
                    CAGE code, NAICS codes, certifications, and equipment list. We will never ask
                    you for drawings, proprietary specs, pricing details, or any controlled or
                    non-public information. If a form ever asks you for something beyond what's
                    publicly available, don't fill it out.
                  </p>
                  {isPlus && (
                    <p className="mt-2">
                      If you choose to upload photos, please only include general shop or equipment
                      images — nothing showing in-process work, internal documents, or proprietary
                      detail.
                    </p>
                  )}
                </div>

                <form onSubmit={submitIntake} className="mt-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="in_company">Company name *</label>
                      <input
                        id="in_company"
                        type="text"
                        required
                        value={intakeForm.company_name}
                        onChange={updateIntake("company_name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="in_year">Year established</label>
                      <input
                        id="in_year"
                        type="text"
                        value={intakeForm.year_established}
                        onChange={updateIntake("year_established")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="in_cage">CAGE code</label>
                      <input
                        id="in_cage"
                        type="text"
                        value={intakeForm.cage}
                        onChange={updateIntake("cage")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="in_uei">UEI</label>
                      <input
                        id="in_uei"
                        type="text"
                        value={intakeForm.uei}
                        onChange={updateIntake("uei")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="in_has_domain">Do you already own a domain?</label>
                      <select
                        id="in_has_domain"
                        value={intakeForm.has_domain}
                        onChange={updateIntake("has_domain")}
                        className={inputCls}
                      >
                        <option value="">Select one</option>
                        <option value="Yes">Yes, I own one</option>
                        <option value="No">No, not yet</option>
                      </select>
                    </div>
                    {intakeForm.has_domain === "Yes" && (
                      <div>
                        <label className={labelCls} htmlFor="in_domain_name">Domain name</label>
                        <input
                          id="in_domain_name"
                          type="text"
                          value={intakeForm.domain_name}
                          onChange={updateIntake("domain_name")}
                          className={inputCls}
                          placeholder="e.g. yourshop.com"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="in_naics">Primary NAICS code(s)</label>
                    <input
                      id="in_naics"
                      type="text"
                      value={intakeForm.naics}
                      onChange={updateIntake("naics")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="in_equip">Equipment / capabilities</label>
                    <textarea
                      id="in_equip"
                      rows={3}
                      value={intakeForm.equipment}
                      onChange={updateIntake("equipment")}
                      className={`${inputCls} resize-none`}
                      placeholder="e.g. 5-axis CNC, EDM, CMM inspection"
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="in_certs">Certifications</label>
                    <input
                      id="in_certs"
                      type="text"
                      value={intakeForm.certifications}
                      onChange={updateIntake("certifications")}
                      className={inputCls}
                      placeholder="ISO, AS9100, ITAR, etc. — leave blank if none"
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="in_proud">What's your shop most proud of?</label>
                    <textarea
                      id="in_proud"
                      rows={3}
                      value={intakeForm.proud_of}
                      onChange={updateIntake("proud_of")}
                      className={`${inputCls} resize-none`}
                      placeholder="a job, a capability, a reputation — whatever sets you apart"
                    />
                  </div>

                  {isPlus && (
                    <div>
                      <label className={labelCls} htmlFor="in_images">Upload images (optional)</label>
                      <input
                        id="in_images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages(Array.from(e.target.files || []))}
                        className="block w-full text-sm text-foreground/70 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:bg-accent file:text-accent-foreground file:font-semibold file:cursor-pointer hover:file:bg-foreground transition-colors"
                      />
                      {images.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {images.map((file, idx) => (
                            <li key={idx} className="text-xs text-foreground/60 flex items-center justify-between gap-2">
                              <span className="truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                                className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                                aria-label={`Remove ${file.name}`}
                              >
                                <X size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-1.5 text-xs text-muted-foreground leading-[1.5]">
                        General shop or equipment photos only — no in-process work, internal documents, or proprietary detail.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="in_contact">Contact name *</label>
                      <input
                        id="in_contact"
                        type="text"
                        required
                        value={intakeForm.contact_name}
                        onChange={updateIntake("contact_name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="in_email">Email *</label>
                      <input
                        id="in_email"
                        type="email"
                        required
                        value={intakeForm.email}
                        onChange={updateIntake("email")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {intakeError && <p className="text-sm text-destructive">{intakeError}</p>}

                  <button type="submit" disabled={intakeStatus === "submitting"} className={btnCls}>
                    {intakeStatus === "submitting" ? "Sending…" : "Submit for your preview"}
                  </button>
                  <p className="text-xs text-muted-foreground text-center leading-[1.6]">
                    No payment required. We'll never ask for drawings or proprietary specs.
                  </p>
                </form>
              </div>
            ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}