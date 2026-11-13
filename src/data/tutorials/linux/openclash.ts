import { SoftwareTool } from '../../../types/tutorial';

export const openclash: SoftwareTool = {
  id: 'openclash',
  name: 'OpenClash',
  shortName: 'OpenClash',
  system: 'linux',
  category: 'linux',
  tagline: '在 OpenWrt LuCI 中管理 Mihomo 与透明代理',
  description: 'OpenClash 是 OpenWrt 的 LuCI 插件，管理 Mihomo（原 Clash Meta）内核、YAML 配置、订阅和网关透明代理。是否能接管设备流量取决于网关路径、DNS、防火墙及 IPv6 配置，不是安装后自动覆盖所有设备、应用或协议。',
  iconName: 'Router',
  badgeText: 'OpenWrt 插件',
  updatedAt: '2026-11-13',
  isOpenSource: true,
  license: 'MIT（插件）；内核许可证另计',
  releasedAt: '2019 年（项目版权记录；首次发版日未确认）',
  latestVersion: 'v0.48.002（2026-11-13 核查）',
  updatePath: 'src/data/tutorials/linux/openclash.ts',
  githubRepo: 'https://github.com/vernesong/OpenClash',
  officialSite: 'https://github.com/vernesong/OpenClash#readme',
  releasesUrl: 'https://github.com/vernesong/OpenClash/releases',
  specs: {
    compatibility: 'OpenWrt + LuCI；按固件的 opkg/apk 及 firewall3/firewall4 选择安装路线',
    architecture: '插件包与 Mihomo 二进制分开选择；内核须匹配路由器 CPU/ABI',
    coreEngine: 'Mihomo（Meta）；可选内核以插件当前文档为准',
    protocols: ['Shadowsocks', 'VMess', 'VLESS / REALITY', 'Trojan', 'Hysteria 2', 'TUIC', 'WireGuard', 'Snell（依内核）'],
    trafficHandling: 'REDIRECT / TPROXY / TUN；DNS 可用 fake-ip 或 redir-host',
  },
  tutorial: {
    overview: '先备份路由器配置并保留恢复手段，再安装插件、准备核心与配置，最后逐项验证网关和 DNS。fake-ip/redir-host 是 DNS 处理方式，不能与 TUN/TPROXY 转发机制混为一谈。本文依据官方 README、v0.48.002 发布说明及仓库使用手册核查。',
    prerequisites: [
      '有 root/LuCI 管理权限的 OpenWrt 路由器，有足够闪存和内存；先备份网络、DNS 与防火墙配置',
      '确认固件包管理器为 opkg 还是 apk、防火墙为 fw3 还是 fw4，依赖必须来自匹配固件的软件源',
      '可信的 Clash/Mihomo YAML 配置或订阅；不要向陌生在线转换服务上传含 token 的订阅',
      '确认客户端实际经过这台网关，且没有其他透明代理插件同时争抢 DNS 和防火墙'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '按固件安装依赖和对应安装包',
        description: '在官方 Releases 查看当次安装说明并下载 `luci-app-openclash_*.ipk`（opkg）或 `luci-app-openclash-*.apk`（apk），可通过 LuCI 的软件包页面上传安装。依赖需按 firewall3/iptables 与 firewall4/nftables 分别安装，不要复制旧版固定 iptables 清单，也不要安装固定旧版本链接。',
        pencilTip: '当前 README 的依赖包含 bash、curl、ca-bundle、ruby、ruby-yaml、dnsmasq-full、ip-full、unzip、LuCI 等；fw4 需要 kmod-nft-tproxy，TUN 还需要 kmod-tun。dnsmasq 与 dnsmasq-full 冲突时按固件指导处理，切勿为安装而强制移除网络依赖。'
      },
      {
        stepNumber: 2,
        title: '安装匹配架构的内核并导入配置',
        description: '进入【服务 → OpenClash】，根据首次引导在版本更新中确认内核编译版本并下载 Mihomo；手工安装时须选择路由器架构，按发布说明放入 `/etc/openclash/core/`，命名为 `clash_meta` 并设置执行权限。在配置订阅或配置管理中添加订阅/上传 YAML，更新后选为运行配置。',
        pencilTip: '完整 Mihomo 配置可直接使用，不应默认开启在线转换。仅有节点列表而没有策略组、规则等配置时，应使用可信模板或由提供者输出完整配置；首次启动也需能下载规则和 GEO 数据。'
      },
      {
        stepNumber: 3,
        title: '选择模式并启动，分步验证',
        description: '在插件设置的模式设置中按需求选择 Fake-IP 或 Redir-Host，以及是否启用 TUN/混合转发。初次使用先保持官方默认，再确认 DNS 接管、网关与局域网绕行规则。启动后查看运行日志，并通过运行状态页的仪表盘选择策略组节点。',
        codeSnippet: '# 仅读取路由器日志；Ctrl+C 结束查看\nlogread -e OpenClash -f',
        codeLanguage: 'bash',
        pencilTip: '分别检查国内与代理目标、局域网设备、DNS、IPv4/IPv6。不要将 Dashboard/API/代理端口映射到公网；保持仅内网访问并设置控制密钥。'
      },
      {
        stepNumber: 4,
        title: '异常时先恢复网络并收集日志',
        description: '若启用后断网，先停止 OpenClash，确认原始 DNS/网关连接恢复，再在运行日志页面生成调试日志。检查核心与配置校验、依赖、订阅更新、防火墙后端及 DNS 端口冲突。提交日志前删除订阅 URL、节点密码、密钥与公网地址等敏感内容。',
        pencilTip: '不要用关闭全部防火墙、盲目替换 DNS 或强制开启流量分载作为通用修复。每次只改一项并验证，便于回滚。'
      }
    ],
    advancedRules: [
      'DNS 上游、解析策略与代理路由需要配套设计；添加公共 DNS 或 DoH 不等于彻底杜绝 DNS 泄漏。客户端自带加密 DNS、IPv6 绕行和旁路由拓扑都需单独测试。',
      'Fake-IP 对少数应用不兼容时，可按文档添加对应域名到 fake-ip-filter、改为 Redir-Host 或对特定设备绕行；不要把“仅允许常用端口”当成 Fake-IP 的 DNS 修复选项。',
      '流量分载不是代理加速的通用开关。官方手册的测试环境和转发路径有明确限制，不能把软件分载宣传为任何设备都能达到千兆或数千兆。',
      '核查来源：[官方安装与依赖说明](https://github.com/vernesong/OpenClash#readme)、[v0.48.002 发布说明](https://github.com/vernesong/OpenClash/releases/tag/v0.48.002)、[模式与流量控制](https://github.com/vernesong/OpenClash/blob/dev/.github/skills/openclash-user-guide/08-settings-mode-traffic.md)、[MIT 许可证](https://github.com/vernesong/OpenClash/blob/master/LICENSE)。'
    ],
    faq: [
      { question: '为什么安装 ipk 后仍不能启动？', answer: '插件包不等于代理内核；还要确认核心架构与执行权限、完整配置、运行依赖、GEO/规则数据及防火墙模块。用调试日志定位，勿混用其他固件版本的 kmod。apk 系统也不能直接套用 opkg 安装指令。' },
      { question: '电视或游戏机连 Wi-Fi 后显示无网络怎么办？', answer: '先查看实际网关/DNS和连接日志，判断是连通性检测域名、Fake-IP兼容、UDP、IPv6或规则问题。针对性调整过滤或绕行；不能仅凭设备类型断言是假 IP 地址导致。' }
    ]
  },
  changelog: []
};
