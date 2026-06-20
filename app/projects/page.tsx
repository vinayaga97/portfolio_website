import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects · Vinay Kumar Agarwal",
  description:
    "Demos and writeups of AI and agentic systems — orchestration, RAG, evals, and platform tooling.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-ink">
      <Nav />
      <section className="mx-auto max-w-page px-6 pb-24 pt-16 sm:px-12 lg:px-20">
        <span className="font-mono text-[13px] tracking-[0.08em] text-muted">
          PROJECTS · AI &amp; AGENTIC SYSTEMS
        </span>
        <h1 className="mt-5 max-w-[760px] text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-snow sm:text-[52px]">
          Things I&apos;ve built with{" "}
          <span className="bg-gradient-to-r from-pink to-[#FF9CC2] bg-clip-text text-transparent">
            AI
          </span>
          .
        </h1>
        <p className="mt-5 max-w-[580px] text-[17px] leading-[1.6] text-muted">
          A working gallery of agent systems, retrieval pipelines, and developer
          tooling. Each one ships with a live demo and a short writeup on the
          problem, the approach, and what it moved.
        </p>

        <div className="mt-12">
          <ProjectGallery projects={projects} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
