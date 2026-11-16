import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { once } from 'node:events';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from 'tailwindcss';

test('returns to previous page with restored scroll position instead of top', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'scroll-restore-'));
  const bundle = await build({
    stdin: {
      contents: `import React from 'react';
        import { createRoot } from 'react-dom/client';
        import { App } from './src/App';
        createRoot(document.getElementById('root')).render(React.createElement(App));`,
      resolveDir: process.cwd(),
    },
    bundle: true,
    format: 'iife',
    write: false,
  });

  const css = (await postcss([tailwind()]).process(await readFile('src/index.css', 'utf8'), { from: 'src/index.css' })).css;

  await writeFile(join(temporary, 'app.js'), bundle.outputFiles[0].text);
  await writeFile(
    join(temporary, 'index.html'),
    `<!doctype html><html><head><style>${css}</style></head><body style="overflow: hidden; height: 100vh; width: 100vw; margin: 0;"><div id="root" style="height: 100%; width: 100%;"></div><script src="app.js"></script></body></html>`
  );

  const browser = spawn(process.env.CHROMIUM || 'chromium', [
    '--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0',
    `--window-size=1024,768`,
    `--user-data-dir=${temporary}/profile`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  let socket;
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let output = '';
      browser.stderr.on('data', chunk => {
        output += chunk;
        const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) resolve(match[1]);
      });
      browser.once('error', reject);
      browser.once('exit', code => reject(new Error(`Chromium exited: ${code}`)));
    });

    const page = await (await fetch(`http://127.0.0.1:${new URL(endpoint).port}/json/new?about:blank`, { method: 'PUT' })).json();
    socket = new WebSocket(page.webSocketDebuggerUrl);
    await once(socket, 'open');

    let nextId = 0;
    const pending = new Map();
    socket.addEventListener('message', event => {
      const response = JSON.parse(event.data);
      if (!response.id) return;
      const req = pending.get(response.id);
      pending.delete(response.id);
      response.error ? req.reject(new Error(JSON.stringify(response.error))) : req.resolve(response.result);
    });

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

    const evaluate = async expression => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };

    const until = async (expression, timeoutMs = 5000) => {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        if (await evaluate(expression)) return;
        await new Promise(r => setTimeout(r, 50));
      }
      throw new Error(`Timed out waiting for: ${expression}`);
    };

    await send('Page.enable');
    const startUrl = `${pathToFileURL(join(temporary, 'index.html')).href}?tool=clash-verge-rev-win`;
    await send('Page.navigate', { url: startUrl });

    // Wait for App to mount and display tutorial detail view
    await until('document.querySelector("main") !== null && document.querySelector("main").scrollHeight > 400');

    // Scroll down by 250px inside main
    await evaluate(`
      (() => {
        const m = document.querySelector("main");
        m.scrollTop = 250;
        m.dispatchEvent(new Event('scroll'));
      })()
    `);

    const scrollBeforeNav = await evaluate('document.querySelector("main").scrollTop');
    assert.ok(scrollBeforeNav >= 200, `Expected scrollTop >= 200, got ${scrollBeforeNav}`);

    // Click footer "IP检测" button to navigate to IP check list
    await evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('footer button, main button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('IP检测'));
        if (btn) {
          btn.click();
        } else {
          throw new Error('IP button not found');
        }
      })()
    `);

    // Verify we arrived at IP check page and it starts at top (scrollTop === 0)
    await until('location.search.includes("view=ip")');
    await new Promise(r => setTimeout(r, 100));
    const ipScrollTop = await evaluate('document.querySelector("main").scrollTop');
    assert.equal(ipScrollTop, 0, 'New page should start at the top (scrollTop === 0)');

    // Click the "返回" (Back) button in PencilHeader
    await evaluate(`
      (() => {
        const backBtn = Array.from(document.querySelectorAll('header button, button')).find(b => {
          const text = b.textContent || '';
          return text.includes('返回') && !text.includes('返回顶部');
        });
        if (backBtn) {
          backBtn.click();
        } else {
          throw new Error('Back button not found');
        }
      })()
    `);

    // Wait until URL leaves IP check page and returns to tutorial
    await until('location.search.includes("tool=clash-verge-rev-win")');

    // Wait for scroll restoration to complete
    await until('document.querySelector("main").scrollTop >= 200', 3000);

    const restoredScrollTop = await evaluate('document.querySelector("main").scrollTop');
    assert.ok(
      Math.abs(restoredScrollTop - scrollBeforeNav) <= 5,
      `Expected restored scrollTop ~${scrollBeforeNav}, got ${restoredScrollTop}`
    );

    // Also test browser back button restoration
    // Scroll to 350px on current page
    await evaluate(`
      (() => {
        const mainEl = document.querySelector("main");
        mainEl.scrollTop = 350;
        mainEl.dispatchEvent(new Event('scroll'));
      })()
    `);
    const scrollBeforeSecondNav = await evaluate('document.querySelector("main").scrollTop');

    // Forward navigate again to IP check
    await evaluate(`
      (() => {
        const ipBtn = Array.from(document.querySelectorAll('footer button, main button')).find(b => b.textContent && b.textContent.includes('IP检测'));
        ipBtn.click();
      })()
    `);
    await until('location.search.includes("view=ip")');

    // Trigger browser back
    await evaluate('history.back()');
    await until('location.search.includes("tool=clash-verge-rev-win")');
    await until('document.querySelector("main").scrollTop >= 300', 3000);

    const secondRestoredScroll = await evaluate('document.querySelector("main").scrollTop');
    assert.ok(
      Math.abs(secondRestoredScroll - scrollBeforeSecondNav) <= 5,
      `Expected browser back restored scrollTop ~${scrollBeforeSecondNav}, got ${secondRestoredScroll}`
    );

    // 3. Multi-level return test with scrollable views:
    // Tutorial (scroll 250) -> IP Detail (scroll 200) -> Back -> Back
    // Navigate into an IP site detail from IP check list
    await evaluate(`
      (() => {
        const ipBtn = Array.from(document.querySelectorAll('footer button, main button')).find(b => b.textContent && b.textContent.includes('IP检测'));
        if (ipBtn) ipBtn.click();
      })()
    `);
    await until('location.search.includes("view=ip")');

    // Click into the first IP check site card (e.g. BrowserLeaks / IP.SB)
    await until('document.querySelector("main div.pencil-box") !== null');
    await evaluate(`
      (() => {
        const card = document.querySelector("main div.pencil-box");
        if (card) card.click();
      })()
    `);
    await until('location.search.includes("tool=")');
    await until('document.querySelector("main").scrollHeight > 500');

    // Scroll down inside IP check detail
    await evaluate(`
      (() => {
        const m = document.querySelector("main");
        m.scrollTop = 220;
        m.dispatchEvent(new Event('scroll'));
      })()
    `);
    const ipDetailScroll = await evaluate('document.querySelector("main").scrollTop');
    assert.ok(ipDetailScroll >= 150, `Expected ipDetailScroll >= 150, got ${ipDetailScroll}`);

    // Navigate to crowdsource or another page, or test back to IP check list
    await evaluate(`
      (() => {
        const backBtn = Array.from(document.querySelectorAll('header button, button')).find(b => {
          const text = b.textContent || '';
          return text.includes('返回') && !text.includes('返回顶部');
        });
        if (backBtn) backBtn.click();
      })()
    `);
    // Returned to IP check list
    await until('!location.search.includes("tool=")');

    // Back again to tutorial detail view
    await evaluate(`
      (() => {
        const backBtn = Array.from(document.querySelectorAll('header button, button')).find(b => {
          const text = b.textContent || '';
          return text.includes('返回') && !text.includes('返回顶部');
        });
        if (backBtn) backBtn.click();
      })()
    `);
    await until('location.search.includes("tool=clash-verge-rev-win")');
    await until('document.querySelector("main").scrollTop >= 300', 3000);

    const finalRestoredScroll = await evaluate('document.querySelector("main").scrollTop');
    assert.ok(
      Math.abs(finalRestoredScroll - scrollBeforeSecondNav) <= 5,
      `Expected final restored tutorial scroll ~${scrollBeforeSecondNav}, got ${finalRestoredScroll}`
    );

  } finally {
    socket?.close();
    browser.kill();
  }
});
