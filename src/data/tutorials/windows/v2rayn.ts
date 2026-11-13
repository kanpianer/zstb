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
    overview: '先使用系统代理验证浏览器连接，再按需配置 TUN。系统代理只影响遵循系统设置的应用，不等于整台电脑的所有流量都已被接管。版本与下载文件按官方 Releases 和 Wiki 核查，菜单文字可能随语言和界面实现变化。',
    prerequisites: [
      'Windows 10 或更高版本，确认 CPU 架构与下载包相符',
      '从官方 Releases 获取完整发布包；运行时要求以对应版本说明或启动提示为准，不统一要求额外安装 .NET 8',
      '可信服务提供者的订阅或节点分享链接；订阅中通常含访问凭证，请勿公开'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '选择当前发布包并完整解压',
        description: '从官方 Releases 下载。以本次核查的 7.25.6 为例，x64 的 WPF 界面为 `v2rayN-windows-64.zip`，Avalonia 界面为 `v2rayN-windows-64-desktop.zip`；ARM64 选择名称含 `arm64` 的对应包。不要继续寻找旧版 `With-Core` 文件名。解压全部内容到用户可写目录后运行 `v2rayN.exe`。',
        pencilTip: '发布包含部分核心，其他核心需按 Wiki 补充。若启动失败先看错误和 guiLogs，再按发布要求处理运行时、权限或安全软件拦截，不要直接关闭安全防护。'
      },
      {
        stepNumber: 2,
        title: '添加并更新订阅分组',
        description: '在订阅分组设置中新增分组，填写别名与服务商提供的订阅 URL，保存后更新该订阅。先尝试不通过代理更新；若下载路径需要代理，须先有可用节点，才能使用通过代理更新。也可使用客户端支持的剪贴板导入功能添加单个分享链接。',
        pencilTip: 'Clash 完整 YAML、sing-box 完整 JSON 与节点订阅并非同一种格式。导入失败时先确认提供者是否提供 v2rayN 支持的格式，不要把带 token 的链接提交给陌生转换网站。'
      },
      {
        stepNumber: 3,
        title: '测试并设为活动服务器',
        description: '选中节点，使用右键菜单的真连接或延迟测试；根据结果设为活动服务器。具体快捷键以当前菜单显示为准。检查信息栏，确认核心启动成功，再访问需要代理的网站验证。',
        pencilTip: '低延迟不代表高带宽，也不保证 UDP、流媒体或特定网站可用。测试报错时先检查配置、核心兼容性和本地端口占用。'
      },
      {
        stepNumber: 4,
        title: '启用系统代理并设置路由',
        description: '系统代理选择【自动配置系统代理】，路由可从【绕过大陆】开始，再按实际需求调整。二者分别决定哪些应用流量进入核心，以及进入核心后如何分流。退出前清除系统代理。',
        pencilTip: '终端、游戏等可能忽略系统代理，需要单独配置代理或使用 TUN。TUN 应按当前文档提升权限、检查 DNS 和路由，不能只勾选开关就保证所有软件可用。'
      }
    ],
    advancedRules: [
      '内核与客户端应配套升级。7.25.6 发布说明明确支持并限制 sing-box 到 1.14 系列，不要把任意更高版本内核直接替换进去。',
      '开启局域网访问会扩大代理监听范围；确有共享需求时再配置防火墙和访问限制，避免对公网开放无认证代理。',
      '核查来源：[官方发布文件介绍](https://github.com/2dust/v2rayN/wiki/Release-files-introduction)、[系统代理和路由](https://github.com/2dust/v2rayN/wiki/Description-of-system-proxy-routing)、[FAQ](https://github.com/2dust/v2rayN/wiki/Faq)、[7.25.6 发布说明](https://github.com/2dust/v2rayN/releases/tag/7.25.6)。'
    ],
    faq: [
      { question: '无法启动一定是没装 .NET 8 吗？', answer: '不一定。下载包不完整、架构不符、目录权限、核心启动失败及运行时问题都可能导致异常。先按发布文件介绍选择正确包，再根据错误信息和 guiLogs 处理，不要盲目安装旧运行时。' },
      { question: '退出后浏览器无法联网怎么办？', answer: '重新打开客户端并清除系统代理；也可检查 Windows 代理设置是否残留指向已停止的本地端口。如果使用过 TUN，还需确认虚拟网卡、路由和 DNS 已恢复。' },
      { question: 'TUN 能保证加速游戏吗？', answer: '不能。代理与游戏加速是不同需求，实际效果受 UDP 支持、线路、服务端和路由影响。先确认应用和节点的条件，再逐项排查。' }
    ]
  },
  changelog: []
};
