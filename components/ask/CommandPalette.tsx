"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SourceRef } from "@/lib/ask/corpus";

const SUGGESTED = [
  "What did he build at massive scale?",
  "What agentic AI systems has he built?",
  "What's his experience leading engineering teams?",
];

const FOLLOW_UPS = [
  "How did he cut cloud costs?",
  "What's his tech stack?",
  "How can I get in touch?",
];

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Status = "idle" | "streaming" | "done" | "error";

/**
 * Render an LLM answer with light Markdown — bold, italic, inline code,
 * Markdown links, bare URLs/emails (auto-linked), bullet lists — plus the [n]
 * citation chips. Tolerates partial Markdown mid-stream (unclosed `**` etc.
 * simply render as literal text until the closing token arrives).
 */
function renderRich(
  text: string,
  streaming: boolean,
  onNavigate: () => void,
): ReactNode {
  let k = 0;

  const link = (href: string, children: ReactNode) => {
    // On-site paths ("/resume.pdf") route internally; absolute and bare-domain
    // links ("vinayagarwal.com/x") open externally — prepend a scheme so a
    // model-written bare domain never resolves as a broken relative path.
    let url = href;
    let external: boolean;
    if (url.startsWith("/")) external = false;
    else if (/^(https?:|mailto:)/.test(url)) external = true;
    else {
      url = `https://${url}`;
      external = true;
    }
    return (
      <a
        key={k++}
        href={url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={external ? undefined : onNavigate}
        className="text-pink decoration-pink/40 underline underline-offset-2 transition-colors hover:decoration-pink"
      >
        {children}
      </a>
    );
  };

  const TOKENS: { type: string; re: RegExp }[] = [
    { type: "code", re: /`([^`]+)`/ },
    { type: "bold", re: /\*\*([^*]+?)\*\*/ },
    { type: "italic", re: /\*([^*\n]+?)\*|_([^_\n]+?)_/ },
    { type: "mdlink", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
    { type: "cite", re: /\[(\d+)\]/ },
    { type: "url", re: /(?:https?:\/\/|www\.)[^\s<>()]+/ },
    { type: "email", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/ },
  ];

  const inline = (str: string): ReactNode[] => {
    const out: ReactNode[] = [];
    let rest = str;
    while (rest.length) {
      let best: RegExpExecArray | null = null;
      let bestIdx = Infinity;
      let bestType = "";
      for (const t of TOKENS) {
        const m = t.re.exec(rest);
        if (m && m.index < bestIdx) {
          best = m;
          bestIdx = m.index;
          bestType = t.type;
        }
      }
      if (!best) {
        out.push(<span key={k++}>{rest}</span>);
        break;
      }
      if (bestIdx > 0) out.push(<span key={k++}>{rest.slice(0, bestIdx)}</span>);
      const m = best;
      switch (bestType) {
        case "code":
          out.push(
            <code key={k++} className="rounded-[4px] bg-surface2 px-1 py-0.5 font-mono text-[13px] text-snow">
              {m[1]}
            </code>,
          );
          break;
        case "bold":
          out.push(<strong key={k++} className="font-semibold text-snow">{inline(m[1])}</strong>);
          break;
        case "italic":
          out.push(<em key={k++} className="italic">{inline(m[1] ?? m[2])}</em>);
          break;
        case "mdlink":
          out.push(link(m[2], inline(m[1])));
          break;
        case "cite":
          out.push(
            <sup key={k++} className="ml-0.5 rounded-[4px] bg-pink/15 px-[5px] py-px font-mono text-[10px] font-medium text-pink-mid">
              {m[1]}
            </sup>,
          );
          break;
        case "url": {
          let u = m[0];
          let trail = "";
          while (/[.,;:)]$/.test(u)) {
            trail = u.slice(-1) + trail;
            u = u.slice(0, -1);
          }
          out.push(link(u.startsWith("http") ? u : `https://${u}`, [u]));
          if (trail) out.push(<span key={k++}>{trail}</span>);
          break;
        }
        case "email":
          out.push(link(`mailto:${m[0]}`, [m[0]]));
          break;
      }
      rest = rest.slice(bestIdx + m[0].length);
    }
    return out;
  };

  const cursor = streaming ? (
    <span
      key="cursor"
      className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[2px] rounded-[2px] bg-pink align-middle motion-safe:animate-pulse2"
    />
  ) : null;

  const blocks = text.split(/\n{2,}/).filter((b) => b.trim().length);
  const els: ReactNode[] = blocks.map((blk, bi) => {
    const lines = blk.split("\n");
    const isList = lines.length > 0 && lines.every((l) => /^\s*[-*]\s+/.test(l));
    const last = bi === blocks.length - 1;
    if (isList) {
      return (
        <ul key={k++} className="flex flex-col gap-1.5">
          {lines.map((l, li) => (
            <li key={li} className="flex gap-2">
              <span className="select-none text-mint">•</span>
              <span className="flex-1">{inline(l.replace(/^\s*[-*]\s+/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={k++}>
        {lines.flatMap((l, li) => (li === 0 ? inline(l) : [<br key={`br${li}`} />, ...inline(l)]))}
        {last && cursor}
      </p>
    );
  });

  // If the answer is empty or ends in a list, still show the cursor while streaming.
  if (cursor && (blocks.length === 0 || /^\s*[-*]\s+/.test(blocks[blocks.length - 1]))) {
    els.push(<span key="c">{cursor}</span>);
  }
  return els;
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-muted motion-safe:animate-pulse2"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false); // intent: should the palette be visible
  const [render, setRender] = useState(false); // is it in the DOM (kept during exit)
  const [entered, setEntered] = useState(false); // has it animated in
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<SourceRef[]>([]);
  const [error, setError] = useState("");
  const [asked, setAsked] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const abortRef = useRef<AbortController | null>(null);

  // Streaming buffer: decouples network chunkiness from a steady, typed reveal.
  const queueRef = useRef("");
  const drainRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef = useRef(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stopDrain = useCallback(() => {
    if (drainRef.current) clearTimeout(drainRef.current);
    drainRef.current = null;
    queueRef.current = "";
    doneRef.current = false;
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    stopDrain();
    setStatus("idle");
    setAnswer("");
    setSources([]);
    setError("");
    setAsked("");
    setQuery("");
  }, [stopDrain]);

  const close = useCallback(() => setOpen(false), []);

  // Global ⌘K / Ctrl+K toggle + the nav trigger's open event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ask:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ask:open", onOpen);
    };
  }, []);

  // Mount/unmount with an exit delay so the close animation can play.
  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      setEntered(false);
      const t = setTimeout(() => {
        setRender(false);
        reset();
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open, reset]);

  // Trigger the enter animation one frame after mount; focus + scroll-lock.
  useEffect(() => {
    if (!render || !open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    const focus = setTimeout(() => inputRef.current?.focus(), 60);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(focus);
      document.body.style.overflow = prevOverflow;
    };
  }, [render, open]);

  // Keep the answer pinned to the bottom while streaming — unless the user
  // scrolled up to read (the streaming-UX rule).
  useEffect(() => {
    const el = scrollRef.current;
    if (el && atBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [answer]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  // Steady reveal of buffered tokens — speeds up if the backlog grows so it
  // never lags far behind the model.
  const pumpDrain = useCallback(() => {
    if (drainRef.current) return;
    const step = () => {
      const q = queueRef.current;
      if (q.length > 0) {
        const n = reduceRef.current ? q.length : Math.max(2, Math.ceil(q.length / 20));
        queueRef.current = q.slice(n);
        setAnswer((a) => a + q.slice(0, n));
        drainRef.current = setTimeout(step, 16);
      } else if (!doneRef.current) {
        drainRef.current = setTimeout(step, 16); // waiting for more tokens
      } else {
        drainRef.current = null;
        setStatus((s) => (s === "streaming" ? "done" : s));
      }
    };
    drainRef.current = setTimeout(step, 0);
  }, []);

  const ask = useCallback(
    async (q: string) => {
      const question = q.trim();
      if (!question) return;
      abortRef.current?.abort();
      stopDrain();
      const ac = new AbortController();
      abortRef.current = ac;

      setAsked(question);
      setQuery("");
      setAnswer("");
      setSources([]);
      setError("");
      setStatus("streaming");
      atBottomRef.current = true;
      doneRef.current = false;

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ question }),
          signal: ac.signal,
        });
        if (!res.ok || !res.body) throw new Error("request failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const chunks = buf.split("\n\n");
          buf = chunks.pop() ?? "";
          for (const chunk of chunks) {
            let event = "message";
            let data = "";
            for (const line of chunk.split("\n")) {
              if (line.startsWith("event:")) event = line.slice(6).trim();
              else if (line.startsWith("data:")) data += line.slice(5).trim();
            }
            if (!data) continue;
            const payload = JSON.parse(data);
            if (event === "token") {
              queueRef.current += payload.text;
              pumpDrain();
            } else if (event === "sources") {
              setSources(payload as SourceRef[]);
            } else if (event === "done") {
              doneRef.current = true;
              pumpDrain();
            } else if (event === "error") {
              setError(payload.message ?? "Something went wrong.");
              setStatus("error");
            }
          }
        }
        doneRef.current = true;
        pumpDrain();
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setError("Something went wrong reaching the assistant. Please try again.");
        setStatus("error");
      }
    },
    [pumpDrain, stopDrain],
  );

  if (!render) return null;

  const showAnswer = status !== "idle";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Vinay's work"
    >
      <button
        aria-label="Close"
        onClick={close}
        className={`absolute inset-0 cursor-default bg-[rgba(6,7,9,0.62)] backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative flex w-full max-w-[640px] flex-col overflow-hidden rounded-[16px] border border-hair bg-panel shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-200 motion-reduce:transition-none ${
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        {/* Input row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(query);
          }}
          className="flex items-center gap-3.5 border-b border-line px-5 py-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF3D81" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M21 21l-4.3-4.3" />
            <circle cx="11" cy="11" r="7" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about my work…"
            className="flex-1 bg-transparent text-[18px] text-snow placeholder:text-muted2 focus:outline-none"
            aria-label="Your question"
          />
          <button
            type="button"
            onClick={close}
            className="rounded-[6px] border border-line2 px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-muted2 transition-colors hover:text-snow"
          >
            ESC
          </button>
        </form>

        <div ref={scrollRef} onScroll={onScroll} className="max-h-[60vh] overflow-y-auto">
          {!showAnswer ? (
            <div className="flex flex-col gap-3 p-5">
              <span className="font-mono text-[10px] tracking-[0.08em] text-muted2">TRY ASKING</span>
              <div className="flex flex-col gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="group flex items-center gap-3 rounded-[10px] border border-line bg-surface2/40 px-3.5 py-3 text-left transition-all hover:border-pink/30 hover:bg-surface2"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-line2 bg-ink/40 text-pink">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4z" />
                      </svg>
                    </span>
                    <span className="flex-1 text-[14px] text-ink2 transition-colors group-hover:text-snow">
                      {s}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="-translate-x-1 text-muted2 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-pink group-hover:opacity-100"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-5" aria-live="polite">
              {/* Echoed question */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-pink-soft">YOU</span>
                <span className="text-[15px] text-snow">{asked}</span>
              </div>

              {status === "error" ? (
                <p className="text-[15px] leading-[1.6] text-muted">{error}</p>
              ) : status === "streaming" && answer === "" ? (
                <div className="flex items-center gap-2.5">
                  <ThinkingDots />
                  <span className="font-mono text-[11px] tracking-[0.04em] text-muted2">
                    reading Vinay&apos;s work…
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    <span className="font-mono text-[10px] tracking-[0.08em] text-muted2">
                      {sources.length > 0
                        ? `GROUNDED IN ${sources.length} SOURCE${sources.length > 1 ? "S" : ""}`
                        : "ANSWER"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 text-[16px] leading-[27px] text-ink2">
                    {renderRich(answer, status === "streaming", close)}
                  </div>

                  {sources.length > 0 && (
                    <div className="flex flex-wrap gap-2.5">
                      {sources.map((s) => (
                        <a
                          key={s.n}
                          href={s.href}
                          onClick={close}
                          className="flex min-w-[200px] flex-1 flex-col gap-1.5 rounded-[10px] border border-line bg-surface2 px-3.5 py-3 transition-colors hover:border-line2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="rounded-[4px] bg-pink/15 px-[5px] py-px font-mono text-[10px] text-pink-mid">
                              {s.n}
                            </span>
                            <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
                              {s.label}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {status === "done" && (
                    <div className="flex flex-col gap-2 pt-1">
                      <span className="font-mono text-[10px] tracking-[0.08em] text-muted2">FOLLOW UP</span>
                      <div className="flex flex-wrap gap-2">
                        {FOLLOW_UPS.map((f) => (
                          <button
                            key={f}
                            onClick={() => ask(f)}
                            className="flex items-center gap-1.5 rounded-[7px] border border-line2 px-3 py-1.5 text-[13px] text-ink2 transition-colors hover:border-mint/50"
                          >
                            <span className="text-mint">+</span>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-line bg-ink/40 px-5 py-3">
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.04em] text-muted2">
            <span><span className="text-muted">↵</span> ask</span>
            <span><span className="text-muted">esc</span> close</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5EE6C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
              answers only from Vinay&apos;s own work
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
