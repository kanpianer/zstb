import { SoftwareTool } from '../../../types/tutorial';

export const singBoxWin: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "CLI 教程",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "本平台客户端首发日期未确认",
  "latestVersion": "1.14.4（GitHub release，2026-10-24 发布）",
  "releasesUrl": "https://github.com/SagerNet/sing-box/releases",
  "officialSite": "https://sing-box.sagernet.org",
  "id": "sing-box-win",
  "system": "windows",
  "category": "windows",
  "updatePath": "src/data/tutorials/windows/sing-box-win.ts",
  "price": "官方开源发行免费下载；代理服务另行准备",
  "specs": {
    "compatibility": "本教程 Windows 10+；旧 Windows 7 legacy 包不在本教程范围",
    "architecture": "核心 amd64 / arm64 / 386；官方 SFW GUI x64 / arm64 / x86",
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
    "trafficHandling": "按配置使用 mixed 入站或 TUN；TUN 需要提升权限"
  },
  "tutorial": {
    "overview": "检索日期：2026-11-13。[官方 Desktop 文档](https://sing-box.sagernet.org/clients/desktop/) 已列出 Windows 10+ GUI；[1.14.4 发行页](https://github.com/SagerNet/sing-box/releases/tag/v1.14.4) 同时有 SFW-1.14.4-x64.exe 等 GUI 文件和 sing-box-1.14.4-windows-amd64.zip 等 CLI 包。下面仅为 CLI 步骤，没有假设 Profiles 菜单或自动导入任意订阅。",
    "prerequisites": [
      "Windows 10+ 与 PowerShell；使用 TUN 时需要管理员权限",
      "匹配 CPU 的官方 CLI zip 和可信完整 config.json；不是仅一个订阅 URL"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "下载 CLI 并确认版本",
        "description": "在官方 Releases 下载 sing-box-版本-windows-amd64.zip（ARM64 选 arm64，32 位选 386），完整解压后在所在目录打开 PowerShell。不要误把 SFW 图形客户端安装器当作 CLI 压缩包。保留发行包随附文件，不假定一定包含某个 DLL。",
        "codeSnippet": ".\\sing-box.exe version",
        "codeLanguage": "powershell"
      },
      {
        "stepNumber": 2,
        "title": "保存完整配置并校验",
        "description": "将匹配该核心版本的完整配置保存为当前目录的 config.json。若来源是 URL，先用可信方式取得配置内容；核心不会把 Clash YAML 或 Base64 订阅自动转换成 JSON。校验错误必须先修复。",
        "codeSnippet": ".\\sing-box.exe check -c .\\config.json",
        "codeLanguage": "powershell",
        "pencilTip": "PowerShell 默认不从当前目录查找可执行文件，所以命令需要 .\\ 前缀；check 通过不等于服务器连通性通过。"
      },
      {
        "stepNumber": 3,
        "title": "按配置运行并验证",
        "description": "使用以下命令运行；配置包含 TUN 时在已提升管理员权限的 PowerShell 中执行。若使用本地 mixed 入站，需按配置将应用代理指向相应监听地址，不能假定全部流量自动接管。检查日志，结束可按 Ctrl+C。",
        "codeSnippet": ".\\sing-box.exe run -c .\\config.json",
        "codeLanguage": "powershell",
        "pencilTip": "仅为配置中的功能授权。权限不足、驱动或安全软件冲突都需具体排查，不能保证“管理员运行即可修复”。"
      }
    ],
    "advancedRules": [
      "升级前备份配置并阅读 [迁移指南](https://sing-box.sagernet.org/migration/) 和 [废弃列表](https://sing-box.sagernet.org/deprecated/)：GeoIP/Geosite 已在 1.12 移除，应迁移 rule-set；旧 block/dns 特殊出站、WireGuard outbound 和旧入站 sniff 等字段在 1.13 移除，分别迁移规则动作、WireGuard endpoint 等；旧 DNS server 格式在 1.14 移除。在线文档还列出 1.15+ 的变化，不能不看版本就套用。",
      "需要 GUI 时请从 [官方 Desktop 页面](https://sing-box.sagernet.org/clients/desktop/) 获取 SFW；它与纯核心的配置管理能力不同。不要直接把 URL 当成 -c 的本地文件路径，也不要为了订阅导入安装不明包装程序。"
    ],
    "faq": [
      {
        "question": "URL 订阅能直接作为配置吗？",
        "answer": "仅当 URL 返回适合已安装核心版本的完整 sing-box JSON 配置。Clash YAML、Base64 节点列表和单个分享链接不是完整配置；Remote Profile 是 GUI 的配置下载/更新功能，不是内核自动转换订阅。不要将私密链接交给不可信在线转换器。"
      },
      {
        "question": "为什么 PowerShell 提示找不到 sing-box.exe？",
        "answer": "先确认终端所在目录含解压后的可执行文件，再用 .\\sing-box.exe；若使用完整路径含空格，需要 PowerShell 调用运算符 &。不要仅靠把目录名改成英文解决所有错误。"
      },
      {
        "question": "是否必须使用 TUN？",
        "answer": "不必须。可用 mixed/HTTP/SOCKS 入站仅代理主动配置的应用；TUN 用于按路由接管流量。配置、DNS、权限与其他 VPN 的冲突需分别验证。"
      }
    ]
  },
  "tagline": "Windows 官方 CLI 教程；另有独立官方 Desktop GUI",
  "description": "sing-box 同时提供 Windows 命令行核心和官方 Desktop 图形客户端 SFW。本教程演示 CLI 的本地 JSON 配置、校验与运行，不把 GUI 的远程配置管理、订阅更新或策略组菜单归给 sing-box.exe。",
  "githubRepo": "https://github.com/SagerNet/sing-box",
  "changelog": []
};
