---
id: "v2raya"
name: "v2rayA"
system: "linux"
category: "linux"
tagline: "基于 Web GUI 的高性能 Linux 透明代理管理中枢"

# 必填固定标准格式字段
updated_at: "2026-11-09"
is_open_source: true
license: "AGPL-3.0 开源协议"
released_at: "2019-10-15"
latest_version: "v2.5.14"
update_path: "data/tutorials/linux/v2raya.md"

official_site: "https://v2raya.org"
github_repo: "https://github.com/v2rayA/v2rayA"

specs:
  compatibility: "Debian/Ubuntu/CentOS/Arch/Alpine/OpenWrt 等各类 Linux 发行版"
  architecture: "x86_64 / arm64 / armv7 / mips"
  core_engine: "Xray-core / V2Ray-core + iptables/nftables 透明代理"
  protocols: ["VLESS (Reality)", "VMess", "Trojan", "Shadowsocks", "HTTP", "SOCKS5"]
  traffic_handling: "透明代理 (Redirect/TProxy) + 局域网网关共享"
---

# v2rayA 众包图文教程

> **教程文件路径**: `data/tutorials/linux/v2raya.md`  
> **最近更新**: 2026-11-09 | **开源性质**: 开源 (AGPL-3.0 开源协议) | **最初发布**: 2019-10-15

## 一、软件简介与核心规格
v2rayA 是为 Linux 服务器、NAS、树莓派及软路由量身定制的 Web 客户端。支持通过浏览器远程登录管理，借助 iptables/nftables 优雅实现全系统透明代理，无需安装臃肿的桌面环境。

### 规格参数
- **支持架构**: x86_64 / arm64 / armv7 / mips
- **系统要求**: Debian/Ubuntu/CentOS/Arch/Alpine/OpenWrt 等各类 Linux 发行版
- **底层引擎**: Xray-core / V2Ray-core + iptables/nftables 透明代理
- **流量接管模式**: 透明代理 (Redirect/TProxy) + 局域网网关共享
- **支持协议**: VLESS (Reality), VMess, Trojan, Shadowsocks, HTTP, SOCKS5

---

## 二、标准操作步骤指南

### 步骤 1：一键安装 v2rayA 与 Xray 内核
在终端中执行官方脚本快速安装并启动 systemd 服务：

```bash
# 以 Debian/Ubuntu 为例
curl -Ls https://raw.githubusercontent.com/v2rayA/v2rayA-installer/main/installer.sh | sudo bash
sudo systemctl start v2raya.service
sudo systemctl enable v2raya.service
```
> ✏️ **铅笔提示**: 安装完成后服务会自动作为系统守护进程常驻开机启动。

### 步骤 2：进入 Web 管理面板
在同局域网的浏览器中输入 `http://<你的Linux机IP>:2017`，首次进入需创建管理员用户名与密码。

> ✏️ **铅笔提示**: 若是本机直接访问 `http://localhost:2017`。

### 步骤 3：导入订阅并开启透明代理
点击左上角【创建】，粘贴订阅链接拉取节点。点击右上角【设置】，将【透明代理/系统代理实现】选择为【tproxy】或【redirect】，规则选择【绕过大陆及局域网】。回到主页勾选节点并点击左上角【就绪】启动连接。

> ✏️ **铅笔提示**: 开启后，该 Linux 机器上所有的命令行、Docker 容器以及守护进程均自动透明翻墙！


---

## 三、进阶分流与防泄露建议
1. 局域网网关共享：在设置中开启“防止 DNS 污染”与“开启局域网共享”，其他设备将网关设置为该 Linux IP 即可免客户端翻墙。

---

## 四、常见问题与避坑 FAQ
#### Q: 透明代理报错 iptables 缺失怎么办？
**A**: 执行 `sudo apt install iptables iproute2` 安装基础网络工具包即可。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | SysAdminPro | #1 | 首次更新 | `a9821ef` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
