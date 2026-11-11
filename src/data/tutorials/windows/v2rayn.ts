import { SoftwareTool } from '../../../types/tutorial';

export const v2rayn: SoftwareTool = {
  id: 'v2rayn',
  name: 'v2rayN',
  shortName: 'v2rayN',
  system: 'windows',
  category: 'windows',
  tagline: 'Windows 平台无可撼动的常青树与自建节点/多内核调试神器',
  description: 'v2rayN 是 Windows 上最经典、支持内核最丰富（Xray、sing-box、mihomo 等多内核无缝热切换）的开源客户端。对单个节点的参数细节掌控力极强，是自建节点与硬核网络玩家的首选。',
  iconName: 'Monitor',
  badgeText: 'Windows 常青树',
  
  updatedAt: '2026-03-25',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2017-04-18',
  latestVersion: 'v7.1.6',
  updatePath: 'data/tutorials/windows/v2rayn.md',
  
  githubRepo: 'https://github.com/2dust/v2rayN',
  officialSite: 'https://github.com/2dust/v2rayN/releases',
  
  specs: {
    compatibility: 'Windows 10 / Windows 11 (64-bit / ARM64)',
    architecture: 'x64 / ARM64 / x86 (需 .NET 8.0 运行时)',
    coreEngine: 'Xray-core / sing-box / mihomo 多内核动态加载',
    protocols: ['VLESS (Reality)', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria 2', 'TUIC v5', 'WireGuard', 'SOCKS5'],
    trafficHandling: '一键写入系统代理 + 独立 Wintun/TUN 虚拟网卡驱动',
    resourceFootprint: '空闲 ~35MB / 满载 65MB'
  },
  
  screenshot: {
    deviceType: 'windows',
    deviceSpec: 'Windows 11 Pro PC (4K 3840×2160 HDR)',
    screenResolution: '2560 × 1440 像素',
    title: 'v2rayN 经典节点表格、路由规则与底部状态栏',
    colorScheme: 'light',
    annotations: [
      { id: 'vn1', label: '① 订阅分组', note: '顶部菜单【订阅分组】->【订阅分组设置】，添加机场链接并一键更新', xPercent: 18, yPercent: 12 },
      { id: 'vn2', label: '② 节点矩阵', note: '表格列出协议类型、别名、测试延迟及配置详情，支持回车直接设为主活动节点', xPercent: 50, yPercent: 45 },
      { id: 'vn3', label: '③ 底部状态控制', note: '状态栏关键设置：路由设为【绕过大陆】，系统代理切换为【自动配置系统代理】', xPercent: 50, yPercent: 92 },
      { id: 'vn4', label: '④ TUN 模式', note: '勾选底部【开启 Tun 模式】，接管 Windows 命令行、CMD、Git 与游戏直连', xPercent: 82, yPercent: 92 }
    ],
    mockData: {
      status: 'Xray-core 启动就绪 - 系统代理已开启 (Port: 10808)',
      trafficTotal: '下行: 19.8 GB | 上行: 2.1 GB',
      outboundMode: '绕过大陆 (IP/Domain Bypass)',
      activeNodes: [
        { name: '🇭🇰 香港 01 BGP 专线 [优质]', type: 'VLESS-Reality', ping: 31, selected: true },
        { name: '🇯🇵 日本 02 4K 极速', type: 'Hysteria 2', ping: 52 },
        { name: '🇸🇬 新加坡 03 原生', type: 'Trojan', ping: 58 },
        { name: '🇺🇸 美国 04 节点', type: 'VMess', ping: 139 }
      ],
      logs: [
        'v2rayN core service listening at 127.0.0.1:10808 (socks), 10809 (http)',
        'Routing rule hit: geosite:cn -> direct'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程带你从零在 Windows 上解压、配置并运行 v2rayN，实现浏览器与全系统软件的科学上网。',
    prerequisites: [
      'Windows 10 或 Windows 11 电脑',
      '已安装 Microsoft .NET 8.0 Desktop Runtime (若未安装软件会提示自动下载)',
      '机场订阅链接或自建节点链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并解压客户端',
        description: '前往官方 GitHub Releases 页面，下载带有核心文件的压缩包（推荐下载 `v2rayN-With-Core.zip`，避免手动到处寻找内核）。将其解压到一个没有中文与特殊符号的文件夹（例如 `D:\\Tools\\v2rayN`）。',
        pencilTip: '解压后双击 `v2rayN.exe` 即可运行，建议右键发送快捷方式到桌面。'
      },
      {
        stepNumber: 2,
        title: '添加订阅并拉取节点',
        description: '双击运行后，点击顶部菜单栏【订阅分组】-> 选择【订阅分组设置】。点击【添加】，在【可选地址 (url)】中粘贴机场订阅链接，【别名】填入机场名字，点击确定。然后再次点击【订阅分组】-> 点击【更新全部订阅 (不通过代理)】。',
        codeSnippet: 'https://airport.com/api/v1/client/subscribe?token=v2rayn_token',
        codeLanguage: 'url',
        pencilTip: '订阅成功拉取后，表格中会呈现几十条节点。'
      },
      {
        stepNumber: 3,
        title: '选择最优节点',
        description: '按 `Ctrl+A` 全选所有节点，右键点击选择【测试服务器真实延迟 (Ctrl+R)】。等待测速完成后，点击【真实延迟】表头升序排列，双击或者选中后回车挑选一个延迟最低的绿色节点。',
        pencilTip: '双击选中的节点会变为蓝色高亮背景，代表当前出口。'
      },
      {
        stepNumber: 4,
        title: '开启系统代理与分流',
        description: '查看软件最底部的状态栏：将【路由】选择为【绕过大陆 (Whitelist)】；将【系统代理】切换为【自动配置系统代理】。此时托盘图标由蓝色变为红色，代表系统代理已成功接管。',
        pencilTip: '若需要让游戏或终端走代理，勾选底部的【自动启动 Tun 模式】即可！'
      }
    ],
    advancedRules: [
      '切换核心引擎：在【设置】->【核心类型设置】中，可自由选择针对不同协议调用 Xray-core 或 sing-box 核心。',
      '自定义路由黑白名单：可以在路由设置中自由添加直连域名或强制走代理的域名。'
    ],
    faq: [
      {
        question: '为什么双击 v2rayN.exe 没有任何反应？',
        answer: '这是缺少 .NET 8.0 运行时的典型症状。请前往微软官网搜索下载并安装“.NET 8.0 Desktop Runtime (桌面运行时)”即可正常打开。'
      },
      {
        question: '关闭 v2rayN 后电脑浏览器连不上网怎么办？',
        answer: '这是因为非正常关闭导致 Windows 系统代理没有复位。重新打开 v2rayN，将底部系统代理切换为【清除系统代理】后再退出即可。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-25',
      author: 'WinExpert',
      prNumber: 105,
      summary: '更新 v2rayN 7.x 架构与 .NET 8 依赖安装说明及 TUN 模式指引',
      commitHash: 'b183fd4'
    }
  ]
};
