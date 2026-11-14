import { SoftwareTool } from '../../../types/tutorial';

export const v2raya: SoftwareTool = {
  id: 'v2raya',
  name: 'v2rayA',
  shortName: 'v2rayA',
  system: 'linux',
  category: 'linux',
  tagline: '通过浏览器管理节点与 Linux 透明代理的服务',
  description: 'v2rayA 在 Linux 后台运行，通过浏览器管理订阅、选择节点和连接。先完成本机浏览器代理，再按需开启更多功能；需要自行准备节点服务。',
  iconName: 'Globe',
  badgeText: 'Web 管理',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'AGPL-3.0-only；配套内核为 MPL-2.0',
  releasedAt: '2019-11-01',
  latestVersion: 'v2.5.15（2026-11-13 核查）',
  updatePath: 'src/data/tutorials/linux/v2raya.ts',
  githubRepo: 'https://github.com/v2rayA/v2rayA',
  officialSite: 'https://github.com/v2rayA/v2rayA#readme',
  releasesUrl: 'https://github.com/v2rayA/v2rayA/releases',
  specs: {
    compatibility: 'Linux；本篇以 Debian/Ubuntu + systemd 为例，OpenWrt 包需注意版本差异',
    architecture: 'x64 / x86 / arm64 / armv7 等，以对应发行包为准',
    coreEngine: '同版本 v2raya_core（基于 Xray-core）',
    // 官方 main README：https://github.com/v2rayA/v2rayA/blob/main/README.md
    protocols: ['VMess', 'VLESS（含 REALITY）', 'Shadowsocks', 'Trojan', 'Hysteria 2', 'TUIC', 'Juicity', 'AnyTLS', 'WireGuard', 'SOCKS5', 'HTTP(S)'],
    trafficHandling: '应用 HTTP/SOCKS 代理；Linux redirect / tproxy / tun 透明代理',
  },
  tutorial: {
    "overview": "v2rayA 安装后通过浏览器操作。本篇先让本机浏览器使用代理，不要求一开始配置全机透明代理；安装以 Debian / Ubuntu 为例。",
    "prerequisites": [
      "一台有管理员权限的 Debian / Ubuntu 电脑，建议在本机操作。",
      "准备服务商提供的 v2rayA 兼容订阅或节点分享链接。软件不含节点，链接中可能含密码，不要公开。"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "安装软件及配套内核",
        "description": "点击本页“软件下载”，选择适合系统和处理器的安装包。Debian / Ubuntu 使用 .deb，普通 Intel / AMD 电脑选 x64 / amd64，ARM 电脑选 arm64。用系统软件安装程序安装，按该次发布说明安装配套的 v2raya_core，版本要一致。",
        "pencilTip": "其他发行版或安装遇到依赖问题，查看[官方安装说明](https://github.com/v2rayA/v2rayA#readme)，不要套用旧版独立 Xray 内核教程。"
      },
      {
        "stepNumber": 2,
        "title": "启动服务并打开管理页面",
        "description": "仅本机使用时，先按官方说明把服务启动参数的监听地址设为 `--address 127.0.0.1:2017`，再启动服务。在本机浏览器打开 http://127.0.0.1:2017，按页面提示创建管理员账号并记住密码。",
        "pencilTip": "默认可能监听所有网卡；初始化前务必限制为本机或用防火墙限制可信设备，不要向公网开放管理页面。",
        "codeSnippet": "sudo systemctl edit --full v2raya.service\n# 在已有 ExecStart 命令后添加 --address 127.0.0.1:2017，保留原有其他参数，保存退出\nsudo systemctl daemon-reload\nsudo systemctl restart v2raya",
        "codeLanguage": "bash"
      },
      {
        "stepNumber": 3,
        "title": "导入订阅并选择节点",
        "description": "在管理页面点击导入，粘贴订阅或节点分享链接。订阅导入后更新列表，按页面提示选择节点或将节点加入使用的组，再启动连接。其他路由设置先保持默认。"
      },
      {
        "stepNumber": 4,
        "title": "让浏览器使用代理",
        "description": "以 Firefox 为例，打开“设置”，搜索“网络设置”，进入连接设置，选择手动代理。在 HTTP 代理填 `127.0.0.1`、端口填 `20171`，勾选也用于 HTTPS，然后保存。若你在 v2rayA 中改过端口，请填实际端口。",
        "pencilTip": "这里先只设置一个浏览器，其他应用不会自动使用代理。"
      },
      {
        "stepNumber": 5,
        "title": "验证访问并记住关闭方法",
        "description": "在设置过代理的浏览器打开需要代理的网站，再打开常用网站。正常加载就可以开始使用。不用时先把浏览器的连接设置恢复为原来的选项，再在 v2rayA 页面停止连接。"
      }
    ],
    "advancedRules": [
      "更新或更换节点：在管理页面更新订阅，再选择其他节点并连接；速度慢时先换节点，不用急着修改底层参数。",
      "按规则分流：需要部分网站直连时，先在面板选择合适的路由规则，再让浏览器使用应用规则的 HTTP 端口（默认 20172）。端口以当前设置为准。",
      "让更多应用走代理：浏览器验证成功后，再考虑面板中的透明代理。它需要额外的系统权限和网络组件，按[官方说明](https://github.com/v2rayA/v2rayA#readme)选择模式；异常时先关闭透明代理。",
      "开机启动服务：确认能正常使用后，可运行 `sudo systemctl enable v2raya`。不需要时用 `sudo systemctl disable v2raya` 取消；启动服务不等于所有应用自动走代理。"
    ],
    "faq": [
      {
        "question": "管理页面打不开怎么办？",
        "answer": "确认访问的是运行 v2rayA 的本机，地址为 http://127.0.0.1:2017。运行 `systemctl status v2raya` 检查服务；如果启动失败，查看 `journalctl -u v2raya -b` 的报错。"
      },
      {
        "question": "导入订阅后没有节点怎么办？",
        "answer": "重新复制服务商提供的兼容订阅，确认不是账号登录网址，尝试更新。仍失败时向提供者确认格式和订阅是否有效。"
      },
      {
        "question": "停止连接后浏览器也无法上网？",
        "answer": "浏览器还在把请求发给已停止的代理。回到浏览器网络设置，恢复使用代理前的连接选项即可。"
      }
    ]
  },
  changelog: []
};
