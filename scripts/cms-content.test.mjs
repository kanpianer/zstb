import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function bundled(entry) {
  const result = await build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', write: false });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}
const content = await bundled('src/cms/content.ts');
const tools = await bundled('src/data/tutorials/index.ts');
test('visitors read deployed static JSON without credentials or GitHub requests', async () => {
  const originalFetch = globalThis.fetch;
  try {
    let next = null;
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/content/site-content.json');
      assert.equal(options.cache, 'no-store'); assert.equal(options.headers, undefined);
      return new Response(JSON.stringify(next));
    };
    assert.equal((await content.fetchContent()).tools.length, 20);
    next = content.createDefaultContent(); next.settings.footerText = '部署后的新内容';
    assert.equal((await content.fetchContent()).settings.footerText, '部署后的新内容');
    next = { broken: true }; await assert.rejects(() => content.fetchContent());
    globalThis.fetch = async () => new Response('', {status:404});
    await assert.rejects(() => content.fetchContent(), /404/);
  } finally { globalThis.fetch = originalFetch; }
});
const joined = await build({ stdin: { contents: `export * from './src/cms/content.ts'; export * from './src/data/tutorials/index.ts';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', write: false });
const integrated = await import(`data:text/javascript;base64,${Buffer.from(joined.outputFiles[0].text).toString('base64')}`);
test('published resources drive tool detail, card order, home order and footer', () => {
  const c = integrated.createDefaultContent();
  c.tools[0].name = 'CMS 新名称'; c.settings.footerText = '新的页脚';
  c.cardOrder.ios.reverse();
  integrated.setActiveContent(c);
  assert.equal(integrated.getToolById(c.tools[0].id).name, 'CMS 新名称');
  assert.equal(integrated.getToolsBySubSystem('ios')[0].id, c.cardOrder.ios[0]);
  assert.equal(integrated.getToolsBySubSystem('ios', 'home')[0].id, c.homeOrder.ios[0]);
  assert.equal(integrated.getSettings().footerText, '新的页脚');
});

test('defaults include all existing tutorials and validate', () => {
  const defaults = content.createDefaultContent();
  assert.equal(defaults.tools.length, 20);
  content.validateContent(defaults);
  assert.equal(tools.ALL_TOOLS.length, 20);
});
test('reject malformed nested resources and unsafe links', () => {
  for (const mutate of [
    c => { c.tools[0].tutorial.steps = null; },
    c => { c.tools[0].officialSite = 'javascript:alert(1)'; },
    c => { c.settings.footerLinkUrl = '//evil.example'; },
    c => { c.homeOrder.ios[0] = c.homeOrder.ios[1]; },
    c => { c.tools[0].system = 'linux'; },
    c => { c.appleOrder = ['ios', 'ios']; },
  ]) {
    const data = content.createDefaultContent(); mutate(data);
    assert.throws(() => content.validateContent(data));
  }
});
test('retired device and resource fields are absent and legacy inputs are cleaned without mutation', () => {
  const defaults = content.createDefaultContent();
  for (const tool of defaults.tools) {
    assert.equal(Object.hasOwn(tool, 'screenshot'), false);
    assert.equal(Object.hasOwn(tool.specs, 'resourceFootprint'), false);
  }
  const legacy = structuredClone(defaults);
  for (const tool of legacy.tools) {
    tool.screenshot = { title: '旧设备展示', mockData: { logs: ['旧演示数据'] } };
    tool.specs.resourceFootprint = '旧资源占用';
  }
  const untouched = structuredClone(legacy);
  assert.deepEqual(content.parseContent(legacy), defaults);
  assert.deepEqual(legacy, untouched);
  assert.deepEqual(content.parseContent(content.parseContent(legacy)), defaults);
  assert.throws(() => content.validateContent(legacy));
  legacy.tools[0].unknownField = 'must still fail';
  assert.throws(() => content.parseContent(legacy));
});

test('default resources are isolated clones', () => {
  const first = content.createDefaultContent();
  first.tools[0].name = 'changed'; first.cardOrder.ios.reverse();
  const next = content.createDefaultContent();
  assert.notEqual(next.tools[0].name, 'changed');
  assert.notDeepEqual(first.cardOrder.ios, next.homeOrder.ios);
  assert.deepEqual(next.cardOrder.ios, next.homeOrder.ios);
});

const { createBlankClickGesture } = await bundled('src/cms/gesture.ts');
class FakeElement {
  constructor(tagName = 'DIV', interactive = false, text = '') {
    this.tagName = tagName; this.interactive = interactive;
    this.childNodes = text ? [{ nodeType: 3, textContent: text }] : [];
  }
  closest() { return this.interactive ? this : null; }
}
globalThis.Element = FakeElement;
globalThis.Node = { TEXT_NODE: 3 };
test('five trusted blank clicks inside 1500ms opens once', () => {
  let opened = 0; let time = 0;
  const click = createBlankClickGesture(() => opened++, () => time);
  const event = { button: 0, isTrusted: true, target: new FakeElement() };
  for (time = 0; time <= 1200; time += 300) click(event);
  assert.equal(opened, 1);
  click(event); assert.equal(opened, 1);
});
test('slow, interactive, text and synthetic clicks never trigger', () => {
  for (const kind of ['slow', 'interactive', 'text', 'synthetic']) {
    let opened = 0; let time = 0;
    const click = createBlankClickGesture(() => opened++, () => time);
    for (let i = 0; i < 5; i++) {
      time = i * (kind === 'slow' ? 500 : 200);
      click({ button: 0, isTrusted: kind !== 'synthetic', target: new FakeElement('DIV', kind === 'interactive', kind === 'text' ? 'content' : '') });
    }
    assert.equal(opened, 0, kind);
  }
});
