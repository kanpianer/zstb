import { SoftwareTool } from '../../../types/tutorial';

export const flclash: SoftwareTool = {
  "id": "flclash",
  "name": "FlClash",
  "shortName": "FlClash",
  "system": "android",
  "category": "android",
  "tagline": "FlClash：配置导入、VPN 接管与兼容性说明",
  "description": "FlClash 是基于 Flutter 与 Mihomo 的多平台代理客户端；Android 版提供配置管理、策略组和分应用控制，官方仍有发布活动。",
  "iconName": "Smartphone",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v0.9.3（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/android/flclash.ts",
  "githubRepo": "https://github.com/chen08209/FlClash",
  "officialSite": "https://github.com/chen08209/FlClash",
  "releasesUrl": "https://github.com/chen08209/FlClash/releases",
  "specs": {
    "compatibility": "Android；该版本 Gradle 使用 flutter.minSdkVersion，本次未独立解析其最终值，以 APK 安装要求为准",
    "architecture": "arm64-v8a / armeabi-v7a / x86_64",
    "coreEngine": "Mihomo（Clash.Meta）",
    "protocols": [
      "VLESS（含 REALITY）",
      "VMess",
      "Trojan",
      "Shadowsocks",
      "Hysteria 2",
      "TUIC",
      "WireGuard"
    ],
    "trafficHandling": "Android VpnService 虚拟接口；受路由与应用范围限制，不是桌面系统代理"
  },
  "tutorial": {
    "overview": "FlClash 是基于 Flutter 与 Mihomo 的多平台代理客户端；Android 版提供配置管理、策略组和分应用控制，官方仍有发布活动。 核查时间：2026-11-13。版本为官方接口当次快照，不保证安装时仍是最新；首发日期未独立确认。",
    "prerequisites": [
      "符合该版本系统及 CPU 架构要求的 Android 设备",
      "可信且兼容的订阅或自建节点参数；客户端不提供节点",
      "订阅含凭据，请勿公开；不要同时运行冲突的 VPN"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "从官方 Releases 下载 APK",
        "description": "按设备架构下载 Android APK，例如本次确认的 FlClash-0.9.3-android-arm64-v8a.apk。核对官方 SHA256SUMS；仅为此次安装授权安装未知来源应用，勿安装来源不明同名包。"
      },
      {
        "stepNumber": 2,
        "title": "添加并选择配置",
        "description": "在配置管理页面从 URL 或本地文件导入 Clash / Mihomo YAML，下载后选为当前配置。节点分享链接、Base64 节点列表和完整规则配置不是同一种格式，不要假设均可直接导入。菜单布局随版本和屏幕尺寸变化，以配置管理功能为准。"
      },
      {
        "stepNumber": 3,
        "title": "选择策略并授权 VPN",
        "description": "在代理策略组选择节点，按配置使用规则模式，启动连接后同意 Android VPN 授权。Android 版通过 VpnService 接管适用应用流量，不是桌面系统代理开关。"
      },
      {
        "stepNumber": 4,
        "title": "检查分应用与连通性",
        "description": "如需分应用控制，在对应设置中确认是包含还是排除模式；被排除的应用不进入 VPN。分别验证目标应用、DNS 和连接日志，延迟数值不代表带宽，也不保证所有目标可达。"
      }
    ],
    "advancedRules": [
      "[项目 README：GPL、下载、配置和 Android 分应用功能](https://raw.githubusercontent.com/chen08209/FlClash/main/README.md)",
      "[v0.9.3 Gradle 系统要求来源](https://raw.githubusercontent.com/chen08209/FlClash/v0.9.3/android/app/build.gradle.kts)",
      "[Mihomo 协议和 TUN 原始配置](https://raw.githubusercontent.com/MetaCubeX/mihomo/Meta/docs/config.yaml)",
      "[官方版本、日期与发布资产快照](https://api.github.com/repos/chen08209/FlClash/releases/latest)",
      "[Android VPN 平台机制与授权](https://developer.android.com/develop/connectivity/vpn)"
    ],
    "faq": [
      {
        "question": "和 Clash Meta for Android 有何区别？",
        "answer": "它们是不同客户端，不能仅凭内核相同推断菜单、功能或稳定性相同。按配置兼容性、系统要求和维护记录选择，不以界面审美作技术结论。"
      },
      {
        "question": "为什么有 VPN 图标仍无法访问？",
        "answer": "图标仅表示 VPN 服务已建立，不证明节点、DNS 或分流有效。检查活动配置、策略组、日志和其他 VPN；必要时停止 VPN 恢复网络。"
      }
    ]
  },
  "changelog": []
};
