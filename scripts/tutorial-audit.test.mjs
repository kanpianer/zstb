import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';

const result = await build({ entryPoints: ['src/data/tutorials/index.ts'], bundle: true, platform: 'node', format: 'esm', write: false });
const { ALL_TOOLS } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
const audited = ALL_TOOLS.filter(tool => tool.id !== 'vps-nodes');

test('all 19 non-VPS tutorials retain stable IDs and traceable source paths', () => {
  assert.equal(audited.length, 19);
  assert.equal(new Set(ALL_TOOLS.map(tool => tool.id)).size, 20);
  for (const tool of audited) {
    assert.equal(tool.updatedAt, '2026-11-13', tool.id);
    assert.equal(tool.updatePath, `src/data/tutorials/${tool.system}/${tool.id}.ts`, tool.id);
    assert.ok(existsSync(tool.updatePath), tool.id);
    assert.ok(tool.tutorial.steps.length >= 3, tool.id);
    assert.deepEqual(tool.tutorial.steps.map(step => step.stepNumber), tool.tutorial.steps.map((_, index) => index + 1), tool.id);
    assert.match(JSON.stringify(tool.tutorial), /https:\/\/(?:github\.com|raw\.githubusercontent\.com|api\.github\.com|sing-box\.sagernet\.org|apps\.apple\.com|karing\.app|clash\.md)/, `${tool.id} must cite sources`);
  }
});

test('corrected network-client installation facts stay in the default content', () => {
  const byId = id => audited.find(tool => tool.id === id);
  assert.match(byId('openclash').license, /MIT/);
  assert.match(JSON.stringify(byId('openclash').tutorial), /nftables/);
  assert.match(JSON.stringify(byId('v2raya').tutorial), /v2raya_core/);
  assert.notEqual(byId('v2raya').officialSite, 'https://v2raya.org');
  assert.match(JSON.stringify(byId('v2rayn').tutorial), /v2rayN-windows-64\.zip/);
});
