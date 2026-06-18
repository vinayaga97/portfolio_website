/* eslint-disable @next/next/no-img-element */

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-6 py-20 sm:px-12 lg:px-20">
      <div className="flex flex-col items-center gap-16 lg:flex-row">
        <div className="relative h-[420px] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-[#16191F] to-[#0C0D11]">
          <img
            src="/vinay.jpg"
            alt="Vinay Kumar Agarwal"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <span className="font-mono text-[13px] tracking-[0.08em] text-muted">
            ABOUT
          </span>
          <p className="max-w-[640px] text-[22px] leading-[1.5] tracking-[-0.01em] text-snow sm:text-[24px]">
            I&apos;m an engineering leader who likes problems at the intersection of{" "}
            <span className="text-pink-soft">
              AI infrastructure, distributed systems, and developer productivity
            </span>{" "}
            — building platforms that stay fast and reliable at massive scale.
          </p>
          <p className="max-w-[600px] text-[16px] leading-[1.7] text-muted">
            Over 7 years I&apos;ve worked across event-driven architectures,
            real-time systems, and AI workflows — from scaling backend at Inshorts
            to shipping GenAI platforms and now leading platform engineering for
            agentic systems at Plotline.
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
