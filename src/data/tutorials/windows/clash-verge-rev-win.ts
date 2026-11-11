import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevWin: SoftwareTool = {
  id: 'clash-verge-rev-win',
  name: 'Clash Verge Rev',
  shortName: 'Clash Verge Rev',
  system: 'windows',
  category: 'windows',
  tagline: '目前 Windows 端最受推荐的现代化 Mihomo GUI 客户端',
  description: 'Clash Verge Rev 基于 Tauri 开发，内存消耗远低于老旧的 Electron 应用。内置最新的 Mihomo (Clash.Meta) 内核，对 Windows 系统的通知、暗色模式、Wintun 虚拟网卡提供了极其完美的适配。',
  iconName: 'Monitor',
  badgeText: 'Win 桌面主力',
  
  updatedAt: '2026-03-22',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2023-11-05',
  latestVersion: 'v2.0.4',
  updatePath: 'data/tutorials/windows/clash-verge-rev-win.md',
  
  githubRepo: 'https://github.com/clash-verge-rev/clash-verge-rev',
  officialSite: 'https://clash-verge-rev.github.io',
  
  specs: {
    compatibility: 'Windows 10 / Windows 11 (64位)',
    architecture: 'x64 / arm64',
    coreEngine: 'Mihomo Core (原 Clash.Meta)',
    protocols: ['VLESS (Reality)', 'VMess', 'Hysteria 2', 'TUIC v5', 'Trojan', 'Shadowsocks', 'WireGuard', 'Snell'],
    trafficHandling: 'Windows 系统代理 + Wintun 虚拟网卡 (TUN 模式)',
    resourceFootprint: 'Rust 前端极致轻巧，常驻内存仅 ~35MB'
  },
  
  screenshot: {
    deviceType: 'windows',
    deviceSpec: 'Windows 11 PC (2K 165Hz 电竞显示器)',
    screenResolution: '2560 × 1440 像素',
    title: 'Clash Verge Rev Windows 策略组折叠、测速与托盘控制',
    colorScheme: 'light',
    annotations: [
      { id: 'cvw1', label: '① 订阅管理', note: '左侧【订阅】导入机场 Clash 订阅链接，支持右键重命名和定时更新', xPercent: 20, yPercent: 25 },
      { id: 'cvw2', label: '② 系统代理与TUN', note: '开启【系统代理】或安装【服务模式】后启动 TUN 虚拟网卡全局拦截', xPercent: 80, yPercent: 15 },
      { id: 'cvw3', label: '③ 策略组分流', note: '规则模式下，海外节点、国内直连与广告拦截自动精准分流', xPercent: 55, yPercent: 50 }
    ],
    mockData: {
      status: 'Mihomo 内核已启动 - TUN 驱动正常',
      trafficTotal: '下行: 18.5 GB | 上行: 2.4 GB',
      outboundMode: 'Rule (分流规则)',
      activeNodes: [
        { name: '🇭🇰 HK 01 [优质专线] 0.5x', type: 'VLESS-Reality', ping: 28, selected: true },
        { name: '🇯🇵 Tokyo 02 [原生解锁]', type: 'Hysteria 2', ping: 51 },
        { name: '🇸🇬 SG 03 [狮城节点]', type: 'Trojan', ping: 56 }
      ],
      logs: [
        '[TUN] wintun driver loaded successfully',
        '[Route] match GeoSite(youtube) -> Outbound(PROXY)'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程手把手教你在 Windows 电脑上安装并配置 Clash Verge Rev，开启开机自启与全局 TUN 模式。',
    prerequisites: [
      'Windows 10 或 Windows 11 系统',
      '支持 Clash 格式的机场订阅'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装应用',
        description: '前往官方 GitHub Releases 页面，下载带有安装程序的 `Clash.Verge_xxx_x64-setup.exe`。双击运行，根据安装向导一路下一步完成安装。',
        pencilTip: 'Windows Defender 若提示未知发布者，点击【更多信息】->【仍要运行】即可。'
      },
      {
        stepNumber: 2,
        title: '导入订阅链接',
        description: '打开软件，点击左侧【订阅】。在上方输入框中粘贴机场提供的 Clash 订阅链接，点击【导入】。下载完成后，右键点击该配置卡片，选择【使用】。',
        codeSnippet: 'https://airport.com/api/v1/client/subscribe?token=xxx&flag=clash',
        codeLanguage: 'url',
        pencilTip: '右键点击配置卡片可以设置“自动更新间隔”，建议设为 12 小时。'
      },
      {
        stepNumber: 3,
        title: '开启系统代理与 TUN 模式',
        description: '在软件左下角点击【设置】。在核心设置中开启【系统代理】。若需要玩外服游戏、使用终端 CMD/Git 或 WSL，建议点击开启【TUN 模式】（若首次开启提示安装服务模式，点击安装即可）。',
        pencilTip: 'TUN 模式会自动虚拟出一张网卡，彻底无需担心各类软件不支持系统代理的问题！'
      },
      {
        stepNumber: 4,
        title: '选择低延迟节点',
        description: '点击左侧【代理】，点击右上角闪电图标刷新所有节点测速，选中延迟最低的绿色节点即可畅通无阻。',
        pencilTip: '模式务必选择【规则 (Rule)】，这样国内软件（QQ、微信、网易云）直接直连，节省流量。'
      }
    ],
    advancedRules: [
      '开机静默启动：在设置中勾选【开机启动】与【静默启动】。',
      '快捷键调用：可设置全局快捷键一键唤起主面板或开关系统代理。'
    ],
    faq: [
      {
        question: '为什么打开 TUN 模式提示失败？',
        answer: '请在设置页面先点击【服务模式】右侧的安装按钮，安装完成并重启软件后，即可顺畅开启 TUN 模式。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-22',
      author: 'WinDev',
      prNumber: 100,
      summary: '完善 Windows 11 下 Wintun 权限与服务模式一键安装教程',
      commitHash: 'a718cc2'
    }
  ]
};
