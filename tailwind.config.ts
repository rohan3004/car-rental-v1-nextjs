import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        space: ['var(--font-space)', 'sans-serif'], // Keep existing if used
      },
      colors: {
        brand: {
          obsidian: "#050505", // Deepest black
          charcoal: "#0a0a0a", // Card background
          surface:  "#121212", // Secondary surface
          gold:     "#fbbf24", // Amber-400 (Primary Accent)
          goldDim:  "#d97706", // Amber-600
          silver:   "#d4d4d8", // Zinc-300 (Text)
          muted:    "#71717a", // Zinc-500 (Subtext)
        },
      },
      backgroundImage: {
        'luxury-gradient': "radial-gradient(circle at top right, rgba(251, 191, 36, 0.05) 0%, transparent 40%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;