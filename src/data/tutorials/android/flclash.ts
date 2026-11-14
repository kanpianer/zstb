import { SoftwareTool } from '../../../types/tutorial';

export const flclash: SoftwareTool = {
  "id": "flclash",
  "name": "FlClash",
  "shortName": "FlClash",
  "system": "android",
  "category": "android",
  "tagline": "导入 Clash 配置，在手机上选择线路",
  "description": "FlClash 是基于 Mihomo 的代理客户端，Android 版支持订阅配置、节点选择和分应用连接。",
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
    "overview": "在 Android 上用 FlClash 导入配置、选择节点并连接 VPN。下载与功能说明见 [官方项目](https://github.com/chen08209/FlClash)，应用本身不提供节点。",
    "prerequisites": [
      "符合该版本系统及 CPU 架构要求的 Android 设备",
      "可信且兼容的订阅或自建节点参数；客户端不提供节点",
      "订阅含凭据，请勿公开；不要同时运行冲突的 VPN"
    ],
    "steps": [
      { "stepNumber": 1, "title": "安装 FlClash", "description": "点击本页“软件下载”，在发布页的 Assets（下载文件）里找到 Android APK。大多数近年的安卓手机选择 arm64-v8a 包；不确定时先查看手机处理器信息或向设备厂商确认。按系统提示允许此次安装，安装完成后打开 FlClash。" },
      { "stepNumber": 2, "title": "导入兼容订阅", "description": "在配置管理中通过 URL 添加服务方提供的 Clash / Mihomo YAML 订阅，也可导入本地 YAML 文件。保存后选为当前配置，确认能看到节点；普通节点分享链接不能代替完整配置。" },
      { "stepNumber": 3, "title": "选择节点", "description": "在代理策略组中选择一个节点，初次使用可先选服务方推荐的线路。日常使用规则模式，哪些网站直连或走代理由当前配置决定。" },
      { "stepNumber": 4, "title": "连接并授权 VPN", "description": "启动连接，首次同意 Android 的 VPN 请求。先停止其他 VPN；若之前拒绝授权，返回 FlClash 再次启动。" },
      { "stepNumber": 5, "title": "浏览器验证与关闭", "description": "打开浏览器，分别访问日常网站和需要代理的网站。确认网页能加载，而不只看 VPN 图标或延迟。用完返回 FlClash 停止连接，确认系统 VPN 状态已断开。" }
    ],
    "advancedRules": [
      "更新订阅：在配置管理中更新当前订阅，确认更新成功后检查所选节点是否仍可用。",
      "分应用使用：在分应用控制中选择需要连接的应用，确认是包含还是排除模式，保存后重新连接测试。",
      "切换线路：在策略组中改选另一节点；如果配置提供自动选择组，也可选用它，再用常用网站验证效果。"
    ],
    "faq": [
      { "question": "配置导入失败怎么办？", "answer": "检查链接是否完整、订阅是否过期，并向服务方索取 Clash / Mihomo YAML 格式。网页地址、单节点链接和 Base64 节点列表不能直接当作完整配置。" },
      { "question": "有 VPN 图标却打不开网页怎么办？", "answer": "先停止连接，确认手机网络正常；再检查当前配置与策略组、换一个节点并重连。只有某个应用失败时检查分应用范围；仍失败可查看日志，求助前隐藏链接和密码。" }
    ]
  },
  "changelog": []
};
