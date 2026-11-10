import { SoftwareTool } from '../../../types/tutorial';

export const loon: SoftwareTool = {
  id: 'loon',
  name: 'Loon',
  shortName: 'Loon',
  system: 'ios',
  category: 'apple',
  tagline: '活跃更新、生态丰富、对标 Surge 的高性价比进阶工具',
  description: 'Loon 凭借强大的插件与模块体系、活跃的开发者迭代节奏以及对新兴协议的快速跟进，成为目前 iOS 平台替代昂贵 Surge 的最强性价比之选。',
  iconName: 'Shield',
  badgeText: '新锐黑马',
  
  updatedAt: '2026-03-27',
  isOpenSource: false,
  license: '商业闭源软件',
  price: '约 $5.99 买断',
  releasedAt: '2019-11-20',
  latestVersion: 'v3.2.4',
  updatePath: 'data/tutorials/ios/loon.md',
  
  officialSite: 'https://loon.so',
  appStoreUrl: 'https://apps.apple.com/app/loon/id1373567447',
  
  specs: {
    compatibility: 'iOS 15.0 / iPadOS 15.0 或更高版本',
    architecture: 'Apple Silicon ARM64 原生',
    coreEngine: 'Loon Engine + 动态插件生态',
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS', 'Trojan', 'Hysteria 2', 'WireGuard', 'HTTP/SOCKS5'],
    trafficHandling: 'TUN 全局/分流模式 + 动态插件拦截',
    resourceFootprint: '空闲 ~22MB / 满载 42MB'
  },
  
  screenshot: {
    deviceType: 'iphone',
    deviceSpec: 'Apple iPhone 16',
    screenResolution: '1179 × 2556 像素',
    title: 'Loon 策略组、插件中心与状态仪表盘',
    colorScheme: 'light',
    annotations: [
      { id: 'l1', label: '① 插件中心', note: '一键启用社区精选插件（去广告、解锁、通知美化等）', xPercent: 50, yPercent: 20 },
      { id: 'l2', label: '② 节点策略', note: '灵活嵌套的代理策略组与延迟排序算法', xPercent: 50, yPercent: 45 },
      { id: 'l3', label: '③ 捕获日志', note: '清晰易读的请求日志分析与错误重试', xPercent: 50, yPercent: 75 }
    ],
    mockData: {
      status: 'Loon 正在运行 - 12 个插件已生效',
      trafficTotal: '下行: 2.8 GB | 上行: 310 MB',
      outboundMode: '规则模式 (Rule)',
      activeNodes: [
        { name: '🇭🇰 香港 Premium BGP 01', type: 'Hysteria 2', ping: 30, selected: true },
        { name: '🇯🇵 日本 02 4K 解锁', type: 'VLESS', ping: 54 },
        { name: '🇸🇬 新加坡 专线 03', type: 'Trojan', ping: 68 }
      ],
      logs: [
        '[Plugin] BiliBili 港澳台限制已自动覆写',
        '[Rule] Match DOMAIN-KEYWORD: google -> PROXY'
      ]
    }
  },
  
  tutorial: {
    overview: 'Loon 提供了模块化插件一键导入功能，本教程演示从订阅接入到配置社区模块的完整流程。',
    prerequisites: [
      '外区 Apple ID 购买并安装 Loon',
      '机场订阅链接（支持常见通用格式）'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '安装应用并初次授权',
        description: '在非国区 App Store 搜索购买 Loon，启动后根据引导开启 VPN 配置权限。',
        pencilTip: 'UI 风格亲和现代，支持中文界面。'
      },
      {
        stepNumber: 2,
        title: '导入机场订阅与节点',
        description: '点击底部导航栏【配置】-> 找到【订阅】区域 -> 点击【+】添加订阅。输入机场名称与 URL 链接后点击保存，系统将自动拉取所有节点。',
        codeSnippet: 'https://sub.airport-example.com/api/v1/client/subscribe?token=loon_token',
        codeLanguage: 'url',
        pencilTip: '可勾选“自动更新”，设置每隔 12 小时静默拉取一次最新节点。'
      },
      {
        stepNumber: 3,
        title: '使用【插件】功能增强能力',
        description: '在底部点击【插件】，即可直接添加各类去开屏广告、流媒体重定向及网络增强模块。点击即可开启，完全免去手动写正则规则的痛苦。',
        pencilTip: '社区有很多一键安装的优秀插件，例如各平台净化插件。'
      },
      {
        stepNumber: 4,
        title: '启动主开关',
        description: '回到首页，点击右上角电源启动按钮。此时所有的分流与插件均会生效，即可畅享国际互联网。',
        pencilTip: '可点击节点列表上方的测试图标一键全量测速。'
      }
    ],
    advancedRules: [
      '启用捕获调试：当某个网站打不开时，在首页打开【捕获】，重试访问即可看到具体的拦截规则或连接错误。',
      '节点映射与自动测速策略组：支持按可用性回退（Fallback）。'
    ],
    faq: [
      {
        question: 'Loon 与 Surge 相比有什么优势？',
        answer: 'Loon 售价通常仅为 Surge 的一小部分，且一次性买断无年费；同时其“插件中心 (Plugin)”让小白也能一键复用社区规则，易用性极高。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-27',
      author: 'LoonPilot',
      prNumber: 109,
      summary: '升级 Loon 3.2.4 新版插件语法说明与 Hysteria 2 适配注意事项',
      commitHash: 'e69a4c2'
    }
  ]
};
