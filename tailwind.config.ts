import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS variables (see app/globals.css).
        ink: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface-2) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        line2: "rgb(var(--c-line-2) / <alpha-value>)",
        hair: "rgb(var(--c-hair) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        muted2: "rgb(var(--c-muted-2) / <alpha-value>)",
        ink2: "rgb(var(--c-fg2) / <alpha-value>)",
        snow: "rgb(var(--c-fg) / <alpha-value>)",
        edge: "rgb(var(--c-edge) / <alpha-value>)",
        // Fixed dark color for text/icons sitting on the pink accent.
        onaccent: "#0A0B0E",
        // Accents are theme-independent.
        pink: {
          DEFAULT: "#FF3D81",
          soft: "#FF7AA8",
          mid: "#FF6FA3",
        },
        mint: {
          DEFAULT: "#5EE6C4",
          soft: "#A8D8CC",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1440px",
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: "-20" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        dash: "dash 1s linear infinite",
        pulse2: "pulse2 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
