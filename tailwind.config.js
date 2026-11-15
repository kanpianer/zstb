/** @type {import('tailwindcss').Config} */
// Colors are driven by CSS variables (space-separated RGB channels) defined in
// src/index.css so that the light / dark themes can swap palettes at runtime.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: v('surface'),
        paper: {
          50: v('paper-50'),
          100: v('paper-100'),
          200: v('paper-200'),
          300: v('paper-300'),
          400: v('paper-400'),
          ruled: v('paper-ruled'),
          margin: v('paper-margin')
        },
        pencil: {
          DEFAULT: v('pencil'),
          dark: v('pencil-dark'),
          light: v('pencil-light'),
          faint: v('pencil-faint'),
          eraser: v('pencil-eraser'),
          graphite: v('pencil-graphite'),
          accent: v('pencil-accent'),
          gold: v('pencil-gold')
        },
        blue: {
          50: v('blue-50'), 100: v('blue-100'), 200: v('blue-200'), 300: v('blue-300'),
          600: v('blue-600'), 700: v('blue-700'), 800: v('blue-800'), 900: v('blue-900'),
        },
        amber: {
          50: v('amber-50'), 100: v('amber-100'), 200: v('amber-200'), 300: v('amber-300'), 400: v('amber-400'),
          600: v('amber-600'), 700: v('amber-700'), 800: v('amber-800'), 900: v('amber-900'), 950: v('amber-950'),
        },
        emerald: {
          100: v('emerald-100'), 400: v('emerald-400'), 700: v('emerald-700'), 900: v('emerald-900'),
        },
        red: {
          700: v('red-700'),
        },
      },
      fontFamily: {
        title: ['"LXGW WenKai Mono TC"', '"LXGW WenKai"', 'cursive', 'serif'],
        serif: ['"LXGW WenKai Mono TC"', '"LXGW WenKai"', 'serif'],
        sans: ['"LXGW WenKai"', '"霞鹜文楷"', '"LXGWWenKai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        body: ['"LXGW WenKai"', '"霞鹜文楷"', '"LXGWWenKai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sketch: ['"LXGW WenKai"', '"霞鹜文楷"', '"LXGWWenKai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"LXGW WenKai Mono"', 'monospace']
      },
      boxShadow: {
        'paper': '0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.07), 0 10px 20px rgba(0,0,0,0.08)',
        'paper-lg': '0 2px 4px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.12)',
        'pencil': '2px 2px 0px rgb(var(--shadow-ink) / var(--shadow-alpha))',
        'pencil-lg': '4px 4px 0px rgb(var(--shadow-ink) / var(--shadow-alpha-lg))',
      }
    },
  },
  plugins: [],
}
