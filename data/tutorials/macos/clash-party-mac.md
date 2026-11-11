---
id: "clash-party-mac"
name: "Clash Party"
system: "macos"
category: "apple"
tagline: "开箱即用、界面极为优雅精美的代理客户端新标杆（原 Mihomo Party）"

# 必填固定标准格式字段
updated_at: "2026-03-28"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2024-01-10"
latest_version: "v1.6.5"
update_path: "data/tutorials/macos/clash-party-mac.md"

official_site: "https://clashparty.org"
github_repo: "https://github.com/mihomo-party-org/clash-party"

specs:
  compatibility: "macOS 12.0 或更高版本"
  architecture: "Apple Silicon 原生 + Intel x64"
  core_engine: "Mihomo Core (Alpha / Release)"
  protocols: ["VLESS (Reality)", "VMess", "Hysteria 2", "TUIC v5", "Trojan", "Shadowsocks", "WireGuard"]
  traffic_handling: "一键系统代理 + 智能 TUN 虚拟网卡 (免额外服务安装)"
  resource_footprint: "Electron 优化版，内存占用约 60MB - 90MB"

screenshot:
  device_type: "macbook"
  device_spec: "MacBook Air 13" (M-Series)"
  resolution: "2560 × 1664 像素"
  title: "Clash Party 优雅暗色/亮色切换与订阅中心"
  caption: ""
---

# Clash Party 众包图文教程

> **独立更新路径**: `data/tutorials/macos/clash-party-mac.md`  
> **更新时间**: 2026-03-28 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2024-01-10

## 一、软件简介与核心规格
Clash Party（原名 Mihomo Party）凭借简洁极具设计感的 UI 交互、开箱即用的分流配置预设以及对 Mihomo 全特性的深度集成，在 Mac 圈子内迅速积累了极高的人气。内置 Smart 智能测速、Sub-Store 订阅聚合与免服务的 TUN 模式，被称作“专为强迫症设计的代理客户端”。

### 规格参数
- **支持架构**: Apple Silicon 原生 + Intel x64
- **系统要求**: macOS 12.0 或更高版本
- **底层引擎**: Mihomo Core (Alpha / Release)
- **流量接管模式**: 一键系统代理 + 智能 TUN 虚拟网卡 (免额外服务安装)
- **资源消耗**: Electron 优化版，内存占用约 60MB - 90MB
- **支持协议**: VLESS (Reality), VMess, Hysteria 2, TUIC v5, Trojan, Shadowsocks, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: MacBook Air 13" (M-Series) (2560 × 1664 像素)

### 关键控制点标注
- **① 节点矩阵**: 卡片式分组呈现，支持流媒体解锁状态角标标记与 Smart 测速
- **② 一键覆写与 Sub-Store**: 内置常用规则覆写与 Sub-Store 集成，自动规避 DNS 泄漏
- **③ 快速模式切换**: 规则、全局、直连顶部三档轻触无缝切换

---

## 三、标准操作步骤指南

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

## 四、进阶分流与防泄露建议
1. 内置 Sub-Store：无缝聚合管理多个机场订阅，支持节点筛选、重命名与节点合并。
2. WebDAV 云备份：一键备份当前配置规则到自建或坚果云 WebDAV，跨设备秒级恢复。

---

## 五、常见问题与避坑 FAQ
#### Q: Clash Party 与原 Mihomo Party 是什么关系？
**A**: Clash Party 是 Mihomo Party 的官方更名演进版本，官方域名统一为 clashparty.org，全面继承了原有高颜值 UI、覆写配置与 Sub-Store 深度集成。

#### Q: 它和 Clash Verge Rev 有什么区别？
**A**: 两者底层都采用 Mihomo 核心，内核能力基本相同；Clash Party 更加注重视觉美感、动画细节以及 Sub-Store 的原生集成，更适合重视审美的日常用户。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-28 | UIArtist | #110 | 升级并更名为 Clash Party (clash-party)，更新官方域名 clashparty.org | `d883c91` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
