import { SoftwareTool } from '../../../types/tutorial';

export const clashPartyMac: SoftwareTool = {
  id: 'clash-party-mac',
  name: 'Clash Party',
  shortName: 'Clash Party',
  system: 'macos',
  category: 'apple',
  tagline: '开箱即用、界面极为优雅精美的代理客户端新标杆（原 Mihomo Party）',
  description: 'Clash Party（原名 Mihomo Party）凭借简洁极具设计感的 UI 交互、开箱即用的分流配置预设以及对 Mihomo 全特性的深度集成，在 Mac 圈子内迅速积累了极高的人气。内置 Smart 智能测速、Sub-Store 订阅聚合与免服务的 TUN 模式，被称作“专为强迫症设计的代理客户端”。',
  iconName: 'Sparkles',
  badgeText: '新一代美学先锋',
  
  updatedAt: '2026-03-28',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2024-01-10',
  latestVersion: 'v1.6.5',
  updatePath: 'data/tutorials/macos/clash-party-mac.md',
  
  officialSite: 'https://clashparty.org',
  githubRepo: 'https://github.com/mihomo-party-org/clash-party',
  
  specs: {
    compatibility: 'macOS 12.0 或更高版本',
    architecture: 'Apple Silicon 原生 + Intel x64',
    coreEngine: 'Mihomo Core (Alpha / Release)',
    protocols: ['VLESS (Reality)', 'VMess', 'Hysteria 2', 'TUIC v5', 'Trojan', 'Shadowsocks', 'WireGuard'],
    trafficHandling: '一键系统代理 + 智能 TUN 虚拟网卡 (免额外服务安装)',
    resourceFootprint: 'Electron 优化版，内存占用约 60MB - 90MB'
  },
  
  screenshot: {
    deviceType: 'macbook',
    deviceSpec: 'MacBook Air 13" (M-Series)',
    screenResolution: '2560 × 1664 像素',
    title: 'Clash Party 优雅暗色/亮色切换与订阅中心',
    colorScheme: 'light',
    annotations: [
      { id: 'cp1', label: '① 节点矩阵', note: '卡片式分组呈现，支持流媒体解锁状态角标标记与 Smart 测速', xPercent: 50, yPercent: 35 },
      { id: 'cp2', label: '② 一键覆写与 Sub-Store', note: '内置常用规则覆写与 Sub-Store 集成，自动规避 DNS 泄漏', xPercent: 20, yPercent: 65 },
      { id: 'cp3', label: '③ 快速模式切换', note: '规则、全局、直连顶部三档轻触无缝切换', xPercent: 50, yPercent: 15 }
    ],
    mockData: {
      status: 'Clash Party 核心运行中 - Smart 延迟优选就绪',
      trafficTotal: '下行: 5.7 GB | 上行: 720 MB',
      outboundMode: 'Rule (智能规则)',
      activeNodes: [
        { name: '🇭🇰 香港 IEPL 企业内网专线', type: 'VLESS', ping: 25, selected: true },
        { name: '🇯🇵 日本 01 [支持 ChatGPT/Claude]', type: 'Reality', ping: 48 },
        { name: '🇸🇬 新加坡 02 高速出口', type: 'Hysteria 2', ping: 53 }
      ],
      logs: [
        '[Route] match GeoSite(google) -> Outbound(Proxy)',
        '[Route] match GeoIP(CN) -> Outbound(Direct)'
      ]
    }
  },
  
  tutorial: {
    overview: 'Clash Party（原 Mihomo Party）主打高颜值与零门槛上手，本教程带你快速完成配置。',
    prerequisites: [
      'macOS 12.0 或更新版本',
      '从官网 (https://clashparty.org) 或 GitHub 下载安装包',
      '任何通用 Clash / Mihomo 格式的订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装应用',
        description: '从 clashparty.org 官方网站或 GitHub Releases 页面下载 `clash-party-macos-arm64.dmg`（M系列芯片）或 `x64.dmg`（Intel芯片），双击拖入应用程序。',
        pencilTip: '首次启动支持全中文引导界面与浅色/深色主题自由切换。'
      },
      {
        stepNumber: 2,
        title: '粘贴订阅并一键更新',
        description: '打开软件，直接在首页醒目位置点击【添加订阅】，粘贴链接并点击确认。软件会自动下载节点并解析分组，也支持一键关联 Sub-Store。',
        codeSnippet: 'https://sub.provider.cc/subscribe?token=xxx&client=clash',
        codeLanguage: 'url',
        pencilTip: '软件默认开启了预配置规则集，无需手动繁琐微调即可规避绝大多数冲突。'
      },
      {
        stepNumber: 3,
        title: '启动代理与 TUN 模式',
        description: '点击左上角【启动】按钮。在设置选项卡中，开启【TUN 模式】开关即可接管终端与游戏流量（无需额外安装系统服务守护）。',
        pencilTip: '极具现代感的菜单栏小图标可随时掌控上下行速率。'
      }
    ],
    advancedRules: [
      '内置 Sub-Store：无缝聚合管理多个机场订阅，支持节点筛选、重命名与节点合并。',
      'WebDAV 云备份：一键备份当前配置规则到自建或坚果云 WebDAV，跨设备秒级恢复。'
    ],
    faq: [
      {
        question: 'Clash Party 与原 Mihomo Party 是什么关系？',
        answer: 'Clash Party 是 Mihomo Party 的官方更名演进版本，官方域名统一为 clashparty.org，全面继承了原有高颜值 UI、覆写配置与 Sub-Store 深度集成。'
      },
      {
        question: '它和 Clash Verge Rev 有什么区别？',
        answer: '两者底层都采用 Mihomo 核心，内核能力基本相同；Clash Party 更加注重视觉美感、动画细节以及 Sub-Store 的原生集成，更适合重视审美的日常用户。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-28',
      author: 'UIArtist',
      prNumber: 110,
      summary: '升级并更名为 Clash Party (clash-party)，更新官方域名 clashparty.org',
      commitHash: 'd883c91'
    }
  ]
};
