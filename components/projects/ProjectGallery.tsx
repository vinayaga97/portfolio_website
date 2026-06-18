"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import ProjectCard from "./ProjectCard";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectGallery({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={
                on
                  ? "rounded-full border border-pink/40 bg-pink/10 px-3.5 py-1.5 font-mono text-[12px] tracking-[0.04em] text-pink-soft transition-colors"
                  : "rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[12px] tracking-[0.04em] text-muted transition-colors hover:text-snow"
              }
            >
              {t}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 font-mono text-[13px] text-muted">
          No projects in this filter yet.
        </p>
      ) : null}
    </div>
  );
}
