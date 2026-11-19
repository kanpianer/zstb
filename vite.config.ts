import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parseContent } from './src/cms/content'

const CONTENT_PATH = resolve('public/content/site-content.json')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'static-cms-content',
    async buildStart() {
      const value: unknown = JSON.parse(await readFile(CONTENT_PATH, 'utf8'))
      if (value !== null) parseContent(value)
    },
    async closeBundle() {
      // A real /dtms/index.html also works on hosts without SPA rewrites.
      await mkdir(resolve('dist/dtms'), { recursive: true })
      await copyFile(resolve('dist/index.html'), resolve('dist/dtms/index.html'))
    },
    configureServer(server) {
      // Dev-only endpoint: write CMS content directly to the local source file.
      // Only accessible from localhost; never included in production builds.
      server.middlewares.use('/api/cms/write-content', async (req, res) => {
        if (req.method !== 'PUT') {
          res.writeHead(405, { Allow: 'PUT' }).end('Method Not Allowed')
          return
        }
        // Reject non-localhost origins to prevent CSRF from other sites.
        const origin = req.headers['origin'] ?? ''
        const host = req.headers['host'] ?? ''
        const isLocal = !origin || /^https?:\/\/localhost(:\d+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) || /^https?:\/\/\[::1\](:\d+)?$/.test(origin)
        const isSameHost = !origin || origin.endsWith(`//${host}`) || origin === `http://${host}` || origin === `https://${host}`
        if (!isLocal && !isSameHost) {
          res.writeHead(403).end('Forbidden')
          return
        }
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          // Validate the content before writing to disk.
          const snapshot = parseContent(body)
          await writeFile(CONTENT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
          res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: true }))
        } catch (err) {
          const message = err instanceof Error ? err.message : '写入失败'
          res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: false, error: message }))
        }
      })
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
