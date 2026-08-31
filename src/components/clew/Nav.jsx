import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const PRODUCTS = [
  {
    label: "Framework",
    href: "/#framework",
    blurb: "Clarity in the Shop — RFQs to won or lost",
  },
  {
    label: "Foundation",
    href: "/#foundation",
    blurb: "Clarity to the Market — one verifiable page",
  },
];

const CLIENT_LOGIN_HREF = "https://clew-framework-board.pages.dev";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setProductsOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  const openDemo = () => {
    setOpen(false);
    setProductsOpen(false);
    window.dispatchEvent(new Event("clew:open-demo"));
  };

  const closeMobile = () => {
    setOpen(false);
    setMobileProductsOpen(false);
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

          <div className="flex items-center gap-8">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                onClick={() => setProductsOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-[0.95rem] text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
              >
                Products
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-3 min-w-[260px] border border-border bg-background shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)]"
                  >
                    {PRODUCTS.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="block px-4 py-3.5 border-b border-border last:border-b-0 hover:bg-foreground/[0.03] transition-colors"
                      >
                        <span className="block text-sm font-semibold text-foreground">{p.label}</span>
                        <span className="block text-xs text-foreground/55 mt-0.5 leading-snug">{p.blurb}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/#contact"
              className="text-[0.95rem] text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
            >
              Contact
            </a>

            <a
              href={CLIENT_LOGIN_HREF}
              className="text-[0.95rem] text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
            >
              Client login
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
          <a href="/#top" className="flex flex-col leading-none shrink-0" onClick={closeMobile}>
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
              <button
                type="button"
                onClick={() => setMobileProductsOpen((v) => !v)}
                aria-expanded={mobileProductsOpen}
                className="py-3.5 text-lg font-medium text-foreground/85 hover:text-accent transition-colors duration-300 border-b border-border/50 flex items-center justify-between w-full text-left"
              >
                Products
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {mobileProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden border-b border-border/50"
                  >
                    {PRODUCTS.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        onClick={closeMobile}
                        className="block pl-4 py-3 text-base font-medium text-foreground/75 hover:text-accent"
                      >
                        {p.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="/#contact"
                onClick={closeMobile}
                className="py-3.5 text-lg font-medium text-foreground/85 hover:text-accent transition-colors duration-300 border-b border-border/50"
              >
                Contact
              </a>

              <a
                href={CLIENT_LOGIN_HREF}
                onClick={closeMobile}
                className="py-3.5 text-lg font-medium text-foreground/85 hover:text-accent transition-colors duration-300 border-b border-border/50"
              >
                Client login
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
