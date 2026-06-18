import Reveal from "./Reveal";

type Role = {
  period: string;
  title: string;
  company: string;
  body: string;
  current?: boolean;
};

const roles: Role[] = [
  {
    period: "2025 → Now",
    title: "Engineering Leader",
    company: "Plotline",
    body: "Lead platform engineering for AI and agentic systems serving 1B+ requests/day across orchestration, distributed execution, observability, and reliability.",
    current: true,
  },
  {
    period: "2024 → 2025",
    title: "Senior Software Engineer",
    company: "ALLEN Digital",
    body: "Led a GenAI-powered doubts platform and an 8-engineer team, scaling real-time academic support nationally across web and app.",
  },
  {
    period: "2023 → 2024",
    title: "Co-Founder",
    company: "Cookiee",
    body: "Built an activity-based networking app to 3,000+ users with real-time chat, notifications, and GCP infra in Go, Kafka, and Mongo.",
  },
  {
    period: "2020 → 2024",
    title: "Senior Software Engineer",
    company: "Inshorts · PublicApp",
    body: "Scaled a hyperlocal video news platform to 10M+ DAU / 50M+ MAU; cut cloud costs 35% (~$1M+/yr) across 30+ GKE services.",
  },
  {
    period: "2019 → 2020",
    title: "Applications Engineer",
    company: "Oracle",
    body: "Built Java supply and inventory planning systems, optimizing production SQL for 350% faster load times.",
  },
];

function Rail({ current, first, last }: { current?: boolean; first: boolean; last: boolean }) {
  return (
    <div className="relative w-4 shrink-0 self-stretch">
      {/* line */}
      <div
        className="absolute left-1/2 w-[1.5px] -translate-x-1/2 bg-line2"
        style={{
          top: first ? "2.25rem" : 0,
          bottom: last ? "auto" : 0,
          height: last ? "2.25rem" : first ? "auto" : "100%",
        }}
      />
      {/* dot */}
      <div
        className={
          current
            ? "absolute left-1/2 top-9 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink shadow-[0_0_0_4px_rgb(var(--c-bg)),0_0_12px_rgba(255,61,129,0.6)]"
            : "absolute left-1/2 top-9 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted2 bg-line2 shadow-[0_0_0_4px_rgb(var(--c-bg))]"
        }
      />
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-page px-6 pb-20 pt-10 sm:px-12 lg:px-20">
      <div className="flex items-baseline justify-between pb-5">
        <span className="font-mono text-[13px] tracking-[0.08em] text-muted">
          002 · WORK
        </span>
        <span className="text-[15px] text-muted">Selected roles</span>
      </div>

      <div className="flex flex-col">
        {roles.map((r, i) => (
          <Reveal
            key={r.title + r.period}
            delay={i * 70}
            className="flex items-stretch gap-6 sm:gap-12"
          >
            <Rail current={r.current} first={i === 0} last={i === roles.length - 1} />
            <div className="flex flex-1 flex-col gap-6 py-6 sm:flex-row sm:items-start sm:gap-12">
              <span className="font-mono text-[14px] text-muted sm:w-[120px] sm:shrink-0 sm:pt-1">
                {r.period}
              </span>
              <div className="flex flex-col gap-1.5 sm:w-[340px] sm:shrink-0">
                <span className="text-[22px] font-semibold tracking-[-0.01em] text-snow">
                  {r.title}
                </span>
                <span className="text-[15px] text-pink">{r.company}</span>
              </div>
              <p className="flex-1 text-[15px] leading-[1.6] text-muted">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
