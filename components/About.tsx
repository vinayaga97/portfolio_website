/* eslint-disable @next/next/no-img-element */

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-6 py-20 sm:px-12 lg:px-20">
      <div className="flex flex-col items-center gap-16 lg:flex-row">
        <div className="relative flex h-[420px] w-full max-w-[360px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-line bg-surface">
          <div
            className="pointer-events-none absolute -left-10 -top-20 h-[300px] w-[300px]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,61,129,0.18), rgba(10,11,14,0) 70%)",
            }}
          />
          <img
            src="/vinay.jpg"
            alt="Vinay Kumar Agarwal"
            className="relative h-[260px] w-[260px] rounded-full object-cover ring-1 ring-line2 shadow-[0_0_40px_rgba(255,61,129,0.18)]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <span className="font-mono text-[13px] tracking-[0.08em] text-muted">
            ABOUT
          </span>
          <p className="max-w-[640px] text-[22px] leading-[1.5] tracking-[-0.01em] text-snow sm:text-[24px]">
            I&apos;m an engineering leader drawn to the intersection of{" "}
            <span className="text-pink">
              AI infrastructure, distributed systems, and developer productivity
            </span>
            {". "}I build platforms that stay fast and reliable at massive scale.
          </p>
          <p className="max-w-[600px] text-[16px] leading-[1.7] text-muted">
            Across 7 years I&apos;ve built event-driven architectures, real-time
            systems, and AI workflows. The throughline runs from scaling backend at
            Inshorts to shipping GenAI platforms, and now to leading platform
            engineering for agentic systems at Plotline.
          </p>
          <div className="flex flex-wrap gap-12 pt-2">
            {[
              { k: "BASED IN", v: "Bengaluru, India" },
              { k: "EDUCATION", v: "IIT Kanpur" },
              { k: "FOCUS", v: "AI Infra · Platforms" },
            ].map((f) => (
              <div key={f.k} className="flex flex-col gap-1.5">
                <span className="font-mono text-[12px] tracking-[0.04em] text-muted2">
                  {f.k}
                </span>
                <span className="text-[16px] text-snow">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
