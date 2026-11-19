import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';

const result = await build({
  stdin: {
    contents: `
      export * from './src/cms/content.ts';
      export * from './src/data/tutorials/index.ts';
      export { PencilSoftwareLogo } from './src/components/PencilSoftwareLogos.tsx';
    `,
    resolveDir: process.cwd(),
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});

const {
  createDefaultContent,
  validateContent,
  getToolsBySubSystem,
  getToolsByCategory,
  getToolById,
  PencilSoftwareLogo,
  ALL_TOOLS,
} = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
);

test('NekoBox is marked as hidden and ClashMetaForAndroid is visible in defaults', () => {
  const content = createDefaultContent();
  const neko = content.tools.find(t => t.id === 'nekobox-android');
  const cmfa = content.tools.find(t => t.id === 'clash-meta-android');

  assert.ok(neko, 'nekobox-android must exist in tools');
  assert.equal(neko.hidden, true, 'nekobox-android must be hidden');

  assert.ok(cmfa, 'clash-meta-android must exist in tools');
  assert.equal(cmfa.name, 'ClashMetaForAndroid');
  assert.equal(cmfa.shortName, 'Clash Meta');
  assert.equal(cmfa.system, 'android');
  assert.notEqual(cmfa.hidden, true, 'clash-meta-android must not be hidden');
});

test('getToolsBySubSystem filters out hidden tools by default, maintaining exactly 4 visible Android tools', () => {
  const visibleTools = getToolsBySubSystem('android');
  assert.equal(visibleTools.length, 4);
  assert.deepEqual(
    visibleTools.map(t => t.id),
    ['v2rayng', 'flclash', 'clash-meta-android', 'sing-box-android']
  );
  assert.ok(!visibleTools.some(t => t.id === 'nekobox-android'));

  const homeTools = getToolsByCategory('android', 'home');
  assert.equal(homeTools.length, 4);
  assert.deepEqual(
    homeTools.map(t => t.id),
    ['v2rayng', 'flclash', 'clash-meta-android', 'sing-box-android']
  );

  // When includeHidden is true, returns all 5 tools
  const allTools = getToolsBySubSystem('android', 'card', true);
  assert.equal(allTools.length, 5);
  assert.ok(allTools.some(t => t.id === 'nekobox-android'));
});

test('getToolById can retrieve both visible and hidden tools by direct ID', () => {
  assert.equal(getToolById('clash-meta-android')?.name, 'ClashMetaForAndroid');
  assert.equal(getToolById('nekobox-android')?.name, 'NekoBox');
});

test('CMS validation supports toggling hidden flag on any tool', () => {
  const content = createDefaultContent();

  // Hide another tool
  content.tools.find(t => t.id === 'flclash').hidden = true;
  // Unhide nekobox
  content.tools.find(t => t.id === 'nekobox-android').hidden = false;

  // Must validate without throwing
  validateContent(content);
});

test('PencilSoftwareLogo renders ClashMeta pencil logo correctly', () => {
  const html = renderToStaticMarkup(
    React.createElement(PencilSoftwareLogo, { toolId: 'clash-meta-android' })
  );

  assert.ok(html.includes('viewBox="0 0 64 64"'), 'Must have 64x64 viewBox');
  assert.ok(html.includes('url(#pencil-stroke)'), 'Must use pencil-stroke filter');
  assert.ok(html.includes('stroke="currentColor"'), 'Must have currentColor stroke');
  // Contains isometric cube hexagon path and vertical axis
  assert.ok(html.includes('x1="32" y1="10" x2="32" y2="54"'), 'Must contain central vertical axis');
});
