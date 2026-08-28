import { useEffect, useRef } from "react";

// A reusable "precision reveal" — text slides up into place with dampened easing.
// Wraps children in an overflow-hidden container and animates translateY + opacity
// when the element scrolls into view.
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", duration = 1.1, once = true }) {
  const ref = useRef(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !seen.current)) {
            seen.current = true;
            requestAnimationFrame(() => el.classList.add("is-visible"));
            if (once) io.unobserve(el);
          } else if (!once && !entry.isIntersecting) {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style = { transitionDelay: `${delay}ms`, transitionDuration: `${duration}s` };

  return (
    <Tag ref={ref} className={`reveal-line ${className}`} style={style}>
      <span style={{ display: "inline-block", transitionDelay: `${delay}ms`, transitionDuration: `${duration}s` }}>
        {children}
      </span>
    </Tag>
  );
}