import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'esbuild';

async function bundled(entry) {
  const result = await build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', write: false });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

const envModule = await bundled('src/cms/env.ts');
const contentModule = await bundled('src/cms/content.ts');

test('isLocalServer detects environment and query overrides', () => {
  // In pure node environment without window, returns false
  assert.equal(envModule.isLocalServer(), false);

  // When window is mocked
  globalThis.window = {
    location: { search: '?__force_local_cms=1' },
  };
  assert.equal(envModule.isLocalServer(), true);

  globalThis.window = {
    location: { search: '?__force_online_cms=1' },
  };
  assert.equal(envModule.isLocalServer(), false);

  delete globalThis.window;
});

test('local CMS write-content updates and validates site content', async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'cms-test-'));
  const tempPath = join(tempDir, 'site-content.json');
  try {
    const valid = contentModule.createDefaultContent();
    const testSiteName = '本地代码库测试站点 ' + Date.now();
    valid.settings.siteName = testSiteName;

    // Direct check of validation and serialization logic
    const snapshot = contentModule.parseContent(valid);
    await writeFile(tempPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

    const updated = JSON.parse(await readFile(tempPath, 'utf8'));
    assert.equal(updated.settings.siteName, testSiteName);

    // Malformed content should be rejected by validateContent
    assert.throws(() => {
      contentModule.validateContent({ version: 2 });
    });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});
