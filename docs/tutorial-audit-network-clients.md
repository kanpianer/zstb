# v2rayN / v2rayA / OpenClash 核查记录

核查日期：2026-11-13。范围为3篇客户端教程，不包含 VPS 自建教程。采用官方源文件、Wiki、许可证与 GitHub Releases API；没有在用户机器上安装代理、修改防火墙或实际连接付费节点。

## v2rayN（Windows）

- [官方 README](https://github.com/2dust/v2rayN/blob/master/README.md) 表明其已是 Windows/Linux/macOS 桌面客户端，并非 Windows 独占。
- [发布文件介绍](https://github.com/2dust/v2rayN/wiki/Release-files-introduction) 和 [7.25.6 发布](https://github.com/2dust/v2rayN/releases/tag/7.25.6) 确认 Windows 10+、WPF/Avalonia 包及架构差异，当前下载不再使用旧 `With-Core.zip` 名称。Releases API 核查到版本 7.25.6，发布于 2026-10-11。
- [系统代理和路由](https://github.com/2dust/v2rayN/wiki/Description-of-system-proxy-routing) 明确系统代理只转发遵循设置的部分应用，路由是流量进入核心后的分流过程。修正“一键全系统接管”暗示。
- [FAQ](https://github.com/2dust/v2rayN/wiki/Faq) 说明启动失败/核心失败需查日志、配置与端口，不能断定都缺 .NET 8；代理游戏不等于游戏加速。删除固定快捷键、托盘颜色和“最低延迟最优”的无条件判断。
- 发布说明明确 sing-box 1.14 兼容范围，增加客户端与内核配套升级提醒。
- [许可证](https://github.com/2dust/v2rayN/blob/master/LICENSE) 确认 GPL v3。首次发版日期没有足够证据，不沿用原来的精确日期。

## v2rayA（Linux）

- 最初抓取 `master` 得到旧 README；[当前 main README](https://github.com/v2rayA/v2rayA/blob/main/README.md) 与 [v2.5.15 固定版本 README](https://github.com/v2rayA/v2rayA/blob/v2.5.15/README.md) 均确认当前安装路线。避免把旧分支文档套到新版本。
- [v2.5.15 发布](https://github.com/v2rayA/v2rayA/releases/tag/v2.5.15)（2026-11-13 UTC）含移除停放域名 `v2raya.org` 的修正，因此软件主页按钮改为官方仓库文档，不继续信任旧域名。
- 当前服务要求同版本 `v2raya_core`（Xray 派生，MPL-2.0），程序为 AGPL-3.0-only。安装包配套提供二者，不能再按旧文案随意选择独立 V2Ray/Xray。
- 官方 README 为 APT 3.0+ 提供 `.sources`，较早版本使用 `.list`。教程给出有条件的旧 APT 示例与新 APT 文档指引，替换未经确认的管道一键脚本。
- 同一文档确认默认 `0.0.0.0:2017`、首次注册即管理员、本地应用代理端口 20170/20171/20172、root/防火墙/TUN/iproute2 条件。加入初始化前访问控制、凭据保护与恢复步骤。
- 同一文档说明 OpenWrt feed 仍可能为 2.2.7.x，Docker bridge 不支持同样的透明代理；删除所有容器与 LAN 设备“自动透明代理”的承诺。
- 当前协议列表据 README 更新，SSR 已不在支持范围；升级前备份、2.4 之前数据库迁移和重新注册风险均按官方说明补充。首次发布日期未核实，不填造精确值。

## OpenClash（OpenWrt）

- [当前 README](https://github.com/vernesong/OpenClash/blob/master/README.md) 与 [LICENSE](https://github.com/vernesong/OpenClash/blob/master/LICENSE) 明确插件为 MIT，而不是原文 GPL-3.0；内核许可证另计。
- [v0.48.002 发布](https://github.com/vernesong/OpenClash/releases/tag/v0.48.002) 核实版本、2026-10-12 发布日期，以及 `.ipk`/`.apk` 资产。删除教程硬编码的旧版 0.46.070 下载命令。
- README/发布说明按 opkg/apk 与 iptables/nftables 提供不同依赖。原教程遗漏 ruby、ruby-yaml 等且未区分 fw4，改为明确依赖选择与官方安装指引。不在本机实际执行路由器安装命令。
- [官方模式与流量控制手册](https://github.com/vernesong/OpenClash/blob/dev/.github/skills/openclash-user-guide/08-settings-mode-traffic.md) 区分 fake-ip/redir-host DNS 与 REDIRECT/TPROXY/TUN 转发；“仅允许常用端口”不是 Fake-IP DNS 修复。教程按实际概念重写。
- 手册的流量分载测试有明确环境限制，不能扩展为开启分载必然大幅降低任意设备 CPU 或达到数千兆。删除该建议及“彻底杜绝 DNS 泄漏”承诺。
- 官方发布说明确认内核单独下载、架构选择与 `clash_meta` 路径；教程增加安装后配置校验、逐项测试与调试日志收集。
- 首次发布日期只保留可证明的 2019 年版权记录，不再填未经确认的具体日。

## 通用处理与限制

- 以上三篇原有的“首次更新”记录带有未能追溯的作者、PR 和提交 hash，本次移除，设为空历史；不伪造本次审校 PR/commit。
- 所有 `updatePath` 指回真实 TypeScript 源文件。
- 版本是核查时快照，不构成未来持续为最新的承诺。在线页面可变，后续升级需重新核对发布说明。
- Web search 服务返回 HTTP 402；直接抓取官方原始资料正常。部分旧 URL 返回 404 或域名无法访问，不以失败页面作事实证据。
- 此次为文档/源代码交叉核查，不是所有平台和网络环境的实机兼容认证。菜单因版本/语言变化可能不同；无法证实的细节已删除或明确标注。
