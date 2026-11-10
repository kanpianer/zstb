// Service Worker for 纸上谈兵 (tzp)
// Provides persistent caching for Chinese webfonts and static assets

const CACHE_VERSION = 'v1';
const FONT_CACHE = `tzp-fonts-${CACHE_VERSION}`;
const STATIC_CACHE = `tzp-static-${CACHE_VERSION}`;
const APP_CACHE = `tzp-app-${CACHE_VERSION}`;

// Pre-cached basic app shell assets
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/site.webmanifest'
];

// Pre-cache known font stylesheets for instant startup
const PRECACHE_FONT_STYLES = [
  '/fonts/jxzk/result.css',
  '/fonts/lxgw/lxgwwenkai-regular.css',
  '/fonts/lxgw/lxgwwenkai-bold.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      try {
        const appCache = await caches.open(APP_CACHE);
        await appCache.addAll(PRECACHE_ASSETS);
      } catch (err) {
        console.warn('[SW] App cache preload error:', err);
      }

      try {
        const fontCache = await caches.open(FONT_CACHE);
        await Promise.all(
          PRECACHE_FONT_STYLES.map((url) =>
            fetch(url, { mode: 'cors' })
              .then((res) => {
                if (res.ok) fontCache.put(url, res);
              })
              .catch((e) => console.warn('[SW] Font preload failed for:', url, e))
          )
        );
      } catch (err) {
        console.warn('[SW] Font cache preload error:', err);
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const activeCaches = [FONT_CACHE, STATIC_CACHE, APP_CACHE];
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key.startsWith('tzp-') && !activeCaches.includes(key)) {
            console.log('[SW] Clearing outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only intercept GET requests
  if (request.method !== 'GET') return;

  // Skip unsupported schemes (chrome-extension, file, etc.)
  if (!url.protocol.startsWith('http')) return;

  // Skip Vite local development internal endpoints
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.search.includes('t=') ||
    url.pathname.includes('__vite')
  ) {
    return;
  }

  // 1. FONT REQUESTS: Cache-First (local /fonts/ woff2 slices, styles, Google Fonts)
  const isFont =
    url.pathname.startsWith('/fonts/') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.otf') ||
    request.destination === 'font' ||
    (url.hostname === 'cdn.jsdelivr.net' &&
      (url.pathname.includes('/@chinese-fonts/') ||
        url.pathname.includes('/lxgw-wenkai') ||
        url.pathname.includes('江西拙楷'))) ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'fonts.googleapis.com';

  if (isFont) {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          console.warn('[SW] Font request failed from network:', url.href);
          if (cached) return cached;
          throw error;
        }
      })
    );
    return;
  }

  // 2. STATIC ASSETS: Cache-First with Stale-While-Revalidate in background
  const isStatic =
    url.pathname.startsWith('/assets/') ||
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|woff|woff2)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        return cached || (await fetchPromise);
      })
    );
    return;
  }

  // 3. HTML Navigation requests: Network-First with Cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(APP_CACHE);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/index.html');
        })
    );
    return;
  }
});
