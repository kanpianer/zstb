export type SystemCategory = 'apple' | 'android' | 'windows' | 'linux';
export type SubSystemCategory = 'ios' | 'macos' | 'android' | 'windows' | 'linux';

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
  codeLanguage?: string;
  pencilTip?: string;
  highlightWords?: string[];
}

export interface CrowdsourceLog {
  date: string;
  author: string;
  authorAvatar?: string;
  prNumber: number;
  summary: string;
  commitHash: string;
}

export interface PrerequisiteAction {
  prefixText?: string; // 默认 "到"
  url: string; // 链接
  name: string; // "Akile" 或 "家宽导航"
  iconSrc?: string; // 图标路径
  suffixText?: string; // "买服务器" 或 "购买节点"
  title?: string; // 悬停提示
}

export interface SoftwareTool {
  id: string;
  name: string;
  shortName: string;
  system: SubSystemCategory;
  category: SystemCategory;
  tagline: string;
  description: string;
  iconName: string; // icon identifier
  badgeText: string;
  
  // Mandatory Standardized Metadata
  updatedAt: string; // 最近更新时间
  isOpenSource: boolean; // 是否开源
  license: string; // 开源许可证 / 商业授权
  price?: string; // 软件价格 (含货币单位、数值与买断说明，如 "约 $2.99 买断")
  releasedAt: string; // 工具最初发布时间
  latestVersion: string; // 当前最新版本号
  updatePath: string; // 独立更新路径，例如 "data/tutorials/ios/shadowrocket.md"
  
  // Links
  officialSite?: string;
  officialSiteLabel?: string; // 自定义官网按钮文案
  officialSiteIcon?: string; // 自定义官网按钮图标路径 (如 "/bxdt-icon.png")
  githubRepo?: string;
  appStoreUrl?: string;
  playStoreUrl?: string; // Google Play 地址
  homebrewUrl?: string; // Homebrew (formulae.brew.sh) 地址
  releasesUrl?: string; // GitHub Releases 软件下载地址
  
  // Specifications
  specs: {
    compatibility: string; // 兼容系统
    architecture: string; // 架构 (x64, arm64, Apple Silicon)
    coreEngine: string; // 底层内核 (Mihomo, Xray, sing-box, eBPF)
    protocols: string[]; // 支持的协议
    trafficHandling: string; // 流量处理方式 (TUN, 系统代理, 透明代理)
  };
  
  // Standard Step-by-Step Tutorial
  tutorial: {
    overview: string;
    prerequisites: string[];
    prerequisiteAction?: PrerequisiteAction;
    prerequisiteActions?: PrerequisiteAction[];
    steps: TutorialStep[];
    advancedRules: string[];
    faq: Array<{ question: string; answer: string }>;
  };
  
  // Crowdsourcing History
  changelog: CrowdsourceLog[];
}
