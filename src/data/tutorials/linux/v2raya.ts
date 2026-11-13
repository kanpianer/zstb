import { SoftwareTool } from '../../../types/tutorial';

export const v2raya: SoftwareTool = {
  id: 'v2raya',
  name: 'v2rayA',
  shortName: 'v2rayA',
  system: 'linux',
  category: 'linux',
  tagline: '通过浏览器管理节点与 Linux 透明代理的服务',
  description: 'v2rayA 以服务方式运行，通过 Web 界面管理订阅、节点组与 RoutingA 分流。当前 2.5 系列使用配套的 Xray 衍生内核 v2raya_core；不要与早期使用独立 V2Ray/Xray 的安装说明混用。Linux 透明代理需要对应权限、内核模块与网络工具。',
  iconName: 'Globe',
  badgeText: 'Web 管理',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'AGPL-3.0-only；配套内核为 MPL-2.0',
  releasedAt: '未核实首次发布日期，以项目历史为准',
  latestVersion: 'v2.5.15（2026-11-13 核查）',
  updatePath: 'src/data/tutorials/linux/v2raya.ts',
  githubRepo: 'https://github.com/v2rayA/v2rayA',
  officialSite: 'https://github.com/v2rayA/v2rayA#readme',
  releasesUrl: 'https://github.com/v2rayA/v2rayA/releases',
  specs: {
    compatibility: 'Linux；本篇以 Debian/Ubuntu + systemd 为例，OpenWrt 包需注意版本差异',
    architecture: 'x64 / x86 / arm64 / armv7 等，以对应发行包为准',
    coreEngine: '同版本 v2raya_core（基于 Xray-core）',
    protocols: ['VMess', 'VLESS', 'Shadowsocks', 'Trojan', 'Hysteria 2', 'TUIC', 'WireGuard', 'SOCKS5', 'HTTP(S)'],
    trafficHandling: '应用 HTTP/SOCKS 代理；Linux redirect / tproxy / tun 透明代理',
  },
  tutorial: {
    overview: '本篇按官方当前 README 的 2.5 系列安装路线介绍 Linux 使用方法。旧版文档与发行版仓库可能仍是 2.2 系列；安装、内核与升级方式必须以所用版本为准。官方 v2.5.15 发布说明已移除停放的旧域名 v2raya.org，故不再将其作为下载或教程入口。',
    prerequisites: [
      '有 sudo/root 权限的 Linux 主机，具备恢复网络配置的本地或带外管理方式',
      '安装前备份已有配置；2.4 之前的数据库升级会迁移且需重新注册账号',
      '可用订阅或分享链接；先限制管理端口的可访问范围，再创建首个管理员'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '安装当前版本与配套内核',
        description: '推荐按官方 README 使用 Dae Universe APT 仓库：APT 3.0+ 使用 `.sources`，更早版本使用 `.list`，两种方式二选一。下面示例适用于 APT 早于 3.0 的系统，添加第三方软件源与签名密钥前应先检查来源。官方安装包同时提供 v2raya 和配套内核，不再运行未经核实的旧一键脚本。',
        codeSnippet: 'sudo apt update\nsudo apt install curl\n# 仅适用于 APT < 3.0；APT 3.0+ 请按官方 README 使用 .sources\nsudo curl -fsSL -o /etc/apt/sources.list.d/daeuniverse.list https://daeuniverse.pages.dev/daeuniverse.list\nsudo curl -fsSL -o /usr/share/keyrings/daeuniverse-archive-goose.gpg https://daeuniverse.pages.dev/daeuniverse-archive-goose.gpg\nsudo apt update\nsudo apt install v2raya\nsudo systemctl enable --now v2raya',
        codeLanguage: 'bash',
        pencilTip: '也可从官方 Releases 下载本机架构的安装包并核对 SHA-256。手工安装必须让 v2raya 与 v2raya_core 版本完全一致。仓库实际提供版本可能晚于或早于本文核查版本。'
      },
      {
        stepNumber: 2,
        title: '限制管理界面并创建管理员',
        description: '当前服务默认监听 `0.0.0.0:2017`，首个注册账号成为管理员。在防火墙中仅允许可信管理设备访问，再打开 `http://127.0.0.1:2017`（本机）或可信内网设备地址。仅本机使用时按官方说明配置启动参数 `--address 127.0.0.1:2017`，修改 systemd 服务可用 `sudo systemctl edit --full v2raya.service`，随后重载并重启。',
        pencilTip: '不要把未初始化面板或明文 HTTP 管理界面暴露到公网；远程管理优先使用 SSH 隧道或受保护的管理网络。'
      },
      {
        stepNumber: 3,
        title: '导入节点并先测试应用代理',
        description: '在页面导入订阅或分享链接，将节点加入组并选择节点与路由规则，然后从面板启动核心。先让单个应用使用默认 SOCKS5 `127.0.0.1:20170` 或 HTTP `127.0.0.1:20171` 验证连接；`20172` 为应用路由规则的 HTTP 入站。端口如已在设置中修改，以实际值为准。',
        pencilTip: '本地入站默认不等于开放给局域网；共享需要显式设置监听范围、防火墙和访问控制。订阅 URL 可能含凭证，勿公开。'
      },
      {
        stepNumber: 4,
        title: '按主机条件开启透明代理',
        description: '确认单应用代理可用后，在面板开启透明代理并选择模式。Linux 的 redirect/tproxy 需要 root 及 iptables 或 nftables；tun 需要 `/dev/net/tun` 与 iproute2 的 `ip` 命令。启用后分别测试 DNS、IPv4/IPv6、局域网和目标应用，出错先停用透明代理并检查日志。',
        pencilTip: 'Docker 网络命名空间、网关转发、静态路由和应用自带加密 DNS 都可能影响接管，不能保证主机、容器与局域网全部流量自动代理。'
      }
    ],
    advancedRules: [
      '升级前停止服务并备份配置目录（Linux 默认 `/etc/v2raya`）；v2raya 与 v2raya_core 必须一起升级。旧数据库迁移、账号重新注册和回滚应先阅读对应发布说明。',
      '官方当前 README 提醒 OpenWrt feed 仍可能提供 2.2.7.x 与独立 xray-core；不要直接将本篇 2.5 系列的内核要求套到旧软件包。',
      '核查来源：[当前官方 README](https://github.com/v2rayA/v2rayA/blob/main/README.md)、[v2.5.15 发布说明](https://github.com/v2rayA/v2rayA/releases/tag/v2.5.15)。'
    ],
    faq: [
      { question: '为什么新版提示内核版本不匹配？', answer: '2.5 系列要求同版本的 v2raya_core。请用相同发布的成套安装包或同时升级两个二进制文件，不能继续直接套用旧教程中的独立 Xray/V2Ray 内核。' },
      { question: '透明代理失败只要安装 iptables 就够了吗？', answer: '不一定。需结合模式检查权限、防火墙后端、内核模块；TUN 还需可用的 /dev/net/tun 与 iproute2。查看服务日志 `journalctl -u v2raya -b`，不要盲目混装或清空防火墙规则。' },
      { question: '把其他设备网关改成这台机器就能使用吗？', answer: '不能保证。还需正确的 IP 转发、DNS、转发路径、防火墙、IPv6 及代理规则。先在主机验证，不要在没有恢复手段时直接更改全网默认网关。' }
    ]
  },
  changelog: []
};
