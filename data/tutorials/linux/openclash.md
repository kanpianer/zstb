---
id: "openclash"
name: "OpenClash"
system: "linux"
category: "linux"
tagline: "OpenWrt 全局透明代理客户端、家庭与软路由终极分流网关"

# 必填固定标准格式字段
updated_at: "2026-03-28"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2019-04-12"
latest_version: "v0.46.070"
update_path: "data/tutorials/linux/openclash.md"

official_site: "https://github.com/vernesong/OpenClash/wiki"
github_repo: "https://github.com/vernesong/OpenClash"

specs:
  compatibility: "OpenWrt 21.02 / 23.05 / 24.x 及衍生软路由固件 (iStoreOS, ImmortalWrt 等)"
  architecture: "x86_64, aarch64, armv7, mipsel, mips"
  core_engine: "Mihomo (Clash Meta) / Clash Premium Core"
  protocols: ["Shadowsocks", "VMess", "VLESS-Reality", "Trojan", "Hysteria 2", "TUIC v5", "WireGuard", "Snell"]
  traffic_handling: "TProxy / Redir-Host / TUN 模式 (软路由局域网透明代理 + 智能 DNS 分流)"
  resource_footprint: "按需配置，轻量模式常驻约 30MB~80MB，支持硬件加速 Offloading"

screenshot:
  device_type: "terminal"
  device_spec: "OpenWrt 23.05 / LuCI 网页控制台 (192.168.1.1)"
  resolution: "1920 × 1080 像素"
  title: "OpenClash 运行状态看板与 LuCI 节点规则配置"
  caption: ""
---

# OpenClash 众包图文教程

> **独立更新路径**: `data/tutorials/linux/openclash.md`  
> **更新时间**: 2026-03-28 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2019-04-12

## 一、软件简介与核心规格
OpenClash 是基于 OpenWrt 系统的 LuCI 客户端，采用 Clash / Mihomo (Clash Meta) 作为底层代理核心。支持 Fake-IP、TUN 虚拟网卡及 TProxy 透明代理等多种模式，具备出色的 DNS 分流、节点延迟探测、局域网设备按 IP/MAC 细粒度控制与订阅配置转换能力。是软路由、家庭主路由/旁路由网关科学上网的绝对标杆。

### 规格参数
- **支持架构**: x86_64, aarch64, armv7, mipsel, mips
- **系统要求**: OpenWrt 21.02 / 23.05 / 24.x 及衍生软路由固件 (iStoreOS, ImmortalWrt 等)
- **底层引擎**: Mihomo (Clash Meta) / Clash Premium Core
- **流量接管模式**: TProxy / Redir-Host / TUN 模式 (软路由局域网透明代理 + 智能 DNS 分流)
- **资源消耗**: 按需配置，轻量模式常驻约 30MB~80MB，支持硬件加速 Offloading
- **支持协议**: Shadowsocks, VMess, VLESS-Reality, Trojan, Hysteria 2, TUIC v5, WireGuard, Snell

---

## 二、风格化截图与图解规格
- **设备线框规格**: OpenWrt 23.05 / LuCI 网页控制台 (192.168.1.1) (1920 × 1080 像素)

### 关键控制点标注
- **① 运行模式**: 推荐使用 Fake-IP (TUN 混合) 或 TProxy 模式实现全局透明翻墙
- **② 订阅与覆写**: 支持直接导入机场 Clash/V2Ray 订阅链接，并通过覆写设置灵活自定义 DNS
- **③ 局域网分流**: 可按局域网设备 IP 或 MAC 地址精细化指定走代理、直连或屏蔽

---

## 三、标准操作步骤指南

### 步骤 1：安装 OpenClash 依赖与 ipk 安装包
在 OpenWrt 终端（或通过 LuCI 的【系统】->【TTYD 终端】）执行更新并安装必备依赖库，随后下载安装最新的 luci-app-openclash：

```bash
# 更新软件源并安装 OpenClash 必备组件依赖
opkg update
opkg install coreutils-nohup bash iptables dnsmasq-full curl ca-certificates ipset ip-full iptables-mod-tproxy kmod-tun

# 下载 luci-app-openclash 最新版 ipk 并安装
wget https://github.com/vernesong/OpenClash/releases/download/v0.46.070/luci-app-openclash_0.46.070_all.ipk -O /tmp/openclash.ipk
opkg install /tmp/openclash.ipk
```
> ✏️ **铅笔提示**: 安装完成后刷新 LuCI 页面，若菜单未出现可执行 `/etc/init.d/uhttpd restart` 重启 Web 服务。

### 步骤 2：下载代理内核并配置订阅
进入 LuCI【服务】->【OpenClash】。首次使用先在【插件设置】->【版本更新】中一键下载更新 Clash Meta (Mihomo) 内核。接着进入【配置订阅】页面，点击【添加】，填入机场提供的订阅链接，选择【在线订阅转换】或直接拉取，保存并应用配置。

> ✏️ **铅笔提示**: 强烈建议使用 Mihomo (Meta) 内核，对 VLESS-Reality、Hysteria 2、TUIC 等现代协议拥有完整原生支持。

### 步骤 3：运行模式选择与一键启动
进入【插件设置】->【模式设置】，推荐运行模式选择【Fake-IP (增强模式)】或【混合模式 (TUN + TProxy)】，勾选【启用本地 DNS 劫持】。回到【运行状态】面板，点击【启动 OpenClash】。

```bash
# 可通过命令行查看 OpenClash 启动日志
logread -e "OpenClash" -f
```
> ✏️ **铅笔提示**: 启动成功后，可在主界面点击【打开 Dashboard 控制台】（默认 9090 端口）实时查看局域网连接、切换分流节点或测速。


---

## 四、进阶分流与防泄露建议
1. 局域网设备按 IP / MAC 分流：进入【插件设置】->【访问控制】，可指定特定设备（如电视机、NAS、PT 下载机）直接绕过代理走直连，或指定游戏主机走独立的加速节点。
2. 防止 DNS 污染与回环：在【DNS 设置】中将上游 DNS 设为国内公共 DNS（如 223.5.5.5）+ 境外 DoH/DoT（如 1.1.1.1 / 8.8.8.8），并开启 Dnsmasq 转发劫持，彻底杜绝 DNS 泄漏。
3. 配合防火墙硬件加速：若软路由 CPU 性能有限，在 OpenWrt【网络】->【防火墙】中开启【软件流量分载 (Software Flow Offloading)】，可在数千兆吞吐下极大降低 CPU 负载。

---

## 五、常见问题与避坑 FAQ
#### Q: 开启 OpenClash 后局域网内国内网站变慢或打不开怎么办？
**A**: 请检查【DNS 设置】，确保 Fake-IP 高级设置中勾选了“仅允许常用端口流量”，并将国内常用域名和局域网 IP（192.168.x.x）加入直连规则；同时检查国内 DNS 服务器是否配置有效（如阿里 DNS、腾讯 DNSPod）。

#### Q: 为什么部分设备（如 Apple TV / 智能电视）连接 Wi-Fi 后提示无网络？
**A**: 部分智能家居和电视系统对 Fake-IP 分配的 198.18.0.0/16 保留 IP 段敏感。可以在【运行模式】中切换为【Redir-Host】模式，或在【访问控制】中将该设备的 MAC 地址设置为【绕过核心直连】。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-28 | RouterGeek | #112 | 适配 OpenWrt 23.05+ nftables 防火墙与 Mihomo Meta 内核 | `c71f92e` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
