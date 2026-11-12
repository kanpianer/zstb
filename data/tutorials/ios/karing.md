---
id: "karing"
name: "Karing"
system: "ios"
category: "apple"
tagline: "全平台覆盖、深度兼容 Clash 与 Sing-box 的新锐通用代理工具"

# 必填固定标准格式字段
updated_at: "2026-11-12"
is_open_source: true
license: "开源软件 (GPL-3.0)"
price: "免费使用"
released_at: "2023-11-06"
latest_version: "v1.2.26"
update_path: "data/tutorials/ios/karing.md"

official_site: "https://karing.app"
github_repo: "https://github.com/KaringX/karing"
appstore_url: "https://apps.apple.com/us/app/karing/id6472431552"

specs:
  compatibility: "iOS 15.0 / iPadOS 15.0 / tvOS 17.0 或更高版本"
  architecture: "Apple Silicon ARM64 原生 (Flutter / Rust / Go)"
  core_engine: "Sing-box 内核定制版 + 多源路由规则集"
  protocols: ["Shadowsocks", "ShadowsocksR", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC", "WireGuard", "SSH"]
  traffic_handling: "TUN 虚拟网卡接管 (规则分流 / 全局代理 / 直连模式)"
---

# Karing 众包图文教程

> **教程文件路径**: `data/tutorials/ios/karing.md`  
> **最近更新**: 2026-11-12 | **开源性质**: 开源 (开源软件 (GPL-3.0)) | **最初发布**: 2023-11-06

## 一、软件简介与核心规格
Karing 是一款基于 Flutter 框架打造、内置 Sing-box 核心的现代化跨平台代理客户端。全面兼容 Clash、Sing-box、V2Ray 等主流订阅与分流规则体系，内置智能规则集与新手简易模式，提供完全免费、开箱即用且多端体验高度一致的科学上网体验。

### 规格参数
- **支持架构**: Apple Silicon ARM64 原生 (Flutter / Rust / Go)
- **系统要求**: iOS 15.0 / iPadOS 15.0 / tvOS 17.0 或更高版本
- **底层引擎**: Sing-box 内核定制版 + 多源路由规则集
- **流量接管模式**: TUN 虚拟网卡接管 (规则分流 / 全局代理 / 直连模式)
- **支持协议**: Shadowsocks, ShadowsocksR, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC, WireGuard, SSH

---

## 二、标准操作步骤指南

### 步骤 1：安装应用并初次授权
在非国区 App Store 搜索【Karing】（完全免费），下载安装后打开。首次启动点击连接开关，按系统提示允许添加 VPN 配置并完成生物识别认证。

> ✏️ **铅笔提示**: 应用完全免费，无须付费买断，界面原生支持简体中文。

### 步骤 2：添加订阅配置链接
进入底部导航【设置】-> 点击【订阅管理】-> 点击右上角【+】号。在弹窗中粘贴机场服务商提供的订阅链接，输入自定义备注名称后点击保存。

```url
https://sub.airport-example.com/api/v1/client/subscribe?token=karing_token
```
> ✏️ **铅笔提示**: 支持同时添加多家机场订阅，系统会自动合并节点并支持自动定时刷新。

### 步骤 3：选择优选节点与分流模式
回到首页，点击节点选择卡片，可点击测速按钮对全部节点进行并发 Ping 测速；分流模式默认保持【规则模式】即可智能实现大陆直连、海外代理。

> ✏️ **铅笔提示**: 新手建议勾选“自动选择延迟最低节点”，享受无感节点容灾体验。

### 步骤 4：启动主开关开启代理
在主界面中央点击醒目的大圆形连接按钮。状态变为已连接后，即可在浏览器或应用中无障碍访问国际互联网。

> ✏️ **铅笔提示**: 可在控制中心添加开关小组件，或在设置中开启“随系统启动/常驻后台”。


---

## 三、进阶分流与防泄露建议
1. 多端配置同步：Karing 支持通过 iCloud（iOS/macOS）或 WebDAV 自动同步订阅与规则配置，换机或多设备免重复配置。
2. 新手友好模式与高级规则集：既可一键开箱即用默认分流，也能在“规则组”中精确自定义分流走向与 DNS 防污染设置。

---

## 四、常见问题与避坑 FAQ
#### Q: Karing 与其他 iOS 代理工具相比有何优势？
**A**: Karing 最大的优势是全平台跨端覆盖（iOS、tvOS、macOS、Android、Windows、Linux 界面与逻辑完全一致）、完全免费无须买断，同时基于强大的 Sing-box 现代内核，开箱即用且支持 iCloud 跨端云同步。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | KaringTeam | #1 | 首次更新 | `b4a8e21` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
