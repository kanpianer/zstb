import { SoftwareTool, SubSystemCategory, SystemCategory } from '../../types/tutorial';
import { getActiveContent } from '../../cms/content';

import { shadowrocket } from './ios/shadowrocket';
import { clashIos } from './ios/clash-ios';
import { singBoxIos } from './ios/sing-box-ios';
import { karing } from './ios/karing';

import { clashVergeRevMac } from './macos/clash-verge-rev-mac';
import { clashMac } from './macos/clash-mac';
import { clashPartyMac } from './macos/clash-party-mac';
import { singBoxMac } from './macos/sing-box-mac';

import { v2rayng } from './android/v2rayng';
import { flclash } from './android/flclash';
import { nekoboxAndroid } from './android/nekobox-android';
import { singBoxAndroid } from './android/sing-box-android';

import { v2rayn } from './windows/v2rayn';
import { clashVergeRevWin } from './windows/clash-verge-rev-win';
import { clashPartyWin } from './windows/clash-party-win';
import { singBoxWin } from './windows/sing-box-win';

import { clashVergeRevLinux } from './linux/clash-verge-rev-linux';
import { v2raya } from './linux/v2raya';
import { openclash } from './linux/openclash';
import { vpsNodes } from './linux/vps-nodes';

// Master collection of tools
export const ALL_TOOLS: SoftwareTool[] = [
  // iOS (4 tools)
  shadowrocket,
  clashIos,
  singBoxIos,
  karing,
  
  // macOS (4 tools)
  clashVergeRevMac,
  clashMac,
  clashPartyMac,
  singBoxMac,
  
  // Android (4 tools)
  v2rayng,
  flclash,
  nekoboxAndroid,
  singBoxAndroid,
  
  // Windows (4 tools)
  v2rayn,
  clashVergeRevWin,
  clashPartyWin,
  singBoxWin,
  
  // Linux & Others (4 tools)
  clashVergeRevLinux,
  v2raya,
  openclash,
  vpsNodes
];

export interface QuadrantMeta {
  id: SystemCategory;
  name: string;
  englishTitle: string;
  representativeTool: string;
  bgDescription: string;
  subTitle: string;
  badge?: string;
  toolCount: number;
}

export const QUADRANTS_CONFIG: Record<SystemCategory, QuadrantMeta> = {
  apple: {
    id: 'apple',
    name: '苹果系统',
    englishTitle: 'iOS & macOS',
    representativeTool: 'Shadowrocket · Clash · Clash Verge',
    bgDescription: '',
    subTitle: 'iOS 与 macOS 翻墙工具及教程',
    toolCount: 8
  },
  android: {
    id: 'android',
    name: '安卓系统',
    englishTitle: 'Android',
    representativeTool: 'v2rayNG · FlClash · NekoBox',
    bgDescription: '',
    subTitle: '安卓系统翻墙工具及教程',
    toolCount: 4
  },
  windows: {
    id: 'windows',
    name: 'Windows系统',
    englishTitle: 'Windows',
    representativeTool: 'v2rayN · Clash Verge · Clash Party',
    bgDescription: '',
    subTitle: 'Windows 系统翻墙工具及教程',
    toolCount: 4
  },
  linux: {
    id: 'linux',
    name: 'Linux 和软路由',
    englishTitle: 'Linux & Soft Router',
    representativeTool: 'Clash Verge · v2rayA · OpenClash · 自己搭建节点',
    bgDescription: '',
    subTitle: 'Linux 桌面、服务器与网关工具及教程',
    toolCount: 4
  }
};

export function getQuadrants() { return getActiveContent()?.quadrants ?? QUADRANTS_CONFIG; }

export function getToolsBySubSystem(subSystem: SubSystemCategory, placement: 'card' | 'home' = 'card'): SoftwareTool[] {
  const content = getActiveContent();
  const tools = (content?.tools ?? ALL_TOOLS).filter(t => t.system === subSystem);
  const order = content?.[placement === 'home' ? 'homeOrder' : 'cardOrder'][subSystem];
  return order ? [...tools].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)) : tools;
}

export function getToolsByCategory(category: SystemCategory, placement: 'card' | 'home' = 'card'): SoftwareTool[] {
  if (category === 'apple') return [...getToolsBySubSystem('ios', placement), ...getToolsBySubSystem('macos', placement)];
  return getToolsBySubSystem(category, placement);
}

export function getToolById(id: string): SoftwareTool | undefined {
  const tools = getActiveContent()?.tools ?? ALL_TOOLS;
  if (id === 'dae' || id === 'self-built-node') {
    return tools.find(t => t.id === 'vps-nodes') || tools.find(t => t.id === id);
  }
  return tools.find(t => t.id === id);
}
