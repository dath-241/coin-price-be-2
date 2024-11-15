import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#ffffff",
          200: "#fcfcfc",
          300: "#f5f5f5",
          400: "#f0f0f0",
          500: "#d9d9d9",
          600: "#bfbfbf",
          700: "#8c8c8c",
          800: "#595959",
          900: "#454545",
          1000: "#262626",
          1100: "#1f1f1f",
          1200: "#141414",
          1300: "#000000"
        },
        primary: {
          50: "#e6f4ff",
          100: "#b0deff",
          200: "#8aceff",
          300: "#54b7ff",
          400: "#33a9ff",
          500: "#0094ff",
          600: "#0087e8",
          700: "#0069b5",
          800: "#00518c",
          900: "#003e6b"
        },
        success: {
          50: "#ecfbf2",
          100: "#c3f1d6",
          200: "#a6ebc2",
          300: "#7ee2a6",
          400: "#65dc95",
          500: "#3ed37a",
          600: "#38c06f",
          700: "#2c9657",
          800: "#227443",
          900: "#1a5933"
        },
        info: {
          50: "#eaf3f8",
          100: "#bed8e9",
          200: "#9ec6de",
          300: "#72abcf",
          400: "#579bc5",
          500: "#2d82b7",
          600: "#2976a7",
          700: "#205c82",
          800: "#194865",
          900: "#13374d"
        },
        warning: {
          50: "#fff9e6",
          100: "#ffebb0",
          200: "#ffe28a",
          300: "#ffd454",
          400: "#ffcc33",
          500: "#ffbf00",
          600: "#e8ae00",
          700: "#b58800",
          800: "#8c6900",
          900: "#6b5000"
        },
        error: {
          50: "#ffe9e6",
          100: "#ffbcb0",
          200: "#ff9b8a",
          300: "#ff6e54",
          400: "#ff5133",
          500: "#ff2600",
          600: "#e82300",
          700: "#b51b00",
          800: "#8c1500",
          900: "#6b1000"
        }
      },
    },
  },
  plugins: [nextui()],
};
export default config;
