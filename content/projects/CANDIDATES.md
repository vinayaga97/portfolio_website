# Candidate Project Ideas

Backlog of unconventional, deep AI project ideas. Pick one in a fresh thread → it becomes
a full MDX project page (in portfolio voice) + an interactive `Demo.tsx`. This is a `.md`
file, so the project loader (`lib/projects.ts`, globs `.mdx` only) ignores it — it won't
show up as a project card.

Each idea: **black box** (the thing people accept without understanding) / **build** /
**learn** / **demo**. Tags: `[internals|application · difficulty · demo-strength · plotline?]`

---

## A — How LLMs actually work (the mechanics)

### A1. Constrained / grammar-based decoder
`[internals · hard · strong-demo]`
- **Black box:** everyone *prompts* for JSON/SQL and prays, then bolts on retries + regex repair.
- **Build:** mask the logit distribution at each token against a grammar/FSM so malformed output is *impossible*, not just discouraged. JSON-schema first, then a SQL grammar.
- **Learn:** generation is token-by-token sampling over a distribution; logit bias; tokenizer/grammar boundary alignment (a token can straddle a grammar edge).
- **Demo:** side-by-side "prompt-and-pray" breaking vs. yours that literally cannot; show the live token mask.

### A2. Vector index from scratch — HNSW + product quantization
`[internals · hard · strong-demo]`
- **Black box:** pgvector / Pinecone. "Embeddings in, neighbors out."
- **Build:** HNSW graph construction + greedy navigation, then product quantization; measure the recall ↔ latency ↔ memory frontier yourself.
- **Learn:** ANN is *approximate* and the approximation is the entire discipline — why recall drops, why graph layers exist, the memory cost of exactness. Most transferable lesson in the RAG stack.
- **Demo:** animate graph traversal hop-by-hop; a slider trading recall for speed.

### A3. Paged-KV-cache inference server (tiny vLLM)
`[internals · very-hard · strong-demo]`
- **Black box:** "we serve the model behind an endpoint." Why is serving hard?
- **Build:** continuous batching + a paged KV cache (block-allocated attention memory) so requests of different lengths share GPU memory without fragmentation.
- **Learn:** the KV cache (not compute) is the real constraint; memory fragmentation; throughput vs. latency batching tradeoffs. Deepest "core systems" topic in modern serving.
- **Demo:** visualize memory blocks filling/freeing as requests stream; throughput counter. (Needs a GPU to be real.)

### A4. Speculative decoding (lossless speedup)
`[internals · hard · medium-demo]`
- **Black box:** "bigger models are just slower."
- **Build:** a small draft model proposes tokens; the big model verifies in one pass.
- **Learn:** *why it's provably identical* to normal sampling (the rejection-sampling math) + the batching systems.
- **Demo:** draft/verify animation showing accepted vs. rejected tokens.

### A5. Activation steering (control without prompting)
`[internals · medium · strong-demo]`
- **Black box:** behavior is controlled by the prompt.
- **Build:** extract the residual-stream direction for a trait (formal / refusing / confident) from contrastive pairs, then *add that vector at inference* to dial it up/down.
- **Learn:** meaning lives as directions in activation space; you can do arithmetic on it. Gateway to interpretability.
- **Demo:** a slider making the *same* prompt more/less cautious in real time.

### A6. Logit lens (watch a prediction form, layer by layer)
`[internals · medium · strong-demo]`
- **Black box:** the model is one opaque input→output function.
- **Build:** decode every intermediate layer's hidden state through the output head; show the predicted token sharpen (or flip) up the stack.
- **Learn:** computation is *staged* — early layers do syntax, later layers commit to meaning.
- **Demo:** heatmap of "what the model thinks the next token is, at each layer."

### A7. Tiny Mixture-of-Experts, from scratch
`[internals · very-hard · medium-demo]`
- **Black box:** "MoE = bigger but cheaper." How does routing work?
- **Build:** a small transformer with a top-k router; train it, watch experts specialize; add load-balancing loss and show router collapse without it.
- **Learn:** conditional computation, router instability, why frontier models are sparse.
- **Demo:** visualize which expert lights up per token — specialization emerging.

### A8. RoPE + context-length extension
`[internals · hard · medium-demo]`
- **Black box:** "the model has a context window." Why? What breaks past it?
- **Build:** implement rotary positional embeddings, then extend usable context via position interpolation / NTK scaling; measure where coherence collapses.
- **Learn:** how position is injected into attention; why length generalization is hard.
- **Demo:** accuracy vs. sequence length, before/after the extension trick.

### A9. The model's own uncertainty as a hallucination detector
`[internals · medium · strong-demo]`
- **Black box:** "the model is confidently wrong, you can't tell."
- **Build:** read per-token entropy/log-prob (+ a contrastive-decoding signal across layers) to score which spans the model is bluffing on — no external checker.
- **Learn:** confidence is *readable* from the distribution; calibration; fluency ≠ certainty.
- **Demo:** stream an answer with bluffing tokens highlighted red.

### A10. Quantization from scratch (int4) — quality vs. size
`[internals · hard · medium-demo]`
- **Black box:** "we run the 4-bit version." What does it cost you?
- **Build:** post-training quantization, naive first then GPTQ-style error compensation; measure perplexity vs. memory across bit-widths.
- **Learn:** numerics, outlier features (weights that resist quantization), the real "make it fit on the GPU."
- **Demo:** interactive bit-width slider trading size for output quality.

### A11. BPE tokenizer from scratch
`[internals · medium · medium-demo]`
- **Black box:** tokenization is a preprocessing detail.
- **Build:** byte-pair encoding train + encode/decode.
- **Learn:** why models can't spell, count letters, or do arithmetic; why context costs what it does. Small, foundational.
- **Demo:** live tokenizer that exposes why "strawberry" trips the model.

---

## B — Applications (unconventional, core)

### B1. A semantic cache that's actually correct
`[application · medium · medium-demo · plotline]`
- **Black box:** "cache LLM calls by embedding similarity" sounds trivial; it's a correctness minefield.
- **Build:** when is "similar enough" safe to reuse? Threshold calibration, false-hit cost, invalidation.
- **Learn:** similarity ≠ substitutability. Directly relevant to cost at scale.
- **Demo:** show a naive cache returning a wrong-but-similar answer, then yours refusing it.

### B2. A durable, replayable agent runtime
`[application · very-hard · medium-demo]`
- **Black box:** agents are non-deterministic; you can't debug a failed run.
- **Build:** deterministic replay + time-travel debugging — event-sourcing, durable execution (Temporal's model), resuming a crashed run mid-tool-call.
- **Learn:** a real distributed-systems problem disguised as an AI one.
- **Demo:** scrub a run timeline backward/forward; fork from any step.

### B3. RAG faithfulness verifier (citations that are load-bearing)
`[application · medium · medium-demo]`
- **Black box:** retrieval quality = answer correctness. It isn't.
- **Build:** an NLI/entailment check that verifies each generated claim *actually follows from its cited span*; flag unsupported sentences.
- **Learn:** the gap between "has citations" and "citations are provably load-bearing." Good upgrade to a RAG project.
- **Demo:** answer with each sentence green (supported) / red (unsupported by its source).

### B4. A prompt compiler (DSPy-style optimization)
`[application · hard · strong-demo]`
- **Black box:** prompt engineering = humans guessing and tweaking.
- **Build:** express the task as a program + a metric; let a search loop *compile* the prompt/few-shot examples against your data.
- **Learn:** prompts are an optimization target, not an art; forces rigorous metrics.
- **Demo:** "hand-written: 71% → compiled: 89%," with the diff.

### B5. A prompt-injection firewall
`[application · hard · strong-demo · plotline]`
- **Black box:** "we put guardrails on it." Most are trivially bypassed.
- **Build:** detect/neutralize injection inside *retrieved/tool content* — delimiting, provenance tagging, a classifier, constrained gen so untrusted text can't redirect the agent.
- **Learn:** the trust-boundary problem unique to LLMs — data and instructions share one channel. *The* core LLM security problem, barely understood.
- **Demo:** a live "attack the agent" box visitors try to hijack; watch it hold.

### B6. A context "memory hierarchy" for agents
`[application · hard · strong-demo · plotline]`
- **Black box:** "stuff everything in context" / "use a vector store for memory."
- **Build:** treat the context window like RAM with a budget — eviction (recency vs. semantic importance), summarization as *spilling to disk*, promotion of hot facts. A real memory manager for an agent.
- **Learn:** caching theory applied to LLMs; why naive RAG memory degrades; token economics. Ties to long-running user-engagement memory.
- **Demo:** visualize what's in "fast" vs. "spilled" memory as a conversation grows.

### B7. Adversarial jailbreak fuzzer / red-team harness
`[application · very-hard · medium-demo]`
- **Black box:** "the model is safe." Says who?
- **Build:** an automated attacker searching for prompts that break a target's guardrails (mutation-based first; gradient/GCG-style for the hard version) + a coverage report.
- **Learn:** the optimization view of safety; why alignment is brittle; attack/defense co-evolution.
- **Demo:** leaderboard of discovered attacks and which defenses block them.

### B8. A self-correcting, schema-grounded SQL agent
`[application · hard · strong-demo · plotline]`
- **Black box:** "text-to-SQL works now." It writes plausible, wrong queries.
- **Build:** constrain generation to the real DB grammar + schema, *execute* in a sandbox, feed errors/empty-results back, loop until valid and grounded. (ClickHouse/Mongo handy.)
- **Learn:** closing the loop with real execution feedback; grounding generation in a live system. Demo vs. tool.
- **Demo:** English question → draft → run → self-correct → verified rows.

### B9. A learned model router / cascade (cost-quality frontier)
`[application · hard · strong-demo · plotline]`
- **Black box:** "we use the big model for everything."
- **Build:** route each query to the cheapest model likely to succeed; escalate only on low confidence; trained on your own success labels.
- **Learn:** real LLM-product economics; confidence calibration; building the Pareto frontier yourself.
- **Demo:** cost vs. quality chart showing your router beating any single model.

### B10. A streaming partial-JSON parser
`[application · medium · medium-demo]`
- **Black box:** JSON parsing is solved.
- **Build:** parse and repair incomplete JSON as it streams token-by-token.
- **Learn:** deceptively hard; used in every agent UI. Small but real.
- **Demo:** render a structured object filling in live as tokens arrive.

---

## Picks

- **Best "nobody has this" demo:** A5 activation steering · A6 logit lens · A2 HNSW
- **Best tie to Plotline work:** B6 memory hierarchy · B5 injection firewall · B9 model router · B8 SQL agent
- **Hardest / deepest growth:** A3 paged KV cache · A7 MoE from scratch · B7 jailbreak fuzzer · B2 durable agent runtime
- **Suggested first move:** one Tier-1 deep build (A2 HNSW) + one upgrade to an existing project (B3 faithfulness verifier on the RAG page).
