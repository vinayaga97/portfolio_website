/* eslint-disable @next/next/no-img-element */

/* "Worked at" proof: real company logos in circular badges, overlapped into a
   stack at rest and fanning apart on hover (the whole group spreads; each badge
   lifts and reveals its name). White badges so the colorful marks read crisply
   in both themes. Logos live in /public/logos — swap files (same names) to
   update. */
const companies = [
  { name: "Plotline", src: "/logos/plotline.png", href: "https://plotline.so" },
  { name: "ALLEN", src: "/logos/allen.png", href: "https://allen.in" },
  { name: "Inshorts", src: "/logos/inshorts.png", href: "https://inshorts.com" },
  { name: "Oracle", src: "/logos/oracle.png", href: "https://oracle.com" },
  { name: "IIT Kanpur", src: "/logos/iit-kanpur.svg", href: "https://iitk.ac.in" },
];

export default function LogoStack() {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[11px] tracking-[0.14em] text-muted2">
        WORKED AT
      </span>
      <div className="group/stack flex items-center">
        {companies.map((c, i) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            aria-label={c.name}
            className={`group/badge relative transition-[margin] duration-300 ease-out hover:z-10 ${
              i === 0 ? "" : "-ml-3.5 group-hover/stack:ml-1.5"
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-line2 shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out group-hover/badge:-translate-y-1">
              <img
                src={c.src}
                alt={c.name}
                className="h-7 w-7 rounded-full object-contain"
              />
            </span>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-snow opacity-0 transition-opacity duration-200 group-hover/badge:opacity-100">
              {c.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
