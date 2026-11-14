import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

globalThis.require = createRequire(import.meta.url);
const result = await build({
  stdin: {
    contents: `import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { TutorialDetailView } from './src/components/TutorialDetailView';
      import { SystemListView } from './src/components/SystemListView';
      import { AppleQuadrantView } from './src/components/AppleQuadrantView';
      import { createDefaultContent } from './src/cms/content';
      export const tools = createDefaultContent().tools;
      export function renderAppleQuadrant() {
        return renderToStaticMarkup(React.createElement(AppleQuadrantView, {
          onSelectSubSystem() {}, onSelectTool() {}
        }));
      }
      export function renderList(subSystem) {
         return renderToStaticMarkup(React.createElement(SystemListView, {
           category: 'apple', subSystem, onBack() {}, onSelectTool() {}, onOpenCrowdsourceForTool() {}
         }));
       }
      export function render(tool) {
        return renderToStaticMarkup(React.createElement(TutorialDetailView, {
          tool, onBack() {}, onOpenCrowdsourceModal() {}
        }));
      }`,
    resolveDir: process.cwd(),
  },
  bundle: true, platform: 'node', format: 'esm', write: false,
});
const { tools, render, renderList, renderAppleQuadrant } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
test('AppleQuadrantView software cards do not show version numbers or store API notes', () => {
  const html = renderAppleQuadrant();
  assert.doesNotMatch(html, /美国商店 API|GitHub release|核心 release|源码 README|核查；以官方发布页为准/);
  for (const tool of tools.filter(tool => tool.category === 'apple')) {
    const version = tool.latestVersion.match(/\b[vV]?\d+(?:\.\d+)+/)?.[0];
    if (version) {
      assert.ok(!html.includes(`>${version}<`), `Should not display version ${version} for ${tool.id}`);
    }
  }
});

test('Apple software cards show clean versions without store API or verification notes', () => {
  for (const system of ['ios', 'macos']) {
    const html = renderList(system);
    assert.doesNotMatch(html, /美国商店 API|GitHub release|核心 release|源码 README|核查；以官方发布页为准/);
    for (const tool of tools.filter(tool => tool.system === system)) {
      const version = tool.latestVersion.match(/\b[vV]?\d+(?:\.\d+)+/)?.[0];
      assert.ok(html.includes(`>${version}</span>`), tool.id);
    }
  }
});

const badge = html => html.match(/<span aria-label="软件版本"[^>]*>([^<]*)<\/span>/)?.[1];

test('every tutorial header shows only a version number or no badge', () => {
  for (const tool of tools) {
    const displayed = badge(render(tool));
    if (tool.id === 'vps-nodes') {
      assert.equal(displayed, undefined);
    } else {
      assert.match(displayed, /^v?\d+(?:\.\d+)+$/i, tool.id);
    }
  }
});

test('header strips notes and channels without changing the underlying content', () => {
  for (const [input, expected] of [
    ['v2.5.10（2026-11-13 核查；以官方发布页为准）', 'v2.5.10'],
    ['App Store 1.14.8（2026-10-24）；核心 release 1.14.4', '1.14.8'],
    ['macOS 商店版本未独立确认；源码 README 对应产品构建 1.0.15', '1.0.15'],
    ['v1.2.3-rc.1+build.5（测试版）', 'v1.2.3-rc.1+build.5'],
    ['以脚本仓库为准', undefined],
    ['', undefined],
  ]) {
    const tool = { ...tools[0], latestVersion: input };
    assert.equal(badge(render(tool)), expected);
    assert.equal(tool.latestVersion, input);
  }
});
