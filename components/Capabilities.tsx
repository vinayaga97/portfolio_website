import Reveal from "./Reveal";

const cards = [
  {
    title: "Agent systems",
    body: "Multi-agent pipelines with feedback loops and iterative refinement — automation that compounds, not one-off scripts.",
    accent: "pink",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7AA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="19" cy="19" r="2.5" />
        <path d="M12 7.5v4M10 13.5 6.5 17M14 13.5 17.5 17" />
      </svg>
    ),
  },
  {
    title: "Platform architecture",
    body: "Systems that scale across traffic and team — designed for failure modes, observability, and long-term cost.",
    accent: "mint",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5EE6C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Engineering leadership",
    body: "High-agency, low-process teams — clear ownership, trust-based delegation, and a high bar for decision quality.",
    accent: "snow",
    icon: (
      <svg className="text-snow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18a4 4 0 0 0-8 0" />
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4 20a6 6 0 0 1 4-5.6M20 20a6 6 0 0 0-4-5.6" />
      </svg>
    ),
  },
];

const iconWrap: Record<string, string> = {
  pink: "bg-pink/10 border-pink/30",
  mint: "bg-mint/10 border-mint/30",
  snow: "bg-snow/10 border-snow/20",
};

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-page px-6 pb-10 pt-16 sm:px-12 lg:px-20">
      <Reveal as="span" className="block font-mono text-[13px] tracking-[0.08em] text-muted">
        001 — WHAT I BUILD
      </Reveal>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 70}
            className="flex flex-col gap-[18px] rounded-[16px] border border-line bg-panel p-7"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-[10px] border ${iconWrap[c.accent]}`}
            >
              {c.icon}
            </div>
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-snow">
              {c.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-muted">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
