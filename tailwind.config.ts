import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // THÊM DÒNG NÀY VÀO:
  plugins: [require("@tailwindcss/typography")],
};
export default config;