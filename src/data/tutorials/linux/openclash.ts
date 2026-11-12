import { SoftwareTool } from '../../../types/tutorial';

export const openclash: SoftwareTool = {
  id: 'openclash',
  name: 'OpenClash',
  shortName: 'OpenClash',
  system: 'linux',
  category: 'linux',
  tagline: 'OpenWrt 全局透明代理客户端、家庭与软路由终极分流网关',
  description: 'OpenClash 是基于 OpenWrt 系统的 LuCI 客户端，采用 Clash / Mihomo (Clash Meta) 作为底层代理核心。支持 Fake-IP、TUN 虚拟网卡及 TProxy 透明代理等多种模式，具备出色的 DNS 分流、节点延迟探测、局域网设备按 IP/MAC 细粒度控制与订阅配置转换能力。是软路由、家庭主路由/旁路由网关科学上网的绝对标杆。',
  iconName: 'Router',
  badgeText: '软路由网关',
  
  updatedAt: '2026-10-12',
  isOpenSource: true,
  license: 'GPL-3.0 开源协议',
  releasedAt: '2019-04-12',
  latestVersion: 'v0.48.002',
  updatePath: 'data/tutorials/linux/openclash.md',
  
  githubRepo: 'https://github.com/vernesong/OpenClash',
  officialSite: 'https://github.com/vernesong/OpenClash/wiki',
  
  specs: {
    compatibility: 'OpenWrt 21.02 / 23.05 / 24.x 及衍生软路由固件 (iStoreOS, ImmortalWrt 等)',
    architecture: 'x86_64, aarch64, armv7, mipsel, mips',
    coreEngine: 'Mihomo (Clash Meta) / Clash Premium Core',
    protocols: ['Shadowsocks', 'VMess', 'VLESS-Reality', 'Trojan', 'Hysteria 2', 'TUIC v5', 'WireGuard', 'Snell'],
    trafficHandling: 'TProxy / Redir-Host / TUN 模式 (软路由局域网透明代理 + 智能 DNS 分流)',
  },
  
  tutorial: {
    overview: 'OpenClash 是 OpenWrt 软路由与嵌入式路由器上功能最丰富、使用最广泛的透明网关代理插件。通过在路由器层面接管整个家庭/办公室的网络流量，所有接入 WiFi 或网线的设备（手机、PC、电视盒子、Apple TV、Switch、PS5、智能家居等）无需额外安装客户端即可无感实现科学上网、广告拦截与智能分流。',
    prerequisites: [
      '已安装 OpenWrt 系统的软路由（工控机、虚拟机、NanoPi、树莓派）或硬路由',
      '具有 OpenWrt 管理员 (root) 权限及网页后台 (LuCI) 访问权限',
      '支持 Clash / Clash Meta 格式的机场订阅链接或自建节点配置'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '安装 OpenClash 依赖与 ipk 安装包',
        description: '在 OpenWrt 终端（或通过 LuCI 的【系统】->【TTYD 终端】）执行更新并安装必备依赖库，随后下载安装最新的 luci-app-openclash：',
        codeSnippet: '# 更新软件源并安装 OpenClash 必备组件依赖\nopkg update\nopkg install coreutils-nohup bash iptables dnsmasq-full curl ca-certificates ipset ip-full iptables-mod-tproxy kmod-tun\n\n# 下载 luci-app-openclash 最新版 ipk 并安装\nwget https://github.com/vernesong/OpenClash/releases/download/v0.46.070/luci-app-openclash_0.46.070_all.ipk -O /tmp/openclash.ipk\nopkg install /tmp/openclash.ipk',
        codeLanguage: 'bash',
        pencilTip: '安装完成后刷新 LuCI 页面，若菜单未出现可执行 `/etc/init.d/uhttpd restart` 重启 Web 服务。'
      },
      {
        stepNumber: 2,
        title: '下载代理内核并配置订阅',
        description: '进入 LuCI【服务】->【OpenClash】。首次使用先在【插件设置】->【版本更新】中一键下载更新 Clash Meta (Mihomo) 内核。接着进入【配置订阅】页面，点击【添加】，填入机场提供的订阅链接，选择【在线订阅转换】或直接拉取，保存并应用配置。',
        pencilTip: '强烈建议使用 Mihomo (Meta) 内核，对 VLESS-Reality、Hysteria 2、TUIC 等现代协议拥有完整原生支持。'
      },
      {
        stepNumber: 3,
        title: '运行模式选择与一键启动',
        description: '进入【插件设置】->【模式设置】，推荐运行模式选择【Fake-IP (增强模式)】或【混合模式 (TUN + TProxy)】，勾选【启用本地 DNS 劫持】。回到【运行状态】面板，点击【启动 OpenClash】。',
        codeSnippet: '# 可通过命令行查看 OpenClash 启动日志\nlogread -e "OpenClash" -f',
        codeLanguage: 'bash',
        pencilTip: '启动成功后，可在主界面点击【打开 Dashboard 控制台】（默认 9090 端口）实时查看局域网连接、切换分流节点或测速。'
      }
    ],
    advancedRules: [
      '局域网设备按 IP / MAC 分流：进入【插件设置】->【访问控制】，可指定特定设备（如电视机、NAS、PT 下载机）直接绕过代理走直连，或指定游戏主机走独立的加速节点。',
      '防止 DNS 污染与回环：在【DNS 设置】中将上游 DNS 设为国内公共 DNS（如 223.5.5.5）+ 境外 DoH/DoT（如 1.1.1.1 / 8.8.8.8），并开启 Dnsmasq 转发劫持，彻底杜绝 DNS 泄漏。',
      '配合防火墙硬件加速：若软路由 CPU 性能有限，在 OpenWrt【网络】->【防火墙】中开启【软件流量分载 (Software Flow Offloading)】，可在数千兆吞吐下极大降低 CPU 负载。'
    ],
    faq: [
      {
        question: '开启 OpenClash 后局域网内国内网站变慢或打不开怎么办？',
        answer: '请检查【DNS 设置】，确保 Fake-IP 高级设置中勾选了“仅允许常用端口流量”，并将国内常用域名和局域网 IP（192.168.x.x）加入直连规则；同时检查国内 DNS 服务器是否配置有效（如阿里 DNS、腾讯 DNSPod）。'
      },
      {
        question: '为什么部分设备（如 Apple TV / 智能电视）连接 Wi-Fi 后提示无网络？',
        answer: '部分智能家居和电视系统对 Fake-IP 分配的 198.18.0.0/16 保留 IP 段敏感。可以在【运行模式】中切换为【Redir-Host】模式，或在【访问控制】中将该设备的 MAC 地址设置为【绕过核心直连】。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-11-12',
      author: 'RouterGeek',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'c71f92e'
    }
  ]
};
