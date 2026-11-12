import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const result = await build({
  stdin: { contents: `import React from 'react'; import {renderToStaticMarkup} from 'react-dom/server'; import {FormattedRichText, TutorialDetailView} from './src/components/TutorialDetailView'; import {createDefaultContent} from './src/cms/content'; export function rich(text) { return renderToStaticMarkup(React.createElement(FormattedRichText, {text})); } export function detail() { const tool=createDefaultContent().tools[0]; tool.tutorial.prerequisites=['前置内容\\n必须保持同一行 (https://clashparty.org)']; return renderToStaticMarkup(React.createElement(TutorialDetailView, {tool, onBack(){}, onOpenCrowdsourceModal(){}})); }`, resolveDir: process.cwd() },
  bundle:true, platform:'node', format:'esm', write:false,
});
// React's server renderer uses Node builtins through require; provide it for the in-memory ESM bundle.
import { createRequire } from 'node:module';
globalThis.require = createRequire(import.meta.url);
const {rich, detail} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);

test('parenthesized and plain tutorial URLs become clickable hyperlinks', () => {
  for (const input of ['(https://clashparty.org)', '（https://clashparty.org）', 'https://clashparty.org']) {
    const html = rich(input);
    assert.match(html, /href="https:\/\/clashparty.org"/);
    assert.match(html, />clashparty.org<\/a>/);
    assert.doesNotMatch(html, /[（(]https:/);
    assert.match(html, /rel="noopener noreferrer"/);
  }
});
test('Chinese prose and sentence punctuation stay outside the link', () => {
  const html = rich('访问 https://clashparty.org，下载软件。也可访问 https://example.com/path.');
  assert.match(html, /href="https:\/\/clashparty.org"/);
  assert.match(html, /<\/a>，下载软件。/);
  assert.match(html, /href="https:\/\/example.com\/path"/);
  assert.match(html, /<\/a>\./);
});
test('existing Markdown links, bold links and code snippets remain intact', () => {
  assert.match(rich('[官网下载](https://clashparty.org)'), />官网下载<\/span><\/a>/);
  assert.match(rich('**访问 (https://clashparty.org)**'), /<strong[^>]*>.*href="https:\/\/clashparty.org"/);
  const code = rich('`https://example.com/api`');
  assert.match(code, /<code/); assert.doesNotMatch(code, /<a /);
});
test('prerequisite content wraps while bullet stays before text and explicit newlines are preserved', () => {
  const html = detail();
  const start = html.indexOf('aria-label="准备工作列表');
  assert.ok(start > 0);
  const list = html.slice(start, html.indexOf('</ul>', start));
  assert.doesNotMatch(list, /whitespace-nowrap|w-max|overflow-x-auto/);
  assert.match(list, /aria-hidden="true"[^>]*>•<\/span><span class="min-w-0 flex-1 break-words \[overflow-wrap:anywhere\]">前置内容<br\/>/);
  assert.doesNotMatch(list, /<p/);
  assert.match(list, /href="https:\/\/clashparty.org"/);
});
