import { SoftwareTool } from '../../../types/tutorial';

export const clashMac: SoftwareTool = {
  id: 'clash-mac',
  name: 'Clash',
  shortName: 'Clash',
  system: 'macos',
  category: 'apple',
  tagline: '常驻菜单栏、SwiftUI 原生打造的轻量高效 Mihomo 分流客户端',
  description: 'Clash (macOS) 是专为 Mac 打造的纯血原生规则分流代理客户端。基于开源 Mihomo (Clash.Meta) 内核与 SwiftUI 框架构建，常驻菜单栏即时掌控连接状态、模式与速率；支持不同进程/应用独立分流、网络质量检测小组件与快捷指令联动，完全无任何广告与遥测追踪。',
  iconName: 'Zap',
  badgeText: '原生纯血',
  
  updatedAt: '2026-03-29',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2024-10-15',
  latestVersion: 'v1.2.0',
  updatePath: 'data/tutorials/macos/clash-mac.md',
  
  officialSite: 'https://clash.md/platforms/macos',
  githubRepo: 'https://github.com/ProjectClash/Clash-Client',
  appStoreUrl: 'https://apps.apple.com/app/id6794257189?platform=mac',
  
  specs: {
    compatibility: 'macOS 14.0 (Sonoma) 或更高版本',
    architecture: 'Universal (Apple Silicon ARM64 & Intel x86_64 原生优化)',
    coreEngine: 'Mihomo Core (Clash.Meta) + Apple NetworkExtension',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'WireGuard'],
    trafficHandling: 'NetworkExtension PacketTunnel (utun) + 菜单栏轻量接管 + 进程/可执行路径分流',
    resourceFootprint: '原生 SwiftUI 极低开销，常驻内存仅 ~25MB - 45MB'
  },
  
  screenshot: {
    deviceType: 'macbook',
    deviceSpec: 'Apple MacBook Pro 16" (Liquid Retina XDR, M-Series)',
    screenResolution: '3456 × 2234 像素',
    title: 'Clash Mac 菜单栏控制器、活动连接脉络与分流规则',
    colorScheme: 'light',
    annotations: [
      { id: 'cm1', label: '① 菜单栏快捷控制', note: '常驻菜单栏，随手连接、断开、切换分流模式与查看实时速率', xPercent: 25, yPercent: 15 },
      { id: 'cm2', label: '② 进程级差异化分流', note: '按进程名称、可执行路径或 UID 分流浏览器、下载工具与终端环境', xPercent: 65, yPercent: 35 },
      { id: 'cm3', label: '③ 连接脉络一览无余', note: '活动连接、近期记录、命中规则全览，内置节点延迟与 NAT 质量诊断', xPercent: 50, yPercent: 75 }
    ],
    mockData: {
      status: 'Clash 运行中 - 规则模式 (Rule)',
      trafficTotal: '下行: 18.6 GB | 上行: 2.4 GB',
      outboundMode: 'Rule (分流规则)',
      activeNodes: [
        { name: '⚡ [Auto] 香港专线 01', type: 'VLESS-Reality', ping: 22, selected: true },
        { name: '🇯🇵 日本 02 优质流媒体', type: 'Hysteria 2', ping: 48 },
        { name: '🇸🇬 新加坡 03 高速节点', type: 'Trojan', ping: 55 },
        { name: '🇺🇸 美国 04 原生落地', type: 'VMess', ping: 135 }
      ],
      logs: [
        '[Process: Safari] Route domain: github.com -> PROXY [Auto]',
        '[Process: Terminal] utun5 packet redirected via Mihomo',
        '[DNS] doh.pub query resolved in 12ms'
      ]
    }
  },
  
  tutorial: {
    overview: 'Clash Mac 版让浏览器、下载工具和开发环境按规则各行其道；连接、模式与速率就在菜单栏，掌控始终在手边。本教程演示从安装到订阅配置与日常使用的完整流程。',
    prerequisites: [
      'macOS 14.0 或更高版本的 Mac 电脑 (Apple Silicon 或 Intel)',
      '从 Mac App Store 或 clash.md (https://clash.md/platforms/macos) 获取应用',
      '通用 Clash / Mihomo 格式订阅链接或本地配置文件'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载与安装 Clash Mac 版',
        description: '访问官方网站 (https://clash.md/platforms/macos) 点击 Mac App Store 徽章安装，或通过 Telegram 申请 TestFlight Beta 资格。首次打开时，根据系统提示授予网络扩展（NetworkExtension）与 VPN 配置权限。',
        pencilTip: '若 Apple ID 为中国大陆地区，请切换至外区 Apple ID 登录 Mac App Store 下载安装。'
      },
      {
        stepNumber: 2,
        title: '导入订阅配置 (Profiles)',
        description: '打开应用进入【配置 (Profiles)】界面，点击右上角【+】新增配置，选择【从 URL 下载】，填入机场提供的 Clash / Mihomo 订阅链接并设置配置名称，点击保存并拉取节点列表。',
        codeSnippet: 'https://sub.airport.org/api/v1/client/subscribe?token=xxx&flag=clash',
        codeLanguage: 'url',
        pencilTip: '支持从本地直接导入 .yaml 配置文件，也支持多个配置文件之间随时热切换。'
      },
      {
        stepNumber: 3,
        title: '选择分流模式与节点策略',
        description: '进入【代理 (Proxies)】界面或在菜单栏快速面板中，将模式设置为【规则 (Rule)】。可以在各个策略组中手动选择心仪节点，或直接选择自动测速优选分组 (URL-Test / Auto)。',
        pencilTip: '点击延迟测速按钮可并发测试所有节点延迟；亦可在“快捷指令”中配置自动化任务。'
      },
      {
        stepNumber: 4,
        title: '启动代理与常驻菜单栏',
        description: '点击主开关启动代理服务。Clash 将常驻在 macOS 菜单栏，实时显示上行/下行速率与连接状态；需要调整节点或切换模式时随手在菜单栏即可搞定。',
        pencilTip: '支持小组件固定在桌面；还可利用进程规则让终端开发工具、浏览器走不同节点。'
      }
    ],
    advancedRules: [
      '进程级精细分流：在配置文件或规则列表中添加 PROCESS-NAME 规则，让指定软件（如 Terminal、Xcode、Telegram 等）走专用代理或直连线路。',
      '小组件与快捷指令联动：将 Clash 状态与常用策略组放置在 macOS 桌面上，配合快捷指令实现按场景自动启停。'
    ],
    faq: [
      {
        question: 'Clash Mac 版相比原有的 Surge for Mac 或 Electron 客户端有何优势？',
        answer: 'Clash Mac 版采用原生 SwiftUI 架构开发，相比 Electron 客户端更为轻巧丝滑、极度省电且常驻内存低；相比商业软件 Surge 则完全免费且核心开源，开箱即用支持最新的 Mihomo/Meta 新协议生态（Reality、Hysteria 2 等）。'
      },
      {
        question: 'Mac App Store 提示当前地区未上架或无法下载？',
        answer: '由于政策限制，Clash 未在中国大陆与俄罗斯区 App Store 上架。请切换外区（美区/港区/日区等）Apple ID 登录下载，或通过官方页面加入 TestFlight 测试体验。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-29',
      author: 'ClashMaintainer',
      prNumber: 128,
      summary: '收录 Clash (macOS) 原生客户端图文教程，替换原 Surge 配置',
      commitHash: 'c3e819b'
    }
  ]
};
