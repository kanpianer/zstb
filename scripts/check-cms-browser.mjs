// Optional real Chromium smoke test: node scripts/check-cms-browser.mjs
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { preview } from 'vite';
const temporary = await mkdtemp(join(tmpdir(), 'dtms-browser-'));
const token = 'browser-smoke-test-only-token-12345';
const server = await preview({ preview: { port: 0, host: '127.0.0.1', open: false } });
const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
try {
  browser = spawn(process.env.CHROMIUM || 'chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0', `--user-data-dir=${temporary}/profile`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const endpoint = await new Promise((resolve, reject) => {
    let output = ''; browser.stderr.on('data', chunk => { output += chunk; const found = output.match(/DevTools listening on (ws:\/\/[^\s]+)/); if (found) resolve(found[1]); });
    browser.once('error', reject); browser.once('exit', code => reject(new Error(`Chromium exited: ${code}`)));
  });
  const port = new URL(endpoint).port;
  const page = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
  const socket = new WebSocket(page.webSocketDebuggerUrl); await once(socket, 'open');
  let nextId = 0; const pending = new Map();
  socket.addEventListener('message', event => { const response = JSON.parse(event.data); if (response.id) { const p = pending.get(response.id); pending.delete(response.id); response.error ? p.reject(new Error(JSON.stringify(response.error))) : p.resolve(response.result); } });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, {resolve,reject}); socket.send(JSON.stringify({id,method,params})); });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true}); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  const until = async expression => { for(let i=0;i<100;i++) { if(await evaluate(expression)) return; await new Promise(resolve => setTimeout(resolve, 100)); } throw new Error(`Timed out: ${expression}; page: ${await evaluate('location.href + " | " + document.body.innerText.slice(0, 1500)')}`); };
  let committed = null; let writes = 0; let conflict = false; let interceptionError = null;
  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.method !== 'Fetch.requestPaused') return;
    void (async () => {
      const { requestId, request } = data.params;
      if (request.method === 'OPTIONS') return send('Fetch.fulfillRequest', {requestId, responseCode:204, responseHeaders:[{name:'Access-Control-Allow-Origin',value:origin},{name:'Access-Control-Allow-Methods',value:'GET, PUT, OPTIONS'},{name:'Access-Control-Allow-Headers',value:'authorization,content-type,x-github-api-version,accept'}]});
      const auth = new Headers(request.headers).get('authorization');
      assert.ok(auth === null || auth === `Bearer ${token}`);
      if (request.method === 'PUT') assert.equal(auth, `Bearer ${token}`);
      if (request.method === 'PUT') {
        writes++;
        const body = JSON.parse(request.postData);
        assert.equal(body.sha, writes === 1 ? 'seed-sha' : 'committed-sha');
        if (conflict) return send('Fetch.fulfillRequest', {requestId, responseCode:409, responseHeaders:[{name:'Access-Control-Allow-Origin',value:origin}], body:Buffer.from('{}').toString('base64')});
        committed = JSON.parse(Buffer.from(body.content, 'base64').toString('utf8'));
        assert.equal(body.branch, 'main');
        return send('Fetch.fulfillRequest', {requestId, responseCode:200, responseHeaders:[{name:'Content-Type',value:'application/json'},{name:'Access-Control-Allow-Origin',value:origin}], body:Buffer.from(JSON.stringify({content:{sha:'committed-sha'},commit:{html_url:'https://github.com/kanpianer/zstb/commit/test'}})).toString('base64')});
      }
      return send('Fetch.fulfillRequest', {requestId, responseCode:200, responseHeaders:[{name:'Content-Type',value:'application/json'},{name:'Access-Control-Allow-Origin',value:origin}], body:Buffer.from(JSON.stringify({type:'file',encoding:'base64',sha:committed?'committed-sha':'seed-sha',content:Buffer.from(JSON.stringify(committed)).toString('base64')})).toString('base64')});
    })().catch(error => { interceptionError = error; });
  });
  await send('Fetch.enable', {patterns:[{urlPattern:'https://api.github.com/*'}]});
  await send('Network.setBlockedURLs', {urls:['https://fonts.googleapis.com/*','https://fonts.gstatic.com/*','https://cdn.jsdelivr.net/*']});
  await send('Network.enable');
  await send('Runtime.enable');
  socket.addEventListener('message', event => { const data = JSON.parse(event.data); if(data.method === 'Runtime.exceptionThrown') console.error('Browser exception:', JSON.stringify(data.params)); });
  await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', {width:1280,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.addScriptToEvaluateOnNewDocument', {source:'window.confirm = () => true;'});
  await send('Page.navigate', {url: `${origin}/dtms`});
  await until(`document.querySelector('.cms-shell') !== null`);
  await until(`document.querySelector('.cms-status')?.textContent.includes('seed-sha')`);
  assert.equal(await evaluate(`document.querySelectorAll('.cms-tool-list button').length`),20);
  assert.equal(await evaluate(`document.querySelector('.cms-primary').disabled`), true);
  assert.equal(await evaluate(`/手绘设备展示|资源占用/.test(document.querySelector('.cms-editor').textContent)`), false);
  assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('.cms-tabs button')).map(b=>b.textContent.replace(/^0\\d/, ''))`), ['软件 / 教程', '排序', '站点文案', '数据 / 备份', '连接内容仓库']);
  assert.equal(await evaluate(`document.querySelector('[aria-label="GitHub 仓库连接"]') === null`), true);
  await evaluate(`Array.from(document.querySelectorAll('.cms-tabs button')).find(b=>b.textContent.includes('连接内容仓库')).click()`);
  await until(`!!document.querySelector('[aria-label="GitHub 仓库连接"]')`);
  await evaluate(`(() => { const input=document.querySelector('input[type="password"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(token)}); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  assert.equal(await evaluate(`document.body.textContent.includes('请到「连接内容仓库」选项卡完成连接')`), false);
  await evaluate(`document.querySelector('.cms-test-connection').click()`);
  await until(`document.querySelector('.cms-notice')?.textContent.includes('测试通过')`);
  assert.equal(writes, 0);
  assert.equal(await evaluate(`document.querySelector('.cms-status').textContent.includes('seed-sha')`), true);
  assert.equal(await evaluate(`document.querySelector('#cms-github-pat').nextElementSibling.matches('.cms-test-connection')`), true);
  assert.equal(await evaluate(`Math.abs(document.querySelector('.cms-tabs').getBoundingClientRect().left - document.querySelector('.cms-main').getBoundingClientRect().left) < 1`), true);
  await evaluate(`document.querySelector('.cms-tabs button').click()`);
  await until(`!!document.querySelector('textarea[aria-label="名称"]')`);
  const setName = name => evaluate(`(() => { const el=document.querySelector('textarea[aria-label="名称"]'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,${JSON.stringify(name)}); el.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await setName('GitHub 中文提交验证');
  await until(`document.querySelector('.cms-status').textContent.includes('有未提交')`);
  await evaluate(`Array.from(document.querySelectorAll('.cms-tabs button')).find(b=>b.textContent.includes('连接内容仓库')).click()`);
  await evaluate(`document.querySelector('.cms-test-connection').click()`);
  await until(`document.querySelector('.cms-notice')?.textContent.includes('测试通过')`);
  assert.equal(writes, 0);
  await evaluate(`document.querySelector('.cms-tabs button').click()`);
  await until(`!!document.querySelector('textarea[aria-label="名称"]')`);
  assert.equal(await evaluate(`document.querySelector('textarea[aria-label="名称"]').value`), 'GitHub 中文提交验证');
  await evaluate(`document.querySelector('.cms-primary').click()`);
  await until(`document.querySelector('.cms-notice')?.textContent.includes('已提交到 GitHub')`);
  assert.equal(committed.tools[0].name,'GitHub 中文提交验证');
  assert.equal(writes,1);
  assert.equal(await evaluate(`JSON.stringify(localStorage).includes(${JSON.stringify(token)})`), false);
  // A stale SHA conflict must keep edits intact and must not force retry.
  conflict = true; await setName('冲突时保留的编辑');
  await evaluate(`document.querySelector('.cms-primary').click()`);
  await until(`!!document.querySelector('.cms-error')`);
  assert.equal(writes,2);
  assert.equal(await evaluate(`document.querySelector('textarea[aria-label="名称"]').value`),'冲突时保留的编辑');
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('返回主站')).click()`);
  await until(`document.querySelector('main') && !document.querySelector('.cms-shell')`);
  assert.equal(await evaluate('location.pathname'),'/');
  // The deployed seed remains unchanged: a commit is NOT an already completed deployment.
  await send('Page.navigate', {url: `${origin}/?tool=${encodeURIComponent(committed.tools[0].id)}`});
  await until(`!!document.querySelector('main') && !document.querySelector('.cms-shell')`);
  assert.equal(await evaluate(`document.body.textContent.includes('GitHub 中文提交验证')`),false);
  // Explicit local application is independent of commits and survives full navigation.
  await send('Page.navigate', {url: `${origin}/dtms`});
  await until(`document.querySelector('.cms-status')?.textContent.includes('committed-sh')`);
  await setName('无需部署的本地预览');
  await evaluate(`document.querySelector('.cms-apply').click()`);
  await until(`document.querySelector('.cms-notice')?.textContent.includes('已应用到此浏览器')`);
  assert.equal(writes, 2);
  assert.equal(await evaluate(`document.querySelector('.cms-status').textContent.includes('有未提交')`), true);
  assert.equal(await evaluate(`JSON.stringify(localStorage).includes(${JSON.stringify(token)})`), false);
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('返回主站')).click()`);
  await until(`!!document.querySelector('.local-preview-banner')`);
  await send('Page.navigate', {url: `${origin}/?tool=${encodeURIComponent(committed.tools[0].id)}`});
  await until(`!!document.querySelector('.local-preview-banner') && document.body.textContent.includes('无需部署的本地预览')`);
  await evaluate(`Array.from(document.querySelectorAll('.local-preview-banner button')).find(b=>b.textContent.includes('继续编辑')).click()`);
  await until(`document.querySelector('.cms-status')?.textContent.includes('committed-sh')`);
  assert.equal(await evaluate(`document.querySelector('textarea[aria-label="名称"]').value`), '无需部署的本地预览');
  await setName('再次应用后的预览');
  await evaluate(`document.querySelector('.cms-apply').click()`);
  await until(`document.querySelector('.cms-notice')?.textContent.includes('已应用到此浏览器')`);
  await send('Page.navigate', {url: `${origin}/?tool=${encodeURIComponent(committed.tools[0].id)}`});
  await until(`!!document.querySelector('.local-preview-banner') && document.body.textContent.includes('再次应用后的预览')`);
  await evaluate(`Array.from(document.querySelectorAll('.local-preview-banner button')).find(b=>b.textContent.includes('退出本地预览')).click()`);
  await until(`!!document.querySelector('main') && !document.querySelector('.local-preview-banner')`);
  assert.equal(await evaluate(`document.body.textContent.includes('再次应用后的预览')`), false);
  assert.equal(writes, 2);
  await send('Page.navigate', {url: `${origin}/`});
  await until(`!!document.querySelector('main') && !document.querySelector('.cms-shell')`);
  // Genuine pointer input, unlike DOM .click(), exercises the hidden entrance.
  for(let i=0;i<5;i++) { await send('Input.dispatchMouseEvent',{type:'mousePressed',x:3,y:400,button:'left',clickCount:1}); await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:3,y:400,button:'left',clickCount:1}); }
  await until(`location.pathname === '/dtms' && !!document.querySelector('.cms-shell')`);
  await send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true});
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true);
  await writeFile(join(temporary,'cms-mobile.png'), Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
  if(interceptionError) throw interceptionError;
  console.log('PASS: static /dtms, GitHub load/UTF-8 commit/SHA conflict, token privacy, commit vs deployment, persistent local apply/reapply/exit, trusted 5-click gesture, mobile width');
  console.log(`Mobile screenshot: ${temporary}/cms-mobile.png`);
  socket.close();
} finally {
  if(browser && browser.exitCode === null) { browser.kill(); await once(browser,'exit'); }
  await new Promise(resolve => server.httpServer.close(resolve));
  // Keep temporary screenshots for inspection; no credentials are persisted in them.
}
