import { SoftwareTool } from '../../../types/tutorial';

export const v2raya: SoftwareTool = {
  id: 'v2raya',
  name: 'v2rayA',
  shortName: 'v2rayA',
  system: 'linux',
  category: 'linux',
  tagline: '基于 Web GUI 的高性能 Linux 透明代理管理中枢',
  description: 'v2rayA 是为 Linux 服务器、NAS、树莓派及软路由量身定制的 Web 客户端。支持通过浏览器远程登录管理，借助 iptables/nftables 优雅实现全系统透明代理，无需安装臃肿的桌面环境。',
  iconName: 'Globe',
  badgeText: 'Web管理/软路由',
  
  updatedAt: '2026-11-09',
  isOpenSource: true,
  license: 'AGPL-3.0 开源协议',
  releasedAt: '2019-10-15',
  latestVersion: 'v2.5.14',
  updatePath: 'data/tutorials/linux/v2raya.md',
  
  githubRepo: 'https://github.com/v2rayA/v2rayA',
  officialSite: 'https://v2raya.org',
  
  specs: {
    compatibility: 'Debian/Ubuntu/CentOS/Arch/Alpine/OpenWrt 等各类 Linux 发行版',
    architecture: 'x86_64 / arm64 / armv7 / mips',
    coreEngine: 'Xray-core / V2Ray-core + iptables/nftables 透明代理',
    protocols: ['VLESS (Reality)', 'VMess', 'Trojan', 'Shadowsocks', 'HTTP', 'SOCKS5'],
    trafficHandling: '透明代理 (Redirect/TProxy) + 局域网网关共享',
  },
  
  tutorial: {
    overview: '本教程讲解在 Linux 系统上通过 apt/systemd 快速部署 v2rayA 并开启透明代理。',
    prerequisites: [
      '一台运行 Linux 的机器（服务器、VPS 或软路由）',
      '具有 root 或 sudo 权限',
      '节点订阅链接'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '一键安装 v2rayA 与 Xray 内核',
        description: '在终端中执行官方脚本快速安装并启动 systemd 服务：',
        codeSnippet: '# 以 Debian/Ubuntu 为例\ncurl -Ls https://raw.githubusercontent.com/v2rayA/v2rayA-installer/main/installer.sh | sudo bash\nsudo systemctl start v2raya.service\nsudo systemctl enable v2raya.service',
        codeLanguage: 'bash',
        pencilTip: '安装完成后服务会自动作为系统守护进程常驻开机启动。'
      },
      {
        stepNumber: 2,
        title: '进入 Web 管理面板',
        description: '在同局域网的浏览器中输入 `http://<你的Linux机IP>:2017`，首次进入需创建管理员用户名与密码。',
        pencilTip: '若是本机直接访问 `http://localhost:2017`。'
      },
      {
        stepNumber: 3,
        title: '导入订阅并开启透明代理',
        description: '点击左上角【创建】，粘贴订阅链接拉取节点。点击右上角【设置】，将【透明代理/系统代理实现】选择为【tproxy】或【redirect】，规则选择【绕过大陆及局域网】。回到主页勾选节点并点击左上角【就绪】启动连接。',
        pencilTip: '开启后，该 Linux 机器上所有的命令行、Docker 容器以及守护进程均自动透明翻墙！'
      }
    ],
    advancedRules: [
      '局域网网关共享：在设置中开启“防止 DNS 污染”与“开启局域网共享”，其他设备将网关设置为该 Linux IP 即可免客户端翻墙。'
    ],
    faq: [
      {
        question: '透明代理报错 iptables 缺失怎么办？',
        answer: '执行 `sudo apt install iptables iproute2` 安装基础网络工具包即可。'
      }
    ]
  },
  
  changelog: [
    {
      date: '2026-11-12',
      author: 'SysAdminPro',
      prNumber: 1,
      summary: '首次更新',
      commitHash: 'a9821ef'
    }
  ]
};
