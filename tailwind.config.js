/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fdfdfb',
          100: '#faf8f2',
          200: '#f5f1e6',
          300: '#ece5d4',
          400: '#dfd4bd',
          ruled: '#d5cbb5',
          margin: '#e8a598'
        },
        pencil: {
          DEFAULT: '#27292d',
          dark: '#181a1c',
          light: '#4b4e54',
          faint: '#737882',
          eraser: '#e27b7b',
          graphite: '#36393f',
          accent: '#2d5a88',
          gold: '#c29017'
        }
      },
      fontFamily: {
        title: ['"jiangxizhuokai"', '"江西拙楷"', '"JiangXiZhuoKai"', '"LXGW WenKai"', 'cursive', 'serif'],
        serif: ['"jiangxizhuokai"', '"江西拙楷"', '"JiangXiZhuoKai"', '"LXGW WenKai"', 'serif'],
        sans: ['"LXGW WenKai"', '"霞鹜文楷"', '"LXGWWenKai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        body: ['"LXGW WenKai"', '"霞鹜文楷"', '"LXGWWenKai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sketch: ['"Architects Daughter"', '"LXGW WenKai"', '"Klee One"', 'cursive', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"LXGW WenKai Mono"', 'monospace']
      },
      boxShadow: {
        'paper': '0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.07), 0 10px 20px rgba(0,0,0,0.08)',
        'paper-lg': '0 2px 4px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.12)',
        'pencil': '2px 2px 0px rgba(40,40,40,0.85)',
        'pencil-lg': '4px 4px 0px rgba(40,40,40,0.9)',
      }
    },
  },
  plugins: [],
}
