import { getProject, getProjectSlugs } from "@/lib/projects";

/**
 * The grounding corpus for the "Ask Vinay" feature.
 *
 * Every source is numbered. The model is told to cite with [n] markers that map
 * 1:1 to these numbers, so the UI can resolve a citation back to a real, linkable
 * source. Content here mirrors what's on the site (bio, metrics, roles, stack) plus
 * the project MDX — this is the ONLY material the model may answer from.
 */

export type Source = {
  /** Stable id, used by the no-key mock to reference a source without hardcoding numbers. */
  id: string;
  /** 1-based citation number — assigned in registry order. */
  n: number;
  /** Short mono label shown on the citation chip / source card. */
  label: string;
  /** Where the card links on the real site. */
  href: string;
  /** Grounding text the model reads. Never sent to the client. */
  content: string;
};

type SeedSource = Omit<Source, "n">;

const STATIC_SOURCES: SeedSource[] = [
  {
    id: "profile",
    label: "profile/about.md",
    href: "/#about",
    content:
      "Vinay Kumar Agarwal is an engineering leader working at the intersection of AI infrastructure, distributed systems, and developer productivity — building platforms that stay fast and reliable at massive scale. Over 7 years (since 2019) he has built event-driven architectures, real-time systems, and AI/GenAI workflows, with a throughline from scaling backend at Inshorts to shipping GenAI platforms and now leading platform engineering for agentic systems at Plotline. Based in Bengaluru, India. Education: B.Tech in Mechanical Engineering & Computer Science from IIT Kanpur (2015–2019). Focus: AI Infra · Platforms.",
  },
  {
    id: "metrics",
    label: "profile/metrics.md",
    href: "/#about",
    content:
      "Headline metrics across Vinay's career: systems serving 1B+ requests/day (p95 latency under 100ms); reached 10M+ daily active users / 50M+ monthly active users; drove $1M+ in annual cloud savings (~35% reduction); degree from IIT Kanpur.",
  },
  {
    id: "work-plotline",
    label: "work/plotline.md",
    href: "/#work",
    content:
      "Engineering Lead at Plotline (Sep 2025 – Present, current role), a no-code in-app engagement platform. Leads 8 engineers on a system handling 1B+ requests/day with p95 latency under 100ms. Built 4 production agentic AI systems in Python — a support agent (tool use, memory, structured outputs; 90% first-response accuracy), a Slack debugging agent (auto-triage, root-cause analysis, draft PRs), a query agent, and an infra alert agent — each with eval pipelines measuring accuracy, coverage, and fallback rates. Designed a RAG pipeline for event-based user segmentation (context-aware retrieval over behavioral event schemas with LLM-generated campaign targeting). Shipped AI campaign creation using prompt chaining and structured output validation. Built a production MCP server exposing Plotline's platform to customer engineering teams (read access across campaigns, segments, and analytics; write access for campaign and segment creation via tool-callable APIs). Scaled to 9,400+ campaigns across 71 enterprise apps; expanded off-app channels (Push, Email, SMS, RCS, WhatsApp) in 3 months; reduced AWS costs 25% and introduced org-wide observability (OpenTelemetry, Prometheus, Grafana). Stack: Python, Agentic AI, RAG, MCP, Go, Kafka, GKE/AWS.",
  },
  {
    id: "work-allen",
    label: "work/allen-digital.md",
    href: "/#work",
    content:
      "Senior Software Engineer at Allen Digital (Sep 2024 – Sep 2025). Architected an org-wide hybrid search platform (Go + Python) on OpenSearch, combining KNN vector search (BGE-M3 embeddings, 8k-token context) with BM25 lexical search; NER-based query enrichment extracted syllabus metadata (topic, subtopic, subject) for contextual query expansion; an LLM reranking layer (OpenAI, Gemini) verified results; a Kafka-driven indexing pipeline covered 4 content types (Q&A, question bank, theory, multimodal/OCR). Led the Doubts Charter (web + app) with a 10-member team, delivering a national doubt-solving platform that cut turnaround time from 12+ hours to 30 minutes at scale. Designed a declarative integration-testing framework with templated code generation that cut SLT development time by 90%. Stack: Go, Python, OpenSearch, Kafka, RAG, VectorDB, LLM Infra, AWS.",
  },
  {
    id: "work-cookiee",
    label: "work/cookiee.md",
    href: "/#work",
    content:
      "Co-Founder & Tech Lead at Cookiee App (Mar 2023 – Aug 2024). Led a 5-member cross-functional team to launch two consumer apps from zero, growing to 3,000+ organic users with 30% weekly retention. Built a real-time backend in Go with WebSockets, MongoDB, Redis, Kafka, and FCM; deployed on GCP (GKE, Cloud Run, Cloud CDN); built a GenAI-powered search engine for contextual user discovery. Stack: Go, WebSockets, MongoDB, Redis, Kafka, GCP.",
  },
  {
    id: "work-inshorts",
    label: "work/inshorts.md",
    href: "/#work",
    content:
      "Senior Software Engineer at Inshorts Group (PublicApp) (Sep 2020 – Dec 2023). Scaled backend systems for a hyperlocal video news platform serving 10M+ DAU and 50M+ MAU. Led GenAI initiatives in Python: live video summaries, NER-based content tagging, duplicate detection via video-frame embeddings, and automated creator-behavior flagging. Built an in-house HLS conversion and streaming pipeline (FFmpeg); shipped WebRTC live streaming and a native ads pipeline. Owned 30+ services on GKE and reduced annual cloud spend 35%, saving $1M+. Stack: Go, Python, GKE, Kafka, FFmpeg, Video.",
  },
  {
    id: "work-oracle",
    label: "work/oracle.md",
    href: "/#work",
    content:
      "Software Engineer at Oracle (Jul 2019 – Aug 2020). Built and optimized a supply chain planning engine in Java, improving production query load times by 350%. Stack: Java, SQL, PL/SQL.",
  },
  {
    id: "stack",
    label: "profile/stack.md",
    href: "/#stack",
    content:
      "Languages: Python (AI/data pipelines, FastAPI, LangChain), Go (25k+ lines, primary backend), Java, C/C++, SQL. AI/ML: Agentic AI, RAG, Context Engineering, Prompt Engineering, LangChain, LlamaIndex, LangSmith, Vector Search. Infrastructure: Distributed Systems, Microservices, AWS, GCP, Docker, Kubernetes, Kafka, OpenSearch, MongoDB, PostgreSQL, Redis, BigQuery, Terraform, CI/CD, Prometheus, Grafana, Datadog, OpenTelemetry.",
  },
  {
    id: "resume",
    label: "resume.pdf",
    href: "/resume.pdf",
    content:
      "Vinay's full résumé can be downloaded at /resume.pdf (link to it with that exact path). Career spans Oracle (2019–2020), Inshorts / PublicApp (2020–2023), Cookiee (2023–2024), Allen Digital (2024–2025), and Plotline (2025–present). Education: B.Tech in Mechanical Engineering & Computer Science, IIT Kanpur (2015–2019). Contact: vka0797@gmail.com · https://github.com/vinayaga97 · https://linkedin.com/in/vinay-kumar-agarwal.",
  },
];

function buildRegistry(): Source[] {
  const projectSeeds: SeedSource[] = getProjectSlugs().map((slug) => {
    const { meta, content } = getProject(slug);
    const body = content.replace(/```[\s\S]*?```/g, "").replace(/\s+/g, " ").trim();
    return {
      id: `project-${slug}`,
      label: `projects/${slug}.mdx`,
      href: `/projects/${slug}`,
      content:
        `Project: ${meta.title}. Status: ${meta.status}. Role: ${meta.role ?? "—"}. ` +
        `Stack: ${(meta.stack ?? []).join(", ")}. Summary: ${meta.summary} ${body}`,
    };
  });

  return [...STATIC_SOURCES, ...projectSeeds].map((s, i) => ({ ...s, n: i + 1 }));
}

/** The numbered source registry, built once per server process. */
export const SOURCES: Source[] = buildRegistry();

export function getSourceById(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

/** Client-safe view of a source (no grounding content). */
export type SourceRef = Pick<Source, "n" | "label" | "href">;

export function toSourceRef({ n, label, href }: Source): SourceRef {
  return { n, label, href };
}

/** Suggested starter questions for the empty state. */
export const SUGGESTED = [
  "What did he build at massive scale?",
  "Walk me through the agent-mesh architecture",
  "Is he a fit for a 0→1 PM role?",
];

export function buildSystemPrompt(): string {
  const sourceBlock = SOURCES.map(
    (s) => `[${s.n}] (${s.label})\n${s.content}`,
  ).join("\n\n");

  return `You are an assistant embedded on Vinay Kumar Agarwal's personal portfolio site. Visitors ask questions about Vinay and his work; you answer them.

Rules:
- Answer ONLY using the numbered sources below. Never invent facts, numbers, employers, dates, or projects that are not in the sources.
- Cite every factual claim with bracketed source numbers like [1] or [2], placed at the end of the sentence the source supports. Only cite numbers that exist in the list.
- If the sources do not contain enough to answer, say so plainly — e.g. "I can only answer from Vinay's work, and that's not something it covers." Do not cite anything in that case.
- Refer to Vinay in the third person ("Vinay", "he"). Be concise and concrete — prefer specifics (numbers, systems, roles) over adjectives. Aim for 2–4 sentences; go longer only when the question genuinely needs the detail.
- Use light Markdown for readability: **bold** for the most important terms, numbers, or company names, and the occasional *italic* for emphasis. Use a short bullet list (lines starting with "- ") only when the answer is genuinely an enumeration of items.
- Render every link as Markdown — [label](url) — and emails as the plain address (e.g. name@example.com). Never drop a raw URL into a sentence without making it a Markdown link. Use only links/emails that appear in the sources.
- For links to pages on this site (such as the résumé), use the relative path exactly as it appears in the sources, e.g. [résumé](/resume.pdf). Never prepend a domain or "www" to an on-site path.
- No headings (#), no tables, no emoji.

Sources:
${sourceBlock}`;
}
