import { SoftwareTool } from '../../../types/tutorial';

export const singBoxMac: SoftwareTool = {
  id: 'sing-box-mac',
  name: 'Sing-box',
  shortName: 'Sing-box',
  system: 'macos',
  category: 'apple',
  tagline: '次世代通用网络核心、内存怪兽与官方 GUI 原生应用',
  description: 'Sing-box 是目前代理协议演进的技术引领者，由 SagerNet 团队倾力打造。官方 macOS 客户端采用原生 Swift 结合高性能 Go 核心构建，支持几乎所有前沿协议（Hysteria 2、TUIC v5、ShadowTLS 等），资源开销近乎为零。',
  iconName: 'Box',
  badgeText: '次世代核心',
  
  updatedAt: '2026-03-26',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-07-01',
  latestVersion: 'v1.11.2',
  updatePath: 'data/tutorials/macos/sing-box-mac.md',
  
  githubRepo: 'https://github.com/SagerNet/sing-box',
  officialSite: 'https://sing-box.sagernet.org',
  
  specs: {
    compatibility: 'macOS 12.0 (Monterey) 或更高版本',
    architecture: 'Universal (Apple Silicon 原生)',
    coreEngine: 'Sing-box Universal Proxy Platform (Go)',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'ShadowTLS', 'WireGuard', 'Direct/Block'],
    trafficHandling: '原生 System Extension 虚拟网卡 (TUN) + 系统代理',
    resourceFootprint: '极致轻量，常驻内存仅需 ~18MB - 28MB'
  },
  
  screenshot: {
    deviceType: 'macbook',
    deviceSpec: 'MacBook Pro 14" (Apple M3 Max)',
    screenResolution: '3024 × 1964 像素',
    title: 'Sing-box 官方客户端原生地图拓扑与仪表盘',
    colorScheme: 'light',
    annotations: [
      { id: 'sb1', label: '① 状态监控', note: '原生系统扩展极速接入，支持低延迟实时吞吐指示', xPercent: 50, yPercent: 20 },
      { id: 'sb2', label: '② 订阅与Profile', note: '支持本地 JSON/JSONC 规则或远程托管 Profile 订阅', xPercent: 30, yPercent: 50 },
      { id: 'sb3', label: '③ 独立分流出站', note: '每个出站（Outbound）均可独立配置测速探针与容灾回退', xPercent: 70, yPercent: 65 }
    ],
    mockData: {
      status: 'Sing-box 内核活跃中 - TUN (utun9) 托管',
      trafficTotal: '下行: 18.2 GB | 上行: 2.3 GB',
      outboundMode: 'Rule Base (Route Rules)',
      activeNodes: [
        { name: '🇭🇰 香港 01 Extreme [Hy2]', type: 'Hysteria 2', ping: 22, selected: true },
        { name: '🇯🇵 日本 02 Reality', type: 'VLESS-Reality', ping: 45 },
        { name: '🇸🇬 新加坡 03 TUIC v5', type: 'TUIC', ping: 51 }
      ],
      logs: [
        '[Router] match geosite:category-dev -> outbound:proxy',
        '[Inbound] tun[inbound/tun] inbound packet: 198.18.0.1:443'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程讲解如何在 Mac 上安装配置官方 Sing-box 客户端（SFM / SFI），发挥其卓越的前沿协议性能。',
    prerequisites: [
      'macOS 12 或更高版本系统',
      '支持 Sing-box 格式订阅或通用多协议节点'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装客户端',
        description: '前往官方 GitHub Releases 页面或 Mac App Store（非国区）下载 Sing-box for macOS 客户端（.dmg 或 AppStore 安装）。',
        pencilTip: '安装后首次启动，请在弹出的系统提示中允许添加系统网络扩展。'
      },
      {
        stepNumber: 2,
        title: '添加配置 Profiles',
        description: '在左侧点击【Profiles】，点击右上角【+】，选择【New Profile】。可直接输入机场的 Sing-box 订阅 URL，或导入本地编写的高级 `config.json` 文件。',
        codeSnippet: 'https://api.yourproxy.net/sub/singbox?token=mytoken123',
        codeLanguage: 'url',
        pencilTip: '如果是自建节点，可以编写原生的 JSON 配置，支持极其精细的路由分支规则。'
      },
      {
        stepNumber: 3,
        title: '启动连接与策略选择',
        description: '在主界面切换启用刚导入的配置，拨动右上角【Enable】开关。点击【Dashboard】即可查看当前活动连接并根据延迟选择最优节点。',
        pencilTip: 'Sing-box 的内核占用极小，放在后台几乎完全无感，电池续航不受影响。'
      }
    ],
    advancedRules: [
      '使用 Headless 模式：可以通过 `brew install sing-box` 在后台使用 launchd 作为纯守护进程运行。'
    ],
    faq: [
      {
        question: '为什么部分旧机场订阅无法在 Sing-box 正常导入？',
        answer: 'Sing-box 采用全新的配置规范（JSON 语法），需要机场支持生成原生 sing-box 订阅，或使用订阅转换工具转为 sing-box 格式。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-26',
      author: 'SingBoxAdvocate',
      prNumber: 108,
      summary: '升级 Sing-box 1.11.2 客户端配置格式与 System Extension 安装指引',
      commitHash: 'd382ca1'
    }
  ]
};
