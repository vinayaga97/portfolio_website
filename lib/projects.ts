import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type DemoSpec = {
  type?: "iframe" | "video" | "image" | "placeholder";
  src?: string;
  poster?: string;
  label?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  status: "Live" | "WIP";
  date: string;
  role?: string;
  stack?: string[];
  demoUrl?: string;
  repoUrl?: string;
  accent?: "pink" | "mint";
  featured?: boolean;
  demo?: DemoSpec;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readProject(slug: string): { meta: ProjectMeta; content: string } {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const meta: ProjectMeta = {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    status: data.status === "WIP" ? "WIP" : "Live",
    date: data.date ?? "",
    role: data.role,
    stack: data.stack,
    demoUrl: data.demoUrl,
    repoUrl: data.repoUrl,
    accent: data.accent === "mint" ? "mint" : "pink",
    featured: Boolean(data.featured),
    demo: data.demo,
  };
  return { meta, content };
}

/** All projects, featured first, then newest by date. */
export function getAllProjects(): ProjectMeta[] {
  return readSlugs()
    .map((slug) => readProject(slug).meta)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.date ?? "").localeCompare(a.date ?? "");
    });
}

export function getProjectSlugs(): string[] {
  return readSlugs();
}

export function getProject(slug: string): { meta: ProjectMeta; content: string } {
  return readProject(slug);
}

/** Previous/next for footer navigation, following the sorted order. */
export function getAdjacentProjects(slug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}
