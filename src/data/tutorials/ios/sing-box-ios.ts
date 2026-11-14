import { SoftwareTool } from '../../../types/tutorial';

export const singBoxIos: SoftwareTool = {
  "name": "sing-box",
  "shortName": "sing-box",
  "iconName": "Box",
  "badgeText": "官方客户端",
  "updatedAt": "2026-11-13",
  "isOpenSource": true,
  "license": "GPL-3.0-or-later（核心另有名称/关联声明限制；以各仓库 LICENSE 为准）",
  "releasedAt": "2026-08-31（当前 MT 商店条目上架；非 SFI 项目首发）",
  "latestVersion": "App Store 1.14.8（2026-10-24）；核心 release 1.14.4",
  "releasesUrl": "https://github.com/SagerNet/sing-box/releases",
  "officialSite": "https://sing-box.sagernet.org",
  "id": "sing-box-ios",
  "system": "ios",
  "category": "apple",
  "updatePath": "src/data/tutorials/ios/sing-box-ios.ts",
  "price": "美国 App Store：免费（2026-11-13 核查）",
  "specs": {
    "compatibility": "iOS 15.0 / iPadOS 15.0 或更高",
    "architecture": "iPhone / iPad（以商店兼容列表为准）",
    "coreEngine": "sing-box（Go；功能以发行构建为准）",
    "protocols": [
      "Shadowsocks",
      "VMess",
      "VLESS",
      "Trojan",
      "Hysteria2",
      "TUIC",
      "ShadowTLS",
      "WireGuard（endpoint）"
    ],
    "trafficHandling": "Apple NetworkExtension / TUN；按 JSON 配置路由"
  },
  "tutorial": {
    "overview": "使用 sing-box Apple 客户端导入完整配置，再连接 VPN。请从 [官方 Apple 客户端文档](https://sing-box.sagernet.org/clients/apple/) 进入商店，避免下载同名应用。",
    "prerequisites": [
      "iOS / iPadOS 15+，以及可下载应用的本人 Apple 账户（官方要求非中国大陆账户）",
      "服务方提供的完整 sing-box JSON 配置，需兼容所装核心版本",
      "配置和订阅包含凭据，请勿公开或交给不可信转换网站"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "安装官方客户端",
        "description": "通过官方 Apple 文档的 App Store 链接安装 sing-box MT，核对 ID 6785326793 和销售方 Metamerism LLC。普通 iPhone 使用商店版本，不使用 GitHub 上的越狱安装包。"
      },
      {
        "stepNumber": 2,
        "title": "添加完整配置",
        "description": "在配置管理中添加 Remote Profile，填写返回完整 sing-box JSON 的 HTTPS 地址，下载保存后选中配置。已有本地配置可用 Local Profile；Clash YAML、普通节点订阅或单个分享链接不能直接替代完整配置。"
      },
      {
        "stepNumber": 3,
        "title": "启动并允许 VPN",
        "description": "启动所选配置，首次按 iOS 提示允许添加 VPN 配置并完成系统认证。先停止其他 VPN；出现配置错误时先处理提示，再重新启动。"
      },
      {
        "stepNumber": 4,
        "title": "选择节点",
        "description": "配置提供策略组时，在 Dashboard 的相应分组中选择节点。没有策略组时使用配置预设的线路；需要手动换节点，可向服务方索取包含节点选择的完整配置。"
      },
      {
        "stepNumber": 5,
        "title": "浏览器验证与关闭",
        "description": "打开 Safari，分别访问日常网站及需要代理的网站。确认网页正常加载，而不只看系统 VPN 状态。用完返回应用停止服务，确认 VPN 已断开。"
      }
    ],
    "advancedRules": [
      "更新配置：在 Remote Profile 中按需设置自动更新；更新前保留可用副本，更新后重新验证常用网站。",
      "切换线路：配置包含手动策略组时，在 Dashboard 中改选另一节点；自动选择组则按配置测试并选择线路。",
      "多设备配置：需要通过 iCloud 使用配置时，可添加 iCloud Profile 并选择相应配置文件；只使用自己的账户，注意文件内含节点凭据。"
    ],
    "faq": [
      {
        "question": "订阅导入失败怎么办？",
        "answer": "确认地址返回完整 sing-box JSON，并向服务方确认兼容的核心版本。Clash YAML、Base64 节点列表和单节点链接不能直接作为 Remote Profile；不要将私密订阅交给不可信在线转换器。"
      },
      {
        "question": "启动时报 unknown field 怎么办？",
        "answer": "通常是配置字段与当前核心版本不兼容。记录应用显示的核心版本和错误字段，向配置提供方索取对应版本的配置；手动维护者可参考 [官方迁移指南](https://sing-box.sagernet.org/migration/)，不要靠反复重装解决。"
      },
      {
        "question": "显示已连接但 Safari 打不开网页怎么办？",
        "answer": "先停止服务确认原网络正常，再尝试更新配置或更换策略组节点。如果没有分组，联系服务方检查预设线路；查看日志求助时隐藏订阅地址、密码和访问记录。"
      }
    ]
  },
  "tagline": "在 iPhone 上导入 sing-box 配置并连接",
  "description": "sing-box 的 Apple 客户端可管理本地或远程完整配置。请通过官方文档安装 sing-box MT，并自行准备兼容配置与节点服务。",
  "appStoreUrl": "https://apps.apple.com/us/app/sing-box-mt/id6785326793",
  "githubRepo": "https://github.com/SagerNet/sing-box-for-apple",
  "changelog": []
};
