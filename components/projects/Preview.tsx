type PreviewProps = {
  accent?: "pink" | "mint";
  label?: string;
};

/**
 * Asset-free preview visual for project cards and placeholder demos — a soft
 * accent glow over a small node motif that echoes the home-page agent mesh.
 */
export default function Preview({ accent = "pink", label }: PreviewProps) {
  const stroke = accent === "mint" ? "#5EE6C4" : "#FF3D81";
  const glow =
    accent === "mint" ? "rgba(94,230,196,0.16)" : "rgba(255,61,129,0.18)";

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${glow} 0%, rgba(10,11,14,0) 62%)`,
        }}
      />
      <svg
        className="absolute left-1/2 top-1/2 h-[52%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-90"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path d="M100 22 V52 M100 52 C100 70 40 72 36 90 M100 52 V90 M100 52 C100 70 160 72 164 90" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="78" y="8" width="44" height="20" rx="6" fill="none" stroke={stroke} strokeOpacity="0.7" strokeWidth="1.5" />
        <rect x="16" y="86" width="40" height="18" rx="6" fill="none" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="80" y="86" width="40" height="18" rx="6" fill="none" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="144" y="86" width="40" height="18" rx="6" fill="none" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="100" cy="18" r="3" fill={stroke} />
      </svg>
      {label ? (
        <span className="absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.05em] text-muted">
          {label}
        </span>
      ) : null}
    </div>
  );
}
