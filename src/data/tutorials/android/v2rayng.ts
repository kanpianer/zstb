import { SoftwareTool } from '../../../types/tutorial';

export const v2rayng: SoftwareTool = {
  "id": "v2rayng",
  "name": "v2rayNG",
  "shortName": "v2rayNG",
  "system": "android",
  "category": "android",
  "tagline": "在 Android 上导入节点并连接 VPN",
  "description": "v2rayNG 是基于 Xray-core 的 Android 代理客户端，可通过订阅、节点链接或二维码添加线路，需自行准备代理服务。",
  "iconName": "Smartphone",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0",
  "releasedAt": "2019-05-15",
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
      "SOCKS",
      "HTTP",
      "WireGuard",
      "Hysteria 2"
    ],
    "trafficHandling": "Android VpnService 虚拟接口；受路由与应用范围限制，不是桌面系统代理"
  },
  "tutorial": {
    "overview": "跟着下面步骤在 Android 上安装 v2rayNG、导入订阅并连接。下载入口见 [官方项目](https://github.com/2dust/v2rayNG)，应用本身不提供节点。",
    "prerequisites": [
      "Android 7.0+ 设备及匹配架构的安装包",
      "服务方提供的 v2rayNG / v2rayN 兼容订阅或节点链接",
      "订阅含凭据，请勿公开；连接前停止其他 VPN"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "安装 v2rayNG",
        "description": "从官方 Releases 下载适合手机架构的 APK，不确定时可选 universal 包。按系统提示允许此次安装，不安装来路不明的同名软件。"
      },
      {
        "stepNumber": 2,
        "title": "添加并更新订阅",
        "description": "进入订阅分组设置，新增名称和订阅 URL，保存后执行更新订阅。使用服务方标注适用于 v2rayNG / v2rayN 的节点订阅，不要填入 Clash YAML；单节点可从剪贴板或二维码导入。"
      },
      {
        "stepNumber": 3,
        "title": "选择节点",
        "description": "在节点列表中点选一个节点，初次使用可先选服务方推荐的线路。可用应用的连接测试辅助选择，但最终仍需打开网页验证。"
      },
      {
        "stepNumber": 4,
        "title": "启动 VPN 并授权",
        "description": "使用 VPN 模式启动连接，首次同意 Android VPN 请求。不要选仅代理模式，它不会自动让浏览器等应用走 VPN。"
      },
      {
        "stepNumber": 5,
        "title": "浏览器验证与关闭",
        "description": "打开浏览器，分别访问日常网站和需要代理的网站，确认正常加载。用完返回 v2rayNG 停止连接，确认系统 VPN 状态已断开。"
      }
    ],
    "advancedRules": [
      "更新订阅：在订阅分组设置中维护地址，再执行更新订阅；节点失效时先更新，不必删除整个应用。",
      "分应用连接：在分应用设置中选择包含或排除的应用，确认范围后重新连接，再测试目标应用。",
      "调整路由：需要改变哪些网站走代理时，在路由设置中选择合适规则；修改前记住原设置，网站异常时可恢复对比。"
    ],
    "faq": [
      {
        "question": "订阅更新后没有节点怎么办？",
        "answer": "检查 URL 是否完整、服务是否到期，并确认拿到的是 v2rayNG / v2rayN 节点订阅，而非网页或 Clash 配置。仍报错时向服务方索取兼容链接，不要交给不可信在线转换网站。"
      },
      {
        "question": "已连接但网页打不开怎么办？",
        "answer": "先停止 VPN，确认原网络正常；再更新订阅、换节点并重连。如果只影响某个应用，检查分应用范围和路由。查看错误日志求助时，隐藏密码、订阅链接等凭据。"
      },
      {
        "question": "锁屏后经常断开怎么办？",
        "answer": "检查是否有其他 VPN 替换连接，再查看系统对 v2rayNG 的电池限制和应用日志。可按需放宽电池限制后测试，但会增加耗电，且不能解决节点本身离线的问题。"
      }
    ]
  },
  "changelog": []
};
