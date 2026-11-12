import { SoftwareTool } from '../../../types/tutorial';

export const singBoxIos: SoftwareTool = {
  id: 'sing-box-ios',
  name: 'Sing-box',
  shortName: 'Sing-box',
  system: 'ios',
  category: 'apple',
  tagline: '官方纯血通用代理平台、原生 iOS 客户端',
  description: 'Sing-box 由 SagerNet 团队打造，iOS 客户端（SFI）采用原生 Network Extension 结合高性能 Go 核心构建，采用官方标准配置语法，支持 Hysteria 2、TUIC v5、VLESS (Reality)、ShadowTLS 等前沿协议，资源开销极低。',
  iconName: 'Box',
  badgeText: '官方纯血',

  updatedAt: '2026-10-24',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-07-01',
  latestVersion: 'v1.14.8',
  updatePath: 'data/tutorials/ios/sing-box-ios.md',

  releasesUrl: 'https://github.com/SagerNet/sing-box/releases',
  officialSite: 'https://sing-box.sagernet.org',
  appStoreUrl: 'https://apps.apple.com/us/app/sing-box-mt/id6785326793',

  specs: {
    compatibility: 'iOS 15.0 / iPadOS 15.0 或更高版本',
    architecture: 'ARM64 原生',
    coreEngine: 'Sing-box Universal Proxy Platform (Go)',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'ShadowTLS', 'WireGuard', 'Direct/Block'],
    trafficHandling: 'Network Extension 虚拟网卡 (TUN) + 官方规则路由引擎',
  },

  tutorial: {
    overview: '本教程带你在 iOS 上安装并配置 Sing-box 客户端，导入订阅并启动代理。',
    prerequisites: [
      '外区 Apple ID（如美区）用于下载应用',
      '支持 Sing-box 格式的远程订阅链接或 JSON 配置文件'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并初次启动',
        description: '使用外区 Apple ID 在 App Store 搜索 Sing-box 并安装。首次启动并开启时，需要允许添加 VPN 配置。',
        pencilTip: '请认准开发者与图标，避免下载到同名第三方应用。'
      },
      {
        stepNumber: 2,
        title: '导入 Profile 配置文件',
        description: '打开软件，进入【Profiles】页面，点击右上角【+】，选择【Create Profile】。输入机场给定的 sing-box 订阅 URL，或选择【Import Local File】导入本地配置。',
        codeSnippet: 'https://airport.domain/sub/sing-box?token=xxx',
        codeLanguage: 'url',
        pencilTip: '可勾选“Auto Update”设置自动刷新节点。'
      },
      {
        stepNumber: 3,
        title: '启动服务并选择节点',
        description: '在 Profiles 列表中选中刚导入的配置，返回【Dashboard】主页，点击【Start】启动。进入【Groups】展开策略组，轻触选中最优节点即可。',
        pencilTip: '系统状态栏显示 VPN 标志即代表已成功进入代理状态。'
      }
    ],
    advancedRules: [
      '使用 Rule-Set 二进制规则集：在配置中引用远程 rule-set，实现按域名/IP 的精细分流。'
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
      date: '2026-11-12',
      author: 'SingBoxAdvocate',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'a1b2c3d'
    }
  ]
};
