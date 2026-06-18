const items = [
  { value: "1B+", label: "REQUESTS / DAY", color: "text-pink" },
  { value: "10M+", label: "DAILY ACTIVE USERS", color: "text-snow" },
  { value: "$1M+", label: "ANNUAL CLOUD SAVINGS", color: "text-mint" },
  { value: "IIT-K", label: "B.TECH · CS MINOR", color: "text-snow" },
];

export default function Metrics() {
  return (
    <section className="mx-auto max-w-page px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-2 overflow-hidden rounded-[16px] border border-line bg-surface md:grid-cols-4">
        {items.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col gap-1.5 border-line px-8 py-7 ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < items.length - 1 ? "md:border-r" : ""} ${
              i < 2 ? "border-b md:border-b-0" : ""
            }`}
          >
            <span
              className={`text-[34px] font-semibold tracking-[-0.02em] sm:text-[38px] ${m.color}`}
            >
              {m.value}
            </span>
            <span className="font-mono text-[12px] tracking-[0.04em] text-muted">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
