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
    themes: [
      {
        'type-c': {
           'primary' : '#f24a4a',
           'primary-focus' : '#e1194e',
           'primary-content' : '#ffffff',

           'secondary' : '#277e01',
           'secondary-focus' : '#10b40e',
           'secondary-content' : '#ebebeb',

           'accent' : '#8e1adb',
           'accent-focus' : '#9241c8',
           'accent-content' : '#d6d6d6',

           'neutral' : '#79026f',
           'neutral-focus' : '#a72020',
           'neutral-content' : '#ffffff',

           'base-100' : '#171717',
           'base-200' : '#1f1f1f',
           'base-300' : '#363636',
           'base-content' : '#ffffff',

           'info' : '#2fc4e9',
           'success' : '#0daf46',
           'warning' : '#f56d24',
           'error' : '#a50326',

          '--rounded-box': '0',
          '--rounded-btn': '0',
          '--rounded-badge': '0',

          '--animation-btn': '',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '0',
        },
      },
    ],
  },
};
export default config;
