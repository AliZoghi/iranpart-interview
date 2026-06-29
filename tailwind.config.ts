import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["payda", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "oklch(52.986% 0.20551 263.33)",
          50: "oklch(87.605% 0.04819 267.18)",
          100: "oklch(83.604% 0.06397 266.3)",
          300: "oklch(67.63% 0.1347 264.98)",
          400: "oklch(59.935% 0.17139 264.46)",
          500: "oklch(52.986% 0.20551 263.33)",
          600: "oklch(44.617% 0.17879 263.23)",
          700: "oklch(35.889% 0.13872 263.41)",
          800: "oklch(26.621% 0.09533 263.86)",
          900: "oklch(16.79% 0.04448 262.56)",
          950: "oklch(10.389% 0.01943 248.35)",
        },
        secondary: {
          50: "oklch(96.04% 0.01881 5.2898)",
          100: "oklch(91.704% 0.04075 6.5835)",
          300: "oklch(76.081% 0.13189 9.4368)",
          400: "oklch(69.615% 0.17698 12.774)",
          500: "oklch(64.503% 0.2154 16.439)",
          600: "oklch(60.002% 0.23794 22.969)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
