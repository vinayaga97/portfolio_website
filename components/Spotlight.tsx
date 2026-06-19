"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps content in a cursor-following spotlight + subtle 3D tilt. Caller owns
 * the card chrome via `className`; the glow and tilt ride on CSS variables so
 * paint stays on the GPU. Falls flat (no transform) for reduced-motion users
 * because the inline transform reads vars that simply never get set.
 */
export default function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${(y / r.height - 0.5) * -6}deg`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 6}deg`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative overflow-hidden ${className ?? ""}`}
      style={{
        transform: "perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transition: "transform .25s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), rgba(255,61,129,0.16), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
