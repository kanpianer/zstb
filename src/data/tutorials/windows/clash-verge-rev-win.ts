import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevWin: SoftwareTool = {
  "id": "clash-verge-rev-win",
  "name": "Clash Verge Rev",
  "shortName": "Clash Verge Rev",
  "system": "windows",
  "category": "windows",
  "tagline": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动",
  "description": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动。",
  "iconName": "Monitor",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v2.5.10（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/windows/clash-verge-rev-win.ts",
  "githubRepo": "https://github.com/clash-verge-rev/clash-verge-rev",
  "officialSite": "https://www.clashverge.dev",
  "releasesUrl": "https://github.com/clash-verge-rev/clash-verge-rev/releases",
  "specs": {
    "compatibility": "Windows 10 / 11；需要 WebView2，不支持 Windows 7",
    "architecture": "x64 / arm64，以发布资产为准",
    "coreEngine": "内置 Mihomo；稳定版与测试内核能力可能不同",
    "protocols": [
      "VLESS（含 REALITY，取决于内核）",
      "VMess",
      "Trojan",
      "Shadowsocks",
      "Hysteria 2",
      "TUIC",
      "WireGuard"
    ],
    "trafficHandling": "系统代理仅影响遵循系统设置的应用；TUN 通过虚拟网卡和路由接管适用流量"
  },
  "tutorial": {
    "overview": "先导入订阅、选择节点，再开启系统代理让浏览器联网。首次使用不需要开启 TUN。",
    "prerequisites": [
      "Windows 10 / 11，确认电脑使用 x64 还是 ARM64",
      "准备服务方的 Clash / Mihomo 订阅链接或 YAML 配置，不要公开其中的凭证"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "下载并安装",
        "description": "打开[官方发布页](https://github.com/clash-verge-rev/clash-verge-rev/releases)，按电脑架构选择 x64 或 ARM64 的 Windows 安装包，按向导安装后打开。若提示缺少 WebView2，按[官方安装文档](https://www.clashverge.dev/install.html)补齐。"
      },
      {
        "stepNumber": 2,
        "title": "导入订阅",
        "description": "打开订阅页面，粘贴服务方的 Clash / Mihomo 订阅链接并导入，然后选中该配置。已有 YAML 文件也可以从本地导入。"
      },
      {
        "stepNumber": 3,
        "title": "选择节点",
        "description": "进入代理页面，选择规则模式。在负责代理流量的策略组里测试延迟，再选择一个有响应的节点；不要选成直连。"
      },
      {
        "stepNumber": 4,
        "title": "开启系统代理",
        "description": "开启系统代理，保持软件运行。第一次先不启用 TUN，也不要同时运行其他代理或 VPN；系统代理只影响遵循该设置的应用。"
      },
      {
        "stepNumber": 5,
        "title": "验证连接并停止代理",
        "description": "用浏览器分别打开常用国内网站和需要代理的网站，失败时换一个节点重试。不用时先关闭系统代理，再退出软件；如果开过 TUN，也要先关闭，并确认浏览器还能正常上网。"
      }
    ],
    "advancedRules": [
      "订阅更新：在订阅页面更新当前配置，服务方更换节点后重新检查选择的节点是否可用。",
      "代理模式：日常使用规则模式；排查网站时可临时切换全局并选择节点，测试后切回规则模式。",
      "TUN 模式：应用不遵循系统代理时再尝试，按官方说明安装或检查服务模式并批准必要权限；断网时先关闭 TUN。",
      "开机启动：确认连接稳定后再按需开启；检查是否同时自动开启系统代理，不需要常驻时关闭。"
    ],
    "faq": [
      {
        "question": "导入订阅失败怎么办？",
        "answer": "检查链接是否完整、订阅是否到期，并向服务方确认返回的是 Clash / Mihomo 配置，而不是登录网页。"
      },
      {
        "question": "退出后无法联网怎么办？",
        "answer": "重新打开软件并关闭系统代理和 TUN，再检查 Windows 是否残留本次使用的手动代理设置。"
      }
    ]
  },
  "changelog": []
};
