import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';

const result = await build({ entryPoints: ['src/cms/content.ts'], bundle: true, platform: 'node', format: 'esm', write: false });
const { createDefaultContent, fetchContent } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);

test('deployed static content serves the restored audited tutorials, not the stale CMS snapshot', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(await readFile('public/content/site-content.json', 'utf8'));
  try {
    const deployed = await fetchContent();
    for (const expected of createDefaultContent().tools) {
      const actual = deployed.tools.find(tool => tool.id === expected.id);
      assert.deepEqual(actual, expected, `${expected.id}: deployed tutorial must include the restored update`);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
