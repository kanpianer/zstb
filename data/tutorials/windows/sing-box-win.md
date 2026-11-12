---
id: "sing-box-win"
name: "Sing-box"
system: "windows"
category: "windows"
tagline: "官方纯血通用代理平台、命令行内核与配置驱动"

# 必填固定标准格式字段
updated_at: "2026-10-24"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-07-01"
latest_version: "v1.14.4"
update_path: "data/tutorials/windows/sing-box-win.md"

official_site: "https://sing-box.sagernet.org"
github_repo: ""
releases_url: "https://github.com/SagerNet/sing-box/releases"

specs:
  compatibility: "Windows 10 / Windows 11 (64位)"
  architecture: "amd64 / arm64"
  core_engine: "Sing-box Universal Proxy Platform (Go)"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "ShadowTLS", "WireGuard", "Direct/Block"]
  traffic_handling: "系统代理 + TUN 虚拟网卡（需管理员权限）"
---

# Sing-box 众包图文教程

> **教程文件路径**: `data/tutorials/windows/sing-box-win.md`  
> **最近更新**: 2026-10-24 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-07-01

## 一、软件简介与核心规格
Sing-box 是由 SagerNet 团队打造的通用代理平台。Windows 版本以官方内核发行包形式提供，采用标准 JSON 配置语法，协议适配始终处于第一线，支持 Hysteria 2、TUIC v5、VLESS (Reality)、ShadowTLS 等前沿协议，并具备强大的路由分流能力。

### 规格参数
- **支持架构**: amd64 / arm64
- **系统要求**: Windows 10 / Windows 11 (64位)
- **底层引擎**: Sing-box Universal Proxy Platform (Go)
- **流量接管模式**: 系统代理 + TUN 虚拟网卡（需管理员权限）
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, ShadowTLS, WireGuard, Direct/Block

---

## 二、标准操作步骤指南

### 步骤 1：下载与解压
在 GitHub Releases 下载 `sing-box-x.x.x-windows-amd64.zip`（ARM 设备选 arm64）。解压到无中文路径的文件夹即可，绿色免安装。

> ✏️ **铅笔提示**: 压缩包内包含 `sing-box.exe` 与 `libcronet.dll` 等文件，请保持在同一目录。

### 步骤 2：准备配置文件
在同目录下新建 `config.json`，填入机场提供的 sing-box 配置，或自行编写。可使用以下命令校验配置语法。

```bash
sing-box.exe check -c config.json
```
> ✏️ **铅笔提示**: 修改配置后务必先执行 check，避免因语法错误启动失败。

### 步骤 3：以管理员权限运行
以管理员身份打开终端，进入解压目录并启动。配置中包含 TUN 入站时必须使用管理员权限。

```bash
sing-box.exe run -c config.json
```
> ✏️ **铅笔提示**: 可借助任务计划程序或 NSSM 将其注册为开机自启服务。


---

## 三、进阶分流与防泄露建议
1. 路由设置：在 `route.rules` 中通过 rule-set 配置直连、代理与阻断规则，并使用 `sing-box.exe rule-set` 命令管理规则集。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么启用 TUN 模式后报错没有权限？
**A**: 请在终端上右键选择【以管理员身份运行】后再执行 `sing-box.exe run`，即可正常创建虚拟网卡。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | SingBoxAdvocate | #1 | 首次更新 | `e4f5a6b` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
