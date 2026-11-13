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
      import { createDefaultContent } from './src/cms/content';
      export const tools = createDefaultContent().tools;
      export function render(tool) {
        return renderToStaticMarkup(React.createElement(TutorialDetailView, {
          tool, onBack() {}, onOpenCrowdsourceModal() {}
        }));
      }`,
    resolveDir: process.cwd(),
  },
  bundle: true, platform: 'node', format: 'esm', write: false,
});
const { tools, render } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
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
