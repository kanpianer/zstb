import { SoftwareTool } from '../../../types/tutorial';

export const singBoxWin: SoftwareTool = {
  id: 'sing-box-win',
  name: 'Sing-box',
  shortName: 'Sing-box',
  system: 'windows',
  category: 'windows',
  tagline: '官方纯血通用代理平台、命令行内核与配置驱动',
  description: 'Sing-box 是由 SagerNet 团队打造的通用代理平台。Windows 版本以官方内核发行包形式提供，采用标准 JSON 配置语法，协议适配始终处于第一线，支持 Hysteria 2、TUIC v5、VLESS (Reality)、ShadowTLS 等前沿协议，并具备强大的路由分流能力。',
  iconName: 'Box',
  badgeText: '官方纯血',

  updatedAt: '2026-10-24',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2022-07-01',
  latestVersion: 'v1.14.4',
  updatePath: 'data/tutorials/windows/sing-box-win.md',

  releasesUrl: 'https://github.com/SagerNet/sing-box/releases',
  officialSite: 'https://sing-box.sagernet.org',

  specs: {
    compatibility: 'Windows 10 / Windows 11 (64位)',
    architecture: 'amd64 / arm64',
    coreEngine: 'Sing-box Universal Proxy Platform (Go)',
    protocols: ['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC v5', 'ShadowTLS', 'WireGuard', 'Direct/Block'],
    trafficHandling: '系统代理 + TUN 虚拟网卡（需管理员权限）',
  },

  tutorial: {
    overview: '本教程讲解在 Windows 上下载 Sing-box 官方内核、编写配置并以 TUN 模式运行。',
    prerequisites: [
      'Windows 10/11 电脑',
      '支持 sing-box 格式的配置文件或订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '下载与解压',
        description: '在 GitHub Releases 下载 `sing-box-x.x.x-windows-amd64.zip`（ARM 设备选 arm64）。解压到无中文路径的文件夹即可，绿色免安装。',
        pencilTip: '压缩包内包含 `sing-box.exe` 与 `libcronet.dll` 等文件，请保持在同一目录。'
      },
      {
        stepNumber: 2,
        title: '准备配置文件',
        description: '在同目录下新建 `config.json`，填入机场提供的 sing-box 配置，或自行编写。可使用以下命令校验配置语法。',
        codeSnippet: 'sing-box.exe check -c config.json',
        codeLanguage: 'bash',
        pencilTip: '修改配置后务必先执行 check，避免因语法错误启动失败。'
      },
      {
        stepNumber: 3,
        title: '以管理员权限运行',
        description: '以管理员身份打开终端，进入解压目录并启动。配置中包含 TUN 入站时必须使用管理员权限。',
        codeSnippet: 'sing-box.exe run -c config.json',
        codeLanguage: 'bash',
        pencilTip: '可借助任务计划程序或 NSSM 将其注册为开机自启服务。'
      }
    ],
    advancedRules: [
      '路由设置：在 `route.rules` 中通过 rule-set 配置直连、代理与阻断规则，并使用 `sing-box.exe rule-set` 命令管理规则集。'
    ],
    faq: [
      {
        question: '为什么启用 TUN 模式后报错没有权限？',
        answer: '请在终端上右键选择【以管理员身份运行】后再执行 `sing-box.exe run`，即可正常创建虚拟网卡。'
      }
    ]
  },

  changelog: [
    {
      date: '2026-11-12',
      author: 'SingBoxAdvocate',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'e4f5a6b'
    }
  ]
};
