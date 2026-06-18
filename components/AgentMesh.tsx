type Variant = "primary" | "agent" | "service" | "gateway";

type NodeProps = {
  left: string;
  top: string;
  label: string;
  variant?: Variant;
};

/* Node box dimensions are expressed in cqi (container query inline-size) units
   so the whole mesh scales proportionally with the card width — at the 560px
   design width 1cqi = 5.6px, and everything shrinks together on small screens
   instead of the fixed-px boxes overflowing. */
const size: Record<Variant, { px: number; py: number; font: number; dot: number }> = {
  primary: { px: 3.2, py: 2.0, font: 2.32, dot: 1.25 },
  agent: { px: 2.32, py: 1.6, font: 2.14, dot: 1.07 },
  service: { px: 2.32, py: 1.6, font: 2.14, dot: 1.07 },
  gateway: { px: 2.5, py: 1.6, font: 2.14, dot: 1.07 },
};

function MeshNode({ left, top, label, variant = "agent" }: NodeProps) {
  const box: Record<Variant, string> = {
    primary: "border-pink bg-pink/10 shadow-[0_0_28px_rgba(255,61,129,0.35)]",
    agent: "border-hair bg-surface2",
    service: "border-mint/30 bg-mint/10",
    gateway: "border-hair bg-surface2",
  };
  const dot: Record<Variant, string> = {
    primary: "bg-pink shadow-[0_0_9px_#FF3D81]",
    agent: "bg-pink-soft",
    service: "bg-mint",
    gateway: "bg-muted",
  };
  const text: Record<Variant, string> = {
    primary: "text-snow font-medium",
    agent: "text-ink2",
    service: "text-ink2",
    gateway: "text-ink2",
  };
  const s = size[variant];
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center border font-mono ${box[variant]}`}
      style={{
        left,
        top,
        gap: "1.43cqi",
        padding: `${s.py}cqi ${s.px}cqi`,
        borderRadius: "1.8cqi",
        fontSize: `${s.font}cqi`,
      }}
    >
      <span
        className={`rounded-full ${dot[variant]}`}
        style={{ width: `${s.dot}cqi`, height: `${s.dot}cqi` }}
      />
      <span className={text[variant]}>{label}</span>
    </div>
  );
}

export default function AgentMesh() {
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[20px] border border-line bg-surface">
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

      {/* graph — container-query context so nodes scale with its width */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "560 / 487", containerType: "inline-size" }}
      >
        <svg
          viewBox="0 0 560 487"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <g className="stroke-edge" strokeWidth={1.5}>
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
          className="absolute flex w-[84%] -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-dashed border-line2 bg-surface2"
          style={{
            left: "50%",
            top: "80.5%",
            gap: "1.8cqi",
            padding: "1.8cqi 0",
            borderRadius: "1.8cqi",
          }}
        >
          <span
            className="font-mono tracking-[0.06em] text-muted"
            style={{ fontSize: "2.14cqi" }}
          >
            OBSERVABILITY · TRACES · METRICS · LOGS
          </span>
        </div>
      </div>

      {/* live metrics */}
      <div className="flex items-center justify-between border-t border-line bg-surface2 px-5 py-3.5">
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
