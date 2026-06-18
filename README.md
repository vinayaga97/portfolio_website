# Vinay Kumar Agarwal — Portfolio

The source for my personal site, **[vinayagarwal.com](https://vinayagarwal.com)**.

I'm an engineering leader working at the intersection of **AI infrastructure, distributed systems, and platform engineering** — currently leading platform engineering for AI and agentic systems at Plotline (1B+ requests/day), previously at Allen Digital, Inshorts, and Oracle. IIT Kanpur.

This repo is a single-page, dark, AI-native portfolio with a live "agent-mesh" system visual as its centerpiece.

## Highlights

- **Agent-mesh hero** — an animated topology (gateway → orchestrator → agents → services → observability) that reflects what I actually build, not a generic illustration.
- **Proof-first layout** — headline metrics (1B+ req/day, 10M+ DAU, $1M+ saved) sit above the fold.
- **Career timeline** — roles linked on a connected rail rather than a flat list.
- **Considered design system** — a single accent palette, Geist type, and consistent spacing; fully responsive.

## Tech

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Geist / Geist Mono (`geist` package) |
| Hosting | Vercel |

## Structure

```
app/
  layout.tsx      # fonts + metadata
  page.tsx        # section composition
  globals.css
components/        # one file per section
  Nav · Hero · AgentMesh · Metrics · About · Capabilities · Stack · Work · Footer
public/
  vinay.jpg       # profile photo
```

## Running & contributing

Setup, local development, build, and customization steps live in **[DEVELOPMENT.md](./DEVELOPMENT.md)**.

## License

Code is available under the MIT License. The content, copy, and personal photo are © Vinay Kumar Agarwal and not covered by that license.
