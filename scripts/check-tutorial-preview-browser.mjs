// Optional Chromium interaction test: node scripts/check-tutorial-preview-browser.mjs
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { once } from 'node:events';
import { build } from 'esbuild';

const temporary = await mkdtemp(join(tmpdir(), 'tutorial-preview-'));
const bundle = await build({
  stdin: {
    contents: `import React from 'react';
      import {createRoot} from 'react-dom/client';
      import {TutorialDetailView} from './src/components/TutorialDetailView';
      import {vpsNodes} from './src/data/tutorials/linux/vps-nodes';
      createRoot(document.getElementById('root')).render(React.createElement(TutorialDetailView, {
        tool: vpsNodes, onBack(){}, onOpenCrowdsourceModal(){}
      }));`,
    resolveDir: process.cwd(),
  },
  bundle: true, format: 'iife', write: false,
});
await writeFile(join(temporary, 'app.js'), bundle.outputFiles[0].text);
await writeFile(join(temporary, 'index.html'), '<!doctype html><html><body style="overflow: auto"><div id="root"></div><script src="app.js"></script></body></html>');
const browser = spawn(process.env.CHROMIUM || 'chromium', [
  '--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0',
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
    const request = pending.get(response.id);
    pending.delete(response.id);
    response.error ? request.reject(new Error(JSON.stringify(response.error))) : request.resolve(response.result);
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
  const until = async expression => {
    for (let i = 0; i < 100; i++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error(`Timed out: ${expression}`);
  };
  await send('Page.enable');
  await send('Page.navigate', { url: pathToFileURL(join(temporary, 'index.html')).href });
  await until('document.querySelectorAll("button[aria-haspopup=dialog]").length === 5');
  const originalUrl = await evaluate('location.href');
  const open = async index => {
    await evaluate(`window.trigger = document.querySelectorAll('button[aria-haspopup=dialog]')[${index}]; window.trigger.focus(); window.trigger.click()`);
    await until('document.querySelector("dialog")?.open');
    assert.equal(await evaluate('document.body.style.overflow'), 'hidden');
    assert.equal(await evaluate('document.activeElement.getAttribute("aria-label")'), '关闭图片预览');
    assert.equal(await evaluate('location.href'), originalUrl);
  };
  const closed = async () => {
    await until('document.querySelector("dialog") === null');
    assert.equal(await evaluate('document.body.style.overflow'), 'auto');
    assert.equal(await evaluate('document.activeElement === window.trigger'), true);
  };
  await open(0);
  assert.equal(await evaluate('document.querySelector("dialog img").getAttribute("src")'), '/tutorials/vps/vps_0.png');
  await evaluate('document.querySelector("dialog img").click()');
  assert.equal(await evaluate('document.querySelector("dialog").open'), true);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await closed();
  await open(1);
  assert.equal(await evaluate('document.querySelector("dialog img").getAttribute("src")'), '/tutorials/vps/vps_1.png');
  await evaluate('document.querySelector("dialog button").click()');
  await closed();
  await open(4);
  await evaluate('document.querySelector("dialog").click()');
  await closed();
  console.log('PASS: in-page preview, correct image, Escape/button/backdrop dismissal, focus restoration, scroll restoration, unchanged URL');
} finally {
  socket?.close();
  browser.kill();
}
