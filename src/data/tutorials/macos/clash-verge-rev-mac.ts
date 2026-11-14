import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevMac: SoftwareTool = {
  "id": "clash-verge-rev-mac",
  "name": "Clash Verge Rev",
  "shortName": "Clash Verge Rev",
  "system": "macos",
  "category": "apple",
  "tagline": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动",
  "description": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动。",
  "iconName": "Laptop",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v2.5.10（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/macos/clash-verge-rev-mac.ts",
  "githubRepo": "https://github.com/clash-verge-rev/clash-verge-rev",
  "officialSite": "https://www.clashverge.dev",
  "releasesUrl": "https://github.com/clash-verge-rev/clash-verge-rev/releases",
  "specs": {
    "compatibility": "当前安装文档要求 macOS 12+；README 的 11+ 与其不一致，旧系统需另核对内核兼容性",
    "architecture": "Apple Silicon aarch64 与 Intel x64 分别下载，不是单一 Universal 包",
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
    "overview": "Clash Verge Rev 可导入 Clash / Mihomo 配置，通过系统代理连接。首次使用按下面五步操作，界面说明可参考 [官方快速入门](https://www.clashverge.dev/guide/quickstart.html)。",
    "prerequisites": [
      "按当前安装文档准备 macOS 12+ 的 Mac，并确认是 Apple Silicon 还是 Intel 芯片",
      "可信服务商提供的 Clash / Mihomo 配置或订阅链接，勿公开分享"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "核对平台并安装",
        "description": "从官方 Releases 下载 aarch64.dmg（Apple Silicon）或 x64.dmg（Intel）。打开 DMG，将应用拖入“应用程序”，再打开客户端。遇到安全警告先核实来源和文件完整性，不要关闭 Gatekeeper。"
      },
      {
        "stepNumber": 2,
        "title": "导入并激活配置",
        "description": "在订阅管理页面粘贴服务商提供的 Clash / Mihomo 订阅链接并导入，或导入本地 YAML 文件。成功后选中该配置，确认能看到节点；导入失败先核对是否拿到了正确格式的订阅。"
      },
      {
        "stepNumber": 3,
        "title": "选择策略组和节点",
        "description": "在代理页面找到负责代理流量的策略组，测试延迟并选择一个可用节点。初次使用选择规则模式，按订阅配置分流；延迟较低不代表所有网站都一定可用。"
      },
      {
        "stepNumber": 4,
        "title": "开启系统代理",
        "description": "在客户端开启系统代理，让遵循系统代理的浏览器和应用使用当前配置。首次使用先保持 TUN 关闭；仅打开客户端或选中节点，还不等于应用流量已走代理。"
      },
      {
        "stepNumber": 5,
        "title": "验证访问并停止代理",
        "description": "用浏览器访问需要代理的网站，并确认常用网站也能打开；失败时换节点或查看连接日志。用完先关闭系统代理，若启用了 TUN 也一并关闭，再退出客户端并检查普通上网是否正常。"
      }
    ],
    "advancedRules": [
      "订阅更新：节点失效时在订阅管理中更新配置，再测试和选择节点；更新后确认当前配置没有选错。",
      "代理模式：日常使用规则模式；全局模式可临时用于排查，测试结束后切回规则模式。",
      "TUN 接管：遇到不遵循系统代理的应用时，再按官方说明安装或检查服务模式并启用 TUN；按提示授权，断网先关闭并排查其他 VPN。",
      "开机启动：确认连接稳定后，再在设置中开启开机启动；重启后检查系统代理状态，避免同时启动多个代理客户端。"
    ],
    "faq": [
      {
        "question": "为什么系统代理开启后终端仍无法连接？",
        "answer": "部分终端程序不读取系统代理。可为该程序设置客户端显示的本地代理地址，或按需使用 TUN；不要猜测端口。"
      },
      {
        "question": "TUN 启动失败怎么办？",
        "answer": "先关闭 TUN 保持基本上网，再检查服务模式是否安装、系统授权是否完成及是否有其他 VPN 冲突。根据内核和服务日志排查，不要反复盲目授权。"
      }
    ]
  },
  "changelog": []
};
