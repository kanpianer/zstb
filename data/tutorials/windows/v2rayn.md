---
id: "v2rayn"
name: "v2rayN"
system: "windows"
category: "windows"
tagline: "Windows 平台无可撼动的常青树与自建节点/多内核调试神器"

# 必填固定标准格式字段
updated_at: "2026-10-11"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2017-04-18"
latest_version: "v7.25.6"
update_path: "data/tutorials/windows/v2rayn.md"

official_site: "https://github.com/2dust/v2rayN/releases"
github_repo: "https://github.com/2dust/v2rayN"

specs:
  compatibility: "Windows 10 / Windows 11 (64-bit / ARM64)"
  architecture: "x64 / ARM64 / x86 (需 .NET 8.0 运行时)"
  core_engine: "Xray-core / sing-box / mihomo 多内核动态加载"
  protocols: ["VLESS (Reality)", "VMess", "Trojan", "Shadowsocks", "Hysteria 2", "TUIC v5", "WireGuard", "SOCKS5"]
  traffic_handling: "一键写入系统代理 + 独立 Wintun/TUN 虚拟网卡驱动"
---

# v2rayN 众包图文教程

> **教程文件路径**: `data/tutorials/windows/v2rayn.md`  
> **最近更新**: 2026-10-11 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2017-04-18

## 一、软件简介与核心规格
v2rayN 是 Windows 上最经典、支持内核最丰富（Xray、sing-box、mihomo 等多内核无缝热切换）的开源客户端。对单个节点的参数细节掌控力极强，是自建节点与硬核网络玩家的首选。

### 规格参数
- **支持架构**: x64 / ARM64 / x86 (需 .NET 8.0 运行时)
- **系统要求**: Windows 10 / Windows 11 (64-bit / ARM64)
- **底层引擎**: Xray-core / sing-box / mihomo 多内核动态加载
- **流量接管模式**: 一键写入系统代理 + 独立 Wintun/TUN 虚拟网卡驱动
- **支持协议**: VLESS (Reality), VMess, Trojan, Shadowsocks, Hysteria 2, TUIC v5, WireGuard, SOCKS5

---

## 二、标准操作步骤指南

### 步骤 1：下载并解压客户端
前往官方 GitHub Releases 页面，下载带有核心文件的压缩包（推荐下载 `v2rayN-With-Core.zip`，避免手动到处寻找内核）。将其解压到一个没有中文与特殊符号的文件夹（例如 `D:\Tools\v2rayN`）。

> ✏️ **铅笔提示**: 解压后双击 `v2rayN.exe` 即可运行，建议右键发送快捷方式到桌面。

### 步骤 2：添加订阅并拉取节点
双击运行后，点击顶部菜单栏【订阅分组】-> 选择【订阅分组设置】。点击【添加】，在【可选地址 (url)】中粘贴机场订阅链接，【别名】填入机场名字，点击确定。然后再次点击【订阅分组】-> 点击【更新全部订阅 (不通过代理)】。

```url
https://airport.com/api/v1/client/subscribe?token=v2rayn_token
```
> ✏️ **铅笔提示**: 订阅成功拉取后，表格中会呈现几十条节点。

### 步骤 3：选择最优节点
按 `Ctrl+A` 全选所有节点，右键点击选择【测试服务器真实延迟 (Ctrl+R)】。等待测速完成后，点击【真实延迟】表头升序排列，双击或者选中后回车挑选一个延迟最低的绿色节点。

> ✏️ **铅笔提示**: 双击选中的节点会变为蓝色高亮背景，代表当前出口。

### 步骤 4：开启系统代理与分流
查看软件最底部的状态栏：将【路由】选择为【绕过大陆 (Whitelist)】；将【系统代理】切换为【自动配置系统代理】。此时托盘图标由蓝色变为红色，代表系统代理已成功接管。

> ✏️ **铅笔提示**: 若需要让游戏或终端走代理，勾选底部的【自动启动 Tun 模式】即可！


---

## 三、进阶分流与防泄露建议
1. 切换核心引擎：在【设置】->【核心类型设置】中，可自由选择针对不同协议调用 Xray-core 或 sing-box 核心。
2. 自定义路由黑白名单：可以在路由设置中自由添加直连域名或强制走代理的域名。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么双击 v2rayN.exe 没有任何反应？
**A**: 这是缺少 .NET 8.0 运行时的典型症状。请前往微软官网搜索下载并安装“.NET 8.0 Desktop Runtime (桌面运行时)”即可正常打开。

#### Q: 关闭 v2rayN 后电脑浏览器连不上网怎么办？
**A**: 这是因为非正常关闭导致 Windows 系统代理没有复位。重新打开 v2rayN，将底部系统代理切换为【清除系统代理】后再退出即可。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | WinExpert | #1 | 首次更新 | `b183fd4` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
