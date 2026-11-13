import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { pathToFileURL } from 'node:url';

// Real App markup and compiled production CSS; no development server required.
test('paper frame fits its parent and prefers the dynamic viewport over legacy vh', async () => {
  const bundle = await build({ stdin: { contents: "export { App } from './src/App';", resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', packages: 'external', write: false });
  const directory = await mkdtemp(`${process.cwd()}/.viewport-test-`);
  try {
    const modulePath = `${directory}/app.mjs`;
    await writeFile(modulePath, bundle.outputFiles[0].text);
    const { App } = await import(pathToFileURL(modulePath));
    const markup = renderToStaticMarkup(createElement(App));
    const css = (await postcss([tailwind()]).process(await readFile('src/index.css', 'utf8'), { from: 'src/index.css' })).css;
    const siteRoot = await readFile('src/cms/SiteRoot.tsx', 'utf8');
    const layoutClass = siteRoot.match(/return <div className="(site-root-layout)"/)[1];
    const contentClass = siteRoot.match(/<div className="([^"]+)"><App/)[1];
    const cases = [
      { width: 390, height: 664, banner: false },
      { width: 390, height: 560, banner: true },
      { width: 844, height: 390, banner: false },
      { width: 1280, height: 900, banner: true },
    ];
    const frames = cases.map(({ width, height, banner }) => {
      const html = `<!doctype html><style>${css}</style><div id="root"><div class="${layoutClass}">${banner ? '<aside class="local-preview-banner" style="height:64px;flex-shrink:0">Preview</aside>' : ''}<div class="${contentClass}">${markup}</div></div></div>`;
      return `<iframe width="${width}" height="${height}" srcdoc="${html.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"></iframe>`;
    }).join('');
    const htmlPath = `${directory}/check.html`;
    await writeFile(htmlPath, `<html><body>${frames}<pre id="result"></pre><script>
      window.onload = () => {
        const results = [...document.querySelectorAll('iframe')].map(frame => {
          const doc = frame.contentDocument;
          const sheet = doc.querySelector('.a4-sheet');
          const app = sheet.parentElement;
          const bounds = sheet.getBoundingClientRect();
          const parent = app.parentElement.getBoundingClientRect();
          const heights = [];
          const visit = rules => { for (const rule of rules) {
            if (rule.selectorText && app.matches(rule.selectorText) && rule.style.height) heights.push(rule.style.height);
            if (rule.cssRules && (!rule.conditionText || frame.contentWindow.matchMedia(rule.conditionText).matches)) visit(rule.cssRules);
          }};
          visit(doc.styleSheets[0].cssRules);
          const viewportHeights = [...doc.styleSheets[0].cssRules].filter(rule => rule.selectorText === '.site-root-layout').map(rule => rule.style.height);
          if (viewportHeights.at(-1) !== '100dvh') throw new Error('Outer layout must use dynamic viewport height');
          return { width: frame.width, appHeight: app.getBoundingClientRect().height, parentHeight: parent.height, layoutHeight: doc.querySelector('.site-root-layout').getBoundingClientRect().height, appMinHeight: frame.contentWindow.getComputedStyle(app).minHeight, bottom: bounds.bottom, top: bounds.top, availableBottom: Math.min(parent.bottom, frame.contentWindow.innerHeight), heights };
        });
        document.querySelectorAll('iframe').forEach(frame => frame.remove());
        document.querySelector('#result').textContent = JSON.stringify(results);
      };
    </script></body></html>`);
    const output = execFileSync(process.env.CHROMIUM_BIN || 'chromium', ['--headless', '--no-sandbox', '--disable-gpu', `--user-data-dir=${directory}/profile`, '--allow-file-access-from-files', '--dump-dom', '--virtual-time-budget=2000', pathToFileURL(htmlPath).href], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 20000, maxBuffer: 8 * 1024 * 1024 });
    const results = JSON.parse(output.match(/<pre id="result">([^<]+)<\/pre>/)[1]);
    for (const result of results) {
      assert.ok(result.bottom <= result.availableBottom + 1, `frame clipped: ${JSON.stringify(result)}`);
      assert.ok(result.top >= -1, `frame top clipped: ${JSON.stringify(result)}`);
      assert.notEqual(result.heights.at(-1), '100vh', `legacy vh overrides dynamic/parent height: ${JSON.stringify(result)}`);
    }
  } finally {
    assert.ok(directory.startsWith(`${process.cwd()}/.viewport-test-`));
    await rm(directory, { recursive: true, force: true });
  }
});
