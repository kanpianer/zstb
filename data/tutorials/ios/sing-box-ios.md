---
id: "sing-box-ios"
name: "Sing-box"
system: "ios"
category: "apple"
tagline: "官方纯血通用代理平台、原生 iOS 客户端"

# 必填固定标准格式字段
updated_at: "2026-10-24"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-07-01"
latest_version: "v1.14.8"
update_path: "data/tutorials/ios/sing-box-ios.md"

official_site: "https://sing-box.sagernet.org"
github_repo: ""
appstore_url: "https://apps.apple.com/us/app/sing-box-mt/id6785326793"
releases_url: "https://github.com/SagerNet/sing-box/releases"

specs:
  compatibility: "iOS 15.0 / iPadOS 15.0 或更高版本"
  architecture: "ARM64 原生"
  core_engine: "Sing-box Universal Proxy Platform (Go)"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "ShadowTLS", "WireGuard", "Direct/Block"]
  traffic_handling: "Network Extension 虚拟网卡 (TUN) + 官方规则路由引擎"
---

# Sing-box 众包图文教程

> **教程文件路径**: `data/tutorials/ios/sing-box-ios.md`  
> **最近更新**: 2026-10-24 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-07-01

## 一、软件简介与核心规格
Sing-box 由 SagerNet 团队打造，iOS 客户端（SFI）采用原生 Network Extension 结合高性能 Go 核心构建，采用官方标准配置语法，支持 Hysteria 2、TUIC v5、VLESS (Reality)、ShadowTLS 等前沿协议，资源开销极低。

### 规格参数
- **支持架构**: ARM64 原生
- **系统要求**: iOS 15.0 / iPadOS 15.0 或更高版本
- **底层引擎**: Sing-box Universal Proxy Platform (Go)
- **流量接管模式**: Network Extension 虚拟网卡 (TUN) + 官方规则路由引擎
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, ShadowTLS, WireGuard, Direct/Block

---

## 二、标准操作步骤指南

### 步骤 1：下载并初次启动
使用外区 Apple ID 在 App Store 搜索 Sing-box 并安装。首次启动并开启时，需要允许添加 VPN 配置。

> ✏️ **铅笔提示**: 请认准开发者与图标，避免下载到同名第三方应用。

### 步骤 2：导入 Profile 配置文件
打开软件，进入【Profiles】页面，点击右上角【+】，选择【Create Profile】。输入机场给定的 sing-box 订阅 URL，或选择【Import Local File】导入本地配置。

```url
https://airport.domain/sub/sing-box?token=xxx
```
> ✏️ **铅笔提示**: 可勾选“Auto Update”设置自动刷新节点。

### 步骤 3：启动服务并选择节点
在 Profiles 列表中选中刚导入的配置，返回【Dashboard】主页，点击【Start】启动。进入【Groups】展开策略组，轻触选中最优节点即可。

> ✏️ **铅笔提示**: 系统状态栏显示 VPN 标志即代表已成功进入代理状态。


---

## 三、进阶分流与防泄露建议
1. 使用 Rule-Set 二进制规则集：在配置中引用远程 rule-set，实现按域名/IP 的精细分流。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么部分旧机场订阅无法在 Sing-box 正常导入？
**A**: Sing-box 采用全新的配置规范（JSON 语法），需要机场支持生成原生 sing-box 订阅，或使用订阅转换工具转为 sing-box 格式。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | SingBoxAdvocate | #1 | 首次更新 | `a1b2c3d` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
