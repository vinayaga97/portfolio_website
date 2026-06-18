import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0B0E",
        surface: "#121419",
        surface2: "#11151A",
        panel: "#131620",
        line: "#1E222B",
        line2: "#262C38",
        hair: "#243042",
        muted: "#9AA3B2",
        muted2: "#5C6672",
        ink2: "#C7CDD8",
        snow: "#F4F6FA",
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
