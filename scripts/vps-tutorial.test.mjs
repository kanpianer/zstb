import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

globalThis.require = createRequire(import.meta.url);
const result = await build({
  stdin: {
    contents: `import React from 'react'; import {renderToStaticMarkup} from 'react-dom/server'; import {TutorialDetailView} from './src/components/TutorialDetailView'; import {vpsNodes} from './src/data/tutorials/linux/vps-nodes'; import {createDefaultContent, validateContent} from './src/cms/content'; export const tool=vpsNodes; export function render(){return renderToStaticMarkup(React.createElement(TutorialDetailView,{tool:vpsNodes,onBack(){},onOpenCrowdsourceModal(){}}));} export function validate(columns){const c=createDefaultContent(); if(columns!==undefined)c.tools.find(t=>t.id==='vps-nodes').tutorial.steps[0].imageColumns=columns; validateContent(c);}`,
    resolveDir: process.cwd(),
  },
  bundle: true, platform: 'node', format: 'esm', write: false,
});
const {tool, render, validate} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);

test('VPS tutorial contains two independent scripts and ordered screenshot assets', () => {
  assert.equal(tool.tutorial.steps.length, 2);
  const [vpn, aio] = tool.tutorial.steps;
  assert.equal(vpn.imageColumns, 2);
  assert.deepEqual(vpn.images.map(i=>i.src), [0,1,2,3].map(n=>`/tutorials/vps/vps_${n}.png`));
  assert.equal(aio.images.length, 1);
  for (const step of tool.tutorial.steps) for (const image of step.images) assert.ok(existsSync(`public${image.src}`));
  assert.match(aio.description, /2\. 任意组合安装/);
  assert.match(aio.description, /Hysteria2/);
  assert.match(aio.description, /Let’s Encrypt/);
  assert.match(aio.description, /二维码链接/);
});

test('screenshots render as a two-column grid with captions and in-page preview buttons', () => {
  const html = render();
  assert.match(html, /grid gap-3 grid-cols-2/);
  assert.equal((html.match(/<figure /g) || []).length, 5);
  assert.equal((html.match(/<figcaption /g) || []).length, 5);
  assert.doesNotMatch(html, /href="\/tutorials\/vps\//);
  assert.equal((html.match(/aria-haspopup="dialog"/g) || []).length, 5);
  assert.equal((html.match(/title="点击放大预览"/g) || []).length, 5);
  assert.match(html, /<button[^>]*aria-label="放大预览：/);
  assert.match(html, /loading="lazy"/);
});

test('CMS accepts screenshot fields and restricts column counts', () => {
  assert.doesNotThrow(()=>validate());
  assert.doesNotThrow(()=>validate(1));
  assert.throws(()=>validate(3), /截图列数/);
});
