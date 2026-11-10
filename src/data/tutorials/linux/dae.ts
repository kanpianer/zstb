import { SoftwareTool } from '../../../types/tutorial';

export const dae: SoftwareTool = {
  id: 'dae',
  name: 'dae 大鹅',
  shortName: 'dae',
  system: 'linux',
  category: 'linux',
  tagline: '基于 Linux 内核级 eBPF 技术的高性能极致吞吐透明代理网关',
  description: 'dae 彻底颠覆了传统的 TUN/iptables 代理方案，直接利用 Linux 内核级 eBPF 技术在协议栈最底层拦截和重定向网络数据包。拥有近乎原生的网速吞吐、惊人的极低延迟与极低 CPU 占用，是千兆/万兆软路由与网关的性能天花板。',
  iconName: 'Zap',
  badgeText: 'eBPF 性能怪兽',
  
  updatedAt: '2026-03-21',
  isOpenSource: true,
  license: 'AGPL-3.0 开源协议',
  releasedAt: '2022-04-10',
  latestVersion: 'v0.9.0',
  updatePath: 'data/tutorials/linux/dae.md',
  
  githubRepo: 'https://github.com/daeuniverse/dae',
  officialSite: 'https://github.com/daeuniverse/dae',
  
  specs: {
    compatibility: 'Linux 内核版本 >= 5.8 (推荐 Linux 6.1+ LTS)',
    architecture: 'x86_64, aarch64',
    coreEngine: 'Linux 内核 eBPF (tc-bpf / cgroup-skb) + 用户态 dae core',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC', 'SOCKS5'],
    trafficHandling: '内核态 eBPF 直接接管（零内存拷贝 / 极低上下文切换）',
    resourceFootprint: 'CPU 占用低于传统透明代理 70%，万兆吞吐毫无压力'
  },
  
  screenshot: {
    deviceType: 'terminal',
    deviceSpec: 'Debian 12 / Linux Kernel 6.6 LTS (Gateway)',
    screenResolution: '1920 × 1080 像素',
    title: 'dae eBPF 加载、节点池组与透明路由日志',
    colorScheme: 'dark',
    annotations: [
      { id: 'd1', label: '① eBPF 探针', note: '自动在网络接口挂载 tc/xdp 过滤器，完全绕过传统 iptables 繁重损耗', xPercent: 30, yPercent: 20 },
      { id: 'd2', label: '② 简洁配置语法', note: '独创的直观 routing 分流语法（如 `dip(geoip:private) -> direct`）', xPercent: 50, yPercent: 50 },
      { id: 'd3', label: '③ 旁路网关极速转发', note: '作为主路由/旁路由网关运行时，吞吐性能极高', xPercent: 70, yPercent: 80 }
    ],
    mockData: {
      status: 'dae 正在运行 (eBPF hooked on eth0) - 延迟 1ms',
      trafficTotal: '下行: 120.5 GB | 上行: 18.2 GB',
      outboundMode: 'eBPF Direct Kernel Routing',
      activeNodes: [
        { name: 'group-hk: node-01 [VLESS]', type: 'VLESS', ping: 25, selected: true },
        { name: 'group-jp: node-02 [Hysteria 2]', type: 'Hysteria 2', ping: 47 }
      ],
      logs: [
        'dae: loaded bpf objects into kernel successfully',
        'dae: listening WAN interface eth0, LAN interface eth1',
        'routed flow to HK-node via fast socket redirect'
      ]
    }
  },
  
  tutorial: {
    overview: '本教程讲解如何在现代 Linux 系统中安装 dae 并通过 eBPF 配置全透明代理。',
    prerequisites: [
      'Linux 内核 5.8 或更高版本（执行 `uname -r` 检查内核版本）',
      '具有 root 管理员权限',
      '节点链接或支持的订阅'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '验证 Linux 内核版本',
        description: '在终端中运行 `uname -r`，确认内核版本在 5.8 以上。绝大多数 Ubuntu 22.04+、Debian 12+ 或 Arch Linux 均已满足此要求。',
        codeSnippet: 'uname -r\n# 输出需类似于 6.1.0-xx 或更高',
        codeLanguage: 'bash',
        pencilTip: 'eBPF 技术是现代 Linux 内核的杀手级功能。'
      },
      {
        stepNumber: 2,
        title: '一键安装 dae',
        description: '运行官方一键安装脚本：',
        codeSnippet: 'curl -fsSL https://github.com/daeuniverse/dae-installer/raw/main/installer.sh | sudo bash',
        codeLanguage: 'bash',
        pencilTip: '脚本会自动下载对应架构的 dae 二进制和预编译 eBPF 字节码。'
      },
      {
        stepNumber: 3,
        title: '编写配置文件并启动',
        description: '编辑 `/etc/dae/config.dae`，配置绑定的网卡接口名（如 `eth0`）与节点出站，然后启动 systemd 服务：',
        codeSnippet: 'sudo systemctl enable --now dae\nsudo systemctl status dae',
        codeLanguage: 'bash',
        pencilTip: '没有复杂的 iptables/nftables 命令，无需配置任何防火墙冲突规则，全由 eBPF 自动搞定！'
      }
    ],
    advancedRules: [
      'DNS 嗅探直连：dae 自带高性能内核级 DNS 拦截嗅探，支持对 SNI 阻断域名即时修复。'
    ],
    faq: [
      {
        question: '为什么提示加载 BPF 失败？',
        answer: '检查系统内核是否禁用了 eBPF 或启用了过严的安全模块（如 SELinux/AppArmor）；执行 `sudo sysctl kernel.unprivileged_bpf_disabled=0` 确认。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-03-21',
      author: 'KernelBpfDev',
      prNumber: 99,
      summary: '完善 Linux 6.x 内核 eBPF 接口绑定与网关转发配置',
      commitHash: 'f592cd1'
    }
  ]
};
