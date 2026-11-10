import { SoftwareTool } from '../../../types/tutorial';

export const v2rayng: SoftwareTool = {
  id: 'v2rayng',
  name: 'v2rayNG',
  shortName: 'v2rayNG',
  system: 'android',
  category: 'android',
  tagline: 'Android 平台最经典的开源代理利器与装机必备常青树',
  description: 'v2rayNG 是 Android 平台用户量最大、兼容性最强的老牌开源客户端。基于 Xray 内核与 V2Ray 协议规范，支持几乎所有常见的自建节点与机场订阅，开箱即用，稳定省心。',
  iconName: 'Smartphone',
  badgeText: '安卓装机必备',
  
  updatedAt: '2026-03-24',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2017-06-15',
  latestVersion: 'v1.9.15',
  updatePath: 'data/tutorials/android/v2rayng.md',
  
  githubRepo: 'https://github.com/2dust/v2rayNG',
  officialSite: 'https://github.com/2dust/v2rayNG/releases',
  
  specs: {
    compatibility: 'Android 5.0 (Lollipop) 或更高版本 (全面兼容 Android 14/15)',
    architecture: 'ARM64-v8a / armeabi-v7a / x86_64',
    coreEngine: 'Xray-core / V2Ray-core 原生优化版',
    protocols: ['VLESS (Reality / XTLS)', 'VMess', 'Trojan', 'Shadowsocks', 'SOCKS', 'WireGuard'],
    trafficHandling: 'Android VpnService 虚拟专用网全局/分流拦截',
    resourceFootprint: '低功耗后台保活，内存占用约 20MB - 38MB'
  },
  
  screenshot: {
    deviceType: 'android',
    deviceSpec: 'Pixel 9 Pro / Xiaomi 15 Pro (AMOLED 120Hz)',
    screenResolution: '1280 × 2800 像素',
    title: 'v2rayNG 节点列表、测速延迟与侧滑抽屉',
    colorScheme: 'light',
    annotations: [
      { id: 'v1', label: '① 订阅更新', note: '轻触右上角三点菜单 ->【更新订阅】，一键刷新全部节点', xPercent: 88, yPercent: 8 },
      { id: 'v2', label: '② 节点卡片', note: '点击节点选中，右侧显示真实 HTTP 握手延迟毫秒数', xPercent: 50, yPercent: 32 },
      { id: 'v3', label: '③ 浮动启动按钮', note: '右下角经典的圆形【V】标志浮动按钮，点击开启 VPN', xPercent: 85, yPercent: 88 },
      { id: 'v4', label: '④ 分应用代理', note: '侧边栏设置【分应用代理】，自主选择哪些 App 翻墙', xPercent: 15, yPercent: 50 }
    ],
    mockData: {
      status: '已连接 - VpnService 运行中',
      trafficTotal: '下行: 3.4 GB | 上行: 410 MB',
      outboundMode: '绕过局域网及大陆地址 (Bypass CN)',
      activeNodes: [
        { name: '🇭🇰 香港 IEPL 专线 01 [推荐]', type: 'VLESS-Reality', ping: 38, selected: true },
        { name: '🇯🇵 日本 02 高速出口', type: 'Trojan', ping: 62 },
        { name: '🇸🇬 新加坡 03 节点', type: 'VMess', ping: 75 },
        { name: '🇺🇸 美国 04 节点', type: 'Shadowsocks', ping: 145 }
      ],
      logs: [
        '[Info] core started with xray 1.8.x',
        '[Direct] api.wechat.com:443 bypass cn list',
        '[Proxy] android.clients.google.com -> HK IEPL 01'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程手把手教学如何在安卓手机上快速配置 v2rayNG 并设置科学的分流与分应用策略。',
    prerequisites: [
      '任意 Android 手机或平板设备',
      '一条通用的节点订阅链接（支持 Base64、SS、Vmess、Vless、Clash 格式）'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装 APK',
        description: '从 GitHub Releases 官方页面下载以 `v2rayNG_xxx_arm64-v8a.apk` 结尾的安装包（绝大多数现代安卓手机均适用此架构）。点击安装包完成安装。',
        pencilTip: '国内各大应用商店由于政策原因均未上架，切勿在非官方网站下载被植入广告的山寨包。'
      },
      {
        stepNumber: 2,
        title: '配置订阅分组并更新',
        description: '打开 v2rayNG，点击左上角【三道杠】汉堡菜单 -> 选择【订阅分组设置】。点击右上角【+】加号，在【备注】中填入机场名称，在【可选地址 (URL)】处粘贴机场订阅链接，点击右上角【√】保存。返回主界面，点击右上角【三个点】菜单，点击【更新订阅】。',
        codeSnippet: 'https://airport-sub.org/api/v1/client/subscribe?token=v2rayng_token',
        codeLanguage: 'url',
        pencilTip: '稍等片刻，主页面即可瞬间刷出所有可用节点列表！'
      },
      {
        stepNumber: 3,
        title: '真连接测速并挑选节点',
        description: '点击右上角【三个点】菜单 -> 点击【测试全部配置真实连接】。稍微等待数秒，节点卡片右侧会显示实际能连通的握手延迟（毫秒数字）。点击选择一个绿色低延迟的节点，左侧卡片会出现一条高亮色块。',
        pencilTip: '“测试全部配置真实连接”比单纯 Ping 更有参考价值，能真实测试是否能连通 Google。'
      },
      {
        stepNumber: 4,
        title: '配置分流模式并启动',
        description: '点击左上角汉堡菜单 -> 进入【设置】。找到【预定义规则】，建议选择【绕过局域网及大陆地址 (Bypass LAN and mainland China)】。设置完毕返回主界面，轻触右下角圆形的【V】按钮，在弹出的“网络连接请求”弹窗中点击【确定】。',
        pencilTip: '当右下角按钮变为深色，顶部通知栏出现一把【小钥匙】图标时，即代表翻墙成功！'
      }
    ],
    advancedRules: [
      '分应用代理（白名单/黑名单）：在【设置】->【分应用代理】中，可指定仅 Telegram、Chrome、YouTube 等指定海外 App 走代理，微信/淘宝等直接直连，省电且不影响外卖和打车定位。',
      '后台保活策略：在系统设置中为 v2rayNG 设置【允许后台高耗电】和【自启动】，并将多任务卡片加锁，防止系统杀后台。'
    ],
    faq: [
      {
        question: '为什么连上后国内 App 提示网络连接失败？',
        answer: '请检查设置里的【预定义规则】是否误改为了全局代理，或者分应用代理是否勾选了冲突规则；请确保选择【绕过局域网及大陆地址】。'
      },
      {
        question: '为什么通知栏经常莫名其妙断开？',
        answer: '这是国内各家定制安卓系统（如澎湃OS、ColorOS、OriginOS、HarmonyOS）积极杀后台所致。请在手机【应用管理】中关闭“智能省电优化”，开启“无限制后台运行”。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-24',
      author: 'AndroidMaster',
      prNumber: 103,
      summary: '完善 Android 15 权限兼容说明与分应用代理排错清单',
      commitHash: 'b492aa8'
    }
  ]
};
