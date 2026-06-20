"use client";

/** Nav pill that opens the ⌘K "Ask Vinay" palette. */
export default function AskTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("ask:open"))}
      className="flex items-center gap-2 rounded-[8px] border border-line2 bg-surface px-3 py-2 transition-colors hover:border-pink/40"
      aria-label="Ask anything about Vinay's work"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3D81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 8V4m0 16v-4M8 12H4m16 0h-4" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
      <span className="hidden font-mono text-[12px] tracking-[0.04em] text-snow sm:block">
        Ask Vinay
      </span>
      <span className="hidden rounded-[5px] border border-line2 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-muted2 sm:block">
        ⌘K
      </span>
    </button>
  );
}
