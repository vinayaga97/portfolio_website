type NodeProps = {
  left: string;
  top: string;
  label: string;
  variant?: "primary" | "agent" | "service" | "gateway";
};

function MeshNode({ left, top, label, variant = "agent" }: NodeProps) {
  const styles: Record<NonNullable<NodeProps["variant"]>, string> = {
    primary:
      "border-pink bg-[#1A0E16] shadow-[0_0_28px_rgba(255,61,129,0.4)] px-[18px] py-[11px]",
    agent: "border-hair bg-surface2 px-[13px] py-[9px]",
    service: "border-[#1F4438] bg-[#0E1714] px-[13px] py-[9px]",
    gateway: "border-[#2A3340] bg-surface2 px-[14px] py-[9px]",
  };
  const dot: Record<NonNullable<NodeProps["variant"]>, string> = {
    primary: "bg-pink shadow-[0_0_9px_#FF3D81] h-[7px] w-[7px]",
    agent: "bg-pink-soft h-1.5 w-1.5",
    service: "bg-mint h-1.5 w-1.5",
    gateway: "bg-muted h-1.5 w-1.5",
  };
  const text: Record<NonNullable<NodeProps["variant"]>, string> = {
    primary: "text-snow text-[13px] font-medium",
    agent: "text-ink2 text-[12px]",
    service: "text-mint-soft text-[12px]",
    gateway: "text-ink2 text-[12px]",
  };
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[10px] border font-mono ${styles[variant]}`}
      style={{ left, top }}
    >
      <span className={`rounded-full ${dot[variant]}`} />
      <span className={text[variant]}>{label}</span>
    </div>
  );
}

export default function AgentMesh() {
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-surface to-[#0C0D11]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="font-mono text-[12px] tracking-[0.06em] text-muted">
          SYSTEM · AGENT MESH
        </span>
        <span className="flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-mint">
          <span className="h-[7px] w-[7px] animate-pulse2 rounded-full bg-mint shadow-[0_0_8px_#5EE6C4]" />
          LIVE
        </span>
      </div>

      {/* graph */}
      <div className="relative w-full" style={{ aspectRatio: "560 / 487" }}>
        <svg
          viewBox="0 0 560 487"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <g stroke="#262C38" strokeWidth={1.5}>
            <path d="M280 60 V98" />
            <path d="M280 138 C 280 160, 120 162, 108 186" />
            <path d="M280 138 V186" />
            <path d="M280 138 C 280 160, 440 162, 452 186" />
            <path d="M108 224 V284" />
            <path d="M280 224 V284" />
            <path d="M452 224 V284" />
            <path d="M108 316 V366" />
            <path d="M280 316 V366" />
            <path d="M452 316 V366" />
          </g>
          <g
            stroke="#FF3D81"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2 8"
            className="animate-dash"
          >
            <path d="M280 60 V98" />
            <path d="M280 138 V186" />
            <path d="M280 224 V284" />
            <path d="M280 316 V366" />
          </g>
        </svg>

        <MeshNode left="50%" top="8.6%" label="API Gateway" variant="gateway" />
        <MeshNode left="50%" top="24.2%" label="Orchestrator" variant="primary" />
        <MeshNode left="19.3%" top="42.1%" label="Planner" variant="agent" />
        <MeshNode left="50%" top="42.1%" label="Executor" variant="agent" />
        <MeshNode left="80.7%" top="42.1%" label="Critic" variant="agent" />
        <MeshNode left="19.3%" top="61.6%" label="Kafka" variant="service" />
        <MeshNode left="50%" top="61.6%" label="Vector DB" variant="service" />
        <MeshNode left="80.7%" top="61.6%" label="LLM Pool" variant="service" />

        <div
          className="absolute flex w-[84%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2.5 rounded-[10px] border border-dashed border-[#2A3340] bg-[#10131A] py-2.5"
          style={{ left: "50%", top: "80.5%" }}
        >
          <span className="font-mono text-[12px] tracking-[0.06em] text-muted">
            OBSERVABILITY · TRACES · METRICS · LOGS
          </span>
        </div>
      </div>

      {/* live metrics */}
      <div className="flex items-center justify-between border-t border-line bg-ink/60 px-5 py-3.5">
        <span className="font-mono text-[12px] text-ink2">
          <span className="text-mint">▲</span> 1.2B req/day
        </span>
        <span className="font-mono text-[12px] text-ink2">
          <span className="text-muted">p99</span> 41ms
        </span>
        <span className="hidden font-mono text-[12px] text-ink2 sm:inline">
          <span className="text-muted">uptime</span> 99.98%
        </span>
        <span className="flex items-center gap-2 font-mono text-[12px] text-ink2">
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_7px_#5EE6C4]" />
          3 agents
        </span>
      </div>
    </div>
  );
}
