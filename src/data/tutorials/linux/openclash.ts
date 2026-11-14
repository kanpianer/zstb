import { SoftwareTool } from '../../../types/tutorial';

export const openclash: SoftwareTool = {
  id: 'openclash',
  name: 'OpenClash',
  shortName: 'OpenClash',
  system: 'linux',
  category: 'linux',
  tagline: '在 OpenWrt LuCI 中管理 Mihomo 与透明代理',
  description: 'OpenClash 是安装在 OpenWrt 路由器上的代理插件，可在路由器管理页面导入订阅、选择节点，让经过这台路由器的设备按规则使用代理。需要自行准备节点服务。',
  iconName: 'Router',
  badgeText: 'OpenWrt 插件',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'MIT（插件）；内核许可证另计',
  releasedAt: '2019-05-29',
  latestVersion: 'v0.48.002（2026-11-13 核查）',
  updatePath: 'src/data/tutorials/linux/openclash.ts',
  githubRepo: 'https://github.com/vernesong/OpenClash',
  officialSite: 'https://github.com/vernesong/OpenClash#readme',
  releasesUrl: 'https://github.com/vernesong/OpenClash/releases',
  specs: {
    compatibility: 'OpenWrt + LuCI；按固件的 opkg/apk 及 firewall3/firewall4 选择安装路线',
    architecture: '插件包与 Mihomo 二进制分开选择；内核须匹配路由器 CPU/ABI',
    coreEngine: 'Mihomo（Meta）；可选内核以插件当前文档为准',
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS（含 REALITY）', 'Trojan', 'Hysteria', 'Hysteria 2', 'TUIC', 'WireGuard', 'Snell', 'AnyTLS', 'SSH', 'SOCKS5', 'HTTP(S)'],
    trafficHandling: 'REDIRECT / TPROXY / TUN；DNS 可用 fake-ip 或 redir-host',
  },
  tutorial: {
    "overview": "这篇适合已经有 OpenWrt 路由器、第一次使用 OpenClash 的人。先安装插件、导入配置，让一台设备连上验证即可；不用一开始就研究 DNS 或各种转发模式。",
    "prerequisites": [
      "能登录 OpenWrt 的 LuCI 管理页面；先在系统的备份页面下载一份路由器备份，保留有线连接的管理方式。",
      "准备 Clash / Mihomo 格式的完整配置订阅。插件不提供节点，订阅链接不要公开。",
      "测试设备连接到这台路由器；先停用其他代理插件，避免互相影响。"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "安装 OpenClash 插件",
        "description": "如果“服务”菜单已有 OpenClash，可跳过安装。否则从本页“软件下载”获取安装包，在 LuCI 的软件包页面上传安装：opkg 固件用 .ipk，apk 固件用 .apk。安装完成后重新登录管理页面。",
        "pencilTip": "缺少依赖时按[官方安装说明](https://github.com/vernesong/OpenClash#readme)选择对应固件的依赖；firewall4 使用 nftables，不能照搬旧版依赖。不要强制删除网络组件。"
      },
      {
        "stepNumber": 2,
        "title": "下载运行所需的内核",
        "description": "进入“服务 → OpenClash”，按照首次使用提示，在版本更新页面选择与路由器处理器匹配的内核并下载。页面显示内核已安装后再继续。",
        "pencilTip": "不确定处理器型号时，先在路由器“状态 → 概览”查看型号，并对照官方安装说明，不能随意选一个。"
      },
      {
        "stepNumber": 3,
        "title": "添加并选用订阅",
        "description": "在“配置订阅”中添加订阅，填写容易识别的名称并粘贴 Clash / Mihomo 订阅链接，保存并更新。到“配置管理”选择下载成功的配置作为运行配置。",
        "pencilTip": "如果提供者给的是完整 YAML 文件，也可以在配置管理上传。第一次不需要开启在线订阅转换。"
      },
      {
        "stepNumber": 4,
        "title": "启动并选择节点",
        "description": "保持其他设置默认，启动 OpenClash。运行状态正常后，打开状态页面提供的控制面板，在节点选择组里选一个可用节点，日常使用“规则”模式。",
        "pencilTip": "启动失败先看运行日志中的错误，不要反复改 DNS 或关闭防火墙。"
      },
      {
        "stepNumber": 5,
        "title": "用一台设备测试",
        "description": "用连接此路由器的手机或电脑打开需要代理的网站，再打开常用网站。确认能正常使用就完成了。若启用后无法上网，先回到管理页面停止 OpenClash，恢复网络后再排查。"
      }
    ],
    "advancedRules": [
      "更新订阅：服务商调整节点后，在“配置订阅”里更新；确认成功后重新选择可用节点。需要自动更新时，再设置合适的更新周期。",
      "切换节点和模式：在控制面板中换节点；日常使用规则模式，全局模式只用于临时测试，测试后切回规则模式。",
      "让部分设备不走代理：有电视、办公设备不需要代理时，按插件的访问控制说明设置该设备绕过。每次只调整一台设备并验证。",
      "备份可用配置：调整前下载当前配置并保留路由器备份。更新插件或内核后，先用一台设备测试，再让家人继续使用。"
    ],
    "faq": [
      {
        "question": "安装了插件，为什么还是启动不了？",
        "answer": "插件之外还需要内核和可用配置。先检查内核是否下载成功、订阅能否更新、配置是否已选中；有依赖错误时按官方说明补齐，不要混装其他固件的软件包。"
      },
      {
        "question": "手机连接 Wi-Fi 后仍不能访问怎么办？",
        "answer": "先确认 OpenClash 正在运行，换一个节点再试。再确认手机连接的是这台路由器，并关闭手机上其他 VPN。若所有网站都打不开，先停止插件恢复网络。"
      },
      {
        "question": "需要把控制面板开放到公网吗？",
        "answer": "不需要。只在可信局域网中管理，不要把控制面板或代理端口映射到公网。"
      }
    ]
  },
  changelog: []
};
