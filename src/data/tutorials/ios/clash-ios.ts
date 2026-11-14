import { SoftwareTool } from '../../../types/tutorial';

export const clashIos: SoftwareTool = {
  id: 'clash-ios',
  name: 'Clash',
  shortName: 'Clash',
  system: 'ios',
  category: 'apple',
  tagline: 'ProjectClash 维护的 Apple 平台规则代理客户端',
  description: '本文介绍 ProjectClash 的 Clash - Rule Based Proxy（App Store ID 6794257189）。它可导入 Clash / mihomo 配置、选择节点并按规则连接，需自行准备代理服务。',
  iconName: 'Zap',
  badgeText: '规则代理',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'GPL-3.0（客户端仓库；依赖许可分别适用）',
  price: '美国 App Store：免费（2026-11-13 核查）',
  releasedAt: '2026-08-20',
  latestVersion: '1.0.14（美国商店 API；2026-11-07 发布）',
  updatePath: 'src/data/tutorials/ios/clash-ios.ts',
  officialSite: 'https://clash.md/platforms/ios',
  githubRepo: 'https://github.com/ProjectClash/Clash-Client',
  appStoreUrl: 'https://apps.apple.com/us/app/clash-rule-based-proxy/id6794257189',
  specs: {
    compatibility: 'iOS 15.0 / iPadOS 15.0 或更高；控制中心等功能另有系统限制',
    architecture: 'iPhone / iPad（SwiftUI；以商店兼容设备列表为准）',
    coreEngine: 'ProjectClash Clash Core（基于 mihomo）+ NetworkExtension',
    // 主要协议来源：https://clash.md/core
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS（含 REALITY）', 'Trojan', 'Snell', 'Hysteria', 'Hysteria 2', 'TUIC', 'WireGuard', 'AnyTLS', 'HTTP(S)', 'SOCKS5', 'SSH'],
    trafficHandling: 'Apple NE Packet Tunnel；按当前配置规则分流',
  },
  "tutorial": {
    "overview": "本教程介绍 ProjectClash 的 Clash - Rule Based Proxy：导入配置、选择节点，再连接 VPN。安装与操作说明见 [官方入门](https://clash.md/guide/)。",
    "prerequisites": [
      "iOS / iPadOS 15+ 与可下载应用的本人 Apple 账户",
      "可信的 Clash / mihomo 配置 URL 或 YAML 文件；应用不附带节点",
      "配置链接可能含密码和令牌，不要公开或交给不可信转换网站"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "从官方入口安装",
        "description": "通过官网进入 App Store，核对应用名 Clash - Rule Based Proxy、ID 6794257189 与销售方 OmniWide Media Limited。地区可用性以商店页面为准，不使用不可信共享 Apple 账户。"
      },
      {
        "stepNumber": 2,
        "title": "导入并选择配置",
        "description": "iPhone 点击 Home 左上方配置名称进入 Profile Center；iPad 从侧栏进入 Profiles。选择 Add Profile，导入服务方提供的 Clash / mihomo 配置 URL 或 YAML 文件，保存后选用该配置。普通节点链接不能代替完整配置。"
      },
      {
        "stepNumber": 3,
        "title": "选择节点",
        "description": "打开 Proxies 或 Nodes，在负责代理流量的策略组里选择节点。初次使用可先选服务方推荐的线路；日常可用 Rule 模式，具体分流由配置决定。"
      },
      {
        "stepNumber": 4,
        "title": "连接并允许 VPN",
        "description": "回到 Home 启动连接，首次按 iOS 提示允许添加 VPN 配置并完成系统认证。先停止其他 VPN，避免互相影响。"
      },
      {
        "stepNumber": 5,
        "title": "浏览器验证与关闭",
        "description": "打开 Safari，分别访问日常网站及需要代理的网站。能正常加载才算验证通过，VPN 图标并不代表节点可用。用完回到 Home 停止连接，确认系统 VPN 状态已断开。"
      }
    ],
    "advancedRules": [
      "切换配置：在 Profile Center / Profiles 中选择另一份已导入配置，再检查其策略组选中了哪个节点。",
      "自动选节点：如果配置提供自动选择组，可在 Proxies / Nodes 中选用它，再通过常用网站验证效果；没有该组时仍手动选节点。",
      "规则分流：日常选择 Rule 模式并检查当前策略组；若某网站连接异常，先恢复原配置对比，避免一次修改多项规则。"
    ],
    "faq": [
      {
        "question": "配置导入失败怎么办？",
        "answer": "确认 URL 完整且订阅未过期，请服务方提供 Clash / mihomo YAML 配置。若下载的是登录页或错误页面，应先修复订阅地址，不要反复导入。"
      },
      {
        "question": "连接后网页打不开怎么办？",
        "answer": "先断开 VPN 确认原网络可用，再检查当前配置、换节点并重连。只有部分网站失败时检查 Rule 模式的规则和策略组；求助前隐藏配置里的密码与订阅令牌。"
      }
    ]
  },
  changelog: [],
};
