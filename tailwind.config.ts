// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0F0F11", // Soft black, easier on eyes than #000
          white: "#F4F4F5", // Off-white
          primary: "#EDF2F7", // Muted interactive background
          accent: "#2563EB", // Vibrant Blue (Trust + Tech)
          accentHover: "#1D4ED8",
          surface: "rgba(255, 255, 255, 0.05)", // Glass effect
        },
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // You can add a subtle noise texture image for premium feel
        'hero-gradient': "radial-gradient(circle at top right, #2563EB20 0%, transparent 40%), radial-gradient(circle at bottom left, #FF008010 0%, transparent 40%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;