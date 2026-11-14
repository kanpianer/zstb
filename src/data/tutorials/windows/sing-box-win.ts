import { SoftwareTool } from '../../../types/tutorial';

export const singBoxWin: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "CLI 教程",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "2022-08-26",
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
      "VLESS（含 REALITY）",
      "Trojan",
      "Hysteria",
      "Hysteria 2",
      "TUIC",
      "AnyTLS",
      "ShadowTLS",
      "Snell",
      "SOCKS5",
      "HTTP(S)",
      "SSH",
      "NaïveProxy（依构建）",
      "Tor（依构建）",
      "WireGuard（endpoint）"
    ],
    "trafficHandling": "按配置使用 mixed 入站或 TUN；TUN 需要提升权限"
  },
  "tutorial": {
    "overview": "本篇使用命令行核心，没有图形界面的导入按钮或节点菜单。先用服务方提供的完整配置运行本地代理，再让浏览器连接。",
    "prerequisites": [
      "Windows 10+ 与 PowerShell，确认电脑的 CPU 架构",
      "向服务方索取匹配核心版本、已选好节点的完整 sing-box JSON 配置，并确认本地 mixed 入站地址与端口；不要公开配置中的密钥"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "下载并解压命令行版本",
        "description": "打开[官方发布页](https://github.com/SagerNet/sing-box/releases)，下载 sing-box-版本-windows-amd64.zip；ARM64 电脑选 arm64 包。完整解压，在含 sing-box.exe 的文件夹打开 PowerShell，执行下面的命令确认可以运行。",
        "codeSnippet": ".\\sing-box.exe version",
        "codeLanguage": "powershell"
      },
      {
        "stepNumber": 2,
        "title": "保存服务方的完整配置",
        "description": "把服务方提供的完整 JSON 配置保存为同一文件夹中的 config.json，再执行下面的校验命令。若报错，先让服务方按你的核心版本修正配置，不要继续启动。",
        "codeSnippet": ".\\sing-box.exe check -c .\\config.json",
        "codeLanguage": "powershell",
        "pencilTip": "这里的导入就是保存本地配置文件；Clash YAML、节点分享链接和普通订阅 URL 不能直接当作 config.json。"
      },
      {
        "stepNumber": 3,
        "title": "确认要使用的节点",
        "description": "命令行核心没有节点列表。首次使用请让服务方在完整配置中指定你要用的节点；要换节点，就索取对应的完整配置，替换 config.json 后重新校验。",
        "pencilTip": "无需自行拼接节点字段；包含多个出站的配置由路由或选择器决定实际使用哪个节点，请向服务方确认。"
      },
      {
        "stepNumber": 4,
        "title": "运行并开启浏览器代理",
        "description": "执行下面的命令并保持 PowerShell 窗口打开。确认无启动错误后，打开 Windows 设置中的网络和 Internet → 代理 → 手动设置代理，填入服务方配置的本地 mixed 入站地址和端口并保存。仅本机使用时地址通常是 127.0.0.1，端口必须以配置为准。",
        "codeSnippet": ".\\sing-box.exe run -c .\\config.json",
        "codeLanguage": "powershell",
        "pencilTip": "本教程先用 mixed 入站，不必开启 TUN；系统代理只影响遵循该设置的应用。不要填写远端节点服务器的地址。"
      },
      {
        "stepNumber": 5,
        "title": "验证连接并停止",
        "description": "用浏览器打开常用国内网站和需要代理的网站，确认都能访问。不用时先关闭刚设置的 Windows 手动代理，再回到 PowerShell 按 Ctrl+C 停止核心。最后确认浏览器仍可正常联网。",
        "pencilTip": "无法连接时先核对本地端口和启动日志，再向服务方确认节点有效；分享日志前隐藏密钥。"
      }
    ],
    "advancedRules": [
      "更新配置：先备份当前可用配置，再保存服务方的新配置；校验通过后停止旧进程并重新运行。",
      "本地端口：端口被占用时，请服务方协助修改 mixed 入站端口，并同步修改 Windows 手动代理中的端口。仅本机使用时保持监听 127.0.0.1。",
      "分流设置：需要某些网站直连时，请服务方在完整配置中调整路由规则，校验后重启，不要直接套用其他客户端的规则。",
      "TUN 模式：只有需要接管不遵循系统代理的应用时再尝试；使用服务方提供的 TUN 完整配置，并在管理员 PowerShell 中运行，停止后检查网络恢复。"
    ],
    "faq": [
      {
        "question": "只有订阅链接怎么办？",
        "answer": "请服务方提供适配当前版本的完整 sing-box JSON 文件；即使链接返回完整 JSON，也要先下载保存为本地文件。"
      },
      {
        "question": "PowerShell 找不到程序怎么办？",
        "answer": "确认当前文件夹包含 sing-box.exe，并使用带 .\\ 前缀的命令，不要在压缩包里运行。"
      },
      {
        "question": "停止后浏览器断网怎么办？",
        "answer": "关闭本次设置的 Windows 手动代理；如果使用过 TUN，也要确认核心已经退出、网络恢复。"
      }
    ]
  },
  "tagline": "Windows 官方 CLI 教程；另有独立官方 Desktop GUI",
  "description": "sing-box 同时提供 Windows 命令行核心和官方 Desktop 图形客户端 SFW。本教程演示 CLI 的本地 JSON 配置、校验与运行，不把 GUI 的远程配置管理、订阅更新或策略组菜单归给 sing-box.exe。",
  "githubRepo": "https://github.com/SagerNet/sing-box",
  "changelog": []
};
