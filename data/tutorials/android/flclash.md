---
id: "flclash"
name: "FlClash (Android)"
system: "android"
category: "android"
tagline: "基于 Flutter 开发的高颜值多平台 Mihomo 内核客户端"

# 必填固定标准格式字段
updated_at: "2026-03-23"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2023-12-18"
latest_version: "v0.8.72"
update_path: "data/tutorials/android/flclash.md"

official_site: ""
github_repo: "https://github.com/chen08209/FlClash"

specs:
  compatibility: "Android 7.0 及更高版本"
  architecture: "arm64-v8a / armeabi-v7a"
  core_engine: "Mihomo Core (Clash.Meta)"
  protocols: ["VLESS-Reality", "VMess", "Hysteria 2", "TUIC v5", "Trojan", "Shadowsocks", "WireGuard"]
  traffic_handling: "VpnService 虚拟网卡 + 动态规则分流"
  resource_footprint: "Flutter 引擎优化，内存占用约 45MB - 70MB"

screenshot:
  device_type: "android"
  device_spec: "Samsung Galaxy S24 Ultra / Vivo X100 Pro"
  resolution: "1440 × 3120 像素"
  title: "FlClash 现代化仪表盘、测速卡片与策略组折叠视图"
  caption: ""
---

# FlClash (Android) 众包图文教程

> **独立更新路径**: `data/tutorials/android/flclash.md`  
> **更新时间**: 2026-03-23 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2023-12-18

## 一、软件简介与核心规格
FlClash 是一款基于 Flutter 和 Mihomo 内核打造的现代代理客户端，完美继承了 Clash 的分流策略组体系，UI 设计精致动画丝滑，平板与手机双向自适应，是目前 Android 平台颜值最高的新星之一。

### 规格参数
- **支持架构**: arm64-v8a / armeabi-v7a
- **系统要求**: Android 7.0 及更高版本
- **底层引擎**: Mihomo Core (Clash.Meta)
- **流量接管模式**: VpnService 虚拟网卡 + 动态规则分流
- **资源消耗**: Flutter 引擎优化，内存占用约 45MB - 70MB
- **支持协议**: VLESS-Reality, VMess, Hysteria 2, TUIC v5, Trojan, Shadowsocks, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: Samsung Galaxy S24 Ultra / Vivo X100 Pro (1440 × 3120 像素)

### 关键控制点标注
- **① 启停控制**: 顶部醒目的动态水波纹连接开关，实时展现上下行速率
- **② 策略卡片**: 自动折叠展开的策略组，直观选择节点并支持一键多线程测速
- **③ 订阅面板**: 左侧导航抽屉可管理多个机场配置，支持差异化规则覆写

---

## 三、标准操作步骤指南

### 步骤 1：下载并安装 APK
前往 FlClash 的 GitHub Releases 页面，下载最新的 `FlClash-xxx-android-arm64-v8a.apk` 安装包完成安装。

> ✏️ **铅笔提示**: 应用支持 Material You 动态主题，会根据你的手机壁纸自动变换色彩。

### 步骤 2：添加订阅配置
打开 FlClash，点击左侧导航栏的【配置】，点击右上角【+】号，输入配置名称并粘贴 Clash 订阅 URL，点击确定完成拉取。

```url
https://sub.airport.net/api/v1/client/subscribe?token=xxx&flag=clash
```
> ✏️ **铅笔提示**: 订阅拉取成功后，点击该配置右侧的单选按钮将其设为激活状态。

### 步骤 3：挑选节点并启动
进入【代理】页面，点击测速图标完成节点延迟刷新，轻触选中低延迟节点。返回主页点击顶部的连接开关，在弹出的 VPN 请求中点击允许。

> ✏️ **铅笔提示**: 主界面可直接查看当前流量波形图与活动连接数。


---

## 四、进阶分流与防泄露建议
1. 应用绕行：在设置中开启“绕过指定应用”，把微信、银行 App 添加到直连名单中。

---

## 五、常见问题与避坑 FAQ
#### Q: FlClash 与 Clash Meta for Android 哪个更好？
**A**: 两者内核一致，FlClash 界面更加现代化、动画更加流畅，支持全平台多端统一体验。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-23 | FlutterDev | #102 | 新增 Material 动态主题色彩适配说明与分流配置优化 | `e719aa2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
