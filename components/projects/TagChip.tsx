const AI_TAGS = new Set(["LLM", "RAG", "Agents", "Agentic", "Vector DB"]);

export default function TagChip({ label }: { label: string }) {
  const ai = AI_TAGS.has(label);
  return (
    <span
      className={
        ai
          ? "rounded-[7px] border border-pink/30 bg-pink/10 px-2.5 py-1 font-mono text-[12px] text-pink-soft"
          : "rounded-[7px] border border-line bg-surface px-2.5 py-1 font-mono text-[12px] text-ink2"
      }
    >
      {label}
    </span>
  );
}
