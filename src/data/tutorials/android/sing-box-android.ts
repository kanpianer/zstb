import { SoftwareTool } from '../../../types/tutorial';

export const singBoxAndroid: SoftwareTool = {
  id: 'sing-box-android',
  name: 'Sing-box for Android (SFA)',
  shortName: 'Sing-box Android',
  system: 'android',
  category: 'android',
  tagline: '官方纯血通用代理平台、极致功耗控制与纯粹性能',
  description: '由 SagerNet 官方团队维护的 Android 原生客户端（Sing-box for Android, SFA）。没有花哨冗余的组件，采用官方标准配置语法，功耗极低、协议适配永远处于第一线。',
  iconName: 'Box',
  badgeText: '官方纯血',
  
  updatedAt: '2026-03-26',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-08-10',
  latestVersion: 'v1.11.2',
  updatePath: 'data/tutorials/android/sing-box-android.md',
  
  githubRepo: 'https://github.com/SagerNet/sing-box',
  officialSite: 'https://sing-box.sagernet.org',
  
  specs: {
    compatibility: 'Android 7.0 及更高版本',
    architecture: 'arm64-v8a / armeabi-v7a / x86_64',
    coreEngine: 'Sing-box 官方核心 (Go 原生编译)',
    protocols: ['Shadowsocks', 'VLESS (Reality)', 'VMess', 'Trojan', 'Hysteria 2', 'TUIC v5', 'WireGuard', 'Direct/Reject'],
    trafficHandling: 'VpnService TUN 驱动 + 官方规则路由引擎',
    resourceFootprint: '空闲仅 ~16MB，几乎是全平台内存占用最低的客户端'
  },
  
  screenshot: {
    deviceType: 'android',
    deviceSpec: 'Google Pixel 8 Pro',
    screenResolution: '1344 × 2992 像素',
    title: 'Sing-box Android 官方仪表盘与配置配置集',
    colorScheme: 'light',
    annotations: [
      { id: 'sba1', label: '① 主开关', note: '主页面顶部极简开关，一键启动 TUN 模式拦截', xPercent: 50, yPercent: 15 },
      { id: 'sba2', label: '② Profile管理', note: '支持导入标准 JSON 规则或远程订阅链接', xPercent: 50, yPercent: 40 },
      { id: 'sba3', label: '③ 仪表板概览', note: '实时查看当前出站分配、吞吐率与内存消耗', xPercent: 50, yPercent: 70 }
    ],
    mockData: {
      status: 'Sing-box 运行中 - 内存占用 18.4MB',
      trafficTotal: '下行: 5.1 GB | 上行: 610 MB',
      outboundMode: 'Rule-Based Routing',
      activeNodes: [
        { name: '🇭🇰 香港 01 Extreme [Hy2]', type: 'Hysteria 2', ping: 25, selected: true },
        { name: '🇯🇵 日本 02 Reality', type: 'VLESS', ping: 48 },
        { name: '🇺🇸 美国 03 节点', type: 'Trojan', ping: 130 }
      ],
      logs: [
        'sing-box service started via VpnService',
        'route: ruleset matched geosite-cn -> direct'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程带你配置官方纯血 Sing-box Android 客户端，享受极致低功耗的科学上网体验。',
    prerequisites: [
      'Android 手机设备',
      '支持 Sing-box 格式的远程订阅链接或 JSON 配置文件'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装 APK',
        description: '在 GitHub Releases 页面下载 `SFA-xxx-universal.apk` 或 `arm64-v8a.apk`，安装到手机中。',
        pencilTip: 'SFA 代表 Sing-box For Android，没有任何第三方修改。'
      },
      {
        stepNumber: 2,
        title: '导入 Profile 配置文件',
        description: '打开软件，点击底部的【Profiles】，点击右上角【+】号，选择【Create Profile】。输入机场给定的 sing-box 订阅 URL 或选择【Import Local File】导入本地配置。',
        codeSnippet: 'https://airport.domain/sub/sing-box?token=xxx',
        codeLanguage: 'url',
        pencilTip: '可勾选“Auto Update”设置每日自动刷新节点。'
      },
      {
        stepNumber: 3,
        title: '启动服务并选择节点',
        description: '在 Profiles 列表中选中刚才导入的配置，返回【Dashboard】主页，点击【Start】启动。点击【Groups】展开策略组，轻触选中最优节点即可。',
        pencilTip: '在系统弹出添加 VPN 提示时点击允许。'
      }
    ],
    advancedRules: [
      '电池优化白名单：在系统设置中为 Sing-box 关闭省电限制，保证长时间挂后台不掉线。'
    ],
    faq: [
      {
        question: '为什么软件没有华丽的界面？',
        answer: '官方客户端追求的是纯粹、高效与低开销，以极小的系统资源保证最强悍的协议吞吐性能。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-26',
      author: 'SingBoxCoreDev',
      prNumber: 107,
      summary: '升级 1.11.2 版内核与 Rule-Set 二进制规则集解析指引',
      commitHash: 'f1892de'
    }
  ]
};
