---
id: "clash-verge-rev-linux"
name: "Clash Verge Rev"
system: "linux"
category: "linux"
tagline: "Linux 桌面发行版（Ubuntu/Fedora/Arch）开箱即用图形化代理首选"

# 必填固定标准格式字段
updated_at: "2026-11-03"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2023-11-05"
latest_version: "v2.5.10"
update_path: "data/tutorials/linux/clash-verge-rev-linux.md"

official_site: "https://clash-verge-rev.github.io"
github_repo: "https://github.com/clash-verge-rev/clash-verge-rev"

specs:
  compatibility: "Ubuntu 20.04+, Debian 11+, Fedora 36+, Arch Linux, openSUSE"
  architecture: "x86_64 / aarch64 (ARM64)"
  core_engine: "Mihomo Core (原 Clash.Meta)"
  protocols: ["VLESS (Reality)", "Hysteria 2", "TUIC v5", "VMess", "Trojan", "Shadowsocks", "WireGuard"]
  traffic_handling: "GNOME/KDE 系统代理设置 + Linux TUN (iptables/nftables) 全局接管"
---

# Clash Verge Rev 众包图文教程

> **教程文件路径**: `data/tutorials/linux/clash-verge-rev-linux.md`  
> **最近更新**: 2026-11-03 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2023-11-05

## 一、软件简介与核心规格
Clash Verge Rev 为 Linux 桌面用户提供了完整的 AppImage、Deb、RPM 与 Arch AUR 打包支持。免去终端繁琐配手搓 YAML 的苦恼，内置高性能 Mihomo 内核与 systemd 辅助服务，完美支持 TUN 全局拦截。

### 规格参数
- **支持架构**: x86_64 / aarch64 (ARM64)
- **系统要求**: Ubuntu 20.04+, Debian 11+, Fedora 36+, Arch Linux, openSUSE
- **底层引擎**: Mihomo Core (原 Clash.Meta)
- **流量接管模式**: GNOME/KDE 系统代理设置 + Linux TUN (iptables/nftables) 全局接管
- **支持协议**: VLESS (Reality), Hysteria 2, TUIC v5, VMess, Trojan, Shadowsocks, WireGuard

---

## 二、标准操作步骤指南

### 步骤 1：下载并安装软件包
在 GitHub Releases 页面，根据发行版选择包格式：Ubuntu/Debian 下载 `.deb`；Fedora 下载 `.rpm`；Arch 用户直接通过 AUR 安装 `yay -S clash-verge-rev-bin`；其他系统可下载 `.AppImage`。

```bash
# Ubuntu/Debian 命令行安装示例
sudo dpkg -i clash-verge_xxx_amd64.deb
```
> ✏️ **铅笔提示**: 如果是 AppImage 格式，下载后先执行 `chmod +x Clash.Verge.AppImage` 赋予可执行权限。

### 步骤 2：赋予内核 TUN 虚拟网卡权限
Linux 下创建虚拟网卡需要 CAP_NET_ADMIN 权限。在软件的【设置】中，点击【服务模式】旁边的安装按钮，或直接对内核二进制赋予 capability：

```bash
sudo setcap cap_net_admin,cap_net_bind_service=+ep ~/.config/clash-verge/clash-meta
```
> ✏️ **铅笔提示**: 赋予 capability 之后，启动 TUN 模式不再需要反复输入 sudo 密码！

### 步骤 3：导入订阅并开启代理
在左侧【订阅】粘贴订阅链接并下载。在【代理】页面选择低延迟节点，开启【系统代理】或【TUN 模式】。

> ✏️ **铅笔提示**: 在终端输入 `curl -I https://google.com` 即可验证连通性。


---

## 三、进阶分流与防泄露建议
1. 桌面托盘常驻：在 GNOME Wayland 下若托盘不显示，可安装 `AppIndicator and KStatusNotifierItem Support` 扩展。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么开启系统代理后终端仍然无法翻墙？
**A**: Linux 的系统代理仅对支持环境变量的 GUI 软件生效，终端通常需要手动 export 或直接开启【TUN 模式】进行全局网卡接管。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | LinuxTux | #1 | 首次更新 | `e319bf0` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
