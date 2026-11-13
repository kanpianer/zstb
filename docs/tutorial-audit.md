# 软件教程准确性核查

核查日期：**2026-11-13**。

## 范围与方法

仓库固定20个教程条目，本次核查 **19篇软件教程**，明确排除 VPS 自建教程。按软件身份、发行渠道、系统要求、许可证、版本、订阅格式、操作步骤、权限与流量接管边界交叉核对官方资料。各篇教程正文的进阶说明提供可点击的原始来源。

版本号是本次抓取官方 Releases / App Store 得到的快照，不保证未来仍为最新。无法验证的首次发版时间、菜单细节、隐私与性能承诺不再当成确定事实。不能把内核支持某协议直接等同于任意客户端版本都支持；不能把系统代理或 VPN 开关等同于所有流量、所有应用均已代理。

## 逐篇覆盖清单

| 平台 | 教程 | 核查记录 |
| --- | --- | --- |
| iOS | Shadowrocket、Clash、sing-box、Karing | [Apple / sing-box 核查](<tutorial-audit-apple-singbox.md>) |
| macOS | Clash、sing-box | [Apple / sing-box 核查](<tutorial-audit-apple-singbox.md>) |
| Android | sing-box | [Apple / sing-box 核查](<tutorial-audit-apple-singbox.md>) |
| Windows | sing-box | [Apple / sing-box 核查](<tutorial-audit-apple-singbox.md>) |
| macOS | Clash Verge Rev、Clash Party | [Mihomo / Android 核查](<tutorial-audit-mihomo-android.md>) |
| Windows | Clash Verge Rev、Clash Party | [Mihomo / Android 核查](<tutorial-audit-mihomo-android.md>) |
| Linux | Clash Verge Rev | [Mihomo / Android 核查](<tutorial-audit-mihomo-android.md>) |
| Android | FlClash、NekoBox、v2rayNG | [Mihomo / Android 核查](<tutorial-audit-mihomo-android.md>) |
| Windows | v2rayN | [网络客户端核查](<tutorial-audit-network-clients.md>) |
| Linux / OpenWrt | v2rayA、OpenClash | [网络客户端核查](<tutorial-audit-network-clients.md>) |

## 重要修正

- 重新核对 Apple 上名为 Clash 的具体项目身份，避免与历史 Clash 客户端混称。
- 按 sing-box 官方当前平台发行说明区分 GUI、移动端与 CLI，纠正订阅 URL、完整 JSON 配置和节点分享链接之间的混用，补充配置校验与版本迁移要求。
- 更新桌面与 Android 客户端的当前发行包、架构及权限说明，移除不可靠的菜单、协议和性能描述；明确 NekoBox 的维护及商店渠道警告。
- v2rayN 改用当前 Windows 发行包名称，删除统一强制安装 .NET 8 的结论，区分系统代理与 TUN。
- v2rayA 按 2.5 系列使用同版本 v2raya_core，改用官方当前文档，停止把已经停放的旧域名当官网；补充面板初始化与访问控制风险。
- OpenClash 的插件许可证改为 MIT，区分 opkg/apk 与 fw3/fw4 依赖，不再硬编码旧安装包；移除 DNS 绝对安全和分载必然提速的承诺。
- 教程更新路径指向实际 TypeScript 源文件；不为本次编辑伪造 PR 或提交 hash。

## 内容生效与保留范围

当前 [静态内容入口](<../public/content/site-content.json>) 为 `null`，站点使用内置 TypeScript 教程，因此本次源文件修订会随现有构建部署生效。若管理员之后发布完整 CMS JSON，JSON 会覆盖内置教程，需要同步维护。浏览器已应用的本地 CMS 预览也应退出后才能看到部署内容。

开始任务时仓库已有 README、CMS、界面、类型及 VPS 教程的未提交修改。本次仅编辑非 VPS 教程并新增核查报告、回归测试，没有回退这些已有改动；Git diff 中的 VPS 改动属于任务开始前状态。

## 验证边界

这是**基于官方文档、发行元数据和源代码的准确性核查**，并非19种系统/客户端组合的实机安装与网络连通性认证。没有使用用户订阅凭证、付费节点，也没有执行教程中的代理安装、防火墙或系统配置命令。

搜索服务本次返回 HTTP 402；核查改用可访问的官方原始文件、GitHub API、官方文档及 App Store 资料。失败 URL 不作为证据。各分报告保留来源、相互冲突的资料与未确认事项。

自动测试覆盖条目数量/稳定ID、核查日期、实际更新路径、来源可追溯性、顺序步骤和关键安装事实；事实是否仍有效需要未来重新访问官方来源，测试本身不能替代事实核查。

本次验证结果：

- `npm test`：33 项通过，0 项失败（包括原有 CMS、富文本及 VPS 回归测试）。
- `npm run build`：TypeScript 与 Vite 生产构建通过。
- `git diff --check`：通过。

未执行全平台实机安装、节点连通性测试或线上部署。
