import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { build } from 'esbuild';

test('index.html contains full Open Graph and Twitter Card tags for mainstream social platforms', () => {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

  // Basic SEO & Canonical
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/zstb\.sld\.tw\/" \/>/);

  // Open Graph essential tags
  assert.match(html, /<meta property="og:type" content="website" \/>/);
  assert.match(html, /<meta property="og:site_name" content="紙上談兵" \/>/);
  assert.match(html, /<meta property="og:locale" content="zh_CN" \/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/zstb\.sld\.tw\/" \/>/);
  assert.match(html, /<meta property="og:title" content="[^"]+" \/>/);
  assert.match(html, /<meta property="og:description" content="[^"]+" \/>/);
  assert.match(html, /<meta property="og:image" content="https:\/\/zstb\.sld\.tw\/og-image\.png" \/>/);
  assert.match(html, /<meta property="og:image:secure_url" content="https:\/\/zstb\.sld\.tw\/og-image\.png" \/>/);
  assert.match(html, /<meta property="og:image:type" content="image\/png" \/>/);
  assert.match(html, /<meta property="og:image:width" content="1024" \/>/);
  assert.match(html, /<meta property="og:image:height" content="609" \/>/);

  // Twitter / X Cards
  assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(html, /<meta name="twitter:site" content="@kanpianer" \/>/);
  assert.match(html, /<meta name="twitter:creator" content="@kanpianer" \/>/);
  assert.match(html, /<meta name="twitter:url" content="https:\/\/zstb\.sld\.tw\/" \/>/);
  assert.match(html, /<meta name="twitter:title" content="[^"]+" \/>/);
  assert.match(html, /<meta name="twitter:description" content="[^"]+" \/>/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/zstb\.sld\.tw\/og-image\.png" \/>/);

  // JSON-LD structured data
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"https:\/\/schema\.org"/);
  assert.match(html, /"WebSite"/);

  // WeChat / QQ fallback thumbnail image
  assert.match(html, /<img src="https:\/\/zstb\.sld\.tw\/og-image\.png"[^>]*alt="紙上談兵"[^>]*\/>/);
});

test('public/og-image.png exists and is a valid image asset', () => {
  const stat = statSync(join(process.cwd(), 'public/og-image.png'));
  assert.ok(stat.size > 100000, `og-image.png should be substantial image (>100KB), got ${stat.size} bytes`);
});

test('updatePageMetadata dynamically modifies head elements when navigating', async () => {
  const result = await build({
    entryPoints: ['src/utils/meta.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
  });
  const { updatePageMetadata, DEFAULT_SITE_METADATA } = await import(
    `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
  );

  // Mock a minimal DOM document
  const headElements = new Map();
  globalThis.document = {
    title: '',
    querySelector(selector) {
      return headElements.get(selector) || null;
    },
    createElement(tag) {
      const attributes = new Map();
      const el = {
        tag,
        setAttribute(k, v) { attributes.set(k, v); },
        getAttribute(k) { return attributes.get(k); },
      };
      return el;
    },
    head: {
      appendChild(el) {
        if (el.getAttribute('name')) {
          headElements.set(`meta[name="${el.getAttribute('name')}"]`, el);
        }
        if (el.getAttribute('property')) {
          headElements.set(`meta[property="${el.getAttribute('property')}"]`, el);
        }
      },
    },
  };

  try {
    updatePageMetadata({
      title: 'Shadowrocket (小火箭) 教程 · 紙上談兵',
      description: '小火箭配置与使用教程',
      url: 'https://zstb.sld.tw/?tool=shadowrocket',
    });

    assert.equal(document.title, 'Shadowrocket (小火箭) 教程 · 紙上談兵');
    assert.equal(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      'Shadowrocket (小火箭) 教程 · 紙上談兵'
    );
    assert.equal(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
      'https://zstb.sld.tw/?tool=shadowrocket'
    );
    assert.equal(
      document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'),
      'Shadowrocket (小火箭) 教程 · 紙上談兵'
    );

    // Reset to default
    updatePageMetadata(DEFAULT_SITE_METADATA);
    assert.equal(document.title, DEFAULT_SITE_METADATA.title);
    assert.equal(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      DEFAULT_SITE_METADATA.title
    );
  } finally {
    delete globalThis.document;
  }
});
