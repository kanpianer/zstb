import { SoftwareTool } from '../../../types/tutorial';

export const quantumultX: SoftwareTool = {
  id: 'quantumult-x',
  name: 'Quantumult X (圈X)',
  shortName: 'Quantumult X',
  system: 'ios',
  category: 'apple',
  tagline: '高颜值手绘仪表盘与强大 JS 脚本生态的进阶利器',
  description: 'Quantumult X（俗称圈X）拥有 iOS 平台最精致的网络活动与策略组可视化界面，其强大的 JavaScript 脚本重写、定时签到任务和去广告生态深受老玩家和发烧友的喜爱。',
  iconName: 'Compass',
  badgeText: '高颜值脚本神器',
  
  updatedAt: '2026-03-05',
  isOpenSource: false,
  license: '商业闭源软件',
  price: '约 $7.99 买断',
  releasedAt: '2019-07-15',
  latestVersion: 'v1.5.8',
  updatePath: 'data/tutorials/ios/quantumult-x.md',
  
  officialSite: 'https://quantumult.app',
  appStoreUrl: 'https://apps.apple.com/us/app/quantumult/id1252015438',
  
  specs: {
    compatibility: 'iOS 14.0 / iPadOS 14.0 或更高版本',
    architecture: 'ARM64 原生',
    coreEngine: 'Quantumult 自研网络核心',
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'Trojan', 'HTTP/SOCKS5'],
    trafficHandling: '虚拟 TUN 网卡 + 全面 MITM 重写 + JS 运行时',
    resourceFootprint: '空闲 ~20MB / 满载 40MB'
  },
  
  screenshot: {
    deviceType: 'iphone',
    deviceSpec: 'Apple iPhone 15 Pro',
    screenResolution: '1179 × 2556 像素',
    title: 'Quantumult X 节点风车罗盘与网络活动仪表盘',
    colorScheme: 'light',
    annotations: [
      { id: 'qx1', label: '① 风车菜单', note: '长按或点击右下角风车图标，展开配置中心与分流重写控制台', xPercent: 85, yPercent: 90 },
      { id: 'qx2', label: '② 策略矩阵', note: '横向滑动切换不同媒体策略（如 Netflix、YouTube、Spotify 等）', xPercent: 50, yPercent: 30 },
      { id: 'qx3', label: '③ 脚本与Task', note: '支持自动化 JS 定时签到与网络请求内容重写', xPercent: 50, yPercent: 65 }
    ],
    mockData: {
      status: 'Quantumult X 运行中 - 策略组就绪',
      trafficTotal: '下行: 3.12 GB | 上行: 420 MB',
      outboundMode: '分流模式 (Rule)',
      activeNodes: [
        { name: '🇭🇰 香港 01 BGP 专线', type: 'Trojan', ping: 35, selected: true },
        { name: '🇹🇼 台湾 02 动画疯解锁', type: 'VMess', ping: 48 },
        { name: '🇯🇵 日本 03 节点', type: 'SS', ping: 62 }
      ],
      logs: [
        'Rewrite hit: script-response-body sample.js',
        'Direct connection allowed for China IP block'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程将引导你完成圈X初次安装后的基础配置、服务器资源解析与分流策略生效。',
    prerequisites: [
      '外区 Apple ID 购买 Quantumult X',
      '支持 QX 格式或转换后的订阅源链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并初次启动',
        description: '在美区或其他外区 App Store 搜索购买 Quantumult X。首次启动需要授予 VPN 权限与通知权限。',
        pencilTip: 'QX 独特的风车图标是核心交互入口。'
      },
      {
        stepNumber: 2,
        title: '添加节点引用资源',
        description: '轻触右下角风车 -> 滚动到【节点】区域 -> 点击【引用 (资源)】。点击右上角【+】，填入资源名称与机场提供的 Quantumult X 节点订阅链接，勾选【更新】即可。',
        codeSnippet: '[server_remote]\nhttps://airport.com/sub/qx?token=xxx, tag=我的机场, enabled=true',
        codeLanguage: 'ini',
        pencilTip: '可以在设置中开启“资源更新时自动测速并选优”。'
      },
      {
        stepNumber: 3,
        title: '添加分流规则与分流策略组',
        description: '在【分流】区域点击【引用 (资源)】，添加常见的大陆直连规则集与流媒体规则集，随后在主界面的策略栏将海外分流指向机场节点。',
        pencilTip: '圈X支持多重分流嵌套，可以单独指定某些应用只走特定地区的节点。'
      },
      {
        stepNumber: 4,
        title: '启动服务并享受极速网络',
        description: '回到首页，将右上角的开关向右拨动开启，系统状态栏显示 VPN 标志即已成功进入代理状态。',
        pencilTip: '在主界面长按节点名称可以触发单节点测速。'
      }
    ],
    advancedRules: [
      '开启 Task 定时签到：在配置文件底部加入 Task 脚本，每日定时获取金币与签到。',
      'MitM 根证书信任：前往 iOS 设置 -> 通用 -> 关于本机 -> 证书信任设置，信任 Quantumult X 生成的自签名证书。'
    ],
    faq: [
      {
        question: '圈X支持 VLESS-Reality 或 Hysteria 2 协议吗？',
        answer: '目前圈X官方版本对新兴协议（如 Reality / Hy2）更新较为缓慢，若主用此类新协议，推荐搭配 Karing 或 Shadowrocket。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-05',
      author: 'ScriptLover',
      prNumber: 74,
      summary: '完善脚本重写与 MitM 证书信任安装指引',
      commitHash: 'd482fe1'
    }
  ]
};
