import {
  SOURCES,
  buildSystemPrompt,
  getSourceById,
  toSourceRef,
  type SourceRef,
} from "@/lib/ask/corpus";

// Reads MDX from disk (via the corpus) and may call the Anthropic API — must run on Node.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CLAUDE_MODEL = "claude-opus-4-8";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

type ChatTurn = { role: "user" | "assistant"; content: string };

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

/** Resolve the [n] markers actually used in the answer to client-safe source refs. */
function citedSources(text: string): SourceRef[] {
  const nums = new Set<number>();
  for (const m of text.matchAll(/\[(\d+)\]/g)) nums.add(Number(m[1]));
  return SOURCES.filter((s) => nums.has(s.n))
    .sort((a, b) => a.n - b.n)
    .map(toSourceRef);
}

export async function POST(req: Request) {
  let question = "";
  let history: ChatTurn[] = [];
  try {
    const body = await req.json();
    question = String(body?.question ?? "").slice(0, 500).trim();
    if (Array.isArray(body?.history)) history = body.history.slice(-6);
  } catch {
    /* fall through to the empty-question guard */
  }

  if (!question) {
    return new Response(JSON.stringify({ error: "A question is required." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) =>
        controller.enqueue(encoder.encode(sse(event, data)));
      const onToken = (t: string) => send("token", { text: t });

      try {
        // Provider auto-selection: Anthropic → OpenAI → mock (zero-config).
        const answer = anthropicKey
          ? await streamFromClaude(anthropicKey, question, history, onToken)
          : openaiKey
            ? await streamFromOpenAI(openaiKey, question, history, onToken)
            : await streamMock(question, onToken);

        send("sources", citedSources(answer));
        send("done", {});
      } catch (err) {
        console.error("ask route error:", err);
        send("error", {
          message: "Something went wrong reaching the assistant. Please try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    },
  });
}

/** Real path: stream tokens from Claude, grounded in the corpus. */
async function streamFromClaude(
  apiKey: string,
  question: string,
  history: ChatTurn[],
  onToken: (t: string) => void,
): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey });

  const messages = [
    ...history.map((t) => ({ role: t.role, content: t.content })),
    { role: "user" as const, content: question },
  ];

  let full = "";
  const mstream = client.messages.stream({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    output_config: { effort: "low" },
    // Corpus is stable across requests — cache the system prefix.
    system: [
      { type: "text", text: buildSystemPrompt(), cache_control: { type: "ephemeral" } },
    ],
    messages,
  });

  for await (const event of mstream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      full += event.delta.text;
      onToken(event.delta.text);
    }
  }
  return full;
}

/** OpenAI path: stream tokens from a GPT model, grounded in the same corpus. */
async function streamFromOpenAI(
  apiKey: string,
  question: string,
  history: ChatTurn[],
  onToken: (t: string) => void,
): Promise<string> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });

  const messages = [
    { role: "system" as const, content: buildSystemPrompt() },
    ...history.map((t) => ({ role: t.role, content: t.content })),
    { role: "user" as const, content: question },
  ];

  let full = "";
  const stream = await client.chat.completions.create({
    model: OPENAI_MODEL,
    messages,
    temperature: 0.3,
    max_tokens: 800,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      full += delta;
      onToken(delta);
    }
  }
  return full;
}

/** No-key fallback: a realistic grounded answer, streamed word-by-word. */
async function streamMock(question: string, onToken: (t: string) => void): Promise<string> {
  const q = question.toLowerCase();

  const pick = (...ids: string[]) =>
    ids.map((id) => getSourceById(id)?.n).filter((n): n is number => Boolean(n));

  let answer: string;
  if (/(scale|dau|mau|cost|cloud|save|saving|biggest|infra)/.test(q)) {
    const [inshorts, plotline] = pick("work-inshorts", "work-plotline");
    answer =
      `At Inshorts he scaled a hyperlocal video platform to 10M+ DAU / 50M+ MAU and cut cloud costs about 35% (~$1M+/year) across 30+ GKE services [${inshorts}]. ` +
      `Today, as Engineering Leader at Plotline, he runs platform engineering for agentic systems serving 1B+ requests a day [${plotline}].`;
  } else if (/(agent|mesh|orchestrat|pipeline)/.test(q)) {
    const [mesh] = pick("project-agent-mesh-orchestrator");
    answer =
      `The Agent Mesh Orchestrator is a control plane for multi-agent pipelines: each agent step is a first-class, observable unit that emits structured spans, feeds results back to the planner, and retries with bounded backoff, with Kafka backpressure keeping a slow agent from collapsing the mesh [${mesh ?? 1}]. ` +
      `In production it handles 1B+ requests/day with p99 orchestration overhead under 50ms per hop [${mesh ?? 1}].`;
  } else if (/(pm|product|0.?1|0 to 1|fit|hire|role)/.test(q)) {
    const [profile, plotline, inshorts] = pick("profile", "work-plotline", "work-inshorts");
    answer =
      `Vinay's background is engineering leadership at the intersection of AI infrastructure and distributed systems [${profile}]. ` +
      `He's led 0→1 platform work — standing up agentic systems at Plotline [${plotline}] and scaling a product to 10M+ DAU at Inshorts [${inshorts}] — so he pairs product-shaped ambiguity with the ability to actually ship the system underneath it.`;
  } else {
    const [profile, plotline] = pick("profile", "work-plotline");
    answer =
      `Vinay is an engineering leader focused on AI infrastructure, distributed systems, and developer productivity, with 7 years building platforms that stay fast at scale [${profile}]. ` +
      `He currently leads platform engineering for AI and agentic systems at Plotline, serving 1B+ requests a day [${plotline}].`;
  }

  // Stream word-by-word so the prototype feels like a real token stream.
  const parts = answer.match(/\S+\s*/g) ?? [answer];
  for (const part of parts) {
    onToken(part);
    await new Promise((r) => setTimeout(r, 18));
  }
  return answer;
}
