import { SoftwareTool } from '../../../types/tutorial';

export const clashPartyWin: SoftwareTool = {
  "id": "clash-party-win",
  "name": "Clash Party",
  "shortName": "Clash Party",
  "system": "windows",
  "category": "windows",
  "tagline": "Clash Party 是原 Mihomo Party 更名后的桌面代理客户端，使用 Electron 与 Mihomo 系列内核；当前官方仓库和发布页仍有活动",
  "description": "Clash Party 是原 Mihomo Party 更名后的桌面代理客户端，使用 Electron 与 Mihomo 系列内核；当前官方仓库和发布页仍有活动。",
  "iconName": "Sparkles",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v2.0.4（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/windows/clash-party-win.ts",
  "githubRepo": "https://github.com/mihomo-party-org/clash-party",
  "officialSite": "https://clashparty.org",
  "releasesUrl": "https://github.com/mihomo-party-org/clash-party/releases",
  "specs": {
    "compatibility": "Windows 10 / 11；具体版本要求以发布说明为准",
    "architecture": "x64 / arm64（按实际发布资产选择）",
    "coreEngine": "Mihomo / Smart Core；依安装版本与所选内核而异",
    "protocols": [
      "VLESS（含 REALITY，取决于内核）",
      "VMess",
      "Trojan",
      "Shadowsocks",
      "Hysteria 2",
      "TUIC",
      "WireGuard"
    ],
    "trafficHandling": "系统代理与 TUN；无需手动服务模式不代表无需管理员权限或特权 Helper"
  },
  "tutorial": {
    "overview": "Clash Party 是原 Mihomo Party 更名后的桌面代理客户端，使用 Electron 与 Mihomo 系列内核；当前官方仓库和发布页仍有活动。 本教程于 2026-11-13 核查；版本为当次官方发布接口快照，不代表安装时仍为最新。首发日期未独立确认，以官方发布记录为准。",
    "prerequisites": [
      "符合该版本系统与 CPU 架构要求的设备",
      "可信来源提供的兼容配置或订阅；客户端不提供节点服务",
      "妥善保管订阅 URL、节点密钥和备份，不上传至不可信转换站"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "从官方渠道下载安装",
        "description": "从官方 Releases 选择对应 x64 / arm64 的 Windows setup.exe 安装版；便携版为 7z，解压后运行。文件名包含版本号，不使用教程猜测的固定直链。"
      },
      {
        "stepNumber": 2,
        "title": "导入兼容订阅并激活",
        "description": "在订阅管理区域添加服务提供方的 Clash / Mihomo YAML URL 或本地配置，完成下载并选为当前配置。通用分享链接不等于完整 Clash 配置；如需 Sub-Store 转换，仅使用可信实例，不把密钥发送给陌生公共转换站。"
      },
      {
        "stepNumber": 3,
        "title": "选择节点并启用系统代理",
        "description": "在代理策略组中选择节点，按配置需要选择规则或全局模式，再启用系统代理。客户端运行与启用系统代理不是同一状态；用目标应用和连接日志确认效果。"
      },
      {
        "stepNumber": 4,
        "title": "按需启用 TUN 并验证权限",
        "description": "只有需要接管不遵循系统代理的程序时才启用 TUN。官方“无需服务模式”描述不等于免权限：虚拟网卡和路由需要系统授权，macOS 存在特权 Helper。若断网，关闭 TUN 并检查 DNS、排除路由与其他 VPN；不保证所有流量都接管。"
      }
    ],
    "advancedRules": [
      "[当前默认 smart_core 分支 README：内核与功能](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/README.md)",
      "[仓库 API：当前名称、主页、非归档与维护活动](https://api.github.com/repos/mihomo-party-org/clash-party)",
      "[官方发布接口：版本与实际资产](https://api.github.com/repos/mihomo-party-org/clash-party/releases/latest)",
      "[GPL 许可证](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/LICENSE)",
      "[官方快速上手](https://clashparty.org/docs/handson)",
      "[官方安装说明（部分说明仍为旧版）](https://clashparty.org/docs/install)",
      "[Mihomo 协议与 TUN 原始配置](https://raw.githubusercontent.com/MetaCubeX/mihomo/Meta/docs/config.yaml)",
      "Sub-Store、覆写和 WebDAV 是配置管理功能，不是客户端自动提供节点或保证匿名的服务；备份可能包含订阅凭据，上传前检查存储权限。"
    ],
    "faq": [
      {
        "question": "Clash Party 与 Mihomo Party 是什么关系？",
        "answer": "当前仓库、应用 productName 和官网使用 Clash Party，旧 README、安装说明、应用标识及部分资产仍保留 Mihomo Party 名称。旧名不是另一个必需安装的内核；以同一官方组织仓库的发布记录核对，不推断确切改名日期。"
      },
      {
        "question": "为什么不照抄“免服务、完全没有安全隐患”？",
        "answer": "免手动服务模式只描述使用方式，不能证明无特权代码或无风险。下载核验、最小权限、可信配置和日志排错仍然必要；macOS 官方文档明确列出 Helper 服务。"
      }
    ]
  },
  "changelog": []
};
