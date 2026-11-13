import { SoftwareTool } from '../../../types/tutorial';

export const singBoxIos: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "官方客户端",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "2026-08-31（当前 MT 商店条目上架；非 SFI 项目首发）",
  "latestVersion": "App Store 1.14.8（2026-10-24）；核心 release 1.14.4",
  "releasesUrl": "https://github.com/SagerNet/sing-box/releases",
  "officialSite": "https://sing-box.sagernet.org",
  "id": "sing-box-ios",
  "system": "ios",
  "category": "apple",
  "updatePath": "src/data/tutorials/ios/sing-box-ios.ts",
  "price": "美国 App Store：免费（2026-11-13 核查）",
  "specs": {
    "compatibility": "iOS 15.0 / iPadOS 15.0 或更高",
    "architecture": "iPhone / iPad（以商店兼容列表为准）",
    "coreEngine": "sing-box（Go；功能以发行构建为准）",
    "protocols": [
      "Shadowsocks",
      "VMess",
      "VLESS",
      "Trojan",
      "Hysteria2",
      "TUIC",
      "ShadowTLS",
      "WireGuard（endpoint）"
    ],
    "trafficHandling": "Apple NetworkExtension / TUN；按 JSON 配置路由"
  },
  "tutorial": {
    "overview": "检索日期：2026-11-13。安装与身份以 [官方 Apple 客户端文档](https://sing-box.sagernet.org/clients/apple/) 的外链为准；[美国商店](https://apps.apple.com/us/app/sing-box-mt/id6785326793) 与 [Apple API](https://itunes.apple.com/lookup?id=6785326793&country=us) 返回应用版本 1.14.8，而 [核心 GitHub release](https://github.com/SagerNet/sing-box/releases/tag/v1.14.4) 为 1.14.4，二者是不同版本字段。",
    "prerequisites": [
      "iOS / iPadOS 15+ 与可下载应用的 Apple 账户（官方要求非中国大陆账户）",
      "可信且匹配已安装核心版本的完整 sing-box JSON 配置"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "由官方文档进入商店安装",
        "description": "从官方 Apple 文档的 App Store 链接安装 sing-box MT，核对 ID 6785326793 和销售方 Metamerism LLC。普通设备使用商店版本，不把 GitHub 的越狱 .deb 文件当作普通 iPhone 安装包。"
      },
      {
        "stepNumber": 2,
        "title": "添加并选中完整配置",
        "description": "在配置管理中创建本地配置，或使用 Remote Profile 添加返回完整 sing-box JSON 的 HTTPS URL。检查下载内容与错误提示后选中配置；界面名称会随版本与语言变化，不依据本教程假设固定按钮位置。",
        "pencilTip": "普通节点订阅链接并不一定是完整 JSON 配置。若来自服务商，先询问其明确支持的 sing-box 版本。"
      },
      {
        "stepNumber": 3,
        "title": "启动并验证路由",
        "description": "启动所选配置，按系统提示允许添加 VPN 配置。检查日志、DNS 与实际请求；若配置定义策略组，再在 Dashboard 中选择路线。停止时使用应用的服务开关。"
      }
    ],
    "advancedRules": [
      "升级前备份配置并阅读 [迁移指南](https://sing-box.sagernet.org/migration/) 和 [废弃列表](https://sing-box.sagernet.org/deprecated/)：GeoIP/Geosite 已在 1.12 移除，应迁移 rule-set；旧 block/dns 特殊出站、WireGuard outbound 和旧入站 sniff 等字段在 1.13 移除，分别迁移规则动作、WireGuard endpoint 等；旧 DNS server 格式在 1.14 移除。在线文档还列出 1.15+ 的变化，不能不看版本就套用。",
      "[官方通用 GUI 规范](https://sing-box.sagernet.org/clients/general/) 区分 Local、iCloud 与 Remote Profile；Remote 下载的必须是完整配置。查看应用显示的核心版本再排查配置兼容性。"
    ],
    "faq": [
      {
        "question": "URL 订阅能直接作为配置吗？",
        "answer": "仅当 URL 返回适合已安装核心版本的完整 sing-box JSON 配置。Clash YAML、Base64 节点列表和单个分享链接不是完整配置；Remote Profile 是 GUI 的配置下载/更新功能，不是内核自动转换订阅。不要将私密链接交给不可信在线转换器。"
      },
      {
        "question": "为什么没有 Groups 或模式切换？",
        "answer": "官方通用客户端规范只在配置包含 selector/urltest 分组出站时提供策略组；模式选择也需要配置使用至少两个 clash_mode 值。不能保证任意导入配置都出现这些控件。"
      },
      {
        "question": "VPN 显示连接是否就代表可用？",
        "answer": "只说明隧道状态，不保证节点、DNS 或规则正确。查看日志及实际请求；错误中若有 unknown field 或 deprecated，按核心版本迁移配置，切勿仅反复重装应用。"
      }
    ]
  },
  "tagline": "官方 Apple 图形客户端：管理 sing-box JSON 配置",
  "description": "SFI 是 sing-box 的 Apple 平台图形客户端。官方文档当前 App Store 入口指向 sing-box MT（Metamerism LLC，ID 6785326793），不能把所有同名应用都当作官方发行。它管理本地或远程完整配置，并提供 Apple 平台 TUN 实现。",
  "appStoreUrl": "https://apps.apple.com/us/app/sing-box-mt/id6785326793",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-apple",
  "changelog": []
};
