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
        primary: {
          50: "#E6F4FF",
          100: "#B0DEFF",
          200: "#8ACEFF",
          300: "#54B7FF",
          400: "#33A9FF",
          500: "#0094FF",
          600: "#0087E8",
          700: "#0069B5",
          800: "#00518C",
          900: "#003E6B",
        },
        neutral: {
          1: "#FFFFFF",
          2: "#FCFCFC",
          3: "#F5F5F5",
          4: "#F0F0F0",
          5: "#D9D9D9",
          6: "#BFBFBF",
          7: "#8C8C8C",
          8: "#595959",
          9: "#454545",
          10: "#262626",
          11: "#1F1F1F",
          12: "#141414",
          13: "#000000",
        },
      },
    },
    space: {},
  },
  plugins: [],
};

export default config;
