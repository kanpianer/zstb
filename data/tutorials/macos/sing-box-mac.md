---
id: "sing-box-mac"
name: "Sing-box"
system: "macos"
category: "apple"
tagline: "次世代通用网络核心、内存怪兽与官方 GUI 原生应用"

# 必填固定标准格式字段
updated_at: "2026-10-24"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-07-01"
latest_version: "v1.14.4"
update_path: "data/tutorials/macos/sing-box-mac.md"

official_site: "https://sing-box.sagernet.org"
github_repo: ""
homebrew_url: "https://formulae.brew.sh/cask/sfm"
releases_url: "https://github.com/SagerNet/sing-box/releases"

specs:
  compatibility: "macOS 12.0 (Monterey) 或更高版本"
  architecture: "Universal (Apple Silicon 原生)"
  core_engine: "Sing-box Universal Proxy Platform (Go)"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "ShadowTLS", "WireGuard", "Direct/Block"]
  traffic_handling: "原生 System Extension 虚拟网卡 (TUN) + 系统代理"
---

# Sing-box 众包图文教程

> **教程文件路径**: `data/tutorials/macos/sing-box-mac.md`  
> **最近更新**: 2026-10-24 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-07-01

## 一、软件简介与核心规格
Sing-box 是目前代理协议演进的技术引领者，由 SagerNet 团队倾力打造。官方 macOS 客户端采用原生 Swift 结合高性能 Go 核心构建，支持几乎所有前沿协议（Hysteria 2、TUIC v5、ShadowTLS 等），资源开销近乎为零。

### 规格参数
- **支持架构**: Universal (Apple Silicon 原生)
- **系统要求**: macOS 12.0 (Monterey) 或更高版本
- **底层引擎**: Sing-box Universal Proxy Platform (Go)
- **流量接管模式**: 原生 System Extension 虚拟网卡 (TUN) + 系统代理
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, ShadowTLS, WireGuard, Direct/Block

---

## 二、标准操作步骤指南

### 步骤 1：下载并安装客户端
前往官方 GitHub Releases 页面或 Mac App Store（非国区）下载 Sing-box for macOS 客户端（.dmg 或 AppStore 安装）。

> ✏️ **铅笔提示**: 安装后首次启动，请在弹出的系统提示中允许添加系统网络扩展。

### 步骤 2：添加配置 Profiles
在左侧点击【Profiles】，点击右上角【+】，选择【New Profile】。可直接输入机场的 Sing-box 订阅 URL，或导入本地编写的高级 `config.json` 文件。

```url
https://api.yourproxy.net/sub/singbox?token=mytoken123
```
> ✏️ **铅笔提示**: 如果是自建节点，可以编写原生的 JSON 配置，支持极其精细的路由分支规则。

### 步骤 3：启动连接与策略选择
在主界面切换启用刚导入的配置，拨动右上角【Enable】开关。点击【Dashboard】即可查看当前活动连接并根据延迟选择最优节点。

> ✏️ **铅笔提示**: Sing-box 的内核占用极小，放在后台几乎完全无感，电池续航不受影响。


---

## 三、进阶分流与防泄露建议
1. 使用 Headless 模式：可以通过 `brew install sing-box` 在后台使用 launchd 作为纯守护进程运行。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么部分旧机场订阅无法在 Sing-box 正常导入？
**A**: Sing-box 采用全新的配置规范（JSON 语法），需要机场支持生成原生 sing-box 订阅，或使用订阅转换工具转为 sing-box 格式。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | SingBoxAdvocate | #1 | 首次更新 | `d382ca1` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
