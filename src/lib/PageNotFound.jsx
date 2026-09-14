import { fwHash } from "@/lib/frameworkBase";

export default function PageNotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-[8vw] bg-background">
      <div className="max-w-[36rem]">
        <a href={fwHash("#top")} className="flex flex-col leading-none w-fit mb-12">
          <span className="font-display font-bold tracking-tightest text-foreground text-[1.75rem] leading-none">
            CLEW
          </span>
          <span className="font-display text-[0.6rem] uppercase tracking-[0.35em] text-accent font-semibold mt-1.5">
            Industries
          </span>
        </a>
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
          404
        </p>
        <h1 className="font-display font-semibold tracking-tightest text-foreground text-[1.85rem] sm:text-[2.25rem] leading-[1.08]">
          That page isn’t here.
        </h1>
        <p className="mt-4 text-base md:text-lg text-foreground/70 leading-relaxed max-w-[38ch]">
          Framework is at /framework. The P1 kit is the home page.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors duration-300"
        >
          Back to CLEW
        </a>
      </div>
    </div>
  );
}
