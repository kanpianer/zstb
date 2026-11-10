---
id: "clash-party-win"
name: "Clash Party (Windows)"
system: "windows"
category: "windows"
tagline: "Windows 上极具美感、操作直观的次世代代理客户端（原 Mihomo Party）"

# 必填固定标准格式字段
updated_at: "2026-03-28"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2024-01-10"
latest_version: "v1.6.5"
update_path: "data/tutorials/windows/clash-party-win.md"

official_site: "https://clashparty.org"
github_repo: "https://github.com/mihomo-party-org/clash-party"

specs:
  compatibility: "Windows 10 / Windows 11 (64位)"
  architecture: "x64 / arm64"
  core_engine: "Mihomo Core (Alpha/Release)"
  protocols: ["VLESS-Reality", "Hysteria 2", "TUIC v5", "VMess", "Trojan", "Shadowsocks", "WireGuard"]
  traffic_handling: "Windows 系统代理 + 智能 TUN 虚拟网卡 (免服务模式)"
  resource_footprint: "Electron 深度优化版，内存占用约 60MB - 90MB"

screenshot:
  device_type: "windows"
  device_spec: "Windows 11 PC (2K 144Hz)"
  resolution: "2560 × 1440 像素"
  title: "Clash Party Windows 仪表板与流媒体解锁检测"
  caption: ""
---

# Clash Party (Windows) 众包图文教程

> **独立更新路径**: `data/tutorials/windows/clash-party-win.md`  
> **更新时间**: 2026-03-28 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2024-01-10

## 一、软件简介与核心规格
Clash Party（原名 Mihomo Party）为 Windows 用户带来了媲美 macOS 原生体验的精美视觉。支持丰富的流媒体解锁检测、直观的分组拖拽排序、免服务模式的 TUN 虚拟网卡以及深度集成的 Sub-Store 订阅聚合，让新手也能在 Windows 上享受极客级的网络体验。

### 规格参数
- **支持架构**: x64 / arm64
- **系统要求**: Windows 10 / Windows 11 (64位)
- **底层引擎**: Mihomo Core (Alpha/Release)
- **流量接管模式**: Windows 系统代理 + 智能 TUN 虚拟网卡 (免服务模式)
- **资源消耗**: Electron 深度优化版，内存占用约 60MB - 90MB
- **支持协议**: VLESS-Reality, Hysteria 2, TUIC v5, VMess, Trojan, Shadowsocks, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: Windows 11 PC (2K 144Hz) (2560 × 1440 像素)

### 关键控制点标注
- **① 节点流媒体角标**: 自动检测节点是否支持解锁 Netflix、ChatGPT、Disney+ 等
- **② 一键启停开关**: 左上角大按钮切换启动与停止，右下角托盘图标同步更新
- **③ 脚本与规则扩展**: 内置常用规则覆写，自动规避国内直连 DNS 污染

---

## 三、标准操作步骤指南

### 步骤 1：下载并安装
在 clashparty.org 官方网站或 GitHub Releases 下载 `clash-party-windows-x64-setup.exe`，安装并启动。

> ✏️ **铅笔提示**: 界面非常现代化，支持浅色和深色皮肤自由切换。

### 步骤 2：导入订阅
点击主界面的【订阅】按钮，粘贴机场链接，点击确认下载。软件也内置 Sub-Store，可一键导入节点。

```url
https://sub.airport.cc/api/v1/client/subscribe?token=xxx&flag=clash
```
> ✏️ **铅笔提示**: 订阅下载后自动进行分流编排，开箱即用。

### 步骤 3：开启代理与使用
点击主界面的【启动】大开关，在代理列表中挑选喜欢的节点即可开启科学上网。开启 TUN 模式可全局拦截所有流量。

> ✏️ **铅笔提示**: 可随时在托盘右键菜单中快速切换节点。


---

## 四、进阶分流与防泄露建议
1. 开启免服务 TUN 模式：设置中打开 TUN 模式，免去第三方软件的代理配置。
2. WebDAV 备份：支持将订阅和覆写规则自动同步至云端。

---

## 五、常见问题与避坑 FAQ
#### Q: 它相比原版 Clash for Windows 有何优势？
**A**: 原版 CFW 早已于 2023 年底停更；Clash Party 采用全新的 Meta/Mihomo 内核，全面支持 Reality、Hysteria 2 等新协议，且开箱即用支持免服务安装 TUN 模式，完全没有安全隐患。

#### Q: Clash Party 与 Mihomo Party 的区别？
**A**: 两者为同款项目，Clash Party 为官方正式更名版本，官方网址迁移至 clashparty.org，功能持续迭代更新。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-28 | ModernUIFan | #108 | 升级并更名为 Clash Party (clash-party)，更新官方域名 clashparty.org | `e719ea2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
