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
    assert.match(JSON.stringify(tool.tutorial), /https:\/\/(?:github\.com|raw\.githubusercontent\.com|api\.github\.com|sing-box\.sagernet\.org|apps\.apple\.com|karing\.app|clash\.md|www\.clashverge\.dev|clashparty\.org)/, `${tool.id} must cite sources`);
  }
});

test('protocol lists contain actual protocols rather than verification placeholders', () => {
  for (const tool of audited) {
    assert.ok(tool.specs.protocols.length >= 7, tool.id);
    assert.doesNotMatch(tool.specs.protocols.join(' '), /其他节点协议|需按当前版本验证/);
    assert.equal(new Set(tool.specs.protocols).size, tool.specs.protocols.length, tool.id);
  }
  const rocket = audited.find(tool => tool.id === 'shadowrocket');
  for (const protocol of ['Shadowsocks', 'VMess', 'Trojan', 'Hysteria 2', 'TUIC']) {
    assert.ok(rocket.specs.protocols.includes(protocol), protocol);
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

test('all tools have verified release dates or are marked as 未核实', () => {
  for (const tool of ALL_TOOLS) {
    assert.match(tool.releasedAt, /^(?:\d{4}-\d{2}-\d{2}|未核实)$/, `${tool.id}: releasedAt must be a date or 未核实`);
  }
});
