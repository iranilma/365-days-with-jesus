import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          ivory: "#FAF6F0",       // Primary background / page tint
          ivoryLight: "#FCFAF6",  // Elevated card background
          blush: "#F0D9D5",       // Delicate highlight / badges
          blushLight: "#F8ECE9",  // Subtle background scrims
          rose: "#C98F8A",        // Primary accent / CTA
          roseDark: "#B37873",    // Pressed / hover state
          taupe: "#A89587",       // Borders / muted text / subheadings
          taupeLight: "#D9D0C8",  // Light dividing lines
          sage: "#A8B09B",        // Growth / answered prayer / calm badge
          sageLight: "#E8EBE3",   // Sage background pill
          cocoa: "#55443F",       // High-contrast primary readable body text
          cocoaLight: "#73605A",  // Secondary text
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-jakarta)", "Inter", "-apple-system", "sans-serif"],
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};

export default config;
