import { SoftwareTool } from '../../../types/tutorial';

export const v2rayng: SoftwareTool = {
  "id": "v2rayng",
  "name": "v2rayNG",
  "shortName": "v2rayNG",
  "system": "android",
  "category": "android",
  "tagline": "v2rayNG：配置导入、VPN 接管与兼容性说明",
  "description": "v2rayNG 是 Android 代理客户端，官方 2.3.15 发布仍在维护并更新 Xray-core。协议能力必须按实际内置内核与客户端生成配置核查，不能以旧版印象把它等同于仅支持 VMess 的工具。",
  "iconName": "Smartphone",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "2.3.15（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/android/v2rayng.ts",
  "githubRepo": "https://github.com/2dust/v2rayNG",
  "officialSite": "https://github.com/2dust/v2rayNG",
  "releasesUrl": "https://github.com/2dust/v2rayNG/releases",
  "specs": {
    "compatibility": "Android 7.0+（2.3.15 minSdk 24；不是旧版 Android 5.0 要求）",
    "architecture": "arm64-v8a / armeabi-v7a / x86_64 / x86 / universal",
    "coreEngine": "Xray-core；README 也注明 v2fly 支持，实际以所装构建为准",
    "protocols": [
      "VLESS（REALITY / Vision）",
      "VMess",
      "Trojan",
      "Shadowsocks",
      "SOCKS / HTTP",
      "WireGuard",
      "Hysteria 2（已核对 2.3.15 构建代码）"
    ],
    "trafficHandling": "Android VpnService 虚拟接口；受路由与应用范围限制，不是桌面系统代理"
  },
  "tutorial": {
    "overview": "v2rayNG 是 Android 代理客户端，官方 2.3.15 发布仍在维护并更新 Xray-core。协议能力必须按实际内置内核与客户端生成配置核查，不能以旧版印象把它等同于仅支持 VMess 的工具。 核查时间：2026-11-13。版本为官方接口当次快照，不保证安装时仍是最新；首发日期未独立确认。",
    "prerequisites": [
      "符合该版本系统及 CPU 架构要求的 Android 设备",
      "可信且兼容的订阅或自建节点参数；客户端不提供节点",
      "订阅含凭据，请勿公开；不要同时运行冲突的 VPN"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "从官方发布页安装 APK",
        "description": "在 2dust/v2rayNG Releases 选择匹配架构 APK，例如 v2rayNG_2.3.15_arm64-v8a.apk，不确定架构时查看发布文件说明或使用 universal。不同发行 flavor 与签名不一定能覆盖安装；按官方 GPG 说明验证下载，不作所有应用商店均未上架的断言。"
      },
      {
        "stepNumber": 2,
        "title": "导入节点或设置订阅组",
        "description": "单节点使用剪贴板或二维码导入。订阅则进入订阅分组设置，新增名称和 URL，保存后执行更新订阅，并检查导入数量与日志。使用服务方提供的 v2rayNG / v2rayN 节点订阅（明文 URI 列表或 Base64），不是 Clash YAML；完整自定义 Xray JSON 走自定义配置导入。"
      },
      {
        "stepNumber": 3,
        "title": "检查节点与传输参数",
        "description": "选择节点，核对端口、UUID/密码、SNI、REALITY 公钥与 short ID、传输和 flow 与服务端一致。2.3.15 生成代码包含 WireGuard、Hysteria 2 与 XHTTP，不应宣称 Xray 永远不支持它们；但不由此推断旧版、任意扩展或 TUIC 均可用。"
      },
      {
        "stepNumber": 4,
        "title": "设置路由范围并启动 VPN",
        "description": "根据需求选择路由规则和分应用范围；规则所需的 GeoIP / GeoSite 数据必须可用。启动 VPN 模式并确认系统授权，Android VPN 图标只表示服务建立，不能作为连接成功证据。仅代理模式只启动本地监听，不自动接管所有应用。"
      },
      {
        "stepNumber": 5,
        "title": "测试目标并排查",
        "description": "用真实连接测试和实际应用验证，并查看连接与错误日志；TCP ping、URL 测试与带宽测试含义不同，不保证固定测试站点或低延迟必然可用。后台断开时同时排查电池限制、VPN 被其他应用替换和核心错误，不一概归因系统杀后台。"
      }
    ],
    "advancedRules": [
      "[官方 README：内核、下载、Geo 数据与 GPG](https://raw.githubusercontent.com/2dust/v2rayNG/master/README.md)",
      "[2.3.15 系统要求、架构与 flavor](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/build.gradle.kts)",
      "[2.3.15 协议、REALITY 与 XHTTP 生成代码](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/src/main/java/com/v2ray/ang/core/CoreOutboundBuilder.kt)",
      "[2.3.15 导入器：格式兼容边界](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/src/main/java/com/v2ray/ang/handler/AngConfigManager.kt)",
      "[GPL 原始许可证](https://raw.githubusercontent.com/2dust/v2rayNG/master/LICENSE)",
      "[官方版本、日期与发布资产快照](https://api.github.com/repos/2dust/v2rayNG/releases/latest)",
      "[Android VPN 平台机制与授权](https://developer.android.com/develop/connectivity/vpn)"
    ],
    "faq": [
      {
        "question": "支持任意 Clash 或 sing-box 配置吗？",
        "answer": "不能这样假定。2.3.15 导入器解析节点 URI、Base64、v2rayn:// 内部分享、自定义 Xray JSON 和 WireGuard 配置；没有据此承诺完整 Clash YAML / sing-box 规则配置直接兼容。"
      },
      {
        "question": "WireGuard、Hysteria 2 和 REALITY 是不是只能换其他内核？",
        "answer": "本次核对 2.3.15 CoreOutboundBuilder 明确生成 WireGuard、Hysteria 2、REALITY 与 XHTTP 配置。是否能运行仍要匹配所装版本、内核和服务端参数；不能把开发分支新特性当成已发布版本能力。"
      },
      {
        "question": "国内应用异常时必须使用某个固定绕过菜单吗？",
        "answer": "不必。检查路由顺序、DNS、Geo 数据与应用包含/排除范围，依据实际网络需求选择规则，不承诺某个预设适合所有设备。"
      }
    ]
  },
  "changelog": []
};
