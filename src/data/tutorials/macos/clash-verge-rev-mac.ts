import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevMac: SoftwareTool = {
  id: 'clash-verge-rev-mac',
  name: 'Clash Verge Rev',
  shortName: 'Clash Verge Rev',
  system: 'macos',
  category: 'apple',
  tagline: '基于 Tauri 构建的现代化 Mihomo 内核跨平台旗舰客户端',
  description: '在原 Clash 停更之后，Clash Verge Rev 迅速成为桌面端（macOS/Windows/Linux）最具统治力的客户端。内置高性能 Mihomo (Clash.Meta) 内核，全面支持系统代理、TUN 虚拟网卡全局拦截与现代化 UI。',
  iconName: 'Laptop',
  badgeText: 'Mac 桌面首选',
  
  updatedAt: '2026-11-03',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2023-11-05',
  latestVersion: 'v2.5.10',
  updatePath: 'data/tutorials/macos/clash-verge-rev-mac.md',
  
  githubRepo: 'https://github.com/clash-verge-rev/clash-verge-rev',
  officialSite: 'https://clash-verge-rev.github.io',
  
  specs: {
    compatibility: 'macOS 11.0 (Big Sur) 或更高版本 (兼容 macOS 15 Sequoia)',
    architecture: 'Universal Binary (Apple Silicon M1/M2/M3/M4 原生 + Intel x64)',
    coreEngine: 'Mihomo Core (原 Clash.Meta 最新稳定版)',
    protocols: ['VLESS (Reality)', 'VMess', 'Trojan', 'Hysteria 2', 'TUIC v5', 'Shadowsocks', 'WireGuard', 'Snell'],
    trafficHandling: 'TUN 虚拟网卡 (wintun/utun) + macOS 系统 PAC / 全局代理',
  },
  
  tutorial: {
    overview: '本教程手把手指导你在 Mac 上下载安装 Clash Verge Rev，并开启无死角的 TUN 虚拟网卡代理。',
    prerequisites: [
      '运行 macOS 11 或更高版本的 Mac 电脑（Intel 或 Apple 芯片均可）',
      '支持 Clash 格式的机场订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装 dmg 安装包',
        description: '访问官方 GitHub Releases 页面，Apple Silicon (M1/M2/M3/M4) 用户下载 `_aarch64.dmg`，Intel 用户下载 `_x64.dmg`。双击挂载后将应用拖拽到 Applications (应用程序) 文件夹中。',
        pencilTip: '首次打开若提示“无法验证开发者”，前往【系统设置】->【隐私与安全性】点击【仍要打开】即可。'
      },
      {
        stepNumber: 2,
        title: '导入订阅链接',
        description: '启动应用，点击左侧导航栏的【订阅 (Profiles)】。在顶部输入框粘贴机场提供的 Clash 订阅链接，点击【导入】。成功下载后，在配置文件上右键选择【使用】。',
        codeSnippet: 'https://sub.airport.io/api/v1/client/subscribe?token=secret123&flag=clash',
        codeLanguage: 'url',
        pencilTip: '建议右键配置文件选择【编辑信息】，设置自动更新间隔为 720 分钟（12小时）。'
      },
      {
        stepNumber: 3,
        title: '开启系统代理与 TUN 模式',
        description: '在左侧点击【设置】或在主界面开启【系统代理】开关。若经常使用终端 (Terminal)、Git Clone、Docker 或游戏，强烈推荐点击开启【TUN 模式】。开启 TUN 模式时系统会弹窗提示授予管理员辅助权限，输入 Mac 密码即可。',
        pencilTip: '开启 TUN 模式后，终端将自动走代理，彻底告别在 `.zshrc` 手动 export http_proxy 的繁琐！'
      },
      {
        stepNumber: 4,
        title: '选择节点并测速',
        description: '点击左侧【代理 (Proxies)】，进入节点选择页面。点击右上角测速闪电图标，节点卡片上会显示当前延迟，轻触选中绿色低延迟节点即可畅快使用。',
        pencilTip: '模式建议保持在【规则 (Rule)】模式，兼顾国内网络极速直连与海外顺畅翻墙。'
      }
    ],
    advancedRules: [
      '配置覆写 (Merge Config)：在订阅列表中可添加本地扩展脚本，强制屏蔽测速广告或追加自定义直连域名。',
      '开机自启与静默启动：在【设置】中勾选“开机自启动”和“静默启动（启动时最小化到菜单栏）”。'
    ],
    faq: [
      {
        question: '为什么开启 TUN 模式后终端依然报错超时？',
        answer: '检查是否开启了其他第三方 VPN 或防火墙冲突软件（如 Little Snitch）。另外确认是否在 Clash Verge Rev 设置中将内核切换为了最新的 Mihomo 内核。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-11-12',
      author: 'MacGeek',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'f49a21b'
    }
  ]
};
