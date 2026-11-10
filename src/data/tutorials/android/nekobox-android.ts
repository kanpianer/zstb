import { SoftwareTool } from '../../../types/tutorial';

export const nekoboxAndroid: SoftwareTool = {
  id: 'nekobox-android',
  name: 'NekoBox for Android',
  shortName: 'NekoBox',
  system: 'android',
  category: 'android',
  tagline: '基于 sing-box 核心的多协议极客利器与 Matsuri 正统继承者',
  description: 'NekoBox for Android 是广受欢迎的 Matsuri（茉莉）项目分支继承者。以 sing-box 为底层核心，兼具强大的通用协议支持、精细的路由分流规则与自定义链式代理功能，是高阶极客的安卓心头好。',
  iconName: 'Smartphone',
  badgeText: '极客多协议',
  
  updatedAt: '2026-03-16',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-09-01',
  latestVersion: 'v1.3.2',
  updatePath: 'data/tutorials/android/nekobox-android.md',
  
  githubRepo: 'https://github.com/MatsuriDayo/NekoBoxForAndroid',
  
  specs: {
    compatibility: 'Android 6.0 及更高版本',
    architecture: 'arm64-v8a / armeabi-v7a',
    coreEngine: 'sing-box core + 自定义插件模块',
    protocols: ['VLESS-Reality', 'Hysteria 2', 'TUIC v5', 'Shadowsocks', 'Trojan', 'VMess', 'WireGuard', 'NaïveProxy'],
    trafficHandling: 'VpnService TUN 模式 + 链式转发',
    resourceFootprint: '空闲 ~24MB / 满载 42MB'
  },
  
  screenshot: {
    deviceType: 'android',
    deviceSpec: 'OnePlus 13 / Redmi K80 Pro',
    screenResolution: '1440 × 3168 像素',
    title: 'NekoBox 路由规则链与节点测速矩阵',
    colorScheme: 'light',
    annotations: [
      { id: 'nb1', label: '① 节点矩阵', note: '支持聚合多种不同协议类型与自定义出站链路', xPercent: 50, yPercent: 30 },
      { id: 'nb2', label: '② 路由分支', note: '精细的域名与 IP 分流规则集，国内完全不绕行', xPercent: 50, yPercent: 60 },
      { id: 'nb3', label: '③ 启动控制', note: '底部常驻操作栏，点击一键唤起 VPN 系统服务', xPercent: 80, yPercent: 90 }
    ],
    mockData: {
      status: 'sing-box 核心正在工作 - 链路完整',
      trafficTotal: '下行: 6.2 GB | 上行: 880 MB',
      outboundMode: '绕过局域网及大陆 (Bypass CN)',
      activeNodes: [
        { name: '🇭🇰 HK 01 Extreme [Hysteria 2]', type: 'Hysteria 2', ping: 27, selected: true },
        { name: '🇯🇵 Tokyo 02 Reality', type: 'VLESS', ping: 47 },
        { name: '🇸🇬 SG 03 NaïveProxy', type: 'Naïve', ping: 63 }
      ],
      logs: [
        'sing-box inbound tun ready',
        'route matched geosite-cn -> direct'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程讲解如何在安卓设备上使用 NekoBox 进行多协议订阅导入与前沿协议（如 Reality / Hysteria 2）连接。',
    prerequisites: [
      'Android 手机',
      '支持 sing-box 或常见通用格式的节点订阅'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装客户端',
        description: '从 GitHub Releases 页面下载 `NB4A-xxx-arm64-v8a.apk`，安装到手机上。',
        pencilTip: 'NekoBox 内置了完整的 sing-box 核心，无需额外下载插件核心。'
      },
      {
        stepNumber: 2,
        title: '添加配置分组',
        description: '点击右上角【+】号，选择【分组设置】或添加单个自建节点；也可以直接选择【从剪贴板导入】或【扫描二维码】。',
        codeSnippet: 'vless://uuid@domain:443?security=reality&sni=example.com&pbk=key&type=grpc#HK-Node',
        codeLanguage: 'text',
        pencilTip: '支持多种协议混排，兼容性表现极佳。'
      },
      {
        stepNumber: 3,
        title: '选择出站并启动',
        description: '在节点列表中点击选中目标节点，轻触下方启动按钮建立连接。系统弹窗确认 VPN 授权后即可正常翻墙。',
        pencilTip: '可开启“URL 延迟测试”自动找出当期响应速度最快的可用节点。'
      }
    ],
    advancedRules: [
      '配置链式代理：把中转节点作为前置出站，落地机作为后置出站，实现双重跳板隐藏真实 IP。'
    ],
    faq: [
      {
        question: '为什么有的 Hysteria 2 节点测速超时？',
        answer: '检查运营商是否对 UDP 进行了高烈度 QoS 阻断；可尝试在配置中调低端口跳跃（Port Hopping）频率或调小发包速率。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-16',
      author: 'NekoMaster',
      prNumber: 94,
      summary: '梳理链式出站与 Hysteria 2 UDP 调优建议',
      commitHash: 'd220ff1'
    }
  ]
};
