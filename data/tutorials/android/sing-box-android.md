---
id: "sing-box-android"
name: "Sing-box for Android (SFA)"
system: "android"
category: "android"
tagline: "官方纯血通用代理平台、极致功耗控制与纯粹性能"

# 必填固定标准格式字段
updated_at: "2026-03-26"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-08-10"
latest_version: "v1.11.2"
update_path: "data/tutorials/android/sing-box-android.md"

official_site: "https://sing-box.sagernet.org"
github_repo: "https://github.com/SagerNet/sing-box"

specs:
  compatibility: "Android 7.0 及更高版本"
  architecture: "arm64-v8a / armeabi-v7a / x86_64"
  core_engine: "Sing-box 官方核心 (Go 原生编译)"
  protocols: ["Shadowsocks", "VLESS (Reality)", "VMess", "Trojan", "Hysteria 2", "TUIC v5", "WireGuard", "Direct/Reject"]
  traffic_handling: "VpnService TUN 驱动 + 官方规则路由引擎"
  resource_footprint: "空闲仅 ~16MB，几乎是全平台内存占用最低的客户端"

screenshot:
  device_type: "android"
  device_spec: "Google Pixel 8 Pro"
  resolution: "1344 × 2992 像素"
  title: "Sing-box Android 官方仪表盘与配置配置集"
  caption: ""
---

# Sing-box for Android (SFA) 众包图文教程

> **独立更新路径**: `data/tutorials/android/sing-box-android.md`  
> **更新时间**: 2026-03-26 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-08-10

## 一、软件简介与核心规格
由 SagerNet 官方团队维护的 Android 原生客户端（Sing-box for Android, SFA）。没有花哨冗余的组件，采用官方标准配置语法，功耗极低、协议适配永远处于第一线。

### 规格参数
- **支持架构**: arm64-v8a / armeabi-v7a / x86_64
- **系统要求**: Android 7.0 及更高版本
- **底层引擎**: Sing-box 官方核心 (Go 原生编译)
- **流量接管模式**: VpnService TUN 驱动 + 官方规则路由引擎
- **资源消耗**: 空闲仅 ~16MB，几乎是全平台内存占用最低的客户端
- **支持协议**: Shadowsocks, VLESS (Reality), VMess, Trojan, Hysteria 2, TUIC v5, WireGuard, Direct/Reject

---

## 二、风格化截图与图解规格
- **设备线框规格**: Google Pixel 8 Pro (1344 × 2992 像素)

### 关键控制点标注
- **① 主开关**: 主页面顶部极简开关，一键启动 TUN 模式拦截
- **② Profile管理**: 支持导入标准 JSON 规则或远程订阅链接
- **③ 仪表板概览**: 实时查看当前出站分配、吞吐率与内存消耗

---

## 三、标准操作步骤指南

### 步骤 1：下载并安装 APK
在 GitHub Releases 页面下载 `SFA-xxx-universal.apk` 或 `arm64-v8a.apk`，安装到手机中。

> ✏️ **铅笔提示**: SFA 代表 Sing-box For Android，没有任何第三方修改。

### 步骤 2：导入 Profile 配置文件
打开软件，点击底部的【Profiles】，点击右上角【+】号，选择【Create Profile】。输入机场给定的 sing-box 订阅 URL 或选择【Import Local File】导入本地配置。

```url
https://airport.domain/sub/sing-box?token=xxx
```
> ✏️ **铅笔提示**: 可勾选“Auto Update”设置每日自动刷新节点。

### 步骤 3：启动服务并选择节点
在 Profiles 列表中选中刚才导入的配置，返回【Dashboard】主页，点击【Start】启动。点击【Groups】展开策略组，轻触选中最优节点即可。

> ✏️ **铅笔提示**: 在系统弹出添加 VPN 提示时点击允许。


---

## 四、进阶分流与防泄露建议
1. 电池优化白名单：在系统设置中为 Sing-box 关闭省电限制，保证长时间挂后台不掉线。

---

## 五、常见问题与避坑 FAQ
#### Q: 为什么软件没有华丽的界面？
**A**: 官方客户端追求的是纯粹、高效与低开销，以极小的系统资源保证最强悍的协议吞吐性能。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-26 | SingBoxCoreDev | #107 | 升级 1.11.2 版内核与 Rule-Set 二进制规则集解析指引 | `f1892de` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
