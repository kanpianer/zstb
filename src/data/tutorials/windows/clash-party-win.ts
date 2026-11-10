import { SoftwareTool } from '../../../types/tutorial';

export const clashPartyWin: SoftwareTool = {
  id: 'clash-party-win',
  name: 'Clash Party (Windows)',
  shortName: 'Clash Party',
  system: 'windows',
  category: 'windows',
  tagline: 'Windows 上极具美感、操作直观的次世代代理客户端（原 Mihomo Party）',
  description: 'Clash Party（原名 Mihomo Party）为 Windows 用户带来了媲美 macOS 原生体验的精美视觉。支持丰富的流媒体解锁检测、直观的分组拖拽排序、免服务模式的 TUN 虚拟网卡以及深度集成的 Sub-Store 订阅聚合，让新手也能在 Windows 上享受极客级的网络体验。',
  iconName: 'Sparkles',
  badgeText: '精美易用',
  
  updatedAt: '2026-03-28',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2024-01-10',
  latestVersion: 'v1.6.5',
  updatePath: 'data/tutorials/windows/clash-party-win.md',
  
  officialSite: 'https://clashparty.org',
  githubRepo: 'https://github.com/mihomo-party-org/clash-party',
  
  specs: {
    compatibility: 'Windows 10 / Windows 11 (64位)',
    architecture: 'x64 / arm64',
    coreEngine: 'Mihomo Core (Alpha/Release)',
    protocols: ['VLESS-Reality', 'Hysteria 2', 'TUIC v5', 'VMess', 'Trojan', 'Shadowsocks', 'WireGuard'],
    trafficHandling: 'Windows 系统代理 + 智能 TUN 虚拟网卡 (免服务模式)',
    resourceFootprint: 'Electron 深度优化版，内存占用约 60MB - 90MB'
  },
  
  screenshot: {
    deviceType: 'windows',
    deviceSpec: 'Windows 11 PC (2K 144Hz)',
    screenResolution: '2560 × 1440 像素',
    title: 'Clash Party Windows 仪表板与流媒体解锁检测',
    colorScheme: 'light',
    annotations: [
      { id: 'cpw1', label: '① 节点流媒体角标', note: '自动检测节点是否支持解锁 Netflix、ChatGPT、Disney+ 等', xPercent: 50, yPercent: 30 },
      { id: 'cpw2', label: '② 一键启停开关', note: '左上角大按钮切换启动与停止，右下角托盘图标同步更新', xPercent: 15, yPercent: 15 },
      { id: 'cpw3', label: '③ 脚本与规则扩展', note: '内置常用规则覆写，自动规避国内直连 DNS 污染', xPercent: 50, yPercent: 70 }
    ],
    mockData: {
      status: 'Clash Party 正在运行 - TUN 已开启',
      trafficTotal: '下行: 8.4 GB | 上行: 1.1 GB',
      outboundMode: 'Rule (分流规则)',
      activeNodes: [
        { name: '🇭🇰 香港 01 [解锁 ChatGPT]', type: 'VLESS', ping: 27, selected: true },
        { name: '🇯🇵 日本 02 [原生 IP]', type: 'Reality', ping: 49 },
        { name: '🇺🇸 美国 03 [4K 极速]', type: 'Hysteria 2', ping: 135 }
      ],
      logs: [
        '[TCP] outbound proxy connected to google.com via HK 01',
        '[TUN] wintun driver hooked'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程讲解在 Windows 上安装 Clash Party（原 Mihomo Party），快速导入订阅并开启系统代理。',
    prerequisites: [
      'Windows 10 或 Windows 11 系统',
      '从官网 (https://clashparty.org) 或 GitHub 下载 Windows 安装包',
      'Clash 订阅格式或通用订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装',
        description: '在 clashparty.org 官方网站或 GitHub Releases 下载 `clash-party-windows-x64-setup.exe`，安装并启动。',
        pencilTip: '界面非常现代化，支持浅色和深色皮肤自由切换。'
      },
      {
        stepNumber: 2,
        title: '导入订阅',
        description: '点击主界面的【订阅】按钮，粘贴机场链接，点击确认下载。软件也内置 Sub-Store，可一键导入节点。',
        codeSnippet: 'https://sub.airport.cc/api/v1/client/subscribe?token=xxx&flag=clash',
        codeLanguage: 'url',
        pencilTip: '订阅下载后自动进行分流编排，开箱即用。'
      },
      {
        stepNumber: 3,
        title: '开启代理与使用',
        description: '点击主界面的【启动】大开关，在代理列表中挑选喜欢的节点即可开启科学上网。开启 TUN 模式可全局拦截所有流量。',
        pencilTip: '可随时在托盘右键菜单中快速切换节点。'
      }
    ],
    advancedRules: [
      '开启免服务 TUN 模式：设置中打开 TUN 模式，免去第三方软件的代理配置。',
      'WebDAV 备份：支持将订阅和覆写规则自动同步至云端。'
    ],
    faq: [
      {
        question: '它相比原版 Clash for Windows 有何优势？',
        answer: '原版 CFW 早已于 2023 年底停更；Clash Party 采用全新的 Meta/Mihomo 内核，全面支持 Reality、Hysteria 2 等新协议，且开箱即用支持免服务安装 TUN 模式，完全没有安全隐患。'
      },
      {
        question: 'Clash Party 与 Mihomo Party 的区别？',
        answer: '两者为同款项目，Clash Party 为官方正式更名版本，官方网址迁移至 clashparty.org，功能持续迭代更新。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-28',
      author: 'ModernUIFan',
      prNumber: 108,
      summary: '升级并更名为 Clash Party (clash-party)，更新官方域名 clashparty.org',
      commitHash: 'e719ea2'
    }
  ]
};
