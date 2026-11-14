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
    "overview": "使用官方 macOS 图形客户端 SFM，导入完整配置后连接。安装说明见 [官方 Apple 文档](https://sing-box.sagernet.org/clients/apple/)；SFM 与 sing-box 命令行核心不是同一个安装包。",
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
        "title": "确认节点或策略组",
        "description": "确认已选中要使用的配置。若配置提供 selector/urltest 分组，可在 Dashboard 中选择节点或自动选择组；若分组要在启动后才显示，连接后再选择。没有分组时使用配置中预设的出站。"
      },
      {
        "stepNumber": 4,
        "title": "开启连接",
        "description": "启动所选配置，按 macOS 提示允许添加 VPN 配置或相关网络权限，等待连接状态出现。SFM 使用 TUN 接管流量，实际范围由配置决定，不需要寻找系统代理开关。"
      },
      {
        "stepNumber": 5,
        "title": "验证访问并停止连接",
        "description": "打开浏览器访问需要代理的网站，再检查常用网站能否正常打开；失败时查看日志或更换节点。用完后在 SFM 停止连接，确认状态已断开，再检查普通上网是否恢复。"
      }
    ],
    "advancedRules": [
      "配置更新：使用 Remote Profile 时，节点失效先更新配置；下载地址必须返回完整 sing-box JSON，不是普通节点列表。",
      "节点选择：配置提供 selector 分组时可手动切换节点；提供 urltest 分组时可使用自动选择，具体行为由配置决定。",
      "路由与 DNS：先保留服务商提供的配置；需要分流时备份原文件，再按配置说明调整，不要直接套用其他客户端的规则。",
      "升级备份：升级前导出或备份配置，并按当前核心版本查阅 [迁移指南](https://sing-box.sagernet.org/migration/)。"
    ],
    "faq": [
      {
        "question": "URL 订阅能直接作为配置吗？",
        "answer": "仅支持与当前核心兼容的完整 sing-box JSON。Clash YAML、节点列表和单个分享链接不能直接当作完整配置；请向服务商索取正确格式，不要公开订阅链接。"
      },
      {
        "question": "为什么没有 Groups 或模式切换？",
        "answer": "这些控件由配置决定：策略组需要 selector/urltest，模式选择需要至少两个 clash_mode 值。没有控件不一定是安装出错。"
      },
      {
        "question": "VPN 显示连接是否就代表可用？",
        "answer": "不一定。先实际打开网站，再查看日志；节点不可用可换节点，出现 unknown field 等配置错误则核对核心版本与配置格式。"
      }
    ]
  },
  "tagline": "官方 macOS 图形客户端 SFM，与命令行核心分开安装",
  "description": "SFM 是官方 macOS 独立图形客户端，用于管理本地和远程 sing-box JSON 配置。不要与 iOS 的 SFI 或 Homebrew 的 sing-box 命令行核心混淆；本教程采用官方独立安装包，不假定 Mac App Store 提供同一个应用。",
  "homebrewUrl": "https://formulae.brew.sh/cask/sfm",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-apple",
  "changelog": []
};
