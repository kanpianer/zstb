---
id: "dae"
name: "dae 大鹅"
system: "linux"
category: "linux"
tagline: "基于 Linux 内核级 eBPF 技术的高性能极致吞吐透明代理网关"

# 必填固定标准格式字段
updated_at: "2026-03-21"
is_open_source: true
license: "AGPL-3.0 开源协议"
released_at: "2022-04-10"
latest_version: "v0.9.0"
update_path: "data/tutorials/linux/dae.md"

official_site: "https://github.com/daeuniverse/dae"
github_repo: "https://github.com/daeuniverse/dae"

specs:
  compatibility: "Linux 内核版本 >= 5.8 (推荐 Linux 6.1+ LTS)"
  architecture: "x86_64, aarch64"
  core_engine: "Linux 内核 eBPF (tc-bpf / cgroup-skb) + 用户态 dae core"
  protocols: ["Shadowsocks", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC", "SOCKS5"]
  traffic_handling: "内核态 eBPF 直接接管（零内存拷贝 / 极低上下文切换）"
  resource_footprint: "CPU 占用低于传统透明代理 70%，万兆吞吐毫无压力"

screenshot:
  device_type: "terminal"
  device_spec: "Debian 12 / Linux Kernel 6.6 LTS (Gateway)"
  resolution: "1920 × 1080 像素"
  title: "dae eBPF 加载、节点池组与透明路由日志"
  caption: ""
---

# dae 大鹅 众包图文教程

> **独立更新路径**: `data/tutorials/linux/dae.md`  
> **更新时间**: 2026-03-21 | **开源性质**: 开源 (AGPL-3.0 开源协议) | **最初发布**: 2022-04-10

## 一、软件简介与核心规格
dae 彻底颠覆了传统的 TUN/iptables 代理方案，直接利用 Linux 内核级 eBPF 技术在协议栈最底层拦截和重定向网络数据包。拥有近乎原生的网速吞吐、惊人的极低延迟与极低 CPU 占用，是千兆/万兆软路由与网关的性能天花板。

### 规格参数
- **支持架构**: x86_64, aarch64
- **系统要求**: Linux 内核版本 >= 5.8 (推荐 Linux 6.1+ LTS)
- **底层引擎**: Linux 内核 eBPF (tc-bpf / cgroup-skb) + 用户态 dae core
- **流量接管模式**: 内核态 eBPF 直接接管（零内存拷贝 / 极低上下文切换）
- **资源消耗**: CPU 占用低于传统透明代理 70%，万兆吞吐毫无压力
- **支持协议**: Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC, SOCKS5

---

## 二、风格化截图与图解规格
- **设备线框规格**: Debian 12 / Linux Kernel 6.6 LTS (Gateway) (1920 × 1080 像素)

### 关键控制点标注
- **① eBPF 探针**: 自动在网络接口挂载 tc/xdp 过滤器，完全绕过传统 iptables 繁重损耗
- **② 简洁配置语法**: 独创的直观 routing 分流语法（如 `dip(geoip:private) -> direct`）
- **③ 旁路网关极速转发**: 作为主路由/旁路由网关运行时，吞吐性能极高

---

## 三、标准操作步骤指南

### 步骤 1：验证 Linux 内核版本
在终端中运行 `uname -r`，确认内核版本在 5.8 以上。绝大多数 Ubuntu 22.04+、Debian 12+ 或 Arch Linux 均已满足此要求。

```bash
uname -r
# 输出需类似于 6.1.0-xx 或更高
```
> ✏️ **铅笔提示**: eBPF 技术是现代 Linux 内核的杀手级功能。

### 步骤 2：一键安装 dae
运行官方一键安装脚本：

```bash
curl -fsSL https://github.com/daeuniverse/dae-installer/raw/main/installer.sh | sudo bash
```
> ✏️ **铅笔提示**: 脚本会自动下载对应架构的 dae 二进制和预编译 eBPF 字节码。

### 步骤 3：编写配置文件并启动
编辑 `/etc/dae/config.dae`，配置绑定的网卡接口名（如 `eth0`）与节点出站，然后启动 systemd 服务：

```bash
sudo systemctl enable --now dae
sudo systemctl status dae
```
> ✏️ **铅笔提示**: 没有复杂的 iptables/nftables 命令，无需配置任何防火墙冲突规则，全由 eBPF 自动搞定！


---

## 四、进阶分流与防泄露建议
1. DNS 嗅探直连：dae 自带高性能内核级 DNS 拦截嗅探，支持对 SNI 阻断域名即时修复。

---

## 五、常见问题与避坑 FAQ
#### Q: 为什么提示加载 BPF 失败？
**A**: 检查系统内核是否禁用了 eBPF 或启用了过严的安全模块（如 SELinux/AppArmor）；执行 `sudo sysctl kernel.unprivileged_bpf_disabled=0` 确认。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-21 | KernelBpfDev | #99 | 完善 Linux 6.x 内核 eBPF 接口绑定与网关转发配置 | `f592cd1` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
