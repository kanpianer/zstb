# Apple 与 sing-box 八篇教程核查

检索日期：**2026-11-13**。范围恰为 8 篇（iOS 4 + macOS 2 + Android 1 + Windows 1），不是 9 篇。本次仅修改这些教程并新增本报告；其他工作区已有改动不属于本子任务。

## 方法、限制与渲染核查

- 先读取八篇原文、[类型定义](../src/types/tutorial.ts) 和 [详情渲染器](../src/components/TutorialDetailView.tsx)。`overview`、`advancedRules`、步骤和 FAQ 已调用 `FormattedRichText`，其支持 Markdown 链接；因此引用直接写在这些字符串，不改 schema/UI。
- 已实际调用 `web_search`，但搜索服务报 `TypeError: fetch failed`，未获得搜索结果。本报告不将失败伪装成完成搜索；改为直接 `web_fetch` 官方文档、App Store 与官方 GitHub 原文。部分页面被导航文本截断时，另用 Python 标准库读取原页面 `<article>` 或官方 API，均在下文给出原始 URL。未修改工具端点。
- App Store 信息取美国区，只代表检索时该渠道。Apple lookup 返回 iOS 元数据，不能用于推断同 ID 的 macOS 上架版本。日期明确区分商店条目首发、项目首发、版本发布与本次教程更新。
- 未安装这些客户端，未进行真机逐屏验证、签名审计、性能/续航测试、地区下载测试或服务器连通测试。菜单仅在官方指南能证实时具体描述，否则按操作目的描述且明确限制。
- 八篇都保留原 `id` / export / `SoftwareTool` 结构，修正 `updatePath` 为真实 `.ts` 路径，移除原来没有证据的 PR #1、作者和短 hash，使用 `changelog: []`，没有编造审计提交记录。

## 逐篇核查

### 1. [Clash iOS](../src/data/tutorials/ios/clash-ios.ts)

**原始来源**：

- [官方 GitHub 仓库 API](https://api.github.com/repos/ProjectClash/Clash-Client)：真实公开仓库，创建于 2026-09-27；不能由仓库创建时间推断产品首发。
- [README 原文](https://raw.githubusercontent.com/ProjectClash/Clash-Client/main/README.md)：Apple 原生客户端；独立 Clash Kernel / Adapter 依赖锁；按提交发布，不设独立客户端 release tag；各平台产品版本单独管理。
- [客户端 LICENSE](https://raw.githubusercontent.com/ProjectClash/Clash-Client/main/LICENSE)：GPL-3.0。
- [官方源码部署配置](https://raw.githubusercontent.com/ProjectClash/Clash-Client/main/apple/ClashClient/project.yml)：iOS 15 / macOS 13 / tvOS 17；部分扩展另有较高系统要求。
- [App Store](https://apps.apple.com/us/app/clash-rule-based-proxy/id6794257189) 与 [Apple lookup](https://itunes.apple.com/lookup?id=6794257189&country=us)：名称 Clash - Rule Based Proxy，ID 6794257189；开发者显示名 Open Sourced，销售方 OmniWide Media Limited；免费；iOS 1.0.14，2026-11-07T17:43:36Z 发布；条目首发 2026-08-20T07:00:00Z；iOS 15+。商店描述核心基于 mihomo。
- [官方入门](https://clash.md/guide/)：iPhone Home 左上方配置名 → Profile Center → Add Profile；iPad/Mac 侧栏 Profiles；导入、选路线、连接与 NE Packet Tunnel 边界。

**改动**：纠正身份与最低系统、2024 虚构首发日期；说明是 ProjectClash 的特定应用，不是 Clash 内核本身或其他同名客户端。按官方入门重写步骤、规则模式与策略组 FAQ，移除低价比较、无广告/零追踪的无条件背书和性能营销。

**未确认**：与旧 Dreamacro 项目的官方授权或承继关系、独立安全审计、实际省电/性能表现。不因名字相同而声称是“原版官方续作”。源码 README 当前写 iOS 产品构建 1.0.13，和商店 API 1.0.14 不同，不能混写为同一个版本。

### 2. [Clash macOS](../src/data/tutorials/macos/clash-mac.ts)

**原始来源**：沿用上列源码、许可和部署文件，另读取 [Mac 官网](https://clash.md/platforms/macos)、[Mac 指南](https://clash.md/guide/macos) 与 [Mac 商店入口](https://apps.apple.com/app/id6794257189?platform=mac)。官网、README、App Store ID 互链，可确认项目对象。Mac 指南确认侧栏 Profiles、策略组、菜单栏、连接日志、macOS 14 小组件；源码最低 macOS 13。

**改动**：删除原 macOS 14 一刀切最低要求与 2024 首发；保留有证据的菜单栏/配置功能，但不再虚构每一步右上角按钮与免费优于 Surge 的结论。注明 Apple Packet Tunnel，不要求额外桌面式 TUN 开关。

**未确认**：macOS 独立上架版本、首发日期、当前购买页分平台价格。README 对应 macOS 产品构建为 1.0.15（build 100），但它自己说明上架状态可能不同；源码 project.yml 又有默认 1.0.14，故教程明确标“商店版本未独立确认”，没有把 iOS lookup 的 1.0.14 当 Mac 最新。美国多平台商店页面显示免费，最终以 Mac 购买页为准。

### 3. [Karing iOS](../src/data/tutorials/ios/karing.ts)

**原始来源**：

- [README](https://raw.githubusercontent.com/KaringX/karing/main/README.md)：Flutter GUI、修改版 sing-box、iOS 15+；完整 Clash / 部分 clash.meta 配置兼容；iCloud（iOS/macOS）、局域网、WebDAV 和 ZIP 同步/备份。
- [LICENSE.md](https://raw.githubusercontent.com/KaringX/karing/main/LICENSE.md)：GPLv3 或以后，另含衍生项目名称/暗示关联需许可的原文，不简单吞掉该限制。
- [美国商店](https://apps.apple.com/us/app/karing/id6472431552) / [Apple lookup](https://itunes.apple.com/lookup?id=6472431552&country=us)：免费，SUPERNOVA NEBULA LLC；iOS 1.2.25.2802，2026-09-11T07:32:05Z；条目首发 2023-12-26T08:00:00Z；iOS 15。

**改动**：不把无渠道说明的 1.2.26 作为 iOS 当前版；纠正商店首发。明确部分 Mihomo 配置兼容，移除“全平台完全一致”“随系统启动/常驻后台”“任意订阅都无损”等承诺。按 README 的添加配置链接示例描述导入，不编造设置菜单层级。

**未确认**：项目真正首次公开日期、每项协议参数支持、具体手机界面每个按钮位置、各地区上架状态。官网 quickstart URL 返回 403，因此未用它支持任何菜单结论。

### 4. [Shadowrocket](../src/data/tutorials/ios/shadowrocket.ts)

**原始来源**：

- [开发者官网](https://shadowlaunch.com/)：链接 ID 932747118，版权 Shadow Launch Technology Limited。
- [美国商店](https://apps.apple.com/us/app/shadowrocket/id932747118) / [Apple lookup](https://itunes.apple.com/lookup?id=932747118&country=us)：US$2.99；销售方 Shadow Launch Technology Limited；iOS 13；版本 2.2.93，2026-10-29T03:15:39Z；条目首发 2015-04-14T02:09:18Z。
- 商店描述确认规则匹配、URL/iCloud Drive 规则导入、DNS 记录、DoH/DoT/DoQ、HTTPS 解密与重写等；没有本次能逐屏核查的完整订阅菜单教程。

**改动**：更正 iOS 12 → 13、4月12日 → 商店4月14日；删除装机量第一、全协议、自研引擎架构及三分钟保证等未证实说法。删除“On Demand 隐藏 VPN 图标”、换 DNS 即防污染、图标出现即节点成功、账户切换后保证升级等误导；说明规则模式不保证国内全部直连，节点订阅与规则文件有别。不在缺乏完整协议矩阵时保留原来的大而全列表。

**未确认**：完整源码公开许可、底层核心实现、全部协议参数和当前 UI 路径。`isOpenSource: false` 表示本次未确认完整客户端以开源许可发布，不是对所有第三方组件作闭源判断。价格不推断永远买断、包含节点或各区同价。

### 5. [sing-box iOS](../src/data/tutorials/ios/sing-box-ios.ts)

**原始来源**：

- [官方 Apple 客户端文档](https://sing-box.sagernet.org/clients/apple/)：SFI/SFM/SFT、本地/远程完整配置、iOS15+/macOS13+/tvOS17+；当前 App Store 链接指向 sing-box MT，macOS 列独立包；GitHub iOS `.deb` 是越狱版本。
- [App Store](https://apps.apple.com/us/app/sing-box-mt/id6785326793) / [Apple lookup](https://itunes.apple.com/lookup?id=6785326793&country=us)：Metamerism LLC，免费，应用 1.14.8，2026-10-24T01:04:19Z；当前条目首发 2026-08-31。
- [Apple 客户端 LICENSE](https://raw.githubusercontent.com/SagerNet/sing-box-for-apple/main/LICENSE)：GPLv3 或以后。
- [通用 GUI 规范](https://sing-box.sagernet.org/clients/general/)：Local/iCloud/Remote，Remote 是完整配置 URL 的更新来源；Groups 要求 selector/urltest，Mode 要求两个以上 clash_mode。

**改动**：保留有来源的商店应用 1.14.8，但和核心 release 1.14.4 分开；明确 sing-box MT 身份来自官方文档链接，而不是凭名称猜测。重写通用配置导入/授权步骤，移除固定虚构按钮与 VPN 图标即成功。条目首发不再当 SFI 项目首发。

**未确认**：原 SFI 项目首次发布日期、全部商店构建实际内嵌的核心版本及真机 UI。以应用显示的 Core 版本判断配置兼容。

### 6. [sing-box macOS](../src/data/tutorials/macos/sing-box-mac.ts)

**原始来源**：[Apple 客户端文档](https://sing-box.sagernet.org/clients/apple/)、[Homebrew cask](https://formulae.brew.sh/cask/sfm)、[cask API](https://formulae.brew.sh/api/cask/sfm.json)、[GitHub 1.14.4](https://github.com/SagerNet/sing-box/releases/tag/v1.14.4)。API 确认 SFM 1.14.4 / macOS 13，资产有 `SFM-1.14.4-Apple.pkg`、`Intel.pkg`、`Universal.pkg`，不是原文未经验证的 dmg。

**改动**：最低 macOS12 → 13；说明 SFM 独立 GUI 与 `brew install sing-box` CLI 不同。安装命令为 `brew install --cask sfm`，不声称 Mac App Store 与 SFI 同一安装途径。移除内存近零、不影响电池等承诺，增加 1.14 macOS 数据迁移提醒。

**未确认**：SFM 项目首发日期、实际电池/内存表现，均未猜值。

### 7. [sing-box Android](../src/data/tutorials/android/sing-box-android.ts)

**原始来源**：[官方 Android 文档](https://sing-box.sagernet.org/clients/android/)、[构建脚本原文](https://raw.githubusercontent.com/SagerNet/sing-box-for-android/dev/app/build.gradle.kts)、[Android LICENSE](https://raw.githubusercontent.com/SagerNet/sing-box-for-android/dev/LICENSE)、[1.14.4 release API](https://api.github.com/repos/SagerNet/sing-box/releases/latest)。文档总最低 Android 5；源码普通/Play minSdk24、otherLegacy minSdk21；资产普通及 `legacy-android-5` APK 均存在，ABI 为 arm64-v8a/armeabi-v7a/x86/x86_64，另有 universal。

**改动**：不再以 Android7 或 Android5 单一数值概括所有包；明确旧系统专用包；说明官方各渠道安装/签名注意事项、完整配置与 GUI 更新边界。移除“纯血极致低功耗”和关闭省电限制即可永不断线等保证。

**未确认**：SFA 项目首发日期；Play/F-Droid 当前逐渠道版本未单独确认，故版本字段标为 GitHub release，不冒充 Play 最新。

### 8. [sing-box Windows](../src/data/tutorials/windows/sing-box-win.ts)

**原始来源**：[官方 Desktop 文档](https://sing-box.sagernet.org/clients/desktop/) 已提供 Windows10+ GUI（x64/x86/arm64）与 [Desktop 源码](https://github.com/SagerNet/sing-box-for-desktop)。[1.14.4 release API](https://api.github.com/repos/SagerNet/sing-box/releases/latest) 确认 `SFW-1.14.4-{x64,x86,arm64}.exe` 为 GUI 资产，另有 `sing-box-1.14.4-windows-{amd64,arm64,386}.zip` CLI 和单列 Windows7 legacy 包。

**改动**：明确现在已有官方 GUI，保留此页为 CLI 教学而不再混入 GUI 的订阅功能。所有 PowerShell 示例使用 `.\sing-box.exe`，先 version、再 check、再 run；删除未经确认的 `libcronet.dll` 必备说法、无中文路径要求、管理员运行保证修好所有问题和未经查证服务注册步骤。说明 mixed 入站与 TUN 覆盖范围不同。

**未确认**：Windows 客户端项目首发、真机驱动/安全软件兼容性；不根据 legacy 资产把本教程兼容范围扩成 Windows7。

## sing-box 跨平台共同配置纠错

[核心 LICENSE](https://raw.githubusercontent.com/SagerNet/sing-box/testing/LICENSE) 为 GPLv3 或以后并附名称/关联声明限制。[release API](https://api.github.com/repos/SagerNet/sing-box/releases/latest) 本次返回 tag v1.14.4，`prerelease: false`，`published_at: 2026-10-24T01:04:25Z`。记录该实际返回值，不虚构未来版本或宣称永久 latest。

四篇共同引用 [Migration](https://sing-box.sagernet.org/migration/) 和 [Deprecated](https://sing-box.sagernet.org/deprecated/)，删除 Direct/Block 当协议的列表写法，WireGuard 标为 endpoint：

- GeoIP/Geosite 在 1.12 移除，改用 rule-set；旧 TUN inet4/inet6 字段也在 1.12 移除。
- 旧 `block`/`dns` 特殊 outbound、旧入站 sniff/domain_strategy 等字段、旧 WireGuard outbound 在 1.13 移除；对应迁移 rule actions / endpoint。
- 旧 DNS server 格式在 1.14 移除，不能拿旧 JSON 泛称支持所有版本。
- 在线文档还含 1.15+ 的变化，不代表本次稳定发行就是 1.15。Remote Profile 的 URL 是完整配置下载来源，不是内核的订阅转换器。

## 验证

- 八篇目标文件已单独运行 TypeScript 无输出检查：`npx tsc --noEmit --skipLibCheck --target ES2022 --module ESNext --moduleResolution bundler ...八篇路径`，退出码 0。
- 未修改 schema、UI、VPS 或本范围之外的文件，未创建 PR、commit 或 hash；没有声称完成设备端连接测试。
