import { SoftwareTool, SubSystemCategory, SystemCategory } from '../../types/tutorial';

import { shadowrocket } from './ios/shadowrocket';
import { clashIos } from './ios/clash-ios';
import { quantumultX } from './ios/quantumult-x';
import { loon } from './ios/loon';

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
import { nekoray } from './windows/nekoray';

import { clashVergeRevLinux } from './linux/clash-verge-rev-linux';
import { v2raya } from './linux/v2raya';
import { openclash } from './linux/openclash';
import { dae } from './linux/dae';

// Master collection of tools
export const ALL_TOOLS: SoftwareTool[] = [
  // iOS (4 tools)
  shadowrocket,
  clashIos,
  quantumultX,
  loon,
  
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
  nekoray,
  
  // Linux & Others (4 tools)
  clashVergeRevLinux,
  v2raya,
  openclash,
  dae
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
    representativeTool: 'Clash Verge · v2rayA · OpenClash · dae',
    bgDescription: '',
    subTitle: 'Linux 桌面、服务器与网关工具及教程',
    toolCount: 4
  }
};

export function getToolsBySubSystem(subSystem: SubSystemCategory): SoftwareTool[] {
  return ALL_TOOLS.filter(t => t.system === subSystem).slice(0, 4); // Enforce max 4 tools strictly
}

export function getToolsByCategory(category: SystemCategory): SoftwareTool[] {
  return ALL_TOOLS.filter(t => t.category === category);
}

export function getToolById(id: string): SoftwareTool | undefined {
  return ALL_TOOLS.find(t => t.id === id);
}
