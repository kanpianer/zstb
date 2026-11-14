import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const result = await build({ entryPoints: ['src/data/tutorials/index.ts'], bundle: true, platform: 'node', format: 'esm', write: false });
const { ALL_TOOLS } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);

test('software guides keep a short start-to-finish path and optional common settings', () => {
  const software = ALL_TOOLS.filter(tool => tool.id !== 'vps-nodes');
  assert.equal(software.length, 19);
  for (const { id, tutorial } of software) {
    assert.ok(tutorial.steps.length >= 4 && tutorial.steps.length <= 5, id);
    assert.ok(tutorial.advancedRules.length >= 3 && tutorial.advancedRules.length <= 4, id);
    const lastStep = JSON.stringify(tutorial.steps.at(-1));
    assert.match(lastStep, /验证|测试|确认|检查/, `${id}: verify actual use`);
    assert.match(lastStep, /关闭|停止|退出|断开|恢复/, `${id}: explain how to stop`);
    assert.ok(tutorial.faq.length >= 2, `${id}: offer basic troubleshooting`);
  }
});
