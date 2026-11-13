import { SoftwareTool } from '../../../types/tutorial';

export const singBoxMac: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "官方客户端",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "本平台客户端首发日期未确认",
  "latestVersion": "1.14.4（GitHub release，2026-10-24 发布）",
  "releasesUrl": "https://github.com/SagerNet/sing-box/releases",
  "officialSite": "https://sing-box.sagernet.org",
  "id": "sing-box-mac",
  "system": "macos",
  "category": "apple",
  "updatePath": "src/data/tutorials/macos/sing-box-mac.ts",
  "price": "官方开源发行免费下载；代理服务另行准备",
  "specs": {
    "compatibility": "macOS 13.0 或更高（官方 Apple 文档 / SFM cask）",
    "architecture": "Apple Silicon / Intel；有分架构与 Universal 安装包",
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
    "trafficHandling": "官方 Apple 客户端 TUN；实际路由由配置决定"
  },
  "tutorial": {
    "overview": "检索日期：2026-11-13。依据 [官方 Apple 文档](https://sing-box.sagernet.org/clients/apple/)、[SFM cask](https://formulae.brew.sh/cask/sfm) 与 [1.14.4 发行资产](https://github.com/SagerNet/sing-box/releases/tag/v1.14.4)。已确认 SFM-1.14.4-Universal.pkg（另有 Apple / Intel 包）；不再把 dmg、Mac App Store 与 SFI 当成同一安装途径。",
    "prerequisites": [
      "macOS 13+，允许安装官方签名包及按系统要求授权网络功能",
      "可信且匹配已安装核心版本的完整 sing-box JSON 配置"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "安装 SFM 图形客户端",
        "description": "从官方 GitHub Releases 选择 SFM 的 Universal.pkg 或匹配芯片的 Apple/Intel.pkg，按安装器完成安装；也可使用官方文档链接的 Homebrew Cask。启动后仅按系统实际提示授权。",
        "codeSnippet": "brew install --cask sfm",
        "codeLanguage": "bash",
        "pencilTip": "brew install sing-box 安装的是命令行核心，不是 SFM 图形界面。不要因此期待出现 Profiles 窗口。"
      },
      {
        "stepNumber": 2,
        "title": "配置 Local 或 Remote Profile",
        "description": "在配置管理中添加本地完整 JSON 配置，或建立 Remote Profile 并填写返回完整配置的 URL。确认下载、解析无错误后选中；具体菜单名称与位置以安装版本为准。"
      },
      {
        "stepNumber": 3,
        "title": "启动配置并检查日志",
        "description": "启动服务，按 macOS 的实际提示允许网络功能；检查日志、路由和 DNS。只有配置包含分组出站时才能在 Dashboard 中查看或切换策略组。",
        "pencilTip": "不保证零开销、不影响电池或任意协议都可用；资源使用取决于配置、协议和负载。"
      }
    ],
    "advancedRules": [
      "升级前备份配置并阅读 [迁移指南](https://sing-box.sagernet.org/migration/) 和 [废弃列表](https://sing-box.sagernet.org/deprecated/)：GeoIP/Geosite 已在 1.12 移除，应迁移 rule-set；旧 block/dns 特殊出站、WireGuard outbound 和旧入站 sniff 等字段在 1.13 移除，分别迁移规则动作、WireGuard endpoint 等；旧 DNS server 格式在 1.14 移除。在线文档还列出 1.15+ 的变化，不能不看版本就套用。",
      "[官方通用 GUI 规范](https://sing-box.sagernet.org/clients/general/) 区分 Local、iCloud 与 Remote Profile；Remote 下载的必须是完整配置。查看应用显示的核心版本再排查配置兼容性。",
      "升级 SFM 到 1.14 前另读 [macOS 独立客户端数据迁移](https://sing-box.sagernet.org/migration/#migrate-the-macos-standalone-client-data)，先备份配置。CLI/launchd 是另一种部署方式，不能将 SFM 的配置更新流程直接套用到纯核心。"
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
  "tagline": "官方 macOS 图形客户端 SFM，与命令行核心分开安装",
  "description": "SFM 是官方 macOS 独立图形客户端，用于管理本地和远程 sing-box JSON 配置。不要与 iOS 的 SFI 或 Homebrew 的 sing-box 命令行核心混淆；本教程采用官方独立安装包，不假定 Mac App Store 提供同一个应用。",
  "homebrewUrl": "https://formulae.brew.sh/cask/sfm",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-apple",
  "changelog": []
};
