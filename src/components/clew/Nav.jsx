import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openDemo = () => {
    setOpen(false);
    window.dispatchEvent(new Event("clew:open-demo"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="px-[8vw] py-4 md:py-5">
        <div className="hidden lg:flex items-center justify-between">
          <a href="/#top" className="flex flex-col leading-none shrink-0">
            <span className="font-display font-bold tracking-tightest text-foreground text-[1.75rem] leading-none">
              CLEW
            </span>
            <span className="font-display text-[0.6rem] uppercase tracking-[0.35em] text-accent font-semibold mt-1.5">
              Industries
            </span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="/#contact"
              className="text-[0.95rem] text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
            >
              Contact
            </a>
            <a
              href="tel:+14842059663"
              className="text-[0.95rem] text-foreground/80 hover:text-accent transition-colors duration-300 font-medium tabular-nums"
            >
              (484) 205-9663
            </a>
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
            >
              Book a demo
            </button>
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between">
          <a href="/#top" className="flex flex-col leading-none shrink-0" onClick={() => setOpen(false)}>
            <span className="font-display font-bold tracking-tightest text-foreground text-2xl leading-none">
              CLEW
            </span>
            <span className="font-display text-[0.55rem] uppercase tracking-[0.35em] text-accent font-semibold mt-1">
              Industries
            </span>
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex items-center justify-center h-11 w-11 -mr-2 text-foreground"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="px-[8vw] py-5 flex flex-col">
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="py-3.5 text-lg font-medium text-foreground/85 hover:text-accent transition-colors duration-300 border-b border-border/50"
              >
                Contact
              </a>
              <a
                href="tel:+14842059663"
                onClick={() => setOpen(false)}
                className="py-3.5 text-lg font-medium text-foreground/85 hover:text-accent transition-colors duration-300 border-b border-border/50 tabular-nums"
              >
                (484) 205-9663
              </a>
              <button
                type="button"
                onClick={openDemo}
                className="mt-5 w-full bg-accent text-accent-foreground py-4 text-base font-semibold tracking-wide"
              >
                Book a demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
