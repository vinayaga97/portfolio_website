import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Demo from "@/components/projects/Demo";
import TagChip from "@/components/projects/TagChip";
import {
  getAdjacentProjects,
  getProject,
  getProjectSlugs,
  type ProjectMeta,
} from "@/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  try {
    const { meta } = getProject(params.slug);
    return { title: `${meta.title} · Vinay Kumar Agarwal`, description: meta.summary };
  } catch {
    return { title: "Project · Vinay Kumar Agarwal" };
  }
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-[0.06em] text-muted2">
        {label}
      </span>
      <span className="text-[15px] text-snow">{children}</span>
    </div>
  );
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  let data: { meta: ProjectMeta; content: string };
  try {
    data = getProject(params.slug);
  } catch {
    notFound();
  }
  const { meta, content } = data;
  const { prev, next } = getAdjacentProjects(params.slug);
  const isLive = meta.status === "Live";

  return (
    <main className="min-h-screen bg-ink">
      <Nav />
      <article className="mx-auto max-w-page px-6 pb-24 pt-12 sm:px-12 lg:px-20">
        <Link
          href="/projects"
          className="font-mono text-[13px] tracking-[0.04em] text-muted transition-colors hover:text-snow"
        >
          ← Back to projects
        </Link>

        {/* Hero */}
        <div className="mt-8 flex flex-col gap-6">
          <h1 className="max-w-[820px] text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-snow sm:text-[56px]">
            {meta.title}
          </h1>
          <p className="max-w-[640px] text-[18px] leading-[1.55] text-muted">
            {meta.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {meta.demoUrl ? (
              <a
                href={meta.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-[10px] bg-gradient-to-br from-pink to-pink-mid px-5 py-3 text-[14px] font-semibold text-onaccent shadow-[0_8px_30px_rgba(255,61,129,0.35)] transition-transform hover:-translate-y-0.5"
              >
                View demo
              </a>
            ) : null}
            {meta.repoUrl ? (
              <a
                href={meta.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-[10px] border border-line bg-surface px-5 py-3 text-[14px] font-medium text-snow transition-colors hover:border-hair"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        {/* Demo centerpiece */}
        <Reveal className="mt-12">
          <Demo {...(meta.demo ?? { type: "placeholder" })} accent={meta.accent} />
        </Reveal>

        {/* Writeup + meta rail */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="prose-mdx max-w-[680px]">
            <MDXRemote
              source={content}
              components={{ Demo }}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-[16px] border border-line bg-panel p-6 lg:sticky lg:top-8">
            <MetaRow label="STATUS">
              <span className="inline-flex items-center gap-2">
                <span
                  className={
                    isLive
                      ? "h-[7px] w-[7px] rounded-full bg-mint shadow-[0_0_8px_#5EE6C4]"
                      : "h-[7px] w-[7px] rounded-full bg-[#E6B25E]"
                  }
                />
                {meta.status}
              </span>
            </MetaRow>
            {meta.role ? <MetaRow label="ROLE">{meta.role}</MetaRow> : null}
            {meta.stack?.length ? (
              <MetaRow label="STACK">{meta.stack.join(" · ")}</MetaRow>
            ) : null}
            {meta.date ? (
              <MetaRow label="TIMELINE">{meta.date.slice(0, 4)}</MetaRow>
            ) : null}
            {(meta.demoUrl || meta.repoUrl) && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.06em] text-muted2">
                  LINKS
                </span>
                <div className="flex flex-col gap-1">
                  {meta.demoUrl ? (
                    <a href={meta.demoUrl} target="_blank" rel="noreferrer" className="text-[15px] text-pink transition-opacity hover:opacity-80">
                      Live demo ↗
                    </a>
                  ) : null}
                  {meta.repoUrl ? (
                    <a href={meta.repoUrl} target="_blank" rel="noreferrer" className="text-[15px] text-pink transition-opacity hover:opacity-80">
                      Source ↗
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Prev / next */}
        {(prev || next) && (
          <div className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1.5 rounded-[12px] border border-line bg-panel p-5 transition-colors hover:border-hair">
                <span className="font-mono text-[11px] tracking-[0.06em] text-muted2">← PREVIOUS</span>
                <span className="text-[16px] font-medium text-snow">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-1.5 rounded-[12px] border border-line bg-panel p-5 text-right transition-colors hover:border-hair">
                <span className="font-mono text-[11px] tracking-[0.06em] text-muted2">NEXT →</span>
                <span className="text-[16px] font-medium text-snow">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </article>
      <Footer />
    </main>
  );
}
