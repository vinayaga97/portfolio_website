# vinayagarwal.com

Personal site for Vinay Kumar Agarwal — built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Dark, AI-native design with a live agent-mesh visual.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build && npm start
```

## Structure

- `app/layout.tsx` — fonts (Geist / Geist Mono via `next/font`) and metadata
- `app/page.tsx` — page composition
- `components/` — one file per section:
  - `Nav`, `Hero` (+ `AgentMesh`), `Metrics`, `About`, `Capabilities`, `Stack`, `Work`, `Footer`

## Customize

- **Photo:** in `components/About.tsx`, drop your image into `public/` and replace the placeholder block with an `<img src="/vinay.jpg" className="absolute inset-0 h-full w-full object-cover" />`.
- **Colors:** palette lives in `tailwind.config.ts` (`pink`, `mint`, `ink`, etc.).
- **Agent mesh:** node labels and edges are in `components/AgentMesh.tsx`.
- **Work / Stack:** edit the arrays at the top of `components/Work.tsx` and `components/Stack.tsx`.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config. Point `vinayagarwal.com` at the Vercel project in domain settings.
