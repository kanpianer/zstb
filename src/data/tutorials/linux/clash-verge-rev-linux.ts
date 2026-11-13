import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevLinux: SoftwareTool = {
  "id": "clash-verge-rev-linux",
  "name": "Clash Verge Rev",
  "shortName": "Clash Verge Rev",
  "system": "linux",
  "category": "linux",
  "tagline": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动",
  "description": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动。",
  "iconName": "Terminal",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v2.5.10（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/linux/clash-verge-rev-linux.ts",
  "githubRepo": "https://github.com/clash-verge-rev/clash-verge-rev",
  "officialSite": "https://www.clashverge.dev",
  "releasesUrl": "https://github.com/clash-verge-rev/clash-verge-rev/releases",
  "specs": {
    "compatibility": "Linux 图形桌面；依赖由发行包决定；Ubuntu 20.04 存在 WebKitGTK 依赖问题，官方建议 24.04",
    "architecture": "x86_64 / aarch64 / armv7，以 DEB/RPM 发布资产为准",
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
    "overview": "Clash Verge Rev 是基于 Tauri 的 Mihomo 桌面客户端，延续 Clash Verge 项目；官方仓库仍有发布活动。 本教程于 2026-11-13 核查；版本为当次官方发布接口快照，不代表安装时仍为最新。首发日期未独立确认，以官方发布记录为准。",
    "prerequisites": [
      "符合该版本系统与 CPU 架构要求的设备",
      "可信来源提供的兼容配置或订阅；客户端不提供节点服务",
      "妥善保管订阅 URL、节点密钥和备份，不上传至不可信转换站"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "核对平台并安装",
        "description": "从官方 Releases 选择匹配架构的 DEB 或 RPM，用发行版包管理器安装本地包并解决依赖，例如 apt install ./实际文件名.deb 或 dnf install ./实际文件名.rpm。当前核查的 v2.5.10 无 AppImage；AUR 是需自行审核的社区打包，不等同官方发布。"
      },
      {
        "stepNumber": 2,
        "title": "导入并激活配置",
        "description": "在订阅管理页面添加远程 Clash / Mihomo YAML 配置 URL，导入后选中该配置。也可使用本地配置。不要把单节点分享 URI、登录网页或不兼容的通用订阅直接当作完整 YAML；导入失败先看错误日志。"
      },
      {
        "stepNumber": 3,
        "title": "选择策略组和节点",
        "description": "在代理页面选择配置提供的策略组及节点，按需使用规则模式。延迟测试只反映测试目标的响应，不代表带宽或所有网站可达。"
      },
      {
        "stepNumber": 4,
        "title": "先系统代理，按需启用 TUN",
        "description": "先开启系统代理并用浏览器验证。终端等不遵循系统代理的应用可显式设置本地代理，或按官方说明安装/检查服务模式后再启用 TUN，并批准必要的系统权限。TUN 并非辅助功能权限，也不保证 WSL、容器、虚拟机或所有游戏流量都被接管。"
      },
      {
        "stepNumber": 5,
        "title": "验证并保留回退方法",
        "description": "分别检查目标网站、DNS、应用连接与日志，确认路由符合预期。出现断网时先关闭 TUN、恢复系统代理设置，排查其他 VPN、防火墙和路由冲突。"
      }
    ],
    "advancedRules": [
      "[项目 README：维护分支、内核、GPL 与配置增强](https://raw.githubusercontent.com/clash-verge-rev/clash-verge-rev/main/README.md)",
      "[安装文档：平台要求和官方发布渠道](https://www.clashverge.dev/install.html)",
      "[官方快速入门：导入、节点、系统代理与 TUN](https://www.clashverge.dev/guide/quickstart.html)",
      "[版本与安装资产核查](https://api.github.com/repos/clash-verge-rev/clash-verge-rev/releases/latest)",
      "[Mihomo 配置原始示例：协议、DNS、TUN 和排除路由](https://raw.githubusercontent.com/MetaCubeX/mihomo/Meta/docs/config.yaml)",
      "配置增强支持 Merge / Script；仅使用可信脚本，更新订阅后检查最终生效配置。规则模式依赖配置中的规则，并不自动保证特定地区或应用直连。",
      "[Linux 官方故障排查：图形环境与发行版依赖](https://www.clashverge.dev/faq/linux.html)"
    ],
    "faq": [
      {
        "question": "为什么系统代理开启后终端仍无法连接？",
        "answer": "系统代理不是透明转发；应用必须主动遵循系统代理，或显式使用客户端本地 HTTP/SOCKS 监听地址。TUN 是另一种接管方式，仍受路由和排除设置限制。"
      },
      {
        "question": "TUN 启动失败怎么办？",
        "answer": "先看内核与服务日志，检查服务安装状态、管理员授权、虚拟网卡、DNS 与其他 VPN 冲突。Linux 不要对猜测的旧版内核路径执行 setcap；不建议全程以 root 运行 GUI。"
      }
    ]
  },
  "changelog": []
};
