import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

// Keep compilation in memory: no generated files or browser/Node-only polyfills.
const bundle = await build({
  stdin: { contents: "export * from './src/cms/github.ts'; export { createDefaultContent } from './src/cms/content.ts';", resolveDir: process.cwd() },
  bundle: true, platform: 'browser', format: 'esm', write: false,
});
const { DEFAULT_GITHUB_CONFIG: config, loadGitHubContent: load, commitGitHubContent: save, createDefaultContent } =
  await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const token = 'github_pat_TEST_SECRET_NEVER_IN_URL';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers });
const file = (value, sha = 'old-blob-sha') => {
  const bytes = Buffer.from(JSON.stringify(value), 'utf8');
  return json({ type: 'file', encoding: 'base64', content: bytes.toString('base64').match(/.{1,60}/g).join('\n'), size: bytes.length, sha });
};
const committed = () => json({ content: { sha: 'new-blob-sha' }, commit: { sha: 'commit-sha', html_url: 'https://github.com/kanpianer/zstb/commit/commit-sha' } }, 201);
function mock(responses) {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers.Authorization, `Bearer ${token}`);
    assert.equal(options.headers.Accept, 'application/vnd.github+json');
    assert.equal(options.headers['X-GitHub-Api-Version'], '2022-11-28');
    assert.ok(!url.includes(token));
    assert.ok(!url.includes('access_token'));
    assert.ok(responses.length, 'unexpected fetch/retry');
    const response = responses.shift();
    if (response instanceof Error) throw response;
    return response;
  };
  return calls;
}

test('loads Unicode content and preserves blob SHA with encoded branch and fixed path', async () => {
  const content = createDefaultContent();
  content.settings.siteName = '中文 🚀 café e\u0301';
  const calls = mock([file(content)]);
  const result = await load({ ...config, branch: 'feature/中文 #?%' }, token);
  assert.deepEqual(result, { content, sha: 'old-blob-sha' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.github.com/repos/kanpianer/zstb/contents/public/content/site-content.json?ref=feature%2F%E4%B8%AD%E6%96%87%20%23%3F%25');
});

test('legacy GitHub content loses retired fields and commits the cleaned payload with its original SHA', async () => {
  const legacy = createDefaultContent();
  legacy.tools[0].screenshot = { title: '旧设备展示' };
  legacy.tools[0].specs.resourceFootprint = '旧资源占用';
  const calls = mock([file(legacy, 'legacy-sha'), committed()]);
  const result = await load(config, token);
  assert.equal(result.sha, 'legacy-sha');
  assert.equal(Object.hasOwn(result.content.tools[0], 'screenshot'), false);
  assert.equal(Object.hasOwn(result.content.tools[0].specs, 'resourceFootprint'), false);
  await save(config, token, result.content, result.sha, '移除旧字段');
  const body = JSON.parse(calls[1].options.body);
  assert.equal(body.sha, 'legacy-sha');
  const written = JSON.parse(Buffer.from(body.content, 'base64').toString('utf8'));
  assert.deepEqual(written, createDefaultContent());
});

test('public repositories load automatically without credentials', async () => {
  let count = 0;
  globalThis.fetch = async (url, options) => {
    count++;
    assert.equal(options.headers.Authorization, undefined);
    return file(null, 'public-sha');
  };
  assert.equal((await load(config)).sha, 'public-sha');
  assert.equal((await load(config, '')).sha, 'public-sha');
  assert.equal(count, 2);
});

test('tracked null seed uses built-in defaults while retaining its SHA', async () => {
  mock([file(null, 'seed-sha')]);
  assert.deepEqual(await load(config, token), { content: createDefaultContent(), sha: 'seed-sha' });
});

test('Unicode saves use UTF-8 Base64 and supplied SHA without a refetch', async () => {
  const content = createDefaultContent(); content.settings.footerText = '更新：繁體中文 🐱 café';
  const calls = mock([committed()]);
  assert.deepEqual(await save({ ...config, branch: 'edits/中文' }, token, content, 'loaded-sha', '更新内容'), {
    sha: 'new-blob-sha', commitUrl: 'https://github.com/kanpianer/zstb/commit/commit-sha',
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.method, 'PUT');
  assert.equal(calls[0].options.headers['Content-Type'], 'application/json');
  const body = JSON.parse(calls[0].options.body);
  assert.deepEqual(Object.keys(body).sort(), ['branch', 'content', 'message', 'sha']);
  assert.equal(body.sha, 'loaded-sha'); assert.equal(body.branch, 'edits/中文'); assert.equal(body.message, '更新内容');
  assert.deepEqual(JSON.parse(Buffer.from(body.content, 'base64').toString('utf8')), content);
  assert.equal(calls[0].url, 'https://api.github.com/repos/kanpianer/zstb/contents/public/content/site-content.json');
});

test('only verified repo and branch 404 allows first creation without SHA', async () => {
  const calls = mock([json({}, 404), json({}), json({}), committed()]);
  const branch = 'new/中文 #'; const cfg = { ...config, branch };
  const loaded = await load(cfg, token);
  assert.equal(loaded.sha, ''); assert.deepEqual(loaded.content, createDefaultContent());
  assert.equal(calls[1].url, 'https://api.github.com/repos/kanpianer/zstb');
  assert.equal(calls[2].url, `https://api.github.com/repos/kanpianer/zstb/branches/${encodeURIComponent(branch)}`);
  await save(cfg, token, loaded.content, loaded.sha, '首次创建');
  assert.ok(!('sha' in JSON.parse(calls[3].options.body)));
  assert.equal(calls.length, 4);
});

test('404 never substitutes defaults when repo, branch or permission checks fail', async () => {
  for (const responses of [
    [json({}, 404), json({}, 404)],
    [json({}, 404), json({}, 403)],
    [json({}, 404), json({}), json({}, 404)],
    [json({}, 404), json({}), json({}, 401)],
    [json({}, 404), json({}), new Error(`network ${token}`)],
  ]) {
    const expectedCount = responses.length; const calls = mock(responses);
    await assert.rejects(load(config, token), error => !error.message.includes(token));
    assert.equal(calls.length, expectedCount);
  }
});

test('conflicting commits never refetch SHA, retry or overwrite', async () => {
  for (const status of [409, 422]) {
    const calls = mock([json({ message: token }, status)]);
    await assert.rejects(save(config, token, createDefaultContent(), 'stale-sha', '修改'), /冲突.*备份.*重新加载/);
    assert.equal(calls.length, 1);
    assert.equal(JSON.parse(calls[0].options.body).sha, 'stale-sha');
  }
});

test('auth, rate-limit, server and network failures are Chinese, sanitized and never fallback/retry', async () => {
  for (const [response, pattern] of [
    [json({ message: token }, 401), /身份验证/],
    [json({ message: token }, 403), /权限/],
    [json({}, 403, { 'x-ratelimit-remaining': '0' }), /频率/],
    [json({}, 403, { 'retry-after': '30' }), /频率/],
    [json({}, 429), /频率/], [json({}, 500), /失败/],
    [new Error(`fetch failed ${token}`), /网络/],
  ]) {
    for (const action of [() => load(config, token), () => save(config, token, createDefaultContent(), 'sha', '提交')]) {
      const calls = mock([response instanceof Response ? response.clone() : response]);
      await assert.rejects(action(), error => pattern.test(error.message) && !error.message.includes(token));
      assert.equal(calls.length, 1);
    }
  }
});

test('invalid JSON, UTF-8, Base64, schemas, metadata and oversized loads fail closed', async () => {
  const encoded = text => json({ type: 'file', sha: 'sha', encoding: 'base64', content: Buffer.from(text).toString('base64') });
  for (const response of [
    new Response('not-json'), json([]), file({ version: 1 }), encoded('{broken'), encoded('"not a document"'),
    json({ type: 'dir', sha: 'sha' }), json({ type: 'file', sha: '', encoding: 'base64', content: 'bnVsbA==' }),
    json({ type: 'file', sha: 'sha', encoding: 'base64', content: '!invalid!' }),
    json({ type: 'file', sha: 'sha', encoding: 'base64', content: '/w==' }),
    json({ type: 'file', sha: 'sha', encoding: 'base64', content: 'bnVsbA==', size: 1048577 }),
    encoded(' '.repeat(1048577)),
  ]) {
    const calls = mock([response]);
    await assert.rejects(load(config, token)); assert.equal(calls.length, 1);
  }
});

test('save rejects invalid content, absent SHA, blank message and files over 1 MB before fetch', async () => {
  const calls = mock([]);
  await assert.rejects(save(config, token, {}, 'sha', '修改'), /内容格式/);
  for (const sha of [undefined, null, 1, ' ', 'sha\n']) {
    await assert.rejects(save(config, token, createDefaultContent(), sha, '修改'), /SHA/);
  }
  await assert.rejects(save(config, token, createDefaultContent(), 'sha', ' '), /提交说明/);
  const large = createDefaultContent(); large.settings.footerText = '中'.repeat(400000);
  await assert.rejects(save(config, token, large, 'sha', '修改'), /1 MB/);
  assert.equal(calls.length, 0);
});

test('strict configuration and token validation precedes all requests', async () => {
  const calls = mock([]);
  const invalid = [null, ...[
    ['owner', ''], ['owner', '../evil'], ['owner', '-owner'], ['owner', 'two--hyphens'], ['owner', 'x'.repeat(40)],
    ['repo', '..'], ['repo', 'bad/repo'], ['repo', 'repo?x'], ['repo', 'x'.repeat(101)],
    ['branch', ''], ['branch', '  '], ['branch', 'main\n'], ['branch', 'main\u007f'],
    ['path', '/public/content/site-content.json'], ['path', 'public/content/../site-content.json'],
    ['path', 'public/content/site-content.json?x'], ['path', 'public/content/other.json'], ['path', 'public%2Fcontent%2Fsite-content.json'],
  ].map(([key, value]) => ({ ...config, [key]: value }))];
  for (const cfg of invalid) {
    await assert.rejects(load(cfg, token), /配置/);
    await assert.rejects(save(cfg, token, createDefaultContent(), 'sha', '修改'), /配置/);
  }
  for (const invalidToken of [' token', 'tok\nen']) {
    await assert.rejects(load(config, invalidToken), /令牌/);
  }
  for (const invalidToken of ['', undefined]) {
    await assert.rejects(save(config, invalidToken, createDefaultContent(), 'sha', '修改'), /令牌/);
  }
  assert.equal(calls.length, 0);
});

test('malformed save responses fail without exposing payload or retrying', async () => {
  for (const response of [json({}), json({ content: { sha: 'new' }, commit: { html_url: `https://evil.invalid/${token}` } }), new Response('bad json')]) {
    const calls = mock([response]);
    await assert.rejects(save(config, token, createDefaultContent(), 'sha', '修改'), error => !error.message.includes(token));
    assert.equal(calls.length, 1);
  }
});
