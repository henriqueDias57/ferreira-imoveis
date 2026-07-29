import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#0F172A", // Deep Slate Graphite
        darkCanvas: "#090D16",
        darkCard: "#1E293B",
        darkHover: "#334155",
        darkBorder: "#334155",
        brandRed: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626", // Main Brand Red Accent
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        whatsapp: "#25D366",
        whatsappHover: "#1EBE5B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
