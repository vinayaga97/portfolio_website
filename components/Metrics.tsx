import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

const items = [
  { value: "1B+", label: "REQUESTS / DAY", color: "text-pink" },
  { value: "10M+", label: "DAILY ACTIVE USERS", color: "text-snow" },
  { value: "$1M+", label: "ANNUAL CLOUD SAVINGS", color: "text-mint" },
  { value: "IIT Kanpur", label: "B.TECH 2019 · CS MINOR", color: "text-snow" },
];

export default function Metrics() {
  return (
    <section className="mx-auto max-w-page px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((m, i) => (
          <Reveal key={m.label} delay={i * 70} className="h-full">
            <Spotlight className="h-full rounded-[16px] border border-line bg-surface px-8 py-7">
              <div className="flex flex-col gap-1.5">
                <span
                  className={`text-[34px] font-semibold tracking-[-0.02em] sm:text-[38px] ${m.color}`}
                >
                  {m.value}
                </span>
                <span className="font-mono text-[12px] tracking-[0.04em] text-muted">
                  {m.label}
                </span>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
