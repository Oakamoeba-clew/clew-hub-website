import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "clew_popup_seen";

export default function InquiryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-clew-contact", handler);
    return () => window.removeEventListener("open-clew-contact", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onClose = () => setOpen(false);

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
            className="relative w-full max-w-[320px] bg-background border border-border border-l-2 border-l-accent p-5 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            <p className="font-display font-semibold tracking-tightest text-foreground text-sm leading-none mb-2">
              CLEW <span className="text-accent">Industries</span>
            </p>
            <p className="text-xs text-foreground/70 leading-[1.55] pr-5">
              We will never ask you for drawings, proprietary specs, pricing details, or any
              controlled or non-public information.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}