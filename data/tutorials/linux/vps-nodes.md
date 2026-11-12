---
id: "vps-nodes"
name: "自己搭建节点"
system: "linux"
category: "linux"
tagline: "一台海外 VPS 服务器 + 开源 Web SSH / PuTTY 工具 + 主流一键脚本，从零打造专属私有高速节点"

# 必填固定标准格式字段
updated_at: "2026-04-12"
is_open_source: true
license: "GPL-3.0 / MIT 开源协议"
released_at: "2023-01-15"
latest_version: "v2.4.8"
update_path: "data/tutorials/linux/vps-nodes.md"

official_site: "https://bxdt.sld.tw"
github_repo: "https://github.com/mhsanaei/3x-ui"

specs:
  compatibility: "Linux (Debian 11/12, Ubuntu 20.04/22.04/24.04, CentOS/AlmaLinux)"
  architecture: "x86_64 (amd64), aarch64 (arm64)"
  core_engine: "Xray-core / sing-box / Hysteria 2 / 3X-UI 面板"
  protocols: ["VLESS (Reality / 独立域名)", "Hysteria 2", "TUIC v5", "VMess", "Trojan", "Shadowsocks"]
  traffic_handling: "VPS 原生入站监听 / 多协议端口分流 / 反向代理"
---

# 自己搭建节点 众包图文教程

> **教程文件路径**: `data/tutorials/linux/vps-nodes.md`  
> **最近更新**: 2026-04-12 | **开源性质**: 开源 (GPL-3.0 / MIT 开源协议) | **最初发布**: 2023-01-15

## 一、软件简介与核心规格
自己搭建节点拥有独立纯净的公网 IP，完全告别共享机场的拥堵和封锁风险。本教程以开源免客户端且集合主流一键脚本的 Web SSH 工具 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 为例进行操作演示，同时优先推荐用户在日常运维中使用 PuTTY 等本地专业 SSH 工具（由于网页中转服务资源有限）。搭配 Akile 等高性价比海外 VPS 与主流开源一键脚本（如 3X-UI 面板、sing-box、Hysteria 2 等），在十几分钟内从零构建专属节点。教程中同时提示主流一键脚本普遍内置类似 BBR 的拥塞控制算法，并深入解析 Reality 协议无域名的易阻断风险。

### 规格参数
- **支持架构**: x86_64 (amd64), aarch64 (arm64)
- **系统要求**: Linux (Debian 11/12, Ubuntu 20.04/22.04/24.04, CentOS/AlmaLinux)
- **底层引擎**: Xray-core / sing-box / Hysteria 2 / 3X-UI 面板
- **流量接管模式**: VPS 原生入站监听 / 多协议端口分流 / 反向代理
- **支持协议**: VLESS (Reality / 独立域名), Hysteria 2, TUIC v5, VMess, Trojan, Shadowsocks

---

## 二、标准操作步骤指南

### 步骤 1：使用 SSH 工具连接 VPS 服务器（以 不想搭梯 为例）
连接海外服务器有两种常用方式：

1. **优先推荐本地 SSH 工具**：日常运维中强烈建议优先使用 **PuTTY**、Termius、FinalShell 或本地系统原生终端（PowerShell / Terminal）。因为网页版 Web SSH 的公共中转服务资源有限，高并发或弱网下可能受限，而本地 SSH 工具具备极佳的稳定性、更低的延迟且完全直连无中转瓶颈。

2. **以开源** [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) **为例演示**：为了让新手无需繁琐安装软件即可快速上手，本步骤以开源 Web SSH 工具 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 为例操作。它完全开源透明、免本地安装，同时深度聚合了社区主流的一键脚本库，非常方便一键连接与选取脚本：
   - 浏览器打开 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw)；
   - 输入 VPS 的 IP、端口（默认 22）、用户名 root 及登录密码；
   - 点击一键连接即可在网页中唤出 Linux 终端。

```bash
# 优先推荐使用 PuTTY 或在本地终端执行标准 SSH 直连命令：
ssh root@你的VPS_IP -p 22

# 亦可直接在浏览器中访问开源 不想搭梯 免安装连接（内置聚合脚本）：
# https://bxdt.sld.tw
# 提示：不想搭梯适合快速搭建与测试，但公共中转服务资源有限，日常推荐使用本地 SSH 工具
```
> ✏️ **铅笔提示**: [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 代码开源且深度整合一键脚本，上手极快；但由于其中转服务资源有限，日常高频维护优先建议使用 PuTTY 等本地客户端工具。

### 步骤 2：系统环境更新与 BBR 拥塞控制算法说明
登录 VPS 后，建议先更新 Linux 软件包。在网络加速方面需注意：**主流的自建节点一键安装脚本（如 3X-UI、各主流多合一脚本）内部通常已经内置了类似 Google BBR 这样的 TCP 拥塞控制算法**，在后续运行一键脚本时通常会自动开启或弹出提示供你一键启用，无需提前重复配置。如果你希望在安装前手动确保 BBR 开启，亦可执行以下命令：

```bash
# 1. 更新系统软件包基础依赖
apt update -y && apt upgrade -y && apt install -y curl wget socat tar

# 2. 手动开启原生 BBR 拥塞控制算法（若使用的一键脚本已内置开启，可跳过此步）
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p

# 3. 验证 BBR 是否成功生效
sysctl net.ipv4.tcp_congestion_control
# 输出显示 net.ipv4.tcp_congestion_control = bbr 即代表成功
```
> ✏️ **铅笔提示**: 💡 重点提示：主流一键脚本普遍内置了类似 BBR 这样的拥塞控制算法，在脚本菜单中按提示回车启用即可，无需繁琐的手动配置。

### 步骤 3：运行一键脚本搭建节点服务（以 3X-UI 可视化面板为例）
在终端中执行当前社区维护最活跃的 3X-UI 多协议管理面板官方一键安装脚本（如果在 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 中，可在其内置聚合脚本列表中一键点击运行；脚本内已集成环境依赖与 BBR 优化，支持 VLESS、VMess、Trojan、Shadowsocks 等协议，自带中文可视化 Web 界面）：

```bash
# 运行 3X-UI 官方一键安装脚本（或在 不想搭梯 脚本库中选用）：
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)

# 根据终端提示自定义设置：
# 1. 设置 Web 后台登录账号与密码（务必牢记）
# 2. 设置面板访问端口（如 2053 或自定义高位端口）
# 3. 脚本如提示是否启用 BBR 加速，输入 y 确认开启即可
```
> ✏️ **铅笔提示**: 主流一键脚本集成了依赖安装、面板管理与 BBR 拥塞控制算法优化，跟随中文终端提示操作即可完成搭建。

### 步骤 4：登录 Web 面板配置节点（⚠️ 提示 Reality 协议无域名易被阻断）
在浏览器打开 `http://你的VPS_IP:设置的端口`，输入刚才设定的账号密码登录 3X-UI 面板。进入「入站列表」-> 点击「添加入站」：

1. 协议选择：选择 vless（或根据需求选择 hysteria2 等）
2. 监听端口：推荐填写 443（伪装标准 HTTPS 流量）
3. 传输配置：若选择 Reality 传输，目标网站 (Dest) 可填入海外大厂域名（如 itunes.apple.com:443 或 www.microsoft.com:443）借用证书。
4. ⚠️ 风险提示：Reality 协议由于「无独立域名」（借用大厂证书与 SNI 伪装），其 VPS 真实 IP 与借用域名的官方 IP 并不相符。防火墙通过反向主动探测、TLS 握手校验或 SNI 域名阻断策略，能够轻易识别出异常流量。因此 Reality 协议无域名存在易被阻断的风险！长期稳定使用强烈建议自备独立域名并申请正规 TLS 证书，或搭配 Hysteria 2 协议备用。
5. 点击保存后，在入站行右侧点击「二维码」或「复制链接」即可获取节点链接。

```text
# 节点链接示例 (复制后可直接导入各客户端)：
vless://uuid-key@你的VPS_IP:443?security=reality&encryption=none&pbk=公钥&headerType=none&fp=chrome&spx=%2F&type=tcp&sni=itunes.apple.com#Akile-My-VLESS-Reality
```
> ✏️ **铅笔提示**: ⚠️ 重点提示：Reality 协议虽免去购买域名的麻烦，但「无域名易被阻断」！追求长期稳定的主力节点，建议自备域名配置独立 TLS，或使用 Hysteria 2 作为互备。

### 步骤 5：将自建节点导入客户端并开启代理测试
复制刚才生成的节点链接，打开你在对应设备上安装好的客户端（iOS 上的 Shadowrocket/Karing、Windows 上的 Clash Verge Rev/v2rayN、Android 上的 v2rayNG/FlClash、macOS 上的 Clash Verge 等）。在客户端中点击「从剪贴板导入」，选择刚添加的自建节点并连接，打开浏览器访问 ipinfo.io 检查公网 IP 是否已经成功变更为你的 VPS 地址。

```bash
# 终端测试连通性与代理状态：
curl -I --socks5 127.0.0.1:7890 https://www.google.com
```
> ✏️ **铅笔提示**: 自建节点独享 VPS 带宽与原生纯净 IP，非常适合用于流媒体解锁、AI 工具访问与跨境学习。


---

## 三、进阶分流与防泄露建议
1. 优先推荐本地 SSH 工具：日常运维建议使用 PuTTY、Termius、FinalShell 等本地客户端直连 VPS。虽然 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 开源免安装且聚合脚本很方便，但其中转服务资源有限，本地工具更稳定且无公共中转负担。
2. 警惕 Reality 协议「无域名易被阻断」风险：Reality 借用第三方 SNI 无需自备域名，但在部分网络环境或敏感时期极易被防火墙主动探测识别并阻断。追求长期高稳定性的用户，强烈建议自备域名配置标准 TLS 证书，或同时部署基于 UDP 的 Hysteria 2 / TUIC v5 协议作为备选互补方案。
3. 一键脚本通常内置 BBR 拥塞控制算法：绝大多数主流一键安装脚本（3X-UI、各开源多合一脚本）均已内置 Google BBR 开启功能，安装过程中跟随提示启用即可，能够有效降低跨境长途高延迟网络中的丢包率并提高吞吐速度。
4. 服务器安全加固：建议在 VPS 上修改默认 SSH 端口（如将 22 改为 28822），关闭 root 密码登录改用 SSH 密钥，并安装 fail2ban（apt install -y fail2ban）防止恶意端口暴力破解。
5. 云厂商安全组放行：若在 Akile 或其他云后台绑定了安全组防火墙，务必在控制台中放行你所配置的节点端口（例如 443 TCP/UDP、Web 面板端口等），否则客户端将显示超时连接失败。

---

## 四、常见问题与避坑 FAQ
#### Q: 连接 VPS 应该用本地 SSH 工具（如 PuTTY）还是 [![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw)？
**A**: 优先推荐使用 PuTTY、Termius、FinalShell 或本地系统原生终端等本地 SSH 工具。原因在于：[![不想搭梯](/bxdt-icon.png) 不想搭梯](https://bxdt.sld.tw) 是一个完全开源透明且聚合了一键脚本的优秀工具，省去了安装客户端的步骤，非常适合新手首次搭建与快速测试；但由于其中转服务资源有限，且在浏览器标签页后台休眠时容易断连，因此不建议长期作为高频运维工具。日常运维建议使用 PuTTY 等本地客户端直连 VPS，体验更稳定流畅。

#### Q: 搭建节点需要单独配置 BBR 加速吗？一键脚本里有吗？
**A**: 目前绝大多数主流的自建节点一键脚本（如 3X-UI、x-ui 面板、各类 Sing-box/Xray 多合一脚本）内部通常都已经内置了类似 Google BBR 这样的 TCP 拥塞控制算法优化。在运行一键安装脚本时，脚本通常会自动检测并在终端中提示是否开启 BBR，用户直接根据提示输入 y 或回车启用即可，无需繁琐地手动修改系统内核参数。

#### Q: 为什么提示 Reality 协议「无域名易被阻断」？
**A**: Reality 协议虽然通过偷取第三方合规网站（如苹果、微软等大厂）的证书和 SNI 实现了免自备域名伪装，但因为你的 VPS IP 并不是该大厂域名的真实官方解析 IP，防火墙能够利用反向主动探测、SNI 域名与 IP 白名单比对、握手特征审查等手段发现端倪，因此无域名 Reality 协议在遭遇严管或特定敏感期时极易被阻断端口甚至 IP。如果需要长期稳定可靠的节点，建议购买自己的域名配置正规 TLS/gRPC 伪装，或者备用 Hysteria 2 等抗封锁协议。

#### Q: VPS 服务器买哪家比较合适？配置需要多高？
**A**: 个人自建节点对 CPU 和内存要求极低，1核 CPU、512MB 或 1GB 内存即可轻松跑满千兆带宽。推荐点击右上角「Akile」购买服务器，不仅性价比高，还针对国内三大运营商提供了多种线路优化机房（如香港、日本、新加坡、美西等），开箱即用。

#### Q: 为什么搭建完成后客户端连接显示超时（Timeout）？
**A**: 请按以下三步排查：1. 检查 VPS 云厂商后台的「防火墙 / 安全组」规则，是否放行了节点使用的端口（TCP 和 UDP）；2. 检查 Linux 系统内置防火墙（执行 ufw disable 或 iptables -P INPUT ACCEPT 测试）；3. 使用 ping.pe 检测该 VPS 的 IP 是否已被阻断，如已被阻断可在 Akile 控制台快速更换 IP。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-04-12 | NodeMaster | #111 | 为不想搭梯添加网站图标并在教程所有提及处统一展示格式；保持PuTTY等本地工具优先推荐与BBR、Reality技术提示 | `d3a7e41` |
| 2026-04-12 | NodeMaster | #110 | 以开源不想搭梯为实例演示连接并说明内置脚本便利性，同时优先推荐PuTTY等本地工具说明中转资源限制；补充BBR内置与Reality无域名阻断提示 | `c9f13e2` |
| 2026-04-12 | NodeMaster | #108 | 替换 dae 为自己搭建节点完整图文教程，涵盖 SSH 工具、Akile 服务器与主流一键脚本 | `a7c92e1` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
