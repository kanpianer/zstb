import { SoftwareTool } from '../../../types/tutorial';

export const v2rayn: SoftwareTool = {
  id: 'v2rayn',
  name: 'v2rayN',
  shortName: 'v2rayN',
  system: 'windows',
  category: 'windows',
  tagline: '支持多种代理内核的开源桌面客户端（本篇介绍 Windows）',
  description: 'v2rayN 是支持 Windows、Linux 和 macOS 的图形客户端，可管理 Xray、sing-box 等内核。本篇介绍 Windows 发布包、订阅导入、节点选择及系统代理；协议能否使用取决于客户端、所选内核与服务端配置的共同支持。',
  iconName: 'Monitor',
  badgeText: '多内核客户端',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'GPL-3.0',
  releasedAt: '未核实首次发布日期，以项目历史为准',
  latestVersion: '7.25.6（2026-11-13 核查）',
  updatePath: 'src/data/tutorials/windows/v2rayn.ts',
  githubRepo: 'https://github.com/2dust/v2rayN',
  officialSite: 'https://github.com/2dust/v2rayN/wiki',
  releasesUrl: 'https://github.com/2dust/v2rayN/releases',
  specs: {
    compatibility: 'Windows 10+；各内核的最低系统要求需另行确认',
    architecture: 'x64 / arm64；x86 包是否适用以当次发布及内核为准',
    coreEngine: 'Xray / sing-box 等（支持范围随版本变化）',
    protocols: ['VMess', 'VLESS / REALITY', 'Trojan', 'Shadowsocks', 'SOCKS', 'HTTP', 'Hysteria 2 / TUIC（依内核）'],
    trafficHandling: '系统代理 / PAC；可选 TUN（需提升权限并正确配置路由）',
  },
  tutorial: {
    overview: '按下面五步连接，先让浏览器通过系统代理联网；不用时先清除系统代理，再退出软件。',
    prerequisites: [
      'Windows 10 或更高版本，确认电脑是 x64 还是 ARM64',
      '准备服务方提供的 v2rayN 订阅链接，不要公开其中的凭证'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载并打开软件',
        description: '打开[官方发布页](https://github.com/2dust/v2rayN/releases)。普通 x64 电脑下载 `v2rayN-windows-64.zip`，ARM64 电脑选择对应包。完整解压到自己的文件夹，双击 `v2rayN.exe`。',
        pencilTip: '不要在压缩包内直接运行；如提示缺少运行时，按该版本的发布说明安装。'
      },
      {
        stepNumber: 2,
        title: '导入订阅',
        description: '打开订阅分组设置，新增分组，填写名称并粘贴服务方的订阅链接。保存后更新该订阅，看到节点列表即表示导入成功。',
        pencilTip: '首次先尝试不通过代理更新；导入失败时向服务方确认链接适用于 v2rayN。'
      },
      {
        stepNumber: 3,
        title: '选择一个节点',
        description: '在节点列表中选中节点，右键进行延迟或真连接测试，再将可用节点设为活动服务器。查看下方信息，确认核心没有启动错误。',
        pencilTip: '测试超时可换一个节点再试，延迟越低不一定下载越快。'
      },
      {
        stepNumber: 4,
        title: '开启系统代理',
        description: '在系统代理菜单选择【自动配置系统代理】，路由先选择【绕过大陆】。保持软件运行，让遵循系统代理的浏览器使用刚选的节点。',
        pencilTip: '系统代理不会接管所有游戏或终端程序，首次使用不必开启 TUN。'
      },
      {
        stepNumber: 5,
        title: '验证连接并学会停止',
        description: '用浏览器打开需要代理的网站，再打开常用国内网站，确认都能访问。不用时先在系统代理菜单清除系统代理，再退出 v2rayN。',
        pencilTip: '无法访问时先换节点；退出后断网则检查 Windows 的代理设置是否仍指向本地端口。'
      }
    ],
    advancedRules: [
      '路由模式：日常先用绕过大陆；排查单个网站时可临时切换全局代理，测试后恢复。',
      '订阅更新：服务方增加或更换节点后更新订阅，再检查活动服务器是否仍然可用。',
      'TUN 模式：仅在应用不遵循系统代理时尝试，按官方说明配置权限、DNS 和路由，不需要时关闭。',
      '局域网访问：只在需要给其他设备共享时开启，并限制防火墙访问范围，勿向公网开放。'
    ],
    faq: [
      { question: '导入后没有节点怎么办？', answer: '检查订阅是否到期，重新更新，并向服务方确认提供的是 v2rayN 支持的订阅格式。' },
      { question: '退出后无法联网怎么办？', answer: '重新打开软件并清除系统代理，或关闭 Windows 设置中残留的手动代理；用过 TUN 时也要关闭它。' }
    ]
  },
  changelog: []
};
