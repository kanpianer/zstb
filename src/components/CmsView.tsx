import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../cms/content';
import { parseContent, validateContent } from '../cms/content';
import { commitGitHubContent, loadGitHubContent, DEFAULT_GITHUB_CONFIG } from '../cms/github';
import type { GitHubConfig } from '../cms/github';
import './cms.css';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json | undefined };
type PathValue = Json | undefined;
export interface CmsViewProps {
  initialContent: SiteContent;
  loadError?: string;
  onExit: () => void;
}
const SYSTEMS = ['ios', 'macos', 'android', 'windows', 'linux'] as const;
const SYSTEM_NAMES: Record<string, string> = { ios: 'iOS', macos: 'macOS', android: '安卓', windows: 'Windows', linux: 'Linux', apple: '苹果' };
const LABELS: Record<string, string> = {
  id: '标识（ID）', name: '名称', shortName: '简称', system: '所属系统', category: '所属象限', tagline: '一句话介绍', description: '详细说明', iconName: '图标名称', badgeText: '徽章文案',
  updatedAt: '最近更新日期', isOpenSource: '是否开源', license: '许可证 / 授权', price: '价格', releasedAt: '首次发布日期', latestVersion: '最新版本', updatePath: '独立更新路径',
  officialSite: '官方网站地址', officialSiteLabel: '官网按钮文案', officialSiteIcon: '官网按钮图标', githubRepo: 'GitHub 仓库', appStoreUrl: 'App Store 地址', playStoreUrl: 'Google Play 地址', homebrewUrl: 'Homebrew 地址', releasesUrl: '软件下载地址',
  specs: '软件规格', compatibility: '兼容系统', architecture: '处理器架构', coreEngine: '底层内核', protocols: '支持协议', trafficHandling: '流量处理方式',
  tutorial: '完整教程', overview: '教程概述', prerequisites: '准备事项', prerequisiteAction: '准备事项快捷入口', prerequisiteActions: '准备事项快捷入口列表', prefixText: '前缀文字', url: '链接地址', iconSrc: '图标地址', suffixText: '后缀文字',
  steps: '操作步骤', stepNumber: '步骤编号', codeSnippet: '代码 / 配置片段', codeLanguage: '代码语言', pencilTip: '铅笔小提示', highlightWords: '高亮词语', advancedRules: '进阶规则', faq: '常见问题', question: '问题', answer: '解答',
  changelog: '更新记录', date: '日期', author: '作者', authorAvatar: '作者头像地址', prNumber: 'PR 编号', summary: '更新摘要', commitHash: '提交哈希',
  siteName: '站点名称', siteSubtitle: '站点副标题', footerText: '页脚文字', footerLinkLabel: '页脚链接文案', footerLinkUrl: '页脚链接地址', englishTitle: '英文标题', representativeTool: '代表软件', bgDescription: '背景说明', subTitle: '副标题', badge: '徽章', toolCount: '展示软件数量',
};
const actionTemplate: Json = { prefixText: '', url: '', name: '', iconSrc: '', suffixText: '', title: '' };
const toolTemplate: Json = {
  id: '', name: '', shortName: '', system: '', category: '', tagline: '', description: '', iconName: '', badgeText: '', updatedAt: '', isOpenSource: false, license: '', price: '', releasedAt: '', latestVersion: '', updatePath: '',
  officialSite: '', officialSiteLabel: '', officialSiteIcon: '', githubRepo: '', appStoreUrl: '', playStoreUrl: '', homebrewUrl: '', releasesUrl: '',
  specs: { compatibility: '', architecture: '', coreEngine: '', protocols: [''], trafficHandling: '' },
  tutorial: { overview: '', prerequisites: [''], prerequisiteAction: actionTemplate, prerequisiteActions: [actionTemplate], steps: [{ stepNumber: 1, title: '', description: '', codeSnippet: '', codeLanguage: '', pencilTip: '', highlightWords: [''] }], advancedRules: [''], faq: [{ question: '', answer: '' }] },
  changelog: [{ date: '', author: '', authorAvatar: '', prNumber: 0, summary: '', commitHash: '' }],
};
const clone = <T,>(value: T): T => structuredClone(value);
const asJson = (value: unknown) => value as Json;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const errorText = (error: unknown) => error instanceof Error ? error.message : '操作失败，请稍后重试。';
function object(value: PathValue): { [key: string]: Json | undefined } {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value : {};
}
function fresh(template: PathValue): Json {
  if (template === undefined) return '';
  if (Array.isArray(template)) return [];
  if (template && typeof template === 'object') return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, fresh(value)]));
  return clone(template);
}
interface FieldProps { name: string; value: PathValue; baseline: PathValue; template?: PathValue; onChange: (value: PathValue) => void; lockIdentity?: boolean; }
function Field({ name, value, baseline, template, onChange, lockIdentity = false }: FieldProps) {
  const label = LABELS[name] || name;
  const changed = !same(value, baseline);
  const reset = <button type="button" className="cms-text-btn" disabled={!changed} onClick={() => onChange(clone(baseline))} aria-label={`重置${label}`}>重置</button>;
  if (value === undefined) return <div className="cms-optional"><span>{label} <small>未设置（可选）</small></span><button type="button" className="cms-text-btn" onClick={() => onChange(fresh(template))}>＋ 添加字段</button>{reset}</div>;
  if (Array.isArray(value)) {
    const base = Array.isArray(baseline) ? baseline : [];
    const example = Array.isArray(template) ? template[0] : value[0];
    const reorder = (index: number, delta: number) => {
      const items = [...value];
      [items[index], items[index + delta]] = [items[index + delta], items[index]];
      onChange(name === 'steps' ? items.map((item, i) => ({ ...object(item), stepNumber: i + 1 })) : items);
    };
    return <fieldset className="cms-group"><legend>{label} <small>{value.length} 项</small></legend><div className="cms-group-actions">{reset}<button type="button" className="cms-text-btn" onClick={() => { const item = fresh(example); onChange([...value, name === 'steps' ? { ...object(item), stepNumber: value.length + 1 } : item]); }}>＋ 添加一项</button></div>
      {value.length === 0 && <p className="cms-muted">暂无内容，点击「添加一项」开始填写。</p>}
      {value.map((item, index) => <div className="cms-array-item" key={index}><div className="cms-array-toolbar"><strong>第 {index + 1} 项</strong><div><button type="button" className="cms-text-btn" disabled={index === 0} onClick={() => reorder(index, -1)} aria-label={`${label}第${index + 1}项上移`}>↑ 上移</button><button type="button" className="cms-text-btn" disabled={index === value.length - 1} onClick={() => reorder(index, 1)} aria-label={`${label}第${index + 1}项下移`}>↓ 下移</button><button type="button" className="cms-text-btn cms-danger" onClick={() => { const items = value.filter((_, i) => i !== index); onChange(name === 'steps' ? items.map((entry, i) => ({ ...object(entry), stepNumber: i + 1 })) : items); }}>删除</button></div></div><Field name={typeof item === 'object' ? '内容' : '条目内容'} value={item} baseline={base[index]} template={example} onChange={next => onChange(value.map((entry, i) => i === index ? next ?? '' : entry))} /></div>)}
    </fieldset>;
  }
  if (value !== null && typeof value === 'object') {
    const keys = [...new Set([...Object.keys(value), ...Object.keys(object(template))])];
    return <fieldset className="cms-group"><legend>{label}</legend><div className="cms-group-actions">{reset}</div>{keys.map(key => lockIdentity && ['id', 'system', 'category'].includes(key) ? <label className="cms-field" key={key}><span>{LABELS[key]} <small>关联字段 · 只读</small></span><input readOnly value={String(value[key] ?? '')} /></label> : <Field key={key} name={key} value={value[key]} baseline={object(baseline)[key]} template={object(template)[key]} onChange={next => { const result = { ...value }; if (next === undefined) delete result[key]; else result[key] = next; onChange(result); }} />)}</fieldset>;
  }
  return <div className="cms-field"><div className="cms-field-heading"><label htmlFor={undefined}>{label}</label>{reset}</div>{typeof value === 'boolean' ? <label className="cms-checkbox"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)} />{value ? '是 / 已启用' : '否 / 未启用'} · {label}</label> : typeof value === 'number' ? <input aria-label={label} type="number" step="any" value={value} onChange={event => { if (Number.isFinite(event.target.valueAsNumber)) onChange(event.target.valueAsNumber); }} /> : <textarea aria-label={label} rows={['description', 'overview', 'codeSnippet', 'answer', 'note'].includes(name) ? 4 : 2} value={String(value ?? '')} spellCheck={false} onChange={event => onChange(event.target.value)} />}</div>;
}

export default function CmsView({ initialContent, loadError, onExit }: CmsViewProps) {
  const [content, setContent] = useState(() => clone(initialContent));
  const [saved, setSaved] = useState(() => clone(initialContent));
  const [currentRevision, setCurrentRevision] = useState('');
  const [repo, setRepo] = useState<GitHubConfig>({ ...DEFAULT_GITHUB_CONFIG });
  const [connection, setConnection] = useState('');
  const [commitMessage, setCommitMessage] = useState('content: 更新站点教程与文案');
  const [commitUrl, setCommitUrl] = useState('');
  const [tab, setTab] = useState<'tools' | 'order' | 'site' | 'data' | 'github'>('tools');
  const [selectedId, setSelectedId] = useState(initialContent.tools[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [system, setSystem] = useState('all');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [autoLoading, setAutoLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const dirtyRef = useRef(false);
  const confirmedReload = useRef<number | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [json, setJson] = useState('');
  const [draftTime, setDraftTime] = useState('');
  const importInput = useRef<HTMLInputElement>(null);
  const dirty = !same(content, saved);
  dirtyRef.current = dirty;
  const credentialRef = useRef(token);
  credentialRef.current = token;
  useEffect(() => {
    let cancelled = false;
    setAutoLoading(true); setConnection(''); setError('');
    const timer = window.setTimeout(() => {
      void loadGitHubContent(repo, credentialRef.current.trim()).then(snapshot => {
      if (cancelled) return;
      if (dirtyRef.current && confirmedReload.current !== reloadKey) {
        setError('仓库已切换，但存在未提交编辑，未自动覆盖。请先备份，再点击重新载入仓库。');
        return;
      }
      confirmedReload.current = null;
      setContent(clone(snapshot.content)); setSaved(clone(snapshot.content));
      setCurrentRevision(snapshot.sha); setConnection(JSON.stringify(repo)); setCommitUrl('');
    }).catch(err => { if (!cancelled) setError(`自动载入仓库失败：${errorText(err)} 可在连接内容仓库选项卡填写 PAT 后重试。`); })
      .finally(() => { if (!cancelled) { confirmedReload.current = null; setAutoLoading(false); } });
    }, 300);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [repo.owner, repo.repo, repo.branch, repo.path, reloadKey]);
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);
  const guard = (action: () => void) => { setError(''); setMessage(''); try { action(); } catch (err) { setError(errorText(err)); } };
  const selected = content.tools.find(tool => tool.id === selectedId);
  const filtered = content.tools.filter(tool => (system === 'all' || tool.system === system) && `${tool.name} ${tool.shortName} ${tool.tagline} ${tool.id}`.toLowerCase().includes(search.toLowerCase()));
  const connected = connection === JSON.stringify(repo);
  const [testing, setTesting] = useState(false);
  async function testConnection() {
    setError(''); setMessage('');
    if (!token.trim()) { setError('请输入 GitHub PAT 后再测试。'); return; }
    setTesting(true); setBusy(true);
    try {
      const snapshot = await loadGitHubContent(repo, token.trim());
      setMessage(snapshot.sha
        ? '测试通过：GitHub Contents API 可用，PAT 可读取目标分支的内容文件。未载入或修改当前编辑，未创建提交；写入权限需实际提交时验证。'
        : '测试通过：PAT 可访问目标仓库及分支，内容文件尚未创建。未修改当前编辑，未创建提交；写入权限需实际提交时验证。');
    } catch (err) { setError(errorText(err)); }
    finally { setTesting(false); setBusy(false); }
  }
  function connect() {
    if (dirty && !window.confirm('重新载入仓库会替换当前未提交修改，请先导出备份。确定继续？')) return;
    confirmedReload.current = reloadKey + 1;
    setMessage(''); setReloadKey(reloadKey + 1);
  }
  async function publish() {
    setError(''); setMessage('');
    if (!connected) { setError('请先连接并载入目标仓库的最新内容，再提交修改。'); return; }
    if (!token.trim()) { setTab('github'); setError('请填写 GitHub PAT，需要目标仓库 Contents: Read and write 权限。'); return; }
    if (!commitMessage.trim()) { setError('请填写提交说明。'); return; }
    if (!window.confirm(`将修改提交到 ${repo.owner}/${repo.repo} 的 ${repo.branch} 分支，部署完成后全站生效。确认提交？`)) return;
    setBusy(true);
    try {
      validateContent(content); const snapshot = clone(content);
      const result = await commitGitHubContent(repo, token.trim(), snapshot, currentRevision, commitMessage.trim());
      setCurrentRevision(result.sha); setSaved(snapshot); setCommitUrl(result.commitUrl);
      setMessage('已提交到 GitHub。请等待站点部署完成后刷新主站，提交成功不代表网站已部署完成。');
    } catch (err) { setError(errorText(err)); }
    finally { setBusy(false); }
  }
  function applyImport(text: string) {
    const next = parseContent(JSON.parse(text));
    if (dirty && !window.confirm('导入将替换当前未发布编辑，确定继续？')) return;
    setContent(clone(next)); setMessage('数据已通过校验并载入编辑器，尚未发布。');
  }
  function saveDraft() { guard(() => { const savedAt = new Date().toISOString(); localStorage.setItem('dtms-draft-v1', JSON.stringify({ content, savedAt })); setDraftTime(savedAt); setMessage('已手动保存到此浏览器的本地草稿；未发布到主站。'); }); }
  function restoreDraft() { guard(() => {
    const raw = localStorage.getItem('dtms-draft-v1'); if (!raw) throw new Error('此浏览器没有本地草稿。');
    const draft: unknown = JSON.parse(raw);
    if (!draft || typeof draft !== 'object' || !('content' in draft) || !('savedAt' in draft) || typeof draft.savedAt !== 'string' || !Number.isFinite(Date.parse(draft.savedAt))) throw new Error('草稿格式或时间无效。');
    const restored = parseContent(draft.content);
    if (dirty && !window.confirm('恢复草稿将替换当前未发布编辑，确定继续？')) return;
    setContent(restored); setDraftTime(draft.savedAt); setMessage('本地草稿已恢复并通过校验；尚未发布。');
  }); }
  function download() { guard(() => { const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `dtms-backup-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url); setMessage('已导出当前编辑内容的 JSON 备份（不含管理令牌）。'); }); }
  function orderList(ids: string[], update: (ids: string[]) => void, names?: Record<string, string>) {
    return <ol className="cms-order-list">{ids.map((id, index) => <li key={id}><span><small>{String(index + 1).padStart(2, '0')}</small>{names?.[id] ?? content.tools.find(tool => tool.id === id)?.shortName ?? id}</span><div><button type="button" className="cms-text-btn" disabled={index === 0} onClick={() => { const next = [...ids]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; update(next); }} aria-label={`${id}上移`}>↑ 上移</button><button type="button" className="cms-text-btn" disabled={index === ids.length - 1} onClick={() => { const next = [...ids]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; update(next); }} aria-label={`${id}下移`}>↓ 下移</button></div></li>)}</ol>;
  }
  return <div className="cms-shell"><header className="cms-topbar a4-sheet"><div><p className="cms-eyebrow">紙上談兵 / 内容工作台</p><h1>把好内容，写在纸上。</h1><p className={`cms-status ${dirty ? 'is-dirty' : ''}`} role="status">{dirty ? '● 有未提交的修改' : '✓ 没有未提交的修改'} <span>GitHub SHA：{currentRevision ? currentRevision.slice(0, 12) : '尚未载入'}</span></p></div><div className="cms-publish"><div className="cms-button-row"><button type="button" className="pencil-btn cms-primary" disabled={busy || autoLoading || !connected || !dirty} onClick={() => void publish()}>{autoLoading ? '正在载入仓库…' : testing ? '正在测试…' : busy ? '请求处理中…' : '提交到 GitHub'}</button><button type="button" className="pencil-btn-secondary" disabled={busy || autoLoading} onClick={() => { if (!dirty || window.confirm('有未发布的修改，确定离开工作台？')) onExit(); }}>返回主站 ↗</button></div>{connected && <small>{`已连接 ${repo.owner}/${repo.repo} · ${repo.branch}`}</small>}</div></header>
    {error && <div className="cms-notice cms-error" role="alert">操作未完成：{error}</div>}{message && <div className="cms-notice" role="status">{message}</div>}
    <nav className="cms-tabs" aria-label="内容管理导航">{([['tools', '软件 / 教程'], ['order', '排序'], ['site', '站点文案'], ['data', '数据 / 备份'], ['github', '连接内容仓库']] as const).map(([id, label], i) => <button type="button" key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}><span>0{i + 1}</span>{label}</button>)}</nav>
    <main className="cms-main"><fieldset disabled={busy || (autoLoading && tab !== 'github')} className="cms-workspace">
      {tab === 'tools' && <div className="cms-tool-layout"><aside className="cms-sidebar a4-sheet"><h2>软件笔记簿 <small>{content.tools.length} 款</small></h2><label className="cms-field">搜索软件<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="名称、简介或 ID…" /></label><label className="cms-field">筛选系统<select value={system} onChange={event => setSystem(event.target.value)}><option value="all">全部系统</option>{SYSTEMS.map(id => <option key={id} value={id}>{SYSTEM_NAMES[id]}</option>)}</select></label><div className="cms-tool-list">{filtered.map(tool => <button type="button" key={tool.id} className={selectedId === tool.id ? 'is-selected' : ''} onClick={() => setSelectedId(tool.id)} aria-pressed={selectedId === tool.id}><strong>{tool.shortName}</strong><small>{SYSTEM_NAMES[tool.system]} · {tool.id}</small></button>)}{filtered.length === 0 && <p className="cms-muted">没有找到匹配的软件。</p>}</div></aside><section className="cms-editor a4-sheet">{selected ? <><div className="cms-section-heading"><div><p className="cms-eyebrow">软件与教程 · 完整字段编辑</p><h2>{selected.name}</h2></div><a className="pencil-btn-secondary" href={`/?tool=${encodeURIComponent(selected.id)}`} target="_blank" rel="noopener noreferrer">查看已发布页面 ↗</a></div><p className="cms-muted">预览链接展示已发布内容，不包含本页未发布编辑。关联字段不可修改；每个字段可重置到最近保存版本。数组支持添加、删除和排序。</p><Field name="软件资料" value={asJson(selected)} baseline={asJson(saved.tools.find(tool => tool.id === selected.id))} template={toolTemplate} lockIdentity onChange={next => setContent(previous => ({ ...previous, tools: previous.tools.map(tool => tool.id === selected.id ? next as unknown as typeof tool : tool) }))} /></> : <p>请从左侧选择一款软件。</p>}</section></div>}
      {tab === 'order' && <section className="cms-editor a4-sheet"><p className="cms-eyebrow">独立排序，互不影响</p><h2>安排阅读顺序</h2><p className="cms-muted">卡片顺序决定系统列表；首页按钮顺序单独维护。调整后请提交到 GitHub。</p><div className="cms-order-grid">{SYSTEMS.map(id => <section className="cms-order-section" key={id}><h3>{SYSTEM_NAMES[id]}</h3><h4>系统列表 · 软件卡片</h4>{orderList(content.cardOrder[id], ids => setContent(previous => ({ ...previous, cardOrder: { ...previous.cardOrder, [id]: ids } })))}<h4>首页 · 软件按钮</h4>{orderList(content.homeOrder[id], ids => setContent(previous => ({ ...previous, homeOrder: { ...previous.homeOrder, [id]: ids } })))}</section>)}<section className="cms-order-section"><h3>苹果象限 · 系统先后</h3>{orderList(content.appleOrder, ids => setContent(previous => ({ ...previous, appleOrder: ids as SiteContent['appleOrder'] })), SYSTEM_NAMES)}</section></div></section>}
      {tab === 'site' && <section className="cms-editor a4-sheet"><p className="cms-eyebrow">每一个字，都值得打磨</p><h2>站点与象限文案</h2><Field name="全站设置" value={asJson(content.settings)} baseline={asJson(saved.settings)} onChange={next => setContent(previous => ({ ...previous, settings: next as unknown as SiteContent['settings'] }))} />{(['apple', 'android', 'windows', 'linux'] as const).map(id => <Field key={id} name={`${SYSTEM_NAMES[id]}象限`} value={asJson(content.quadrants[id])} baseline={asJson(saved.quadrants[id])} template={{ badge: '' }} lockIdentity onChange={next => setContent(previous => ({ ...previous, quadrants: { ...previous.quadrants, [id]: next as unknown as SiteContent['quadrants'][typeof id] } }))} />)}</section>}
      {tab === 'data' && <section className="cms-editor a4-sheet"><p className="cms-eyebrow">先留一份底稿，再安心修改</p><h2>数据与本地备份</h2><div className="cms-backup-panel"><h3>本地草稿</h3><p>仅在此浏览器手动保存，不会自动发布，也不会保存管理令牌。清理浏览器数据可能丢失草稿，请另行下载备份。</p><div className="cms-button-row"><button type="button" className="pencil-btn-secondary" onClick={saveDraft}>保存本地草稿</button><button type="button" className="pencil-btn-secondary" onClick={restoreDraft}>恢复本地草稿</button></div>{draftTime && <p className="cms-muted">草稿时间：{new Date(draftTime).toLocaleString('zh-CN')}</p>}</div><div className="cms-button-row"><button type="button" className="pencil-btn" onClick={download}>↓ 下载 JSON 备份</button><button type="button" className="pencil-btn-secondary" onClick={() => setJson(JSON.stringify(content, null, 2))}>生成当前 JSON</button><button type="button" className="pencil-btn-secondary" onClick={() => importInput.current?.click()}>从文件导入</button><input ref={importInput} hidden type="file" accept=".json,application/json" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void file.text().then(text => guard(() => applyImport(text))).catch(err => setError(errorText(err))); }} /></div><label className="cms-field cms-json-label">JSON 数据<textarea className="cms-json" value={json} onChange={event => setJson(event.target.value)} spellCheck={false} rows={18} placeholder="粘贴完整 SiteContent JSON，或点击「生成当前 JSON」。" /></label><p className="cms-muted">导入和恢复均经过完整数据校验。导入只替换编辑内容，不会立即发布，也不会改动当前仓库文件 SHA。</p><button type="button" className="pencil-btn" onClick={() => guard(() => applyImport(json))}>校验并导入 JSON</button></section>}
      {tab === 'github' && <section className="cms-editor a4-sheet" aria-label="GitHub 仓库连接">
      <div className="cms-section-heading"><div><p className="cms-eyebrow">GitHub Contents API · 静态托管</p><h2>连接内容仓库</h2></div><a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer" className="pencil-btn-secondary">创建 Fine-grained PAT ↗</a></div>
      <div className="cms-field">
         <label htmlFor="cms-github-pat">GitHub PAT</label>
         <div className="cms-pat-row">
           <input id="cms-github-pat" type="password" value={token} autoComplete="off" placeholder="github_pat_…" onChange={event => setToken(event.target.value)} disabled={busy} />
           <button type="button" className="pencil-btn-secondary cms-test-connection" disabled={busy || autoLoading} onClick={() => void testConnection()}>{testing ? '正在测试…' : '测试有效性'}</button>
         </div>
       </div>
      <div className="cms-repo-grid">{([['owner', '仓库所有者'], ['repo', '仓库名称'], ['branch', '分支']] as const).map(([key, label]) => <label className="cms-field" key={key}>{label}<input aria-label={label} value={repo[key]} disabled={busy} onChange={event => { confirmedReload.current = null; setRepo(previous => ({ ...previous, [key]: event.target.value })); setCommitUrl(''); }} /></label>)}<label className="cms-field">内容文件路径<input readOnly value={repo.path} /></label></div>
      <label className="cms-field">提交说明<input aria-label="提交说明" value={commitMessage} disabled={busy || autoLoading} onChange={event => setCommitMessage(event.target.value)} /></label>
      <div className="cms-button-row"><button type="button" className="pencil-btn-secondary cms-connect" disabled={busy || autoLoading} onClick={() => void connect()}>{autoLoading ? '自动载入中…' : '重新载入仓库'}</button><span role="status">{connected ? `已连接 ${repo.owner}/${repo.repo} · ${repo.branch}` : autoLoading ? '正在自动载入仓库最新内容…' : '仓库尚未载入，请检查配置后重试。'}</span><button type="button" className="cms-text-btn" disabled={busy || autoLoading} onClick={() => { setToken(''); }}>清除令牌</button></div>
      <p className="cms-muted">仅授权目标仓库的 Contents 读写权限。提交会触发已绑定该分支的静态部署；若使用受保护分支，请使用允许直推的内容分支并在 GitHub 合并。仓库与分支配置仅保存在当前页面。</p>
      {commitUrl && <p><a className="cms-commit-link" href={commitUrl} target="_blank" rel="noopener noreferrer">查看 GitHub 提交 ↗</a> · <a href={`https://github.com/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/actions`} target="_blank" rel="noopener noreferrer">查看构建 / 部署状态 ↗</a></p>}
      {loadError && <p role="alert">站点静态资源提示：{loadError}。仍可连接 GitHub 读取仓库内容。</p>}
    </section>}
    </fieldset></main><footer className="cms-footnote">铅笔可以修改，发布需要确认。 · GitHub Contents API · 部署完成后全站生效</footer></div>;
}
export { CmsView };
