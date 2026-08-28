import { useEffect, useState } from "react";

// The "clew" — a ball of thread from the Theseus myth.
// A vertical thread unspools down the left margin as you scroll,
// guiding you from one section to the next.
export default function Thread() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-[4vw] top-0 bottom-0 z-40 hidden md:flex flex-col items-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Spool at top — where the thread unspools from */}
      <div className="relative w-3 h-3 rounded-full border border-accent bg-background mb-2" />

      {/* The thread */}
      <div className="relative flex-1 w-px bg-border">
        {/* Traveled accent thread */}
        <div
          className="absolute top-0 left-0 w-px bg-accent origin-top transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {/* The clew ball at the leading edge */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background shadow-sm transition-[top] duration-150 ease-out"
          style={{ top: `calc(${progress * 100}% - 5px)` }}
        />
      </div>
    </div>
  );
}