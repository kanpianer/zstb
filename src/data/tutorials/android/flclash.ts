import { SoftwareTool } from '../../../types/tutorial';

export const flclash: SoftwareTool = {
  id: 'flclash',
  name: 'FlClash',
  shortName: 'FlClash',
  system: 'android',
  category: 'android',
  tagline: '基于 Flutter 开发的高颜值多平台 Mihomo 内核客户端',
  description: 'FlClash 是一款基于 Flutter 和 Mihomo 内核打造的现代代理客户端，完美继承了 Clash 的分流策略组体系，UI 设计精致动画丝滑，平板与手机双向自适应，是目前 Android 平台颜值最高的新星之一。',
  iconName: 'Smartphone',
  badgeText: '新锐高颜值',
  
  updatedAt: '2026-11-04',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2023-12-18',
  latestVersion: 'v0.9.3',
  updatePath: 'data/tutorials/android/flclash.md',
  
  githubRepo: 'https://github.com/chen08209/FlClash',
  
  specs: {
    compatibility: 'Android 7.0 及更高版本',
    architecture: 'arm64-v8a / armeabi-v7a',
    coreEngine: 'Mihomo Core (Clash.Meta)',
    protocols: ['VLESS-Reality', 'VMess', 'Hysteria 2', 'TUIC v5', 'Trojan', 'Shadowsocks', 'WireGuard'],
    trafficHandling: 'VpnService 虚拟网卡 + 动态规则分流',
  },
  
  tutorial: {
    overview: '本教程讲解 FlClash 在安卓系统上的安装、Clash 订阅导入以及分流策略定制。',
    prerequisites: [
      'Android 手机一部',
      'Clash 格式的节点订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装 APK',
        description: '前往 FlClash 的 GitHub Releases 页面，下载最新的 `FlClash-xxx-android-arm64-v8a.apk` 安装包完成安装。',
        pencilTip: '应用支持 Material You 动态主题，会根据你的手机壁纸自动变换色彩。'
      },
      {
        stepNumber: 2,
        title: '添加订阅配置',
        description: '打开 FlClash，点击左侧导航栏的【配置】，点击右上角【+】号，输入配置名称并粘贴 Clash 订阅 URL，点击确定完成拉取。',
        codeSnippet: 'https://sub.airport.net/api/v1/client/subscribe?token=xxx&flag=clash',
        codeLanguage: 'url',
        pencilTip: '订阅拉取成功后，点击该配置右侧的单选按钮将其设为激活状态。'
      },
      {
        stepNumber: 3,
        title: '挑选节点并启动',
        description: '进入【代理】页面，点击测速图标完成节点延迟刷新，轻触选中低延迟节点。返回主页点击顶部的连接开关，在弹出的 VPN 请求中点击允许。',
        pencilTip: '主界面可直接查看当前流量波形图与活动连接数。'
      }
    ],
    advancedRules: [
      '应用绕行：在设置中开启“绕过指定应用”，把微信、银行 App 添加到直连名单中。'
    ],
    faq: [
      {
        question: 'FlClash 与 Clash Meta for Android 哪个更好？',
        answer: '两者内核一致，FlClash 界面更加现代化、动画更加流畅，支持全平台多端统一体验。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-11-12',
      author: 'FlutterDev',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'e719aa2'
    }
  ]
};
