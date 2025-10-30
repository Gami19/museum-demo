import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          500: '#2c5530', // 深緑
          900: '#1a3320',
        },
        accent: {
          400: '#fbbf24',
          500: '#d4af37', // 金色
        }
      },
      fontFamily: {
        'serif': ['Noto Serif JP', 'serif'],
      }
    },
  },
  plugins: [],
}
export default config