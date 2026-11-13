import { ALL_TOOLS, QUADRANTS_CONFIG, QuadrantMeta } from '../data/tutorials';
import { SoftwareTool, SubSystemCategory, SystemCategory } from '../types/tutorial';

export const SYSTEMS: SubSystemCategory[] = ['ios', 'macos', 'android', 'windows', 'linux'];
export interface SiteContent {
  version: 1;
  tools: SoftwareTool[];
  quadrants: Record<SystemCategory, QuadrantMeta>;
  settings: { siteName: string; siteSubtitle: string; footerText: string; footerLinkLabel: string; footerLinkUrl: string };
  cardOrder: Record<SubSystemCategory, string[]>;
  homeOrder: Record<SubSystemCategory, string[]>;
  appleOrder: ('ios' | 'macos')[];
}
export function createDefaultContent(): SiteContent {
  const order = Object.fromEntries(SYSTEMS.map(system => [system, ALL_TOOLS.filter(t => t.system === system).map(t => t.id)])) as Record<SubSystemCategory, string[]>;
  return structuredClone({ version: 1, tools: ALL_TOOLS, quadrants: QUADRANTS_CONFIG, settings: {
    siteName: '紙上談兵', siteSubtitle: '翻墙教程', footerText: '© 2026 纸上谈兵 · 主流翻墙工具教程',
    footerLinkLabel: 'Github', footerLinkUrl: 'https://github.com/kanpianer/zstb',
  }, cardOrder: order, homeOrder: structuredClone(order), appleOrder: ['ios', 'macos'] });
}

// Validate the complete editable resource, including optional fields absent from a given tutorial.
type Schema = 'string' | 'number' | 'boolean' | { [key: string]: Schema } | Schema[];
const step: Schema = { stepNumber: 'number', title: 'string', description: 'string', 'codeSnippet?': 'string', 'codeLanguage?': 'string', 'pencilTip?': 'string', 'highlightWords?': ['string'], 'images?': [{ src: 'string', alt: 'string', caption: 'string' }], 'imageColumns?': 'number' };
const action: Schema = { 'prefixText?': 'string', url: 'string', name: 'string', 'iconSrc?': 'string', 'suffixText?': 'string', 'title?': 'string' };
const toolSchema: Schema = {
  id: 'string', name: 'string', shortName: 'string', system: 'string', category: 'string', tagline: 'string', description: 'string', iconName: 'string', badgeText: 'string',
  updatedAt: 'string', isOpenSource: 'boolean', license: 'string', 'price?': 'string', releasedAt: 'string', latestVersion: 'string', updatePath: 'string',
  'officialSite?': 'string', 'officialSiteLabel?': 'string', 'officialSiteIcon?': 'string', 'githubRepo?': 'string', 'appStoreUrl?': 'string', 'playStoreUrl?': 'string', 'homebrewUrl?': 'string', 'releasesUrl?': 'string',
  specs: { compatibility: 'string', architecture: 'string', coreEngine: 'string', protocols: ['string'], trafficHandling: 'string' },
  tutorial: { overview: 'string', prerequisites: ['string'], 'prerequisiteAction?': action, 'prerequisiteActions?': [action], steps: [step], advancedRules: ['string'], faq: [{ question: 'string', answer: 'string' }] },
  changelog: [{ date: 'string', author: 'string', 'authorAvatar?': 'string', prNumber: 'number', summary: 'string', commitHash: 'string' }],
};
function check(value: unknown, schema: Schema, path: string): void {
  if (typeof schema === 'string') {
    if (typeof value !== schema || (typeof value === 'number' && !Number.isFinite(value))) throw new Error(`${path} 类型不正确`);
    return;
  }
  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) throw new Error(`${path} 必须是数组`);
    value.forEach((item, i) => check(item, schema[0], `${path}[${i}]`));
    return;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path} 必须是对象`);
  const obj = value as Record<string, unknown>;
  for (const [key, child] of Object.entries(schema)) {
    const optional = key.endsWith('?');
    const name = optional ? key.slice(0, -1) : key;
    if (optional && !(name in obj)) continue;
    check(obj[name], child, `${path}.${name}`);
  }
  for (const key of Object.keys(obj)) {
    if (!(key in schema) && !(`${key}?` in schema)) throw new Error(`${path}.${key} 不是支持的字段`);
  }
}
export function validateContent(value: unknown): asserts value is SiteContent {
  const orderSchema = Object.fromEntries(SYSTEMS.map(s => [s, ['string']])) as Record<string, Schema>;
  const quadrantSchema: Schema = { id: 'string', name: 'string', englishTitle: 'string', representativeTool: 'string', bgDescription: 'string', subTitle: 'string', 'badge?': 'string', toolCount: 'number' };
  check(value, { version: 'number', tools: [toolSchema], quadrants: Object.fromEntries(['apple', 'android', 'windows', 'linux'].map(s => [s, quadrantSchema])),
    settings: { siteName: 'string', siteSubtitle: 'string', footerText: 'string', footerLinkLabel: 'string', footerLinkUrl: 'string' }, cardOrder: orderSchema, homeOrder: orderSchema, appleOrder: ['string'] }, '内容');
  const c = value as SiteContent;
  if (c.version !== 1) throw new Error('不支持的内容版本');
  if (c.tools.length !== ALL_TOOLS.length || new Set(c.tools.map(t => t.id)).size !== c.tools.length) throw new Error('软件清单不完整或 ID 重复');
  for (const original of ALL_TOOLS) {
    const t = c.tools.find(t => t.id === original.id);
    if (!t || t.system !== original.system || t.category !== original.category) throw new Error(`不可改变软件 ${original.id} 的 ID 或所属系统`);
    if (!t.name.trim() || !t.shortName.trim()) throw new Error('软件名称和简称不能为空');
    for (const step of t.tutorial.steps) {
      if (step.imageColumns !== undefined && step.imageColumns !== 1 && step.imageColumns !== 2) throw new Error('截图列数仅支持 1 或 2');
    }
  }
  for (const system of SYSTEMS) {
    const ids = c.tools.filter(t => t.system === system).map(t => t.id);
    for (const order of [c.cardOrder[system], c.homeOrder[system]]) {
      if (order.length !== ids.length || new Set(order).size !== ids.length || order.some(id => !ids.includes(id))) throw new Error(`${system} 排序必须包含该系统全部软件且不得重复`);
    }
  }
  if (c.appleOrder.length !== 2 || new Set(c.appleOrder).size !== 2 || c.appleOrder.some(s => s !== 'ios' && s !== 'macos')) throw new Error('苹果系统顺序必须包含 iOS 和 macOS');
  for (const key of ['apple', 'android', 'windows', 'linux'] as const) if (c.quadrants[key].id !== key) throw new Error('象限 ID 不可修改');
  const walk = (node: unknown, key = '') => {
    if (typeof node === 'string' && /(?:url|site|repo|src|avatar|icon)$/i.test(key) && node) {
      if (node !== node.trim() || /[\u0000-\u0020\u007f\\]/.test(node)) throw new Error(`${key} 链接包含无效字符`);
      if (!/^https?:\/\//i.test(node) && !/^\/(?!\/)/.test(node)) throw new Error(`${key} 仅支持 HTTP(S) 或站内绝对路径`);
    } else if (Array.isArray(node)) node.forEach(item => walk(item, key));
    else if (node && typeof node === 'object') Object.entries(node).forEach(([k, v]) => walk(v, k));
  };
  walk(c);
}

// Compatibility at input boundaries only: old deployments, GitHub files and backups may
// still contain these retired fields. Drop them without relaxing any other validation.
export function parseContent(value: unknown): SiteContent {
  const next: unknown = structuredClone(value);
  if (next && typeof next === 'object' && 'tools' in next && Array.isArray(next.tools)) {
    for (const tool of next.tools) {
      if (!tool || typeof tool !== 'object' || Array.isArray(tool)) continue;
      delete tool.screenshot;
      if (tool.specs && typeof tool.specs === 'object' && !Array.isArray(tool.specs)) {
        delete tool.specs.resourceFootprint;
      }
    }
  }
  validateContent(next);
  return next;
}

let activeContent: SiteContent | null = null;
export function setActiveContent(content: SiteContent) { activeContent = content; }
export function getActiveContent() { return activeContent; }
export function getSettings() { return activeContent?.settings ?? createDefaultContent().settings; }
export function getAppleOrder(): ('ios' | 'macos')[] { return activeContent?.appleOrder ?? ['ios', 'macos']; }
export const STATIC_CONTENT_URL = '/content/site-content.json';
// Visitors only read the deployed static artifact. GitHub credentials are never needed here.
export async function fetchContent(): Promise<SiteContent> {
  const response = await fetch(STATIC_CONTENT_URL, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`静态内容加载失败（${response.status}），请检查站点部署`);
  const data: unknown = await response.json();
  // A tracked null seed keeps the original tutorial modules authoritative until the first CMS commit.
  if (data === null) return createDefaultContent();
  return parseContent(data);
}
