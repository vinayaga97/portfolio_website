"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, type ReactNode } from "react";
import CountUp from "./CountUp";

type Role = {
  period: string;
  title: string;
  company: string;
  logo?: string;
  stack: string[];
  body: ReactNode;
  current?: boolean;
};

const roles: Role[] = [
  {
    period: "2025 → Now",
    title: "Engineering Leader",
    company: "Plotline",
    logo: "/logos/plotline.png",
    current: true,
    stack: ["Agentic Workflows", "MCP", "RAG", "LLM Infra", "Go", "Kafka", "GKE/AWS"],
    body: (
      <>
        Lead platform engineering for AI and agentic systems serving{" "}
        <CountUp value={1} suffix="B+" className="font-semibold text-snow" /> requests/day across
        orchestration, distributed execution, observability, and reliability.
      </>
    ),
  },
  {
    period: "2024 → 2025",
    title: "Senior Software Engineer",
    company: "ALLEN Digital",
    logo: "/logos/allen.png",
    stack: ["RAG", "VectorDB", "LLM Infra", "Go", "SQS", "Kafka", "AWS"],
    body: (
      <>
        Led a GenAI-powered doubts platform and an{" "}
        <CountUp value={8} suffix="-engineer" className="font-semibold text-snow" /> team, scaling
        real-time academic support nationally across web and app.
      </>
    ),
  },
  {
    period: "2023 → 2024",
    title: "Co-Founder",
    company: "Cookiee",
    stack: ["Go", "Kafka", "MongoDB", "GCP"],
    body: (
      <>
        Built an activity-based networking app to{" "}
        <CountUp value={3000} suffix="+" className="font-semibold text-snow" /> users with real-time
        chat, notifications, and GCP infra.
      </>
    ),
  },
  {
    period: "2020 → 2024",
    title: "Senior Software Engineer",
    company: "Inshorts · PublicApp",
    logo: "/logos/inshorts.png",
    stack: ["GKE", "Go", "Kafka", "Video"],
    body: (
      <>
        Scaled a hyperlocal video news platform to{" "}
        <CountUp value={10} suffix="M+ DAU" className="font-semibold text-snow" /> /{" "}
        <CountUp value={50} suffix="M+ MAU" className="font-semibold text-snow" />; cut cloud costs{" "}
        <CountUp value={35} suffix="%" className="font-semibold text-snow" /> (~$1M+/yr) across 30+
        GKE services.
      </>
    ),
  },
  {
    period: "2019 → 2020",
    title: "Applications Engineer",
    company: "Oracle",
    logo: "/logos/oracle.png",
    stack: ["Java", "SQL", "PL/SQL"],
    body: (
      <>
        Built Java supply and inventory planning systems, optimizing production SQL for{" "}
        <CountUp value={350} suffix="%" className="font-semibold text-snow" /> faster load times.
      </>
    ),
  },
];

export default function Work() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      wrap.querySelectorAll<HTMLElement>("[data-marker]").forEach((m) => (m.dataset.on = "1"));
      wrap.querySelectorAll<HTMLElement>("[data-row]").forEach((r) => (r.style.opacity = "1"));
      return;
    }
    const rows = Array.from(wrap.querySelectorAll<HTMLElement>("[data-row]"));
    const markers = Array.from(wrap.querySelectorAll<HTMLElement>("[data-marker]"));
    let ticking = false;

    function update() {
      ticking = false;
      const r = wrap!.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      fill!.style.height = `${p * 100}%`;
      const fillY = r.top + p * r.height;
      rows.forEach((row, i) => {
        const rr = row.getBoundingClientRect();
        const center = rr.top + rr.height / 2;
        row.style.opacity = Math.abs(center - mid) < window.innerHeight * 0.4 ? "1" : "0.45";
        markers[i].dataset.on = rr.top + 36 <= fillY ? "1" : "0";
      });
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="work" className="mx-auto max-w-page px-6 pb-20 pt-10 sm:px-12 lg:px-20">
      <div className="flex items-baseline justify-between pb-5">
        <span className="font-mono text-[13px] tracking-[0.08em] text-muted">002 · WORK</span>
        <span className="text-[15px] text-muted">Selected roles</span>
      </div>

      <div ref={wrapRef} className="relative">
        <div className="absolute bottom-0 left-[18px] top-0 w-[1.5px] bg-line2" />
        <div
          ref={fillRef}
          className="absolute left-[18px] top-0 w-[1.5px] bg-gradient-to-b from-pink to-mint"
          style={{ height: 0 }}
        />

        <div className="flex flex-col">
          {roles.map((r) => (
            <div
              key={r.title + r.period}
              data-row
              className="flex items-stretch gap-5 sm:gap-10"
              style={{ transition: "opacity .35s ease" }}
            >
              {/* marker: logo badge, or a monogram badge when there's no logo */}
              <div className="relative w-9 shrink-0">
                <div
                  data-marker
                  data-on="0"
                  className="marker absolute left-[18px] top-9 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white ring-1 ring-line2"
                >
                  {r.logo ? (
                    <img src={r.logo} alt={r.company} className="h-5 w-5 object-contain" />
                  ) : (
                    <span className="text-[15px] font-bold leading-none text-onaccent">
                      {r.company.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-10">
                <span className="font-mono text-[14px] text-muted sm:w-[110px] sm:shrink-0 sm:pt-1">
                  {r.period}
                </span>
                <div className="flex flex-col gap-1.5 sm:w-[260px] sm:shrink-0">
                  <span className="text-[22px] font-semibold tracking-[-0.01em] text-snow">
                    {r.title}
                  </span>
                  <span className="text-[15px] text-pink">{r.company}</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="flex-1 text-[15px] leading-[1.6] text-muted">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
