import { SoftwareTool } from '../../../types/tutorial';

export const clashIos: SoftwareTool = {
  id: 'clash-ios',
  name: 'Clash (iOS)',
  shortName: 'Clash',
  system: 'ios',
  category: 'apple',
  tagline: '基于 SwiftUI 原生打造的现代化 Mihomo 内核分流客户端',
  description: 'Clash (iOS) 是基于开源 Mihomo (Clash.Meta) 内核专为 Apple 生态打造的纯血原生代理客户端。采用原生 SwiftUI 编写，深度集成 iOS 系统特性（控制中心、快捷指令、小组件），支持全协议分流规则与极速自动测速选优，无任何广告与第三方追踪。',
  iconName: 'Zap',
  badgeText: '原生纯血',
  
  updatedAt: '2026-03-28',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2024-10-15',
  latestVersion: 'v1.2.0',
  updatePath: 'data/tutorials/ios/clash-ios.md',
  
  officialSite: 'https://clash.md/platforms/ios',
  githubRepo: 'https://github.com/ProjectClash/Clash-Client',
  appStoreUrl: 'https://apps.apple.com/app/id6794257189',
  
  specs: {
    compatibility: 'iOS 16.0 / iPadOS 16.0 或更高版本',
    architecture: 'Apple Silicon ARM64 原生 (SwiftUI)',
    coreEngine: 'Mihomo Core (Clash.Meta) + Apple NetworkExtension',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'WireGuard'],
    trafficHandling: 'NetworkExtension PacketTunnel 虚拟网卡 (TUN 全局/分流)',
    resourceFootprint: '原生 SwiftUI 内存占用仅 ~18MB - 35MB，极度省电'
  },
  
  screenshot: {
    deviceType: 'iphone',
    deviceSpec: 'Apple iPhone 16 Pro',
    screenResolution: '1206 × 2622 像素',
    title: 'Clash 节点列表、延迟测速与策略组编排',
    colorScheme: 'light',
    annotations: [
      { id: 'c1', label: '① 模式切换', note: '支持规则 (Rule)、全局 (Global) 与直连 (Direct) 极速三档切换', xPercent: 50, yPercent: 14 },
      { id: 'c2', label: '② 智能策略组', note: '自动根据延迟优选节点 (URL-Test) 或备用故障转移 (Fallback)', xPercent: 50, yPercent: 36 },
      { id: 'c3', label: '③ 延迟测速', note: '点击即可对全组节点进行并发测速，毫秒级响应直观呈现', xPercent: 50, yPercent: 62 },
      { id: 'c4', label: '④ 系统深度集成', note: '支持 iOS 控制中心快捷开关与快捷指令自动化联动', xPercent: 80, yPercent: 82 }
    ],
    mockData: {
      status: 'Clash 已连接 - 规则模式 (Rule)',
      trafficTotal: '下行: 6.42 GB | 上行: 840 MB',
      outboundMode: 'Rule (分流规则)',
      activeNodes: [
        { name: '⚡ [Auto] 香港优选专线', type: 'VLESS-Reality', ping: 26, selected: true },
        { name: '🇯🇵 日本 01 (ChatGPT/Netflix)', type: 'Hysteria 2', ping: 49 },
        { name: '🇸🇬 新加坡 02 高速节点', type: 'Trojan', ping: 58 },
        { name: '🇺🇸 美国 03 住宅解锁', type: 'VMess', ping: 142 }
      ],
      logs: [
        '[TCP] connect to api.openai.com:443 via proxy [Auto]',
        '[DNS] resolve bilibili.com -> Direct',
        '[TUN] packet tunnel running smoothly'
      ]
    }
  },
  
  tutorial: {
    overview: 'Clash 拥有纯正的 iOS 原生体验与强大的 Mihomo 内核，本教程带你快速完成订阅导入与规则分流。',
    prerequisites: [
      'iOS 16.0 或更高版本的 iPhone / iPad',
      '从 App Store 或官方网站 (https://clash.md/platforms/ios) 获取安装',
      '任何支持 Clash / Mihomo 格式的机场订阅或自建节点'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载安装 Clash 客户端',
        description: '通过 App Store 搜索安装“Clash”或访问官方平台链接 (https://clash.md/platforms/ios) 获取最新安装包。首次打开时，根据系统提示授予网络与通知权限。',
        pencilTip: '完全无广告，原生 SwiftUI 界面轻巧流畅。'
      },
      {
        stepNumber: 2,
        title: '导入 Clash 订阅配置',
        description: '在应用中点击【配置 (Profiles)】-> 点击右上角【+】新增配置，选择【从 URL 下载】，粘贴机场提供的 Clash / Mihomo 订阅链接后保存并刷新。',
        codeSnippet: 'https://sub.provider.com/api/v1/client/subscribe?token=xxx&flag=clash',
        codeLanguage: 'url',
        pencilTip: '支持扫码快速导入与本地 .yaml 配置文件导入。'
      },
      {
        stepNumber: 3,
        title: '选择分流模式与节点策略',
        description: '进入【代理 (Proxies)】页面，顶部推荐保留【规则 (Rule)】模式。在各策略组中挑选目标节点，或直接选择自动测速分组 (Auto / URL-Test) 让内核自动调度。',
        pencilTip: '点击右上角闪电图标可一键批量并发测速。'
      },
      {
        stepNumber: 4,
        title: '开启 VPN 隧道连接',
        description: '回到应用首页或通过 iOS 控制中心，点击拨动主开关。系统弹出“添加 VPN 配置”弹窗时，输入锁屏密码确认即可开启代理。',
        pencilTip: '可配合 iOS 快捷指令，实现连入家里的 Wi-Fi 时自动关闭代理、离开时自动开启。'
      }
    ],
    advancedRules: [
      'iCloud 同步：可将配置文件备份至 iCloud Drive，在 iPad 与 Mac 设备间无缝共享。',
      '自定义规则覆写：支持添加自定义 parser 或 rule-providers，实现定制化防 DNS 污染与去广告。'
    ],
    faq: [
      {
        question: 'Clash (iOS) 相比原先的工具（如 Surge）有什么优势？',
        answer: 'Clash (iOS) 采用原生 SwiftUI 架构与开源 Mihomo 内核，免费或成本极低，开箱即用支持主流新兴协议（VLESS-Reality、Hysteria 2、TUIC 等），且免去 Surge 昂贵订阅费与繁琐的手搓配置门槛。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-28',
      author: 'ClashMaintainer',
      prNumber: 112,
      summary: '初始收录 Clash (iOS) 教程，基于 clash.md 官方规范编写',
      commitHash: 'e5f78a2'
    }
  ]
};
