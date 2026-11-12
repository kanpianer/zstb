import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevLinux: SoftwareTool = {
  id: 'clash-verge-rev-linux',
  name: 'Clash Verge Rev',
  shortName: 'Clash Verge Rev',
  system: 'linux',
  category: 'linux',
  tagline: 'Linux 桌面发行版（Ubuntu/Fedora/Arch）开箱即用图形化代理首选',
  description: 'Clash Verge Rev 为 Linux 桌面用户提供了完整的 AppImage、Deb、RPM 与 Arch AUR 打包支持。免去终端繁琐配手搓 YAML 的苦恼，内置高性能 Mihomo 内核与 systemd 辅助服务，完美支持 TUN 全局拦截。',
  iconName: 'Terminal',
  badgeText: 'Linux 桌面首选',
  
  updatedAt: '2026-11-03',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2023-11-05',
  latestVersion: 'v2.5.10',
  updatePath: 'data/tutorials/linux/clash-verge-rev-linux.md',
  
  githubRepo: 'https://github.com/clash-verge-rev/clash-verge-rev',
  officialSite: 'https://clash-verge-rev.github.io',
  
  specs: {
    compatibility: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, Arch Linux, openSUSE',
    architecture: 'x86_64 / aarch64 (ARM64)',
    coreEngine: 'Mihomo Core (原 Clash.Meta)',
    protocols: ['VLESS (Reality)', 'Hysteria 2', 'TUIC v5', 'VMess', 'Trojan', 'Shadowsocks', 'WireGuard'],
    trafficHandling: 'GNOME/KDE 系统代理设置 + Linux TUN (iptables/nftables) 全局接管',
  },
  
  tutorial: {
    overview: '本教程讲解在常见 Linux 发行版上安装 Clash Verge Rev 并赋予 TUN 虚拟网卡免密码执行权限。',
    prerequisites: [
      'Linux 桌面系统（已安装图形环境如 GNOME、KDE 等）',
      '具有 sudo 管理员权限',
      'Clash 订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并安装软件包',
        description: '在 GitHub Releases 页面，根据发行版选择包格式：Ubuntu/Debian 下载 `.deb`；Fedora 下载 `.rpm`；Arch 用户直接通过 AUR 安装 `yay -S clash-verge-rev-bin`；其他系统可下载 `.AppImage`。',
        codeSnippet: '# Ubuntu/Debian 命令行安装示例\nsudo dpkg -i clash-verge_xxx_amd64.deb',
        codeLanguage: 'bash',
        pencilTip: '如果是 AppImage 格式，下载后先执行 `chmod +x Clash.Verge.AppImage` 赋予可执行权限。'
      },
      {
        stepNumber: 2,
        title: '赋予内核 TUN 虚拟网卡权限',
        description: 'Linux 下创建虚拟网卡需要 CAP_NET_ADMIN 权限。在软件的【设置】中，点击【服务模式】旁边的安装按钮，或直接对内核二进制赋予 capability：',
        codeSnippet: 'sudo setcap cap_net_admin,cap_net_bind_service=+ep ~/.config/clash-verge/clash-meta',
        codeLanguage: 'bash',
        pencilTip: '赋予 capability 之后，启动 TUN 模式不再需要反复输入 sudo 密码！'
      },
      {
        stepNumber: 3,
        title: '导入订阅并开启代理',
        description: '在左侧【订阅】粘贴订阅链接并下载。在【代理】页面选择低延迟节点，开启【系统代理】或【TUN 模式】。',
        pencilTip: '在终端输入 `curl -I https://google.com` 即可验证连通性。'
      }
    ],
    advancedRules: [
      '桌面托盘常驻：在 GNOME Wayland 下若托盘不显示，可安装 `AppIndicator and KStatusNotifierItem Support` 扩展。'
    ],
    faq: [
      {
        question: '为什么开启系统代理后终端仍然无法翻墙？',
        answer: 'Linux 的系统代理仅对支持环境变量的 GUI 软件生效，终端通常需要手动 export 或直接开启【TUN 模式】进行全局网卡接管。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-11-12',
      author: 'LinuxTux',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'e319bf0'
    }
  ]
};
