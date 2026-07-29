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
        darkBg: "#0B0F19",       // Deep aviation dashboard dark
        cardBg: "#151B2B",       // Slightly lighter for module cards
        primaryAccent: "#8B5CF6",// The 'Hero' Purple
        neonBlue: "#3B82F6",     // Action buttons / Progress bars
        successGreen: "#10B981", // Completed modules
        warningRed: "#EF4444",   // Deadlines / Late submissions
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, futuristic readability
      },
    },
  },
  plugins: [],
};
export default config;