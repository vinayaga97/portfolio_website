/* eslint-disable @next/next/no-img-element */

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-6 py-20 sm:px-12 lg:px-20">
      <div className="flex flex-col items-center gap-16 lg:flex-row">
        {/* Photo: replace the placeholder below with your image.
            Recommended: <img src="/vinay.jpg" alt="Vinay Kumar Agarwal"
            className="absolute inset-0 h-full w-full object-cover" /> */}
        <div className="relative flex h-[420px] w-full max-w-[360px] shrink-0 flex-col items-center justify-center gap-3.5 overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-[#16191F] to-[#0C0D11]">
          <div
            className="absolute -left-10 -top-20 h-[300px] w-[300px]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,61,129,0.18), rgba(10,11,14,0) 70%)",
            }}
          />
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-hair bg-[#1A1E26]">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#5C6672" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8.5" r="4" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
            </svg>
          </div>
          <span className="font-mono text-[12px] tracking-[0.06em] text-muted2">
            DROP YOUR PHOTO HERE
          </span>
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
