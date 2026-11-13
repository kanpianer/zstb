import { SoftwareTool } from '../../../types/tutorial';

export const singBoxAndroid: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "官方客户端",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "本平台客户端首发日期未确认",
  "latestVersion": "1.14.4（GitHub release，2026-10-24 发布）",
  "releasesUrl": "https://github.com/SagerNet/sing-box/releases",
  "officialSite": "https://sing-box.sagernet.org",
  "id": "sing-box-android",
  "system": "android",
  "category": "android",
  "updatePath": "src/data/tutorials/android/sing-box-android.ts",
  "price": "官方开源发行免费下载；代理服务另行准备",
  "specs": {
    "compatibility": "普通/Play 构建 Android 7.0+；legacy-android-5 构建 Android 5.0+",
    "architecture": "arm64-v8a / armeabi-v7a / x86 / x86_64；有 universal APK",
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
    "trafficHandling": "Android VpnService / TUN；按完整配置路由"
  },
  "tutorial": {
    "overview": "检索日期：2026-11-13。依据 [官方 Android 文档](https://sing-box.sagernet.org/clients/android/)、[构建脚本](https://github.com/SagerNet/sing-box-for-android/blob/dev/app/build.gradle.kts) 和 [1.14.4 发行资产](https://github.com/SagerNet/sing-box/releases/tag/v1.14.4)。文档总要求 Android 5+，源码区分普通 minSdk 24 与旧系统 minSdk 21，安装时必须选对构建。",
    "prerequisites": [
      "匹配发行包最低要求的 Android 设备；确认 CPU 架构或选择 universal",
      "可信且匹配已安装核心版本的完整 sing-box JSON 配置"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "选择官方发行渠道与 APK",
        "description": "通过官方 Android 文档进入 Play Store、GitHub Releases 或 F-Droid。GitHub 普通包例如 SFA-1.14.4-arm64-v8a.apk；旧系统需要明确标记 legacy-android-5 的包。核对架构后安装，按需授权该来源安装 APK。",
        "pencilTip": "不要盲目覆盖来自不同签名渠道的安装；先备份配置，核对升级说明。"
      },
      {
        "stepNumber": 2,
        "title": "创建本地或远程配置",
        "description": "在配置管理中添加 Local Profile 或 Remote Profile。远程地址必须返回完整 sing-box JSON，保存并确认能解析，再选中配置。自动更新是远程配置功能，更新也可能引入不兼容字段。"
      },
      {
        "stepNumber": 3,
        "title": "启动 VPN 服务并验证",
        "description": "启动所选配置，首次允许 Android VPN 连接请求。通过日志和实际请求验证，配置包含 selector/urltest 时才使用对应策略组界面。若后台断连，检查系统电池限制与日志，不保证移除省电限制即可永不掉线。"
      }
    ],
    "advancedRules": [
      "升级前备份配置并阅读 [迁移指南](https://sing-box.sagernet.org/migration/) 和 [废弃列表](https://sing-box.sagernet.org/deprecated/)：GeoIP/Geosite 已在 1.12 移除，应迁移 rule-set；旧 block/dns 特殊出站、WireGuard outbound 和旧入站 sniff 等字段在 1.13 移除，分别迁移规则动作、WireGuard endpoint 等；旧 DNS server 格式在 1.14 移除。在线文档还列出 1.15+ 的变化，不能不看版本就套用。",
      "[官方通用 GUI 规范](https://sing-box.sagernet.org/clients/general/) 区分 Local、iCloud 与 Remote Profile；Remote 下载的必须是完整配置。查看应用显示的核心版本再排查配置兼容性。"
    ],
    "faq": [
      {
        "question": "URL 订阅能直接作为配置吗？",
        "answer": "仅当 URL 返回适合已安装核心版本的完整 sing-box JSON 配置。Clash YAML、Base64 节点列表和单个分享链接不是完整配置；Remote Profile 是 GUI 的配置下载/更新功能，不是内核自动转换订阅。不要将私密链接交给不可信在线转换器。"
      },
      {
        "question": "为什么没有 Groups 或模式切换？",
        "answer": "官方通用客户端规范只在配置包含 selector/urltest 分组出站时提供策略组；模式选择也需要配置使用至少两个 clash_mode 值。不能保证任意导入配置都出现这些控件。"
      },
      {
        "question": "VPN 显示连接是否就代表可用？",
        "answer": "只说明隧道状态，不保证节点、DNS 或规则正确。查看日志及实际请求；错误中若有 unknown field 或 deprecated，按核心版本迁移配置，切勿仅反复重装应用。"
      }
    ]
  },
  "tagline": "官方 Android 图形客户端 SFA，区分普通与旧系统发行包",
  "description": "SFA 是 SagerNet 的 Android 图形客户端，管理本地或远程完整 sing-box 配置，通过 Android VPN 服务提供 TUN。普通构建与 legacy-android-5 构建有不同最低系统要求，不能只用“Android 5+”描述所有下载包。",
  "playStoreUrl": "https://play.google.com/store/apps/details?id=io.nekohasekai.sfa",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-android",
  "changelog": []
};
