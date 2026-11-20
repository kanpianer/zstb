import { SoftwareTool } from '../../../types/tutorial';

export const clashMetaAndroid: SoftwareTool = {
  id: 'clash-meta-android',
  name: 'ClashMetaForAndroid',
  shortName: 'Clash Meta',
  system: 'android',
  category: 'android',
  tagline: '基于 Mihomo 内核的 Android 规则代理客户端',
  description: 'ClashMetaForAndroid（简称 CMFA）是运行在 Android 上的开源规则代理工具，基于开源 Mihomo（Clash.Meta）内核开发，支持多种现代化代理协议、分应用代理及订阅配置。',
  iconName: 'Smartphone',
  badgeText: 'Mihomo 规则代理',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'GPL-3.0',
  releasedAt: '2022-06-07',
  latestVersion: 'v2.11.37（2026-11-13 核查；以官方发布页为准）',
  updatePath: 'src/data/tutorials/android/clash-meta-android.ts',
  githubRepo: 'https://github.com/MetaCubeX/ClashMetaForAndroid',
  officialSite: 'https://github.com/MetaCubeX/ClashMetaForAndroid',
  releasesUrl: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases',
  specs: {
    compatibility: 'Android 5.0 或更高版本（API 21+）',
    architecture: 'arm64-v8a / armeabi-v7a / x86 / x86_64 / universal',
    coreEngine: 'Mihomo（Clash.Meta）',
    protocols: [
      'Shadowsocks',
      'ShadowsocksR',
      'VMess',
      'VLESS（含 REALITY）',
      'Trojan',
      'Hysteria',
      'Hysteria 2',
      'TUIC',
      'WireGuard',
      'Snell',
      'SOCKS5',
      'HTTP(S)',
      'SSH'
    ],
    trafficHandling: 'Android VpnService 虚拟网卡；受策略组与分应用分流控制'
  },
  tutorial: {
    overview: '在 Android 设备上使用 ClashMetaForAndroid 导入配置、选择节点并开启 VPN 代理连接。软件详细发布说明与源码见 [官方项目](https://github.com/MetaCubeX/ClashMetaForAndroid)，应用本身不内置任何节点。',
    prerequisites: [
      '符合该版本系统及 CPU 架构要求的 Android 手机或平板设备',
      '可信且兼容的 Clash / Mihomo 订阅链接或配置文件；客户端不提供节点',
      '订阅含个人凭据，请勿公开；不要同时运行其他代理或 VPN 软件'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装 ClashMetaForAndroid',
        description: '点击本页“软件下载”，在 GitHub 发布页的下载文件列表（Assets）中下载对应的 Android 安装包（APK）。绝大多数近几年的安卓手机选用 arm64-v8a 版本，若不确定可下载 universal 通用包。系统提示时允许安装未知来源应用，安装完成后打开客户端。',
        pencilTip: '推荐使用多数机场都支持快捷的一键添加订阅，或者扫描二维码添加订阅的方式。'
      },
      {
        stepNumber: 2,
        title: '导入订阅或配置文件',
        description: '进入「配置」界面，点击右上角加号或新建按钮。选择「从 URL 导入」，粘贴服务方提供的 Clash / Mihomo 订阅链接，设置易于识别的名称，点击右上角保存完成配置下载并选中生效。'
      },
      {
        stepNumber: 3,
        title: '选择代理节点',
        description: '返回主界面点击进入「代理」页面。在策略组（如「节点选择」/ PROXY）中选择一个可用节点，初次配置建议选用服务方推荐的线路或低延迟节点。日常使用建议保持“规则”模式，使国内外流量自动分流。'
      },
      {
        stepNumber: 4,
        title: '连接并授权 VPN',
        description: '返回主界面，轻触正中央的“点此启动”主开关开启服务。首次启动时系统会弹出“网络连接请求”授权对话框，请点击“确定”或“允许”以创建系统 VPN 连接。启动后界面状态将显示为“运行中”。'
      },
      {
        stepNumber: 5,
        title: '浏览器验证与停止连接',
        description: '打开手机浏览器，分别访问国内外常用网站以及需要代理的服务，确认页面能正常加载并显示正确的出口节点。使用完毕后，返回 ClashMetaForAndroid 主界面再次点击开关停止连接，确认系统通知栏中的 VPN 钥匙图标已消失。'
      }
    ],
    advancedRules: [
      '定时更新订阅：在「配置」列表中点击订阅旁边的菜单，可手动刷新节点，或设置自动定时更新周期。',
      '分应用代理：在「设置」-「网络」-「分应用代理」中启用该功能，可选择只允许特定应用走代理（绕过国内应用）。',
      '切换内核功能：在「设置」中可按需开启 TUN 模式或 DNS 覆写，日常使用默认配置即可满足需求。'
    ],
    faq: [
      {
        question: '点击启动后无法连接或没有网络？',
        answer: '首先在「代理」页面点击右下角测速图标，确认所选节点是否有延迟响应。若全部节点超时，请检查手机网络、更新订阅链接，或确认系统没有同时开启其他 VPN 软件。'
      },
      {
        question: '导入订阅时提示解析失败或下载超时？',
        answer: '确认填写的链接格式为标准的 Clash / Mihomo 订阅（通常为 YAML 格式），而非网页登录链接或单节点二维码链接。网络不稳定时可切换至移动数据网络后重试。'
      }
    ]
  },
  changelog: []
};
