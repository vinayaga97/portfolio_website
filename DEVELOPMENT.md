# Development

How to run, build, customize, and deploy this site.

## Prerequisites

- Node.js 18.17+ (LTS recommended)
- npm (or pnpm/yarn — examples use npm)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. The dev server hot-reloads on save.

## Production build

```bash
npm run build   # compiles and type-checks
npm start       # serves the production build on :3000
```

## Customization

**Profile photo** — replace `public/vinay.jpg` (keep the filename, or update the `src` in `components/About.tsx`). The image renders as a centered circular portrait; a square or circular source crop works best.

**Colors** — the palette is defined in `tailwind.config.ts` under `theme.extend.colors` (`ink`, `surface`, `pink`, `mint`, etc.). Change them in one place to retheme the whole site.

**Fonts** — Geist / Geist Mono are loaded in `app/layout.tsx` via the `geist` package and exposed as the Tailwind `font-sans` / `font-mono` families.

**Agent mesh** — node labels, positions, and edges live in `components/AgentMesh.tsx`. The dashed-flow and pulse animations are defined as `keyframes` in `tailwind.config.ts`.

**Work & Stack** — edit the `roles` array in `components/Work.tsx` and the `stack` array in `components/Stack.tsx`. In `Stack.tsx`, items flagged `ai: true` render in the accent color and lead the list.

**Metrics & copy** — headline stats are in `components/Metrics.tsx`; hero/about copy is inline in their respective components.

## Deploy

This site is hosted on Vercel.

1. Push to GitHub.
2. Import the repo at [vercel.com](https://vercel.com) — Next.js is auto-detected, no config needed.
3. Add the custom domain under **Settings → Domains** and point DNS at Vercel.

Every push to the default branch triggers an automatic redeploy.
