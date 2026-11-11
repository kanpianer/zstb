import { SoftwareTool } from '../../../types/tutorial';

export const shadowrocket: SoftwareTool = {
  id: 'shadowrocket',
  name: 'Shadowrocket (小火箭)',
  shortName: 'Shadowrocket',
  system: 'ios',
  category: 'apple',
  tagline: 'iOS 生态装机量第一的规则分流与全协议代理客户端',
  description: 'Shadowrocket 是一款基于 iOS NetworkExtension 架构的规则型代理工具，以极高的性价比、傻瓜式机场订阅支持以及对新兴协议极速跟进而闻名，是 iOS 平台最普及的翻墙利器。',
  iconName: 'Rocket',
  badgeText: 'iOS 普及首选',
  
  updatedAt: '2026-03-24',
  isOpenSource: false,
  license: '商业闭源授权',
  price: '约 $2.99 买断',
  releasedAt: '2015-04-12',
  latestVersion: 'v2.2.65',
  updatePath: 'data/tutorials/ios/shadowrocket.md',
  
  officialSite: 'https://shadowlaunch.com',
  appStoreUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
  
  specs: {
    compatibility: 'iOS 12.0 / iPadOS 12.0 或更高版本 (兼容 visionOS)',
    architecture: 'ARM64 (Apple A/M 系列芯片原生优化)',
    coreEngine: 'iOS NetworkExtension + 自研多协议引擎',
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'WireGuard', 'Snell', 'HTTP/SOCKS5'],
    trafficHandling: 'VPN TUN 虚拟网卡全局拦截 + 本地 DNS 缓存分流',
    resourceFootprint: '空闲 ~18MB / 满载 45MB，CPU 占用低于 2%'
  },
  
  screenshot: {
    deviceType: 'iphone',
    deviceSpec: 'Apple iPhone 16 Pro (Super Retina XDR)',
    screenResolution: '1179 × 2556 像素 (460 ppi)',
    title: 'Shadowrocket 节点仪表盘与分流工作台',
    colorScheme: 'light',
    annotations: [
      { id: 'a1', label: '① 状态开关', note: '主页面顶部一键连接开关，自动唤起 iOS VPN 权限确认', xPercent: 50, yPercent: 12 },
      { id: 'a2', label: '② 全局路由', note: '默认推荐设为【配置】(分流模式)，国内直连海外走代理', xPercent: 50, yPercent: 24 },
      { id: 'a3', label: '③ 订阅节点', note: '多协议节点列表，点击右上角【+】扫码或粘贴机场订阅', xPercent: 50, yPercent: 48 },
      { id: 'a4', label: '④ Ping测速', note: '轻触【连通性测试】，支持按毫秒延迟或可用性自动排序', xPercent: 82, yPercent: 32 }
    ],
    mockData: {
      status: '已连接 (Connected) - 规则分流模式',
      trafficTotal: '下行: 1.42 GB | 上行: 182 MB',
      outboundMode: '配置 (Rule Base)',
      activeNodes: [
        { name: '🇭🇰 香港 IEPL 专线 01 [优质]', type: 'VLESS-Reality', ping: 32, selected: true },
        { name: '🇯🇵 日本 Tokyo BGP 02', type: 'Hysteria 2', ping: 58 },
        { name: '🇸🇬 新加坡 狮城 03', type: 'Trojan', ping: 64 },
        { name: '🇺🇸 美国 硅谷 04 [流媒体]', type: 'VMess', ping: 142 }
      ],
      logs: [
        '[Rule] DIRECT: api.apple.com',
        '[Rule] PROXY -> HK 01: youtubei.googleapis.com',
        '[DNS] Resolved dns.google -> 8.8.8.8 (12ms)'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程将带领你在 3 分钟内完成从 App Store 购买、导入节点订阅到开启智能国内直连分流的全流程。',
    prerequisites: [
      '一个非中国大陆地区的 Apple ID (美区/港区/日区/台区均可)',
      '已购买 Shadowrocket (价格 $2.99 美元，支持礼品卡或外卡支付)',
      '一份可用的机场节点订阅链接 (支持 Base64、SS、Clash 格式)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '获取并安装客户端',
        description: '在 iPhone 的 App Store 中退出国区账号，登录外区 Apple ID 后搜索 "Shadowrocket" 进行购买下载。认准原开发者为 "Shadow Launch Technology Limited"，切勿下载国区山寨诈骗应用。',
        pencilTip: '下载完成后可切换回日常的国区 Apple ID，不影响小火箭后续正常运行与升级。'
      },
      {
        stepNumber: 2,
        title: '导入节点与订阅链接',
        description: '打开 Shadowrocket，点击右上角的【+】加号。在最顶部的【类型】一栏点击下拉菜单选择【Subscribe】（订阅），在【URL】处粘贴机场提供的订阅链接，【备注】填入服务商名称，点击右上角【完成】保存。',
        codeSnippet: 'https://your-airport-provider.com/api/v1/client/subscribe?token=xyz123',
        codeLanguage: 'url',
        pencilTip: '如果机场提供二维码，可以直接点击左上角扫描按钮进行秒级导入！'
      },
      {
        stepNumber: 3,
        title: '选择节点并开启规则分流',
        description: '在首页节点列表中点击【连通性测试】，挑选一个延迟较低的节点（如绿色低延迟节点）。确保主界面【全局路由】保持为【配置】（Rule），切勿误选为【全局直连】或【全局代理】。',
        pencilTip: '【配置】模式会自动使国内网站（百度、微信、网易云等）直连，仅国外被屏蔽网站才走代理，节省宝贵流量并降低延迟。'
      },
      {
        stepNumber: 4,
        title: '启动连接并授权 VPN 权限',
        description: '将顶部的连接开关拨至打开。首次启动时 iOS 会弹出系统提示：“Shadowrocket 想要添加 VPN 配置”，点击【允许】并输入 iPhone 锁屏密码即可建立安全连接。',
        pencilTip: '屏幕右上角灵动岛或状态栏出现【VPN】小图标即代表连接成功！'
      }
    ],
    advancedRules: [
      '启用自动更新订阅：点击底部【设置】->【订阅】-> 勾选【打开时更新】与【自动后台更新】。',
      '隐藏 VPN 图标：在设置中开启“按需连接 (On Demand)”，优化网络切换不掉线。',
      '防止 DNS 污染：在【设置】->【DNS】中，将远程 DNS 设置为 8.8.8.8 或 1.1.1.1。'
    ],
    faq: [
      {
        question: '为什么国内 App 变慢或提示异地登录？',
        answer: '检查首页【全局路由】是否误设成了【代理 (Proxy)】。请务必切换回【配置 (Config)】，这样国内软件将直接走本地蜂窝/Wi-Fi，不再绕道海外。'
      },
      {
        question: '节点测速全部超时或出现红感叹号怎么办？',
        answer: '通常是订阅链接过期、欠费或 Wi-Fi 路由器开启了特定拦截。可尝试切换 4G/5G 蜂窝网络再次点击连通性测试，或在小火箭中长按订阅项选择【更新订阅】。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-24',
      author: 'CyberPencil-Editor',
      prNumber: 104,
      summary: '补全 Hysteria 2 与 TUIC v5 新协议配置指引与 iPhone 16 Pro 屏幕适配规格',
      commitHash: 'a7f3d91'
    },
    {
      date: '2026-01-18',
      author: 'iOS-Master',
      prNumber: 88,
      summary: '校对订阅自动更新步骤并添加防 DNS 泄露建议',
      commitHash: 'c1b48e2'
    }
  ]
};
