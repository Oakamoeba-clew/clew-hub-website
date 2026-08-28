import { useEffect, useRef } from "react";

// A "Lens" cursor — a 40px circle with a 1px accent border that subtly expands
// when hovering interactive/text elements. Reinforces the theme of clarity.
export default function LensCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target;
      const interactive = target.closest("a, button, [data-lens='hover'], p, h1, h2, h3, span, li");
      if (interactive) dot.classList.add("is-hover");
      else dot.classList.remove("is-hover");
    };

    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className="lens-dot" aria-hidden="true" />;
}