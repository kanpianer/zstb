---
id: "clash-verge-rev-win"
name: "Clash Verge Rev"
system: "windows"
category: "windows"
tagline: "目前 Windows 端最受推荐的现代化 Mihomo GUI 客户端"

# 必填固定标准格式字段
updated_at: "2026-03-22"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2023-11-05"
latest_version: "v2.0.4"
update_path: "data/tutorials/windows/clash-verge-rev-win.md"

official_site: "https://clash-verge-rev.github.io"
github_repo: "https://github.com/clash-verge-rev/clash-verge-rev"

specs:
  compatibility: "Windows 10 / Windows 11 (64位)"
  architecture: "x64 / arm64"
  core_engine: "Mihomo Core (原 Clash.Meta)"
  protocols: ["VLESS (Reality)", "VMess", "Hysteria 2", "TUIC v5", "Trojan", "Shadowsocks", "WireGuard", "Snell"]
  traffic_handling: "Windows 系统代理 + Wintun 虚拟网卡 (TUN 模式)"
  resource_footprint: "Rust 前端极致轻巧，常驻内存仅 ~35MB"

screenshot:
  device_type: "windows"
  device_spec: "Windows 11 PC (2K 165Hz 电竞显示器)"
  resolution: "2560 × 1440 像素"
  title: "Clash Verge Rev Windows 策略组折叠、测速与托盘控制"
  caption: ""
---

# Clash Verge Rev 众包图文教程

> **独立更新路径**: `data/tutorials/windows/clash-verge-rev-win.md`  
> **更新时间**: 2026-03-22 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2023-11-05

## 一、软件简介与核心规格
Clash Verge Rev 基于 Tauri 开发，内存消耗远低于老旧的 Electron 应用。内置最新的 Mihomo (Clash.Meta) 内核，对 Windows 系统的通知、暗色模式、Wintun 虚拟网卡提供了极其完美的适配。

### 规格参数
- **支持架构**: x64 / arm64
- **系统要求**: Windows 10 / Windows 11 (64位)
- **底层引擎**: Mihomo Core (原 Clash.Meta)
- **流量接管模式**: Windows 系统代理 + Wintun 虚拟网卡 (TUN 模式)
- **资源消耗**: Rust 前端极致轻巧，常驻内存仅 ~35MB
- **支持协议**: VLESS (Reality), VMess, Hysteria 2, TUIC v5, Trojan, Shadowsocks, WireGuard, Snell

---

## 二、风格化截图与图解规格
- **设备线框规格**: Windows 11 PC (2K 165Hz 电竞显示器) (2560 × 1440 像素)

### 关键控制点标注
- **① 订阅管理**: 左侧【订阅】导入机场 Clash 订阅链接，支持右键重命名和定时更新
- **② 系统代理与TUN**: 开启【系统代理】或安装【服务模式】后启动 TUN 虚拟网卡全局拦截
- **③ 策略组分流**: 规则模式下，海外节点、国内直连与广告拦截自动精准分流

---

## 三、标准操作步骤指南

### 步骤 1：下载并安装应用
前往官方 GitHub Releases 页面，下载带有安装程序的 `Clash.Verge_xxx_x64-setup.exe`。双击运行，根据安装向导一路下一步完成安装。

> ✏️ **铅笔提示**: Windows Defender 若提示未知发布者，点击【更多信息】->【仍要运行】即可。

### 步骤 2：导入订阅链接
打开软件，点击左侧【订阅】。在上方输入框中粘贴机场提供的 Clash 订阅链接，点击【导入】。下载完成后，右键点击该配置卡片，选择【使用】。

```url
https://airport.com/api/v1/client/subscribe?token=xxx&flag=clash
```
> ✏️ **铅笔提示**: 右键点击配置卡片可以设置“自动更新间隔”，建议设为 12 小时。

### 步骤 3：开启系统代理与 TUN 模式
在软件左下角点击【设置】。在核心设置中开启【系统代理】。若需要玩外服游戏、使用终端 CMD/Git 或 WSL，建议点击开启【TUN 模式】（若首次开启提示安装服务模式，点击安装即可）。

> ✏️ **铅笔提示**: TUN 模式会自动虚拟出一张网卡，彻底无需担心各类软件不支持系统代理的问题！

### 步骤 4：选择低延迟节点
点击左侧【代理】，点击右上角闪电图标刷新所有节点测速，选中延迟最低的绿色节点即可畅通无阻。

> ✏️ **铅笔提示**: 模式务必选择【规则 (Rule)】，这样国内软件（QQ、微信、网易云）直接直连，节省流量。


---

## 四、进阶分流与防泄露建议
1. 开机静默启动：在设置中勾选【开机启动】与【静默启动】。
2. 快捷键调用：可设置全局快捷键一键唤起主面板或开关系统代理。

---

## 五、常见问题与避坑 FAQ
#### Q: 为什么打开 TUN 模式提示失败？
**A**: 请在设置页面先点击【服务模式】右侧的安装按钮，安装完成并重启软件后，即可顺畅开启 TUN 模式。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-22 | WinDev | #100 | 完善 Windows 11 下 Wintun 权限与服务模式一键安装教程 | `a718cc2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
