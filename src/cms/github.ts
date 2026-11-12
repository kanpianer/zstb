import { createDefaultContent, parseContent, validateContent, type SiteContent } from './content';

export interface GitHubConfig { owner: string; repo: string; branch: string; path: string }
export interface GitHubSnapshot { content: SiteContent; sha: string }
export interface GitHubCommit { sha: string; commitUrl: string }

export const DEFAULT_GITHUB_CONFIG: GitHubConfig = {
  owner: 'kanpianer', repo: 'zstb', branch: 'main', path: 'public/content/site-content.json',
};

const MAX_FILE_BYTES = 1024 * 1024;
const CONTENT_PATH = 'public/content/site-content.json';
const controls = /[\u0000-\u001f\u007f-\u009f]/;

function prepare(config: GitHubConfig, token: string, allowAnonymous = false) {
  if (!config || typeof config.owner !== 'string' ||
      !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(config.owner) || config.owner.includes('--') ||
      typeof config.repo !== 'string' || !/^[a-z\d._-]{1,100}$/i.test(config.repo) || /^\.{1,2}$/.test(config.repo) ||
      typeof config.branch !== 'string' || !config.branch.trim() || controls.test(config.branch) ||
      config.path !== CONTENT_PATH) {
    throw new Error('GitHub 配置无效：请检查所有者、仓库、分支；内容路径必须为 public/content/site-content.json。');
  }
  if (typeof token !== 'string' || (!allowAnonymous && !token.trim()) || token !== token.trim() || controls.test(token)) {
    throw new Error('请填写有效的 GitHub 访问令牌。');
  }
  const repoUrl = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}`;
  const fileUrl = `${repoUrl}/contents/${config.path.split('/').map(encodeURIComponent).join('/')}`;
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  return { repoUrl, fileUrl, headers };
}

async function request(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, { ...options, redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(20000) });
  } catch {
    // Never include fetch errors: they can contain URLs, request headers or credentials.
    throw new Error('无法连接 GitHub，请检查网络、跨域限制或重定向后重试。');
  }
}

function checkResponse(response: Response): void {
  if (response.ok) return;
  if (response.status === 409 || response.status === 422) {
    throw new Error('提交冲突或分支限制（409/422）：内容可能已被他人更新。请先备份当前修改，再重新加载并合并；不会自动覆盖或重试。');
  }
  if (response.status === 401) throw new Error('GitHub 身份验证失败，请检查访问令牌是否有效或已过期。');
  if (response.status === 429 || (response.status === 403 && (response.headers.get('x-ratelimit-remaining') === '0' || response.headers.has('retry-after')))) {
    throw new Error('GitHub 请求频率受限，请稍后重试。');
  }
  if (response.status === 403) throw new Error('GitHub 拒绝访问，请检查令牌的仓库读写权限或分支保护规则。');
  if (response.status === 404) throw new Error('GitHub 仓库、分支或资源不存在，或访问令牌无权访问；请检查配置和权限。');
  throw new Error(`GitHub 请求失败（${response.status}），请稍后重试。`);
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  try {
    const value: unknown = await response.json();
    if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
  } catch { /* Use a fixed message rather than leaking response contents. */ }
  throw new Error('GitHub 返回了无效的 JSON 响应。');
}

function checkSize(size: number): void {
  if (size > MAX_FILE_BYTES) throw new Error('内容文件超过 1 MB（1,048,576 字节）限制，请缩减内容后重试。');
}

function decodeContent(encoded: string): string {
  const clean = encoded.replace(/[\r\n]/g, '');
  checkSize(Math.floor(clean.length / 4) * 3 - (clean.endsWith('==') ? 2 : clean.endsWith('=') ? 1 : 0));
  if (clean.length % 4 !== 0 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(clean)) {
    throw new Error('GitHub 文件的 Base64 编码无效。');
  }
  try {
    const bytes = Uint8Array.from(atob(clean), char => char.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('GitHub 文件不是有效的 UTF-8 内容。');
  }
}

export async function loadGitHubContent(config: GitHubConfig, token = ''): Promise<GitHubSnapshot> {
  const { repoUrl, fileUrl, headers } = prepare(config, token, true);
  const response = await request(`${fileUrl}?ref=${encodeURIComponent(config.branch)}`, { headers });
  if (response.status === 404) {
    // Contents 404 also hides private repositories and missing refs. Only a verified
    // repository AND branch permit the first-file creation path.
    checkResponse(await request(repoUrl, { headers }));
    checkResponse(await request(`${repoUrl}/branches/${encodeURIComponent(config.branch)}`, { headers }));
    return { content: createDefaultContent(), sha: '' };
  }
  checkResponse(response);
  const data = await readJson(response);
  if (typeof data.size === 'number') checkSize(data.size);
  if (data.type !== 'file' || data.encoding !== 'base64' || typeof data.content !== 'string' || typeof data.sha !== 'string' || !data.sha.trim()) {
    throw new Error('GitHub 内容响应无效：需要带 SHA 的 Base64 文件。');
  }
  const text = decodeContent(data.content);
  let content: unknown;
  try { content = JSON.parse(text); } catch { throw new Error('GitHub 内容文件不是有效的 JSON。'); }
  // The tracked null seed deliberately selects the current built-in defaults.
  if (content === null) content = createDefaultContent();
  try { return { content: parseContent(content), sha: data.sha }; }
  catch { throw new Error('GitHub 内容文件不符合站点内容格式，请修复后重新加载。'); }
}

export async function commitGitHubContent(config: GitHubConfig, token: string, content: SiteContent, sha: string, message: string): Promise<GitHubCommit> {
  const { fileUrl, headers } = prepare(config, token);
  if (typeof sha !== 'string' || (sha !== '' && (!sha.trim() || controls.test(sha)))) {
    throw new Error('缺少有效的文件 SHA；更新前请先加载内容，只有首次创建可以使用空 SHA。');
  }
  if (typeof message !== 'string' || !message.trim()) throw new Error('提交说明不能为空。');
  try { validateContent(content); } catch { throw new Error('待提交内容不符合站点内容格式。'); }
  const bytes = new TextEncoder().encode(`${JSON.stringify(content, null, 2)}\n`);
  checkSize(bytes.length);
  // Chunk conversion avoids argument limits on large Unicode documents and works
  // in browsers and Node without depending on Buffer or persisting credentials.
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  const response = await request(fileUrl, {
    method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: btoa(binary), ...(sha ? { sha } : {}), branch: config.branch }),
  });
  checkResponse(response);
  const data = await readJson(response);
  const file = data.content as Record<string, unknown> | null;
  const commit = data.commit as Record<string, unknown> | null;
  if (!file || typeof file.sha !== 'string' || !file.sha.trim() || !commit || typeof commit.html_url !== 'string' ||
      !/^https:\/\/github\.com\//.test(commit.html_url)) {
    throw new Error('GitHub 提交响应无效，请在仓库确认提交结果后重新加载，勿直接重复提交。');
  }
  return { sha: file.sha, commitUrl: commit.html_url };
}
