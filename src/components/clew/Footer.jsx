export default function Footer() {
  return (
    <footer className="relative w-full bg-background border-t border-foreground">
      <div className="px-[8vw] py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-end">
          <div className="flex flex-col gap-2">
            <img
              src="/logo-clew.png"
              alt="CLEW Industries"
              className="h-16 w-auto"
            />
          </div>

          <div className="flex flex-col gap-1 md:items-center">
            <a
              href="mailto:info@clewindustries.com"
              className="text-base text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
            >
              info@clewindustries.com
            </a>
            <a
              href="tel:+14842059663"
              className="text-base text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
            >
              (484) 205-9663
            </a>
            <span className="text-sm text-muted-foreground">By appointment</span>
          </div>

          <div className="flex flex-col gap-1 md:items-end">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Lehigh Valley
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/70">
              Pennsylvania · USA
            </span>
            <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground/50 font-mono mt-1">
              40.6° N · 75.4° W
            </span>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-x-8 gap-y-3">
          <a href="/#top" className="text-sm text-foreground/70 hover:text-accent transition-colors duration-300 font-medium">
            Home
          </a>
          <a href="/#product" className="text-sm text-foreground/70 hover:text-accent transition-colors duration-300 font-medium">
            Products
          </a>
          <a href="/#contact" className="text-sm text-foreground/70 hover:text-accent transition-colors duration-300 font-medium">
            Contact
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CLEW Industries. Seen clearly outside. Run clearly inside.
          </p>
          <p className="text-xs text-muted-foreground/70">
            An accurate picture. Evidence-backed. No guarantees of contracts.
          </p>
        </div>
      </div>
    </footer>
  );
}
