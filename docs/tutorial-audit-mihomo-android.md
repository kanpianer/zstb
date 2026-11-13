# Mihomo 桌面与 Android 教程核查报告

## 范围、时间与方法

- 核查日期：2026-11-13（会话时区 America/Los_Angeles；网络抓取发生于本次会话）。只修改下列 8 篇教程；本报告为单份研究记录。
- 实际调用了 `web_search`，返回 HTTP 402 Insufficient Balance，没有产生可用搜索证据。随后使用 `web_fetch` 直接读取官方文档、GitHub 原始源码和 GitHub 官方 API。没有将搜索失败描述为核查成功。
- 以下版本与日期均为官方 `releases/latest` 接口本次实际响应；不是猜测的“2026 最新版”。接口随时间变化，教程明确写出快照日期并要求以发布页为准。没有确认每个项目的真正首发日，统一改为“未独立核实，以官方发布记录为准”；仓库创建日不能充当首发日。
- 没有安装这些客户端、实际访问设备菜单或做端到端代理测试。步骤按核实的功能流程编写，不虚构按钮位置、颜色、性能或成功率。不把开源或免服务模式等同无风险。
- 已读本地类型与渲染代码：[类型定义](../src/types/tutorial.ts)、[富文本渲染器](../src/components/TutorialDetailView.tsx#L39-L100)、[advancedRules 渲染](../src/components/TutorialDetailView.tsx#L525-L534)。现有字符串支持 Markdown 链接，因此逐篇证据放入 overview / advancedRules，无需改 schema 或 UI。
- 8 篇均保留原 id、导出变量与 SoftwareTool 类型；updatePath 改为实际 src/data/tutorials 路径；删除无法验证的虚构作者、PR 和 commitHash，changelog 保留为空数组，不编造新的提交记录。

## 共同证据与边界

1. [Mihomo 官方 README](https://raw.githubusercontent.com/MetaCubeX/mihomo/Meta/README.md)列出多协议、规则与配置文档；[官方配置原始示例](https://raw.githubusercontent.com/MetaCubeX/mihomo/Meta/docs/config.yaml)实际包含 VLESS/REALITY、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC、WireGuard 及 TUN、DNS、排除路由等配置。教程将这些作为内核能力而不是所有 GUI 控件/旧内核必然支持的承诺。
2. [Verge 官方快速入门](https://www.clashverge.dev/guide/quickstart.html)区分修改操作系统代理设置的系统代理与虚拟网卡 TUN。系统代理要求应用主动遵循；TUN 仍受路由与排除规则限制，不承诺 WSL、Docker、虚拟机和所有游戏都自动接管。
3. [Android 官方 VPN 平台文档](https://developer.android.com/develop/connectivity/vpn)是 VPN 授权与虚拟接口机制来源。抓取页面正文被导航截断，因此本报告不据此声称测试过具体客户端实现或所有设备限制。Android 教程均明确 VPN 图标只说明服务建立，不证明节点、DNS 或分流有效。
4. 安装校验、凭据保密、排错顺序属于教程的安全建议，不声称为客户端实测结论。没有保留第三方机场营销链接或真实性无法核查的示例订阅。

## 逐篇记录

### 1. Clash Verge Rev / macOS

文件：[clash-verge-rev-mac.ts](../src/data/tutorials/macos/clash-verge-rev-mac.ts)。核查：2026-11-13。

- [官方发布接口](https://api.github.com/repos/clash-verge-rev/clash-verge-rev/releases/latest)：v2.5.10，published_at 为 2026-11-03T10:04:21Z，非预发行；包含 aarch64.dmg 和 x64.dmg，不是单一 Universal 包。
- [仓库 API](https://api.github.com/repos/clash-verge-rev/clash-verge-rev)：archived=false，仍有推送与发布活动；[README](https://raw.githubusercontent.com/clash-verge-rev/clash-verge-rev/main/README.md)说明延续 Clash Verge、Tauri、Mihomo、系统代理/TUN、Merge/Script 与 GPL-3.0。
- **来源冲突**：[当前安装文档](https://www.clashverge.dev/install.html)要求 macOS 12+，明确对 macOS 11 提到替换兼容 Go 构建内核的额外措施；README 仍写 11+。教程选择当前安装文档，并如实标注冲突，不将旧系统补救视作无条件支持。
- 改动：区分系统代理和 TUN，移除辅助功能权限混淆、“无死角”“终端自动全部代理”、指定固定更新间隔等未经确认说法；不建议关闭 Gatekeeper。
- 限制：未运行 macOS 安装或确认每个版本菜单；协议按所装 Mihomo 与实际配置而定。

### 2. Clash Verge Rev / Windows

文件：[clash-verge-rev-win.ts](../src/data/tutorials/windows/clash-verge-rev-win.ts)。核查：2026-11-13。

- [同一官方发布接口](https://api.github.com/repos/clash-verge-rev/clash-verge-rev/releases/latest)确认 v2.5.10，以及 x64-setup.exe、arm64-setup.exe 与内置 WebView2 资产。
- [安装文档](https://www.clashverge.dev/install.html)说明 Windows 7 不再支持，Win10/11、WebView2 与架构选择；README 的旧 x86 支持概括不覆盖当前发布资产，应以当前资产为准。
- [快速入门](https://www.clashverge.dev/guide/quickstart.html)确认配置导入、节点/模式选择、系统代理与 TUN 两条路径；GPL 与维护来源同上。
- 改动：移除 Tauri 必然比 Electron 省内存的未实测比较、绕过 Defender 建议和“全部流量无遗漏”承诺；增加服务/权限与回退排错。
- 限制：未实测 WebView2 故障或 Windows ARM 环境；WSL、容器并不据本教程保证接管。

### 3. Clash Verge Rev / Linux

文件：[clash-verge-rev-linux.ts](../src/data/tutorials/linux/clash-verge-rev-linux.ts)。核查：2026-11-13。

- [v2.5.10 发布接口](https://api.github.com/repos/clash-verge-rev/clash-verge-rev/releases/latest)实际发布 DEB/RPM 的 x64、ARM64、ARMv7 包，本次资产未见 AppImage，因此移除原来宣称完整 AppImage 支持的下载步骤。
- [安装文档](https://www.clashverge.dev/install.html)提供 apt/dnf 和 AUR 路径；教程区分官方 Releases 与需自行审核的社区打包，不把 AUR 等同官方资产。
- [Linux 官方 FAQ](https://www.clashverge.dev/faq/linux.html)明确 GUI 环境必需；Ubuntu 20.04 有 WebKitGTK / JavaScriptCoreGTK 依赖问题并建议升级 24.04。原来给出一长串发行版最低版本且承诺开箱即用没有充分依据，已改为依赖按包核对。
- 改动：删掉对猜测旧路径执行 setcap 的命令；不建议 root 常驻 GUI。终端可以显式设置本地代理或使用 TUN，不把 GUI 系统代理简化成“环境变量机制”。
- 限制：未验证各发行版安装与桌面托盘；没有把任意内核路径写成事实。

### 4. Clash Party / macOS

文件：[clash-party-mac.ts](../src/data/tutorials/macos/clash-party-mac.ts)。核查：2026-11-13。

- [仓库 API](https://api.github.com/repos/mihomo-party-org/clash-party)返回当前名称 clash-party、默认分支 smart_core、主页 clashparty.org、archived=false，2026-11-12 仍有推送。
- [旧 main README](https://raw.githubusercontent.com/mihomo-party-org/clash-party/main/README.md)保留 Mihomo Party 名称与 mihomo.party；[当前 smart_core README](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/README.md)、[构建配置 productName](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/electron-builder.yml)和[官网](https://clashparty.org)使用 Clash Party。mihomo.party 抓取返回跨域跳转到 clashparty.org。证据支持同一项目名称演进与旧名残留，不支持编造确切改名日期。
- [发布接口](https://api.github.com/repos/mihomo-party-org/clash-party/releases/latest)：v2.0.4，published_at 2026-10-18T12:17:04Z，非预发行，macOS 资产实际为 arm64/x64 的 PKG（也有 catalina 命名包与旧名前缀）。[构建配置](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/electron-builder.yml)亦为 pkg；[安装文档源码](https://raw.githubusercontent.com/mihomo-party-org/mihomo-party-docs/master/pages/docs/install.mdx)仍写 DMG，教程明确此差异，采用当前资产。
- [GPL 原始许可证](https://raw.githubusercontent.com/mihomo-party-org/clash-party/main/LICENSE)确认 GPL-3.0；README 证实 Sub-Store、WebDAV、覆写、Smart/Mihomo 内核，但不支持自动最优、零冲突等效果保证。
- [macOS 官方排错文档](https://clashparty.org/docs/issues/macos)列出 party.mihomo.helper LaunchDaemon、PrivilegedHelperTools 与服务日志。故即使 README 宣传“无需服务模式”，也不能写成没有特权 Helper、无需权限。
- 改动：修复 PKG 路径与安装方式，删掉美学营销、免权限、性能承诺；系统最低版本未独立确认，撤销原来无来源的 macOS 12.0 断言。
- 限制：未执行 PKG、未核实 Catalina 包完整兼容范围；不从文件名推断最低系统版本。

### 5. Clash Party / Windows

文件：[clash-party-win.ts](../src/data/tutorials/windows/clash-party-win.ts)。核查：2026-11-13。

- 名称、维护、许可证、内核来源同上；[官方发布接口](https://api.github.com/repos/mihomo-party-org/clash-party/releases/latest)为 v2.0.4；[安装文档](https://clashparty.org/docs/install)及[构建配置](https://raw.githubusercontent.com/mihomo-party-org/clash-party/smart_core/electron-builder.yml)确认 setup.exe / 7z 与带版本号的文件命名。
- [官方快速上手](https://clashparty.org/docs/handson)确认导入订阅、节点与模式功能；文档主要通过图片说明，本次未据此虚构“首页启动大开关”等精确控件位置。
- 改动：通用节点订阅不等于完整 Clash YAML；Sub-Store 转换需信任实例；移除“完全没有安全隐患”“全局拦截所有流量”“自动分流编排”等断言。
- 限制：Windows 10/11 使用范围不应被理解成测试过所有系统小版本；TUN 实际权限和行为仍按版本、系统授权与日志核对。

### 6. FlClash / Android

文件：[flclash.ts](../src/data/tutorials/android/flclash.ts)。核查：2026-11-13。

- [README](https://raw.githubusercontent.com/chen08209/FlClash/main/README.md)确认 Flutter / Mihomo、多平台、URL/文件配置导入、策略组、Android 分应用、GPL-3.0 与官网下载来源。
- [仓库 API](https://api.github.com/repos/chen08209/FlClash)为非归档并有近期活动；[发布接口](https://api.github.com/repos/chen08209/FlClash/releases/latest)返回 v0.9.3，published_at 2026-11-04T07:54:38Z，有 arm64-v8a、armeabi-v7a、x86_64 APK 与 SHA256SUMS。
- [v0.9.3 Gradle 原始配置](https://raw.githubusercontent.com/chen08209/FlClash/v0.9.3/android/app/build.gradle.kts)使用 flutter.minSdkVersion，而非固定写死 Android 7.0。本次没有进一步解析 Flutter SDK 最终值，所以系统要求明确待按该 APK 核实，不能把猜测改成另一个精确数字。
- 改动：补齐 x86_64；移除颜值最高、动画更流畅等比较；避免未经验证的固定导航布局；强调 VPN、应用范围与完整配置兼容性。
- 限制：没有实际安装手机 APK 或检查最终 merged manifest；Mihomo 协议能力仍以内置版本为准。

### 7. NekoBox for Android

文件：[nekobox-android.ts](../src/data/tutorials/android/nekobox-android.ts)。核查：2026-11-13。

- [官方 README](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/README.md)直接警告 Google Play 版本自 2024 年 5 月起被第三方控制且非开源，不要下载；官方渠道为此仓库 Releases，不能将商店同名包作官方开源版。
- README 列出 SOCKS、HTTP(S)、SSH、SS、VMess、Trojan、VLESS、AnyTLS、ShadowTLS、TUIC、Hysteria 1/2、WireGuard；Trojan-Go、NaïveProxy、Mieru 注明插件依赖。删掉原教程“无需额外插件即可完整协议支持”。
- README 明确 ClashMeta / v2rayN 等订阅与 sing-box 出站**仅解析节点，分流规则忽略**；不再宣称完整规则配置可直接迁移。
- [官方 latest 接口](https://api.github.com/repos/MatsuriDayo/NekoBoxForAndroid/releases/latest)为 1.4.2，published_at 2026-02-09T03:55:00Z，核心 1.12.19-neko-1；发布说明原文称“较少维护，不接受功能请求，非重大 BUG 可能不会修复”，并说明不受 sing-box 社区支持。这个比仅看 archived=false 更能说明真实维护状态。
- [仓库 API](https://api.github.com/repos/MatsuriDayo/NekoBoxForAndroid)返回 archived=false，但并不据此称积极维护；[Helpers.kt](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/buildSrc/src/main/kotlin/Helpers.kt)确认 minSdk21 和四种架构；[许可证](https://raw.githubusercontent.com/MatsuriDayo/NekoBoxForAndroid/main/LICENSE)为 GPL v3 or later（API 自动识别为 Other 不能替代阅读原文）。
- 改动：Android 5.0+、四架构、NekoBox-1.4.2-* 实际文件名、商店警告、维护限制、插件要求；移除“正统继承者”、最快节点、盲目调跳跃频率等。
- 限制：API21 是应用构建下限，不保证每个核心/插件都能在所有旧系统运行。

### 8. v2rayNG / Android

文件：[v2rayng.ts](../src/data/tutorials/android/v2rayng.ts)。核查：2026-11-13。

- [README](https://raw.githubusercontent.com/2dust/v2rayNG/master/README.md)说明 Xray / v2fly 支持、官方 Releases、Geo 数据与 GPG 核验；[GPL 原文](https://raw.githubusercontent.com/2dust/v2rayNG/master/LICENSE)确认项目许可证，不与 Xray 自身 MPL-2.0 混淆。
- [latest 接口](https://api.github.com/repos/2dust/v2rayNG/releases/latest)：2.3.15，published_at 2026-11-01T06:59:32Z；发布说明明确更新 Xray-core v26.10.31、迁移 Compose UI 与支持 v2rayn://；包包含普通和 fdroid flavor、不同 ABI 与 universal，以及签名文件。没有凭空称所有商店未上架。
- [2.3.15 构建配置](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/build.gradle.kts)确认 minSdk24（Android 7.0）、四 ABI/universal 与 flavor；不是原教程的 Android 5.0。master 的 versionName 已为 2.4.0，不能拿开发版本当本次最新正式发行。
- [**2.3.15 CoreOutboundBuilder**](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/src/main/java/com/v2ray/ang/core/CoreOutboundBuilder.kt)明确有 VMess、Shadowsocks、SOCKS、VLESS、Trojan、WireGuard、HTTP、Hysteria2 转换器；包括 REALITY 参数、Vision flow、XHTTP、Hysteria version=2 与相关传输字段。因此不能套用旧知识说 Xray/v2rayNG 不支持 Hysteria2、WireGuard 或 XHTTP。教程限定到所核对版本，不推断 TUIC、旧版或所有扩展支持。
- [**2.3.15 AngConfigManager**](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/src/main/java/com/v2ray/ang/handler/AngConfigManager.kt)实际解析 URI / Base64 节点列表、v2rayn://、完整自定义 Xray JSON 和 WireGuard 配置；未据此承诺 Clash YAML / sing-box 完整配置兼容。
- [2.3.15 CoreConfigManager](https://raw.githubusercontent.com/2dust/v2rayNG/2.3.15/V2rayNG/app/src/main/java/com/v2ray/ang/core/CoreConfigManager.kt)区分 VPN、Hev、root 与本地代理配置路径；教程不把“启动本地监听”与“VPN 接管”混为一谈。
- 改动：保留已证实协议并新增有证据的 Hysteria2，纠正系统下限与导入格式，去除菜单坐标、固定测试 Google、按钮颜色代表成功、省电与定位不受影响等承诺；后台断开给出多原因排查。
- 限制：没有运行节点、校验具体二进制内置依赖或做各协议握手实验；源码生成支持不等于任意服务端参数都可用。

## 验证与遗留

- 已完成 8 篇数据对象结构检查：id、导出名不变，步骤编号连续，updatePath 指向自身，源码仍符合 SoftwareTool 字段形状，证据使用渲染器已支持的 Markdown 链接。
- 原项目工作树另有用户/其他代理改动，本次不覆盖它们；不修改 VPS、schema、UI、脚本或其他教程。
- 本次仅进行内容与静态验证，不将构建成功等同外部客户端实机功能验证。系统最低版本尚无法独立确认的 FlClash / Party Mac 已在教程与本报告明确保留限制，不用营销或推测填空。
