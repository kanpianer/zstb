---
id: "clash-mac"
name: "Clash"
system: "macos"
category: "apple"
tagline: "常驻菜单栏、SwiftUI 原生打造的轻量高效 Mihomo 分流客户端"

# 必填固定标准格式字段
updated_at: "2026-03-29"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2024-10-15"
latest_version: "v1.2.0"
update_path: "data/tutorials/macos/clash-mac.md"

official_site: "https://clash.md/platforms/macos"
github_repo: "https://github.com/ProjectClash/Clash-Client"

specs:
  compatibility: "macOS 14.0 (Sonoma) 或更高版本"
  architecture: "Universal (Apple Silicon ARM64 & Intel x86_64 原生优化)"
  core_engine: "Mihomo Core (Clash.Meta) + Apple NetworkExtension"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "WireGuard"]
  traffic_handling: "NetworkExtension PacketTunnel (utun) + 菜单栏轻量接管 + 进程/可执行路径分流"
  resource_footprint: "原生 SwiftUI 极低开销，常驻内存仅 ~25MB - 45MB"

screenshot:
  device_type: "macbook"
  device_spec: "Apple MacBook Pro 16" (Liquid Retina XDR, M-Series)"
  resolution: "3456 × 2234 像素"
  title: "Clash Mac 菜单栏控制器、活动连接脉络与分流规则"
  caption: ""
---

# Clash 众包图文教程

> **独立更新路径**: `data/tutorials/macos/clash-mac.md`  
> **更新时间**: 2026-03-29 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2024-10-15

## 一、软件简介与核心规格
Clash (macOS) 是专为 Mac 打造的纯血原生规则分流代理客户端。基于开源 Mihomo (Clash.Meta) 内核与 SwiftUI 框架构建，常驻菜单栏即时掌控连接状态、模式与速率；支持不同进程/应用独立分流、网络质量检测小组件与快捷指令联动，完全无任何广告与遥测追踪。

### 规格参数
- **支持架构**: Universal (Apple Silicon ARM64 & Intel x86_64 原生优化)
- **系统要求**: macOS 14.0 (Sonoma) 或更高版本
- **底层引擎**: Mihomo Core (Clash.Meta) + Apple NetworkExtension
- **流量接管模式**: NetworkExtension PacketTunnel (utun) + 菜单栏轻量接管 + 进程/可执行路径分流
- **资源消耗**: 原生 SwiftUI 极低开销，常驻内存仅 ~25MB - 45MB
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: Apple MacBook Pro 16" (Liquid Retina XDR, M-Series) (3456 × 2234 像素)

### 关键控制点标注
- **① 菜单栏快捷控制**: 常驻菜单栏，随手连接、断开、切换分流模式与查看实时速率
- **② 进程级差异化分流**: 按进程名称、可执行路径或 UID 分流浏览器、下载工具与终端环境
- **③ 连接脉络一览无余**: 活动连接、近期记录、命中规则全览，内置节点延迟与 NAT 质量诊断

---

## 三、标准操作步骤指南

### 步骤 1：下载与安装 Clash Mac 版
访问官方网站 (https://clash.md/platforms/macos) 点击 Mac App Store 徽章安装，或通过 Telegram 申请 TestFlight Beta 资格。首次打开时，根据系统提示授予网络扩展（NetworkExtension）与 VPN 配置权限。

> ✏️ **铅笔提示**: 若 Apple ID 为中国大陆地区，请切换至外区 Apple ID 登录 Mac App Store 下载安装。

### 步骤 2：导入订阅配置 (Profiles)
打开应用进入【配置 (Profiles)】界面，点击右上角【+】新增配置，选择【从 URL 下载】，填入机场提供的 Clash / Mihomo 订阅链接并设置配置名称，点击保存并拉取节点列表。

```url
https://sub.airport.org/api/v1/client/subscribe?token=xxx&flag=clash
```
> ✏️ **铅笔提示**: 支持从本地直接导入 .yaml 配置文件，也支持多个配置文件之间随时热切换。

### 步骤 3：选择分流模式与节点策略
进入【代理 (Proxies)】界面或在菜单栏快速面板中，将模式设置为【规则 (Rule)】。可以在各个策略组中手动选择心仪节点，或直接选择自动测速优选分组 (URL-Test / Auto)。

> ✏️ **铅笔提示**: 点击延迟测速按钮可并发测试所有节点延迟；亦可在“快捷指令”中配置自动化任务。

### 步骤 4：启动代理与常驻菜单栏
点击主开关启动代理服务。Clash 将常驻在 macOS 菜单栏，实时显示上行/下行速率与连接状态；需要调整节点或切换模式时随手在菜单栏即可搞定。

> ✏️ **铅笔提示**: 支持小组件固定在桌面；还可利用进程规则让终端开发工具、浏览器走不同节点。


---

## 四、进阶分流与防泄露建议
1. 进程级精细分流：在配置文件或规则列表中添加 PROCESS-NAME 规则，让指定软件（如 Terminal、Xcode、Telegram 等）走专用代理或直连线路。
2. 小组件与快捷指令联动：将 Clash 状态与常用策略组放置在 macOS 桌面上，配合快捷指令实现按场景自动启停。

---

## 五、常见问题与避坑 FAQ
#### Q: Clash Mac 版相比原有的 Surge for Mac 或 Electron 客户端有何优势？
**A**: Clash Mac 版采用原生 SwiftUI 架构开发，相比 Electron 客户端更为轻巧丝滑、极度省电且常驻内存低；相比商业软件 Surge 则完全免费且核心开源，开箱即用支持最新的 Mihomo/Meta 新协议生态（Reality、Hysteria 2 等）。

#### Q: Mac App Store 提示当前地区未上架或无法下载？
**A**: 由于政策限制，Clash 未在中国大陆与俄罗斯区 App Store 上架。请切换外区（美区/港区/日区等）Apple ID 登录下载，或通过官方页面加入 TestFlight 测试体验。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-29 | ClashMaintainer | #128 | 收录 Clash (macOS) 原生客户端图文教程，替换原 Surge 配置 | `c3e819b` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
