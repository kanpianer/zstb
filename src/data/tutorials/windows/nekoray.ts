import { SoftwareTool } from '../../../types/tutorial';

export const nekoray: SoftwareTool = {
  id: 'nekoray',
  name: 'NekoRay',
  shortName: 'NekoRay',
  system: 'windows',
  category: 'windows',
  tagline: '基于 Qt 与 sing-box 核心构建的高性能极客桌面代理客户端',
  description: 'NekoRay 采用 C++ Qt 构建，拥有极其轻量的原生性能与低内存占用。底层支持 sing-box 与 Xray 双引擎自由切换，对新协议响应极快，并且具备完备的链式代理与高级路由分流能力。',
  iconName: 'Cpu',
  badgeText: 'Qt 极速轻量',
  
  updatedAt: '2026-03-12',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-06-08',
  latestVersion: 'v3.26',
  updatePath: 'data/tutorials/windows/nekoray.md',
  
  githubRepo: 'https://github.com/MatsuriDayo/nekoray',
  
  specs: {
    compatibility: 'Windows 10 / Windows 11 (64位)',
    architecture: 'x64 / arm64',
    coreEngine: 'sing-box core / Xray-core 双核自选',
    protocols: ['VLESS-Reality', 'Hysteria 2', 'TUIC v5', 'Shadowsocks', 'Trojan', 'VMess', 'NaïveProxy', 'WireGuard'],
    trafficHandling: '系统代理 + Wintun 驱动 TUN 虚拟网卡',
    resourceFootprint: 'Qt 原生编译，常驻内存仅需 ~25MB - 40MB'
  },
  
  screenshot: {
    deviceType: 'windows',
    deviceSpec: 'Windows 11 Workstation',
    screenResolution: '2560 × 1440 像素',
    title: 'NekoRay Qt 原生主窗口、路由设置与快速测速',
    colorScheme: 'light',
    annotations: [
      { id: 'nr1', label: '① 核心切换', note: '【首选项】中可在 sing-box 与 Xray 核心之间任意选择', xPercent: 20, yPercent: 12 },
      { id: 'nr2', label: '② 顶部功能开关', note: '【系统代理】与【VPN 模式】独立开关，根据需要自由组合', xPercent: 50, yPercent: 15 },
      { id: 'nr3', label: '③ 路由分流规则', note: '内置绕过局域网与大陆 IP，支持自定义正则表达式与域名集', xPercent: 50, yPercent: 60 }
    ],
    mockData: {
      status: 'sing-box 核心运行中 - VPN (TUN) 模式生效',
      trafficTotal: '下行: 11.2 GB | 上行: 1.4 GB',
      outboundMode: '绕过局域网及大陆 (Bypass CN)',
      activeNodes: [
        { name: '🇭🇰 香港 01 Extreme [Hy2]', type: 'Hysteria 2', ping: 26, selected: true },
        { name: '🇯🇵 日本 02 Reality', type: 'VLESS', ping: 48 },
        { name: '🇸🇬 新加坡 03 狮城', type: 'Trojan', ping: 59 }
      ],
      logs: [
        '[Core] started sing-box core successfully',
        '[TUN] Wintun interface up and running'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程讲解 NekoRay 的免安装解压使用、订阅导入及 TUN 虚拟网卡模式启动。',
    prerequisites: [
      'Windows 10/11 电脑',
      '支持 sing-box 或通用格式订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载与解压',
        description: '在 GitHub Releases 下载 `nekoray-xxx-windows64.zip`。解压到无中文路径的文件夹即可，绿色免安装。',
        pencilTip: '首次启动选择默认的 sing-box 核心即可获得最佳新协议兼容性。'
      },
      {
        stepNumber: 2,
        title: '添加订阅分组',
        description: '点击菜单【分组】->【分组设置】->【新建分组】。类型选择【订阅】，填入订阅链接后点击确定。在主界面右键分组点击【更新订阅】。',
        codeSnippet: 'https://sub.airport.org/nekoray?token=xxx',
        codeLanguage: 'url',
        pencilTip: '支持批量自动测速，直接回车选中目标节点。'
      },
      {
        stepNumber: 3,
        title: '勾选系统代理或 VPN 模式',
        description: '在主界面顶部直接勾选【系统代理】或勾选【VPN 模式】（需要以管理员权限运行）。右下角状态指示灯亮起绿色即代表就绪。',
        pencilTip: 'VPN 模式可接管各类不支持系统代理的客户端软件。'
      }
    ],
    advancedRules: [
      '路由设置：可在路由列表中拖拽规则顺序，自定义直连与阻断域名。'
    ],
    faq: [
      {
        question: '为什么勾选 VPN 模式报错没有权限？',
        answer: '退出软件，在 `nekoray.exe` 上右键选择【以管理员身份运行】即可正常加载 Wintun 驱动。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-12',
      author: 'QtGeek',
      prNumber: 91,
      summary: '完善 Qt 界面与 Wintun 驱动管理员提权说明',
      commitHash: 'c418bc0'
    }
  ]
};
