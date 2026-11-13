import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const result = await build({ stdin: { contents: `export * from './src/cms/preview.ts'; export * from './src/cms/content.ts';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', write: false });
const api = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
function memoryStorage() {
  const entries = new Map();
  return {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
    removeItem: key => entries.delete(key),
  };
}

test('applying creates an isolated persistent preview, replaces it and clears it without touching drafts', () => {
  const storage = memoryStorage();
  storage.setItem('dtms-draft-v1', 'existing draft');
  assert.equal(api.loadLocalPreview(storage), null);
  const content = api.createDefaultContent();
  content.settings.siteName = '本地站点';
  content.tools[0].name = '本地教程';
  content.cardOrder.ios.reverse();
  const snapshot = api.saveLocalPreview(storage, content);
  assert.deepEqual(snapshot, content);
  content.tools[0].name = '尚未应用的编辑';
  assert.equal(snapshot.tools[0].name, '本地教程');
  assert.deepEqual(api.loadLocalPreview(storage), snapshot);
  api.saveLocalPreview(storage, content);
  assert.equal(api.loadLocalPreview(storage).tools[0].name, '尚未应用的编辑');
  api.clearLocalPreview(storage);
  assert.equal(api.loadLocalPreview(storage), null);
  assert.equal(storage.getItem('dtms-draft-v1'), 'existing draft');
});

test('invalid edits never overwrite a good preview and invalid stored previews are rejected', () => {
  const storage = memoryStorage();
  const good = api.createDefaultContent();
  api.saveLocalPreview(storage, good);
  const invalid = structuredClone(good);
  invalid.tools[0].officialSite = 'javascript:alert(1)';
  assert.throws(() => api.saveLocalPreview(storage, invalid));
  assert.deepEqual(api.loadLocalPreview(storage), good);
  for (const raw of ['{', 'null', JSON.stringify(invalid)]) {
    storage.setItem(api.LOCAL_PREVIEW_KEY, raw);
    assert.throws(() => api.loadLocalPreview(storage));
  }
});

test('storage failures propagate so the UI cannot report a successful apply', () => {
  const storage = { setItem() { throw new Error('quota exceeded'); } };
  assert.throws(() => api.saveLocalPreview(storage, api.createDefaultContent()), /quota exceeded/);
});
