import AgentMesh from "./AgentMesh";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,61,129,0.22) 0%, rgba(255,61,129,0.06) 35%, rgba(10,11,14,0) 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-page flex-col items-center gap-16 px-6 py-16 sm:px-12 lg:flex-row lg:px-20 lg:py-24">
        <div className="flex w-full flex-col gap-8 lg:w-[640px] lg:shrink-0">
          <span className="hero-in self-start rounded-[20px] border border-pink/30 bg-pink/10 px-3.5 py-2 font-mono text-[12px] tracking-[0.06em] text-pink">
            ENGINEERING LEADER · AI INFRA & DISTRIBUTED SYSTEMS
          </span>
          <h1
            className="hero-in flex flex-col text-[56px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[72px] lg:text-[80px]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-snow">Vinay Kumar Agarwal</span>
            <span className="bg-gradient-to-r from-pink to-[#FF9CC2] bg-clip-text text-transparent">
              ships agent systems.
            </span>
          </h1>
          <p
            className="hero-in max-w-[560px] text-[18px] leading-[1.65] text-muted sm:text-[19px]"
            style={{ animationDelay: "160ms" }}
          >
            I lead platform engineering for AI and agentic systems at Plotline,
            where orchestration, distributed execution, and observability keep 1B+
            requests a day fast and reliable. Before that I scaled Inshorts backend
            to 10M+ daily users and shipped GenAI platforms at Allen Digital. IIT Kanpur.
          </p>
          <div
            className="hero-in flex flex-wrap items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="mailto:vka0797@gmail.com"
              className="rounded-[10px] bg-gradient-to-br from-pink to-pink-mid px-6 py-3.5 text-[15px] font-semibold text-onaccent shadow-[0_8px_30px_rgba(255,61,129,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
            <a
              href="#work"
              className="rounded-[10px] border border-line bg-surface px-6 py-3.5 text-[15px] font-medium text-snow transition-colors hover:border-hair"
            >
              View work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] border border-line bg-surface px-6 py-3.5 text-[15px] font-medium text-snow transition-colors hover:border-hair"
            >
              Resume
            </a>
            <span className="pl-1 font-mono text-[14px] text-muted">
              vka0797@gmail.com
            </span>
          </div>
        </div>
        <div
          className="hero-in flex w-full justify-center lg:flex-1"
          style={{ animationDelay: "320ms" }}
        >
          <AgentMesh />
        </div>
      </div>
    </section>
  );
}
