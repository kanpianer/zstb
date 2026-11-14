import { SoftwareTool } from '../../../types/tutorial';

export const clashVergeRevLinux: SoftwareTool = {
  "id": "clash-verge-rev-linux",
  "name": "Clash Verge Rev",
  "shortName": "Clash Verge Rev",
  "system": "linux",
  "category": "linux",
  "tagline": "在 Linux 桌面导入订阅，让浏览器先用起来",
  "description": "Clash Verge Rev 是使用 Mihomo 内核的图形代理客户端。导入兼容订阅、选择节点并开启系统代理后，即可用浏览器验证连接；软件不含节点服务。",
  "iconName": "Terminal",
  "badgeText": "官方来源核查",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0（详见项目许可证）",
  "releasedAt": "未独立核实，以官方发布记录为准",
  "latestVersion": "v2.5.10（2026-11-13 核查；以官方发布页为准）",
  "updatePath": "src/data/tutorials/linux/clash-verge-rev-linux.ts",
  "githubRepo": "https://github.com/clash-verge-rev/clash-verge-rev",
  "officialSite": "https://www.clashverge.dev",
  "releasesUrl": "https://github.com/clash-verge-rev/clash-verge-rev/releases",
  "specs": {
    "compatibility": "Linux 图形桌面；依赖由发行包决定；Ubuntu 20.04 存在 WebKitGTK 依赖问题，官方建议 24.04",
    "architecture": "x86_64 / aarch64 / armv7，以 DEB/RPM 发布资产为准",
    "coreEngine": "内置 Mihomo；稳定版与测试内核能力可能不同",
    "protocols": [
      "VLESS（含 REALITY，取决于内核）",
      "VMess",
      "Trojan",
      "Shadowsocks",
      "Hysteria 2",
      "TUIC",
      "WireGuard"
    ],
    "trafficHandling": "系统代理仅影响遵循系统设置的应用；TUN 通过虚拟网卡和路由接管适用流量"
  },
  tutorial: {
    "overview": "第一次使用，按下面步骤安装、导入订阅并打开系统代理即可。先让浏览器能用，其他选项保持默认；需要更多功能时再看进阶设置。",
    "prerequisites": [
      "一台 Linux 桌面电脑，能够安装软件；Ubuntu 建议使用 24.04。",
      "准备服务商提供的 Clash / Mihomo 订阅链接（用于下载节点列表和规则）。软件本身不含节点，请勿公开订阅链接。"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "下载并安装软件",
        "description": "点击本页“软件下载”，展开发布页的 Assets（下载文件）。Ubuntu / Debian 选 .deb，Fedora 选 .rpm；普通 Intel / AMD 电脑选 x86_64，ARM 电脑选 aarch64。用系统的软件安装程序打开下载的包，安装后从应用菜单启动 Clash Verge Rev。",
        "pencilTip": "安装提示缺依赖时，按[官方安装说明](https://github.com/clash-verge-rev/clash-verge-rev)处理，不要强行忽略错误。"
      },
      {
        "stepNumber": 2,
        "title": "粘贴订阅链接",
        "description": "打开“订阅”页面，粘贴服务商提供的 Clash / Mihomo 订阅链接并导入。出现配置卡片后，点击选中它。",
        "pencilTip": "订阅链接不是服务商网站的登录地址；不知道复制哪个链接，就找服务商页面里的“Clash 订阅”。"
      },
      {
        "stepNumber": 3,
        "title": "选择一个节点",
        "description": "进入“代理”页面，使用“规则”模式，在节点选择组中点击一个可用节点。可以先点延迟测试，再选有结果的节点；暂时不用改其他分组。"
      },
      {
        "stepNumber": 4,
        "title": "打开系统代理",
        "description": "打开“系统代理”开关，保持软件运行。第一次先不打开 TUN（虚拟网卡）模式。"
      },
      {
        "stepNumber": 5,
        "title": "打开网页确认能用",
        "description": "用浏览器打开一个需要代理的网站，再打开平时常用的网站。两者能正常加载就完成了。不用时先关闭“系统代理”，再退出软件。",
        "pencilTip": "连不上时，先换一个节点再试，并关闭其他正在运行的代理或 VPN。"
      }
    ],
    "advancedRules": [
      "更新订阅：节点变少或不可用时，到“订阅”页面更新当前订阅，完成后重新选择节点。",
      "切换节点：在“代理”页面测试延迟并换节点；日常保持“规则”模式，哪些网站直连由订阅规则决定。",
      "让更多应用使用代理：只有浏览器可用、其他应用不行时，再按[官方快速入门](https://www.clashverge.dev/guide/quickstart.html)安装服务并尝试 TUN。需要管理员授权，出问题先关闭 TUN。",
      "开机启动：确认连接稳定后，再在设置中开启开机启动；重启后检查系统代理是否开启，不要同时自动启动多个代理客户端。"
    ],
    "faq": [
      {
        "question": "导入后没有节点怎么办？",
        "answer": "确认选中刚导入的配置，再更新一次订阅。如果提示格式错误，请让服务商提供 Clash / Mihomo 格式，不要把私人订阅交给陌生转换网站。"
      },
      {
        "question": "退出后浏览器无法联网怎么办？",
        "answer": "重新打开软件，关闭系统代理后再退出。如果仍不行，检查桌面系统的网络代理设置，取消残留的手动代理。"
      },
      {
        "question": "为什么终端没有一起走代理？",
        "answer": "有些应用不读取系统代理。这不代表安装失败，先完成浏览器验证；确实需要时再看进阶设置的 TUN。"
      }
    ]
  },
  "changelog": []
};
