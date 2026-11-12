---
id: "clash-party-mac"
name: "Clash Party"
system: "macos"
category: "apple"
tagline: "开箱即用、界面极为优雅精美的代理客户端新标杆（原 Mihomo Party）"

# 必填固定标准格式字段
updated_at: "2026-10-18"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2024-01-10"
latest_version: "v2.0.4"
update_path: "data/tutorials/macos/clash-party-mac.md"

official_site: "https://clashparty.org"
github_repo: "https://github.com/mihomo-party-org/clash-party"

specs:
  compatibility: "macOS 12.0 或更高版本"
  architecture: "Apple Silicon 原生 + Intel x64"
  core_engine: "Mihomo Core (Alpha / Release)"
  protocols: ["VLESS (Reality)", "VMess", "Hysteria 2", "TUIC v5", "Trojan", "Shadowsocks", "WireGuard"]
  traffic_handling: "一键系统代理 + 智能 TUN 虚拟网卡 (免额外服务安装)"
---

# Clash Party 众包图文教程

> **教程文件路径**: `data/tutorials/macos/clash-party-mac.md`  
> **最近更新**: 2026-10-18 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2024-01-10

## 一、软件简介与核心规格
Clash Party（原名 Mihomo Party）凭借简洁极具设计感的 UI 交互、开箱即用的分流配置预设以及对 Mihomo 全特性的深度集成，在 Mac 圈子内迅速积累了极高的人气。内置 Smart 智能测速、Sub-Store 订阅聚合与免服务的 TUN 模式，被称作“专为强迫症设计的代理客户端”。

### 规格参数
- **支持架构**: Apple Silicon 原生 + Intel x64
- **系统要求**: macOS 12.0 或更高版本
- **底层引擎**: Mihomo Core (Alpha / Release)
- **流量接管模式**: 一键系统代理 + 智能 TUN 虚拟网卡 (免额外服务安装)
- **支持协议**: VLESS (Reality), VMess, Hysteria 2, TUIC v5, Trojan, Shadowsocks, WireGuard

---

## 二、标准操作步骤指南

### 步骤 1：下载并安装应用
从 clashparty.org 官方网站或 GitHub Releases 页面下载 `clash-party-macos-arm64.dmg`（M系列芯片）或 `x64.dmg`（Intel芯片），双击拖入应用程序。

> ✏️ **铅笔提示**: 首次启动支持全中文引导界面与浅色/深色主题自由切换。

### 步骤 2：粘贴订阅并一键更新
打开软件，直接在首页醒目位置点击【添加订阅】，粘贴链接并点击确认。软件会自动下载节点并解析分组，也支持一键关联 Sub-Store。

```url
https://sub.provider.cc/subscribe?token=xxx&client=clash
```
> ✏️ **铅笔提示**: 软件默认开启了预配置规则集，无需手动繁琐微调即可规避绝大多数冲突。

### 步骤 3：启动代理与 TUN 模式
点击左上角【启动】按钮。在设置选项卡中，开启【TUN 模式】开关即可接管终端与游戏流量（无需额外安装系统服务守护）。

> ✏️ **铅笔提示**: 极具现代感的菜单栏小图标可随时掌控上下行速率。


---

## 三、进阶分流与防泄露建议
1. 内置 Sub-Store：无缝聚合管理多个机场订阅，支持节点筛选、重命名与节点合并。
2. WebDAV 云备份：一键备份当前配置规则到自建或坚果云 WebDAV，跨设备秒级恢复。

---

## 四、常见问题与避坑 FAQ
#### Q: Clash Party 与原 Mihomo Party 是什么关系？
**A**: Clash Party 是 Mihomo Party 的官方更名演进版本，官方域名统一为 clashparty.org，全面继承了原有高颜值 UI、覆写配置与 Sub-Store 深度集成。

#### Q: 它和 Clash Verge Rev 有什么区别？
**A**: 两者底层都采用 Mihomo 核心，内核能力基本相同；Clash Party 更加注重视觉美感、动画细节以及 Sub-Store 的原生集成，更适合重视审美的日常用户。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | UIArtist | #1 | 首次更新 | `d883c91` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
