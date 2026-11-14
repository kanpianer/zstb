import { SoftwareTool } from '../../../types/tutorial';

export const nekoboxAndroid: SoftwareTool = {
  "id": "nekobox-android",
  "name": "NekoBox",
  "shortName": "NekoBox",
  "system": "android",
  "category": "android",
  "tagline": "导入订阅，选择节点并连接 VPN",
  "description": "NekoBox 是 Android 代理客户端，支持多种节点订阅。项目目前较少维护，使用前请确认所需功能；它不是 sing-box 官方客户端。",
  "iconName": "Smartphone",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later",
  "releasedAt": "2023-03-15",
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
      "SOCKS4/4a/5",
      "HTTP(S)",
      "SSH",
      "Shadowsocks",
      "VMess",
      "Trojan",
      "VLESS（含 REALITY）",
      "AnyTLS",
      "ShadowTLS",
      "TUIC",
      "Hysteria",
      "Hysteria 2",
      "WireGuard",
      "NaïveProxy（需插件）",
      "Trojan-Go（需插件）",
      "Mieru（需插件）"
    ],
    "trafficHandling": "Android VpnService 虚拟接口；受路由与应用范围限制，不是桌面系统代理"
  },
  "tutorial": {
    "overview": "按下面步骤安装 NekoBox、导入订阅并连接。它不提供节点，也不是 sing-box 官方客户端；项目目前较少维护，安装前可查看 [官方说明](https://github.com/MatsuriDayo/NekoBoxForAndroid)。",
    "prerequisites": [
      "符合该版本系统及 CPU 架构要求的 Android 设备",
      "可信且兼容的订阅或自建节点参数；客户端不提供节点",
      "订阅含凭据，请勿公开；不要同时运行冲突的 VPN"
    ],
    "steps": [
      { "stepNumber": 1, "title": "安装官方 APK", "description": "点击本页“软件下载”，在发布页的 Assets（下载文件）中选择 APK。大多数近年的安卓手机使用 arm64-v8a；若该版本提供 universal 通用包，不确定时可选通用包。安装后打开应用。官方提醒 Google Play 同名版本已由第三方控制，不要从那里下载。" },
      { "stepNumber": 2, "title": "导入订阅", "description": "在分组管理中新建订阅分组，填入服务方提供的订阅 URL，保存并更新。也可从剪贴板或二维码导入单个节点。支持的 ClashMeta、v2rayN 等格式只导入节点，不会带入原有分流规则。" },
      { "stepNumber": 3, "title": "选择一个节点", "description": "在导入的分组中选中一个节点。初次使用优先选服务方推荐、无需额外插件的节点；提示缺少插件时，先向服务方确认要求，不要随意修改参数。" },
      { "stepNumber": 4, "title": "连接并允许 VPN", "description": "启动连接，首次按 Android 提示允许 VPN 连接。先关闭其他 VPN，避免连接被替换；未授权时返回应用重新启动。" },
      { "stepNumber": 5, "title": "用浏览器验证并关闭", "description": "打开浏览器访问一个日常网站及需要代理的网站，确认都能加载。只有 VPN 图标不代表节点可用。用完回到 NekoBox 停止连接，确认系统 VPN 状态已断开。" }
    ],
    "advancedRules": [
      "更新订阅：在订阅分组中执行更新，再确认当前节点仍然存在；更新失败时不要急着删除原分组。",
      "按应用连接：在应用范围设置中选择需要使用 VPN 的应用，留意包含或排除的含义，保存后重新连接验证。",
      "调整分流：需要某个网站直连时，在路由设置中添加相应规则，再用浏览器测试；导入的 Clash 规则不会自动生效。"
    ],
    "faq": [
      { "question": "订阅导入失败或没有节点怎么办？", "answer": "重新复制完整订阅 URL，检查订阅是否过期，并向服务方确认格式支持 NekoBox。不要把登录页面地址当作订阅，也不要将含令牌的链接发到公开群组。" },
      { "question": "显示连接但网页打不开怎么办？", "answer": "先停止 VPN，确认手机本身能上网；再更新订阅、换一个节点并重新连接。仍失败时查看错误日志，向服务方确认节点或插件要求；发送日志前隐藏订阅地址和密码。" },
      { "question": "为什么导入后部分网站的连接方式不同？", "answer": "NekoBox 只解析节点，不沿用原订阅里的分流规则。检查本应用的路由和应用范围；可以先恢复原设置对比，不必重装。" }
    ]
  },
  "changelog": []
};
