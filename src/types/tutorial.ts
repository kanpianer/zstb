export type SystemCategory = 'apple' | 'android' | 'windows' | 'linux';
export type SubSystemCategory = 'ios' | 'macos' | 'android' | 'windows' | 'linux';

export interface StylizedAnnotation {
  id: string;
  label: string;
  note: string;
  xPercent: number; // For interactive pencil pin
  yPercent: number;
}

export interface StylizedScreenshot {
  deviceType: 'iphone' | 'macbook' | 'android' | 'windows' | 'terminal';
  deviceSpec: string; // e.g. "iPhone 16 Pro (Retina 120Hz, Super Retina XDR)"
  screenResolution: string; // e.g. "1179 × 2556 px"
  title: string;
  caption?: string;
  colorScheme: 'light' | 'dark';
  annotations: StylizedAnnotation[];
  mockData: {
    status: string;
    trafficTotal?: string;
    outboundMode?: string;
    activeNodes?: Array<{ name: string; type: string; ping: number; selected?: boolean }>;
    logs?: string[];
  };
}

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
  updatedAt: string; // 更新时间
  isOpenSource: boolean; // 是否开源
  license: string; // 开源许可证 / 商业授权
  price?: string; // 软件价格 (含货币单位、数值与买断说明，如 "约 $2.99 买断")
  releasedAt: string; // 工具最初发布时间
  latestVersion: string; // 当前最新版本号
  updatePath: string; // 独立更新路径，例如 "data/tutorials/ios/shadowrocket.md"
  
  // Links
  officialSite?: string;
  githubRepo?: string;
  appStoreUrl?: string;
  
  // Specifications
  specs: {
    compatibility: string; // 兼容系统
    architecture: string; // 架构 (x64, arm64, Apple Silicon)
    coreEngine: string; // 底层内核 (Mihomo, Xray, sing-box, eBPF)
    protocols: string[]; // 支持的协议
    trafficHandling: string; // 流量处理方式 (TUN, 系统代理, 透明代理)
    resourceFootprint: string; // 内存与性能开销
  };
  
  // Stylized visual presentation
  screenshot: StylizedScreenshot;
  
  // Standard Step-by-Step Tutorial
  tutorial: {
    overview: string;
    prerequisites: string[];
    steps: TutorialStep[];
    advancedRules: string[];
    faq: Array<{ question: string; answer: string }>;
  };
  
  // Crowdsourcing History
  changelog: CrowdsourceLog[];
}
