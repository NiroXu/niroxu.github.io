import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#020617",
          900: "#050816",
          850: "#0b1022",
          800: "#0f172a",
          700: "#111827",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        body: ["Sora", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(129, 140, 248, 0.35)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 50% 20%, rgba(80,120,255,0.25), transparent 35%), linear-gradient(180deg, #050816 0%, #02030a 100%)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        glow: "pulseGlow 8s ease-in-out infinite",
        twinkle: "twinkle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
