import { SoftwareTool } from '../../../types/tutorial';

export const nekoboxAndroid: SoftwareTool = {
  "id": "nekobox-android",
  "name": "NekoBox",
  "shortName": "NekoBox",
  "system": "android",
  "category": "android",
  "tagline": "NekoBox：配置导入、VPN 接管与兼容性说明",
  "description": "NekoBox for Android 是使用 sing-box 分支的 Android 通用代理工具。官方 1.4.2 发布说明明确表示项目较少维护、不接受功能请求，非重大问题可能不修复；不是 sing-box 官方 Android 客户端。",
  "iconName": "Smartphone",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "1.4.2（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/android/nekobox-android.ts",
  "githubRepo": "https://github.com/MatsuriDayo/NekoBoxForAndroid",
  "officialSite": "https://github.com/MatsuriDayo/NekoBoxForAndroid",
  "releasesUrl": "https://github.com/MatsuriDayo/NekoBoxForAndroid/releases",
  "specs": {
    "compatibility": "Android 5.0+（API 21；个别核心/插件另有要求）",
    "architecture": "arm64-v8a / armeabi-v7a / x86 / x86_64",
    "coreEngine": "sing-box 分支；1.4.2 内置 1.12.19-neko-1",
    "protocols": [
      "SOCKS / HTTP(S)",
      "SSH",
      "Shadowsocks",
      "VMess",
      "Trojan",
      "VLESS",
      "AnyTLS / ShadowTLS",
      "TUIC",
      "Hysteria 1/2",
      "WireGuard",
      "NaïveProxy / Trojan-Go / Mieru（需插件）"
    ],
    "trafficHandling": "Android VpnService 虚拟接口；受路由与应用范围限制，不是桌面系统代理"
  },
  "tutorial": {
    "overview": "NekoBox for Android 是使用 sing-box 分支的 Android 通用代理工具。官方 1.4.2 发布说明明确表示项目较少维护、不接受功能请求，非重大问题可能不修复；不是 sing-box 官方 Android 客户端。 核查时间：2026-11-13。版本为官方接口当次快照，不保证安装时仍是最新；首发日期未独立确认。",
    "prerequisites": [
      "符合该版本系统及 CPU 架构要求的 Android 设备",
      "可信且兼容的订阅或自建节点参数；客户端不提供节点",
      "订阅含凭据，请勿公开；不要同时运行冲突的 VPN"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "核对渠道与安装包",
        "description": "仅从 MatsuriDayo/NekoBoxForAndroid 的 GitHub Releases 获取匹配架构 APK，本次文件名为 NekoBox-1.4.2-arm64-v8a.apk，不是旧教程猜测的 NB4A 前缀。官方 README 警告：Google Play 版本自 2024 年 5 月起被第三方控制且非开源，请不要下载；不要将商店同名包当作官方版。"
      },
      {
        "stepNumber": 2,
        "title": "添加订阅分组或导入节点",
        "description": "在分组管理中建立订阅分组，填写可信订阅 URL，保存并更新；单节点可使用剪贴板或二维码导入。README 列出 Shadowsocks、ClashMeta、v2rayN 常见格式及 sing-box 出站，但只解析节点，忽略分流规则等信息。"
      },
      {
        "stepNumber": 3,
        "title": "检查协议与插件依赖",
        "description": "核对导入节点的协议、传输、TLS / REALITY 参数。NaïveProxy、Trojan-Go、Mieru 等需要官方文档指定的额外插件，不能宣称所有协议均由内置核心直接支持。"
      },
      {
        "stepNumber": 4,
        "title": "选择节点并启动 VPN",
        "description": "选中节点后启动连接，批准系统 VPN 请求。按需要在客户端设置路由与应用范围，不假定导入的 Clash 规则生效。连接后检查日志和目标应用；结束使用时停止 VPN。"
      }
    ],
    "advancedRules": [
      "[官方 README：商店警告、协议、插件与导入限制](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/README.md)",
      "[GPL-3.0-or-later 原始许可证](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/LICENSE)",
      "[API21 与架构原始构建配置](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/buildSrc/src/main/kotlin/Helpers.kt)",
      "[官方版本、日期与发布资产快照](https://api.github.com/repos/MatsuriDayo/NekoBoxForAndroid/releases/latest)",
      "[Android VPN 平台机制与授权](https://developer.android.com/develop/connectivity/vpn)"
    ],
    "faq": [
      {
        "question": "Google Play 上的 NekoBox 是官方开源版吗？",
        "answer": "不是。官方 README 明确提醒自 2024 年 5 月起该商店版本由第三方控制、非开源，不要下载。使用官方 GitHub Releases；无需寻找或信任同名商店链接。"
      },
      {
        "question": "导入 Clash 订阅后为什么分流不同？",
        "answer": "NekoBox 只从支持格式中解析节点，忽略原配置的分流规则。应在本客户端独立配置路由，不能把节点导入视作完整 Clash / sing-box 配置迁移。"
      },
      {
        "question": "Hysteria 2 超时是否必须调整端口跳跃？",
        "answer": "不能仅凭超时断定 UDP 被限速。先检查日志、UDP 可达性、服务端端口、防火墙、证书和协议参数；仅在服务端明确支持时配置端口跳跃，不盲目修改频率。"
      }
    ]
  },
  "changelog": []
};
