import type { Config } from "tailwindcss";
import daisyui from 'daisyui'
import { ThemeConfig } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    typography: (theme: ThemeConfig) => ({
      DEFAULT: {
        css: {
          // Other custom styles as needed
        },
      },
    }),
  },
  },
  plugins: [require("@tailwindcss/typography"), daisyui],
  daisyui: {
    themes: ["cyberpunk"]
  },
};
export default config;
