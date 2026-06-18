import Reveal from "./Reveal";

// AI / agentic capabilities lead the list — they are the differentiators.
const stack: { label: string; ai?: boolean }[] = [
  { label: "RAG / LLM Infra", ai: true },
  { label: "Agentic Workflows", ai: true },
  { label: "Vector DB", ai: true },
  { label: "LLM Orchestration", ai: true },
  { label: "Golang" },
  { label: "Kafka" },
  { label: "Kubernetes" },
  { label: "AWS" },
  { label: "GCP" },
  { label: "Redis" },
  { label: "MongoDB" },
  { label: "Docker" },
  { label: "Observability" },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-page px-6 pb-12 pt-8 sm:px-12 lg:px-20">
      <Reveal as="span" className="block font-mono text-[13px] tracking-[0.08em] text-muted">
        STACK
      </Reveal>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {stack.map((s, i) => (
          <Reveal
            as="span"
            key={s.label}
            delay={i * 45}
            className={
              s.ai
                ? "rounded-[8px] border border-pink/30 bg-pink/10 px-4 py-2.5 font-mono text-[14px] text-pink-soft"
                : "rounded-[8px] border border-line bg-surface px-4 py-2.5 font-mono text-[14px] text-ink2"
            }
          >
            {s.label}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
