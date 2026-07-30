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
    keyframes: {
        floatDiagonal: {
          '0%': { top: '10%', left: '10%', transform: 'rotate(-10deg)' },
          '25%': { top: '80%', left: '50%', transform: 'rotate(10deg)' },
          '50%': { top: '30%', left: '80%', transform: 'rotate(-5deg)' },
          '75%': { top: '70%', left: '20%', transform: 'rotate(5deg)' },
          '100%': { top: '10%', left: '10%', transform: 'rotate(-10deg)' },
        }
      },
      animation: {
        'diagonal-float': 'floatDiagonal 20s linear infinite',
      }
  },
  plugins: [],
};
export default config;