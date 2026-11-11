---
id: "clash-ios"
name: "Clash"
system: "ios"
category: "apple"
tagline: "基于 SwiftUI 原生打造的现代化 Mihomo 内核分流客户端"

# 必填固定标准格式字段
updated_at: "2026-03-28"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2024-10-15"
latest_version: "v1.2.0"
update_path: "data/tutorials/ios/clash-ios.md"

official_site: "https://clash.md/platforms/ios"
github_repo: "https://github.com/ProjectClash/Clash-Client"
appstore_url: "https://apps.apple.com/us/app/clash-rule-based-proxy/id6794257189"

specs:
  compatibility: "iOS 16.0 / iPadOS 16.0 或更高版本"
  architecture: "Apple Silicon ARM64 原生 (SwiftUI)"
  core_engine: "Mihomo Core (Clash.Meta) + Apple NetworkExtension"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "WireGuard"]
  traffic_handling: "NetworkExtension PacketTunnel 虚拟网卡 (TUN 全局/分流)"
  resource_footprint: "原生 SwiftUI 内存占用仅 ~18MB - 35MB，极度省电"

screenshot:
  device_type: "iphone"
  device_spec: "Apple iPhone 16 Pro"
  resolution: "1206 × 2622 像素"
  title: "Clash 节点列表、延迟测速与策略组编排"
  caption: ""
---

# Clash 众包图文教程

> **独立更新路径**: `data/tutorials/ios/clash-ios.md`  
> **更新时间**: 2026-03-28 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2024-10-15

## 一、软件简介与核心规格
Clash (iOS) 是基于开源 Mihomo (Clash.Meta) 内核专为 Apple 生态打造的纯血原生代理客户端。采用原生 SwiftUI 编写，深度集成 iOS 系统特性（控制中心、快捷指令、小组件），支持全协议分流规则与极速自动测速选优，无任何广告与第三方追踪。

### 规格参数
- **支持架构**: Apple Silicon ARM64 原生 (SwiftUI)
- **系统要求**: iOS 16.0 / iPadOS 16.0 或更高版本
- **底层引擎**: Mihomo Core (Clash.Meta) + Apple NetworkExtension
- **流量接管模式**: NetworkExtension PacketTunnel 虚拟网卡 (TUN 全局/分流)
- **资源消耗**: 原生 SwiftUI 内存占用仅 ~18MB - 35MB，极度省电
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: Apple iPhone 16 Pro (1206 × 2622 像素)

### 关键控制点标注
- **① 模式切换**: 支持规则 (Rule)、全局 (Global) 与直连 (Direct) 极速三档切换
- **② 智能策略组**: 自动根据延迟优选节点 (URL-Test) 或备用故障转移 (Fallback)
- **③ 延迟测速**: 点击即可对全组节点进行并发测速，毫秒级响应直观呈现
- **④ 系统深度集成**: 支持 iOS 控制中心快捷开关与快捷指令自动化联动

---

## 三、标准操作步骤指南

### 步骤 1：下载安装 Clash 客户端
通过 App Store 搜索安装“Clash”或访问官方平台链接 (https://clash.md/platforms/ios) 获取最新安装包。首次打开时，根据系统提示授予网络与通知权限。

> ✏️ **铅笔提示**: 完全无广告，原生 SwiftUI 界面轻巧流畅。

### 步骤 2：导入 Clash 订阅配置
在应用中点击【配置 (Profiles)】-> 点击右上角【+】新增配置，选择【从 URL 下载】，粘贴机场提供的 Clash / Mihomo 订阅链接后保存并刷新。

```url
https://sub.provider.com/api/v1/client/subscribe?token=xxx&flag=clash
```
> ✏️ **铅笔提示**: 支持扫码快速导入与本地 .yaml 配置文件导入。

### 步骤 3：选择分流模式与节点策略
进入【代理 (Proxies)】页面，顶部推荐保留【规则 (Rule)】模式。在各策略组中挑选目标节点，或直接选择自动测速分组 (Auto / URL-Test) 让内核自动调度。

> ✏️ **铅笔提示**: 点击右上角闪电图标可一键批量并发测速。

### 步骤 4：开启 VPN 隧道连接
回到应用首页或通过 iOS 控制中心，点击拨动主开关。系统弹出“添加 VPN 配置”弹窗时，输入锁屏密码确认即可开启代理。

> ✏️ **铅笔提示**: 可配合 iOS 快捷指令，实现连入家里的 Wi-Fi 时自动关闭代理、离开时自动开启。


---

## 四、进阶分流与防泄露建议
1. iCloud 同步：可将配置文件备份至 iCloud Drive，在 iPad 与 Mac 设备间无缝共享。
2. 自定义规则覆写：支持添加自定义 parser 或 rule-providers，实现定制化防 DNS 污染与去广告。

---

## 五、常见问题与避坑 FAQ
#### Q: Clash (iOS) 相比原先的工具（如 Surge）有什么优势？
**A**: Clash (iOS) 采用原生 SwiftUI 架构与开源 Mihomo 内核，免费或成本极低，开箱即用支持主流新兴协议（VLESS-Reality、Hysteria 2、TUIC 等），且免去 Surge 昂贵订阅费与繁琐的手搓配置门槛。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-28 | ClashMaintainer | #112 | 初始收录 Clash (iOS) 教程，基于 clash.md 官方规范编写 | `e5f78a2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
