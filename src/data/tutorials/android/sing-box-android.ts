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
    "overview": "使用 sing-box Android 客户端导入完整配置并连接 VPN。安装入口见 [官方 Android 文档](https://sing-box.sagernet.org/clients/android/)，应用不附带节点。",
    "prerequisites": [
      "匹配发行包最低要求的 Android 设备；确认 CPU 架构或选择 universal",
      "服务方提供的完整 sing-box JSON 配置，需兼容所装核心版本",
      "订阅和配置含凭据，请勿公开；连接前停止其他 VPN"
    ],
    "steps": [
      { "stepNumber": 1, "title": "安装官方客户端", "description": "通过官方 Android 文档进入下载渠道。普通构建需要 Android 7+，Android 5/6 需选择标有 legacy-android-5 的构建；下载 APK 时也要匹配手机架构，不确定可选择提供的 universal 包。" },
      { "stepNumber": 2, "title": "导入完整配置", "description": "在配置管理中添加 Remote Profile，填入返回完整 sing-box JSON 的订阅地址，下载并保存后选中它。本地文件可使用 Local Profile。Clash YAML、普通节点列表或单节点链接不能直接替代完整配置。" },
      { "stepNumber": 3, "title": "启动并允许 VPN", "description": "启动所选配置，首次同意 Android VPN 连接请求。若出现配置错误，先按提示检查配置，不要反复点连接。" },
      { "stepNumber": 4, "title": "选择可用节点", "description": "配置提供策略组时，在对应分组中选择节点；自动选择组会按配置选择线路。没有分组时使用配置预设的节点，想换线路需向服务方获取带节点选择的配置。" },
      { "stepNumber": 5, "title": "浏览器验证与关闭", "description": "打开浏览器访问日常网站及需要代理的网站，确认网页正常加载。用完回到客户端停止服务，并确认系统 VPN 状态已断开。" }
    ],
    "advancedRules": [
      "远程更新：在 Remote Profile 中设置自动更新；更新前保留可用配置，更新后再测试常用网站。",
      "切换线路：配置提供手动策略组时，选另一节点再测试网页；没有分组时不要寻找不存在的节点开关。",
      "后台连接：仅在锁屏后经常断开时，检查 Android 对此应用的电池限制，按需放宽后重新测试；这可能增加耗电。"
    ],
    "faq": [
      { "question": "订阅导入失败怎么办？", "answer": "确认地址返回完整 sing-box JSON，并让服务方确认兼容的核心版本。Clash YAML、Base64 节点列表和单节点链接不能直接作为 Remote Profile。不要将私密订阅交给不可信在线转换器。" },
      { "question": "启动时报 unknown field 怎么办？", "answer": "配置可能不适合当前核心版本。记下应用显示的核心版本及错误字段，向配置提供方索取兼容配置；自己维护配置时参考 [官方迁移指南](https://sing-box.sagernet.org/migration/)，不要反复重装。" },
      { "question": "已连接但浏览器打不开网页怎么办？", "answer": "先停止服务确认原网络正常，再更新配置或切换策略组中的节点。没有策略组时联系服务方检查预设线路。仍失败可查看日志，发送日志前隐藏订阅链接、密码和访问记录。" }
    ]
  },
  "tagline": "导入完整 sing-box 配置并连接 VPN",
  "description": "SFA 是 sing-box 的官方 Android 客户端，支持本地和远程完整配置。安装时需按 Android 版本选择普通或旧系统构建。",
  "playStoreUrl": "https://play.google.com/store/apps/details?id=io.nekohasekai.sfa",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-android",
  "changelog": []
};
