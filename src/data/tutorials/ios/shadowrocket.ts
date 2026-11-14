import { SoftwareTool } from '../../../types/tutorial';

export const shadowrocket: SoftwareTool = {
  id: 'shadowrocket',
  name: 'Shadowrocket (小火箭)',
  shortName: 'Shadowrocket',
  system: 'ios',
  category: 'apple',
  tagline: 'iPhone / iPad 规则型代理工具，需自行提供服务器',
  description: 'Shadowrocket 是 iPhone / iPad 上的规则型代理客户端，可导入兼容订阅并按规则连接。购买软件不包含节点或代理服务。',
  iconName: 'Rocket',
  badgeText: '规则代理',
  updatedAt: '2026-11-13',
  isOpenSource: false,
  license: '专有软件；未确认完整客户端开源许可',
  price: '美国 App Store：US$2.99（2026-11-13）',
  releasedAt: '2015-04-14',
  latestVersion: '2.2.93（美国商店 API；2026-10-29 发布）',
  updatePath: 'src/data/tutorials/ios/shadowrocket.ts',
  officialSite: 'https://shadowlaunch.com',
  appStoreUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
  specs: {
    compatibility: 'iOS 13.0 / iPadOS 13.0 或更高（本页只介绍 iOS）',
    architecture: 'iPhone / iPad（以商店兼容设备列表为准）',
    coreEngine: '专有实现；未确认完整底层引擎细节',
    // 主要协议来源：https://t.me/ShadowrocketNews/1321；https://t.me/ShadowrocketNews/1038；https://t.me/ShadowrocketNews/1335
    protocols: ['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS（含 REALITY）', 'Trojan', 'Hysteria', 'Hysteria 2', 'TUIC', 'WireGuard', 'AnyTLS', 'HTTP(S)', 'SOCKS5', 'SSH', 'NaïveProxy'],
    trafficHandling: '系统 VPN 接管；按所选规则配置决定流向',
  },
  "tutorial": {
    "overview": "Shadowrocket 用于导入节点并连接 VPN，购买应用不包含代理服务。请从 [官方 App Store 页面](https://apps.apple.com/us/app/shadowrocket/id932747118) 安装。",
    "prerequisites": [
      "iOS / iPadOS 13+ 与可购买应用的本人 Apple 账户",
      "服务方明确标注适用于 Shadowrocket 的节点或订阅",
      "订阅含凭据，请勿公开；节点订阅与规则文件用途不同"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "购买并安装应用",
        "description": "通过官方 App Store 页面核对应用 ID 932747118、销售方 Shadow Launch Technology Limited，再按当前地区价格购买安装。不使用不可信共享 Apple 账户。"
      },
      {
        "stepNumber": 2,
        "title": "添加兼容订阅",
        "description": "使用应用的添加节点或订阅功能，填入服务方提供的 Shadowrocket 兼容订阅 URL，保存并获取节点。不要把任意 Clash YAML 当作节点订阅；扫码或粘贴节点时同样要确认来源。"
      },
      {
        "stepNumber": 3,
        "title": "选择节点",
        "description": "在节点列表中选一个节点，可先选服务方推荐的线路。需要按规则分流时，选择并启用可信规则配置；节点订阅本身不一定附带规则。"
      },
      {
        "stepNumber": 4,
        "title": "连接并授权 VPN",
        "description": "打开连接开关，首次按 iOS 提示允许添加 VPN 配置并完成系统认证。连接前先停止其他 VPN。"
      },
      {
        "stepNumber": 5,
        "title": "浏览器验证与关闭",
        "description": "打开 Safari，分别访问日常网站和需要代理的网站。确认网页能加载，而不只看 VPN 图标。结束使用时关闭 Shadowrocket 的连接开关，确认系统 VPN 状态已断开。"
      }
    ],
    "advancedRules": [
      "更新节点：使用订阅更新功能获取最新节点；更新后检查所选线路，避免继续使用已删除的节点。",
      "导入规则：需要分流时，从可信 URL 或 iCloud Drive 导入规则文件并选择使用；修改前备份原配置，再用常用网站测试。",
      "排查域名问题：在网页打不开时查看应用的 DNS 记录，记下失败域名并检查规则；分享记录前隐藏私人域名和访问记录。普通代理不需要开启 HTTPS 解密或安装根证书。"
    ],
    "faq": [
      {
        "question": "订阅无法导入或没有节点怎么办？",
        "answer": "检查链接是否复制完整、订阅是否有效，并让服务方提供适用于当前 Shadowrocket 的订阅。购买应用不附带节点；不要把规则文件或登录页地址当订阅。"
      },
      {
        "question": "已连接但 Safari 无法访问怎么办？",
        "answer": "先断开确认手机本身能上网，再更新订阅、换节点并重连。如果只有个别网站异常，检查当前路由方式和规则；发送日志前遮盖订阅地址和密码。"
      },
      {
        "question": "连接后国内应用变慢怎么办？",
        "answer": "先停止连接作对比。若断开后恢复，检查规则是否把该应用的网站送到了代理，再选择合适的规则配置或线路；不要一次更改多个设置。"
      }
    ]
  },
  changelog: [],
};
