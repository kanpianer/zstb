import { SoftwareTool } from '../../../types/tutorial';

export const clashPartyMac: SoftwareTool = {
  "id": "clash-party-mac",
  "name": "Clash Party",
  "shortName": "Clash Party",
  "system": "macos",
  "category": "apple",
  "tagline": "Clash Party 是原 Mihomo Party 更名后的桌面代理客户端，使用 Electron 与 Mihomo 系列内核；当前官方仓库和发布页仍有活动",
  "description": "Clash Party 是原 Mihomo Party 更名后的桌面代理客户端，使用 Electron 与 Mihomo 系列内核；当前官方仓库和发布页仍有活动。",
  "iconName": "Sparkles",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "2024-08-13",
  "latestVersion": "v2.0.4（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/macos/clash-party-mac.ts",
  "githubRepo": "https://github.com/mihomo-party-org/clash-party",
  "officialSite": "https://clashparty.org",
  "releasesUrl": "https://github.com/mihomo-party-org/clash-party/releases",
  "specs": {
    "compatibility": "macOS：按发布包和所含 Electron / 内核要求核对；本次未确认统一最低版本，不沿用 12.0 断言",
    "architecture": "Apple Silicon arm64 / Intel x64",
    "coreEngine": "Mihomo / Smart Core；依安装版本与所选内核而异",
    "protocols": [
      "Shadowsocks",
      "ShadowsocksR",
      "VMess",
      "VLESS（含 REALITY）",
      "Trojan",
      "Hysteria",
      "Hysteria 2",
      "TUIC",
      "WireGuard",
      "Snell",
      "AnyTLS",
      "SSH",
      "SOCKS5",
      "HTTP(S)"
    ],
    "trafficHandling": "系统代理与 TUN；无需手动服务模式不代表无需管理员权限或特权 Helper"
  },
  "tutorial": {
    "overview": "Clash Party（原 Mihomo Party）可导入 Clash / Mihomo 配置，通过系统代理连接。先按下面步骤完成首次使用，也可参考 [官方快速上手](https://clashparty.org/docs/handson)。",
    "prerequisites": [
      "符合安装包要求的 Mac；在“关于本机”确认 Apple Silicon 或 Intel 芯片",
      "可信服务商提供的 Clash / Mihomo 配置或订阅链接，勿公开分享"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "从官方渠道下载安装",
        "description": "从官方发布页下载 macOS 安装包：Apple Silicon 选 arm64，Intel 选 x64。当前 v2.0.4 提供 PKG，双击并按系统安装器完成安装，然后打开应用；涉及 Helper 时仅对可信官方安装包授权。"
      },
      {
        "stepNumber": 2,
        "title": "导入兼容订阅并激活",
        "description": "在订阅管理中添加服务商提供的 Clash / Mihomo YAML 链接，或导入本地配置文件。下载成功后选为当前配置，确认节点列表出现；单个节点分享链接不等于完整配置。"
      },
      {
        "stepNumber": 3,
        "title": "选择可用节点",
        "description": "在代理策略组中测试延迟并选择一个可用节点。初次使用保留规则模式，让配置决定哪些网站走代理。"
      },
      {
        "stepNumber": 4,
        "title": "开启系统代理",
        "description": "在客户端开启系统代理，让遵循系统代理的浏览器和应用使用所选节点。只打开客户端并不代表已连接；首次使用先不启用 TUN。"
      },
      {
        "stepNumber": 5,
        "title": "验证访问并停止代理",
        "description": "用浏览器打开需要代理的网站，再检查常用网站；失败时换节点或查看连接日志。用完先关闭系统代理，如启用了 TUN 也一并关闭，再退出客户端并确认普通上网正常。"
      }
    ],
    "advancedRules": [
      "订阅更新：节点失效时先在订阅管理中更新，再重新选择可用节点；不要把订阅链接发到公共转换站。",
      "代理模式：日常使用规则模式；临时切换全局模式排查问题后，记得切回规则模式。",
      "TUN 接管：仅在目标应用不遵循系统代理时按需启用，并按 macOS 提示授权 Helper；断网先关闭 TUN，检查是否与其他 VPN 冲突。",
      "配置备份：使用覆写或 WebDAV 前先备份；备份可能含订阅凭据，只保存到可信且权限受控的位置。"
    ],
    "faq": [
      {
        "question": "Clash Party 与 Mihomo Party 是什么关系？",
        "answer": "Clash Party 是 Mihomo Party 更名后的客户端。旧说明可能仍使用旧名，不需要再安装一份 Mihomo Party。"
      },
      {
        "question": "浏览器可用，其他应用却连不上？",
        "answer": "该应用可能不遵循系统代理，可按需尝试 TUN。TUN 需要系统权限；启用后断网则先关闭，并检查其他 VPN 和日志。"
      }
    ]
  },
  "changelog": []
};
