import Link from "next/link";
import Preview from "./Preview";
import TagChip from "./TagChip";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  const isLive = project.status === "Live";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-hair"
    >
      <div className="relative aspect-[16/9] border-b border-line">
        <Preview accent={project.accent} label={project.demo?.label} />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line bg-ink/70 px-2.5 py-1 backdrop-blur-sm">
          <span
            className={
              isLive
                ? "h-[6px] w-[6px] rounded-full bg-mint shadow-[0_0_8px_#5EE6C4]"
                : "h-[6px] w-[6px] rounded-full bg-[#E6B25E]"
            }
          />
          <span className="font-mono text-[11px] tracking-[0.04em] text-snow">
            {project.status}
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-snow">
          {project.title}
        </h3>
        <p className="flex-1 text-[14px] leading-[1.6] text-muted">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>
      </div>
    </Link>
  );
}
