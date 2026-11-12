import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, mkdir, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parseContent } from './src/cms/content'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'static-cms-content',
    async buildStart() {
      const value: unknown = JSON.parse(await readFile(resolve('public/content/site-content.json'), 'utf8'))
      if (value !== null) parseContent(value)
    },
    async closeBundle() {
      // A real /dtms/index.html also works on hosts without SPA rewrites.
      await mkdir(resolve('dist/dtms'), { recursive: true })
      await copyFile(resolve('dist/index.html'), resolve('dist/dtms/index.html'))
    },
  }],
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
