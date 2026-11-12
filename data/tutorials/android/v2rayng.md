---
id: "v2rayng"
name: "v2rayNG"
system: "android"
category: "android"
tagline: "Android 平台最经典的开源代理利器与装机必备常青树"

# 必填固定标准格式字段
updated_at: "2026-11-01"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2017-06-15"
latest_version: "v2.3.15"
update_path: "data/tutorials/android/v2rayng.md"

official_site: "https://github.com/2dust/v2rayNG/releases"
github_repo: "https://github.com/2dust/v2rayNG"

specs:
  compatibility: "Android 5.0 (Lollipop) 或更高版本 (全面兼容 Android 14/15)"
  architecture: "ARM64-v8a / armeabi-v7a / x86_64"
  core_engine: "Xray-core / V2Ray-core 原生优化版"
  protocols: ["VLESS (Reality / XTLS)", "VMess", "Trojan", "Shadowsocks", "SOCKS", "WireGuard"]
  traffic_handling: "Android VpnService 虚拟专用网全局/分流拦截"
---

# v2rayNG 众包图文教程

> **教程文件路径**: `data/tutorials/android/v2rayng.md`  
> **最近更新**: 2026-11-01 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2017-06-15

## 一、软件简介与核心规格
v2rayNG 是 Android 平台用户量最大、兼容性最强的老牌开源客户端。基于 Xray 内核与 V2Ray 协议规范，支持几乎所有常见的自建节点与机场订阅，开箱即用，稳定省心。

### 规格参数
- **支持架构**: ARM64-v8a / armeabi-v7a / x86_64
- **系统要求**: Android 5.0 (Lollipop) 或更高版本 (全面兼容 Android 14/15)
- **底层引擎**: Xray-core / V2Ray-core 原生优化版
- **流量接管模式**: Android VpnService 虚拟专用网全局/分流拦截
- **支持协议**: VLESS (Reality / XTLS), VMess, Trojan, Shadowsocks, SOCKS, WireGuard

---

## 二、标准操作步骤指南

### 步骤 1：下载并安装 APK
从 GitHub Releases 官方页面下载以 `v2rayNG_xxx_arm64-v8a.apk` 结尾的安装包（绝大多数现代安卓手机均适用此架构）。点击安装包完成安装。

> ✏️ **铅笔提示**: 国内各大应用商店由于政策原因均未上架，切勿在非官方网站下载被植入广告的山寨包。

### 步骤 2：配置订阅分组并更新
打开 v2rayNG，点击左上角【三道杠】汉堡菜单 -> 选择【订阅分组设置】。点击右上角【+】加号，在【备注】中填入机场名称，在【可选地址 (URL)】处粘贴机场订阅链接，点击右上角【√】保存。返回主界面，点击右上角【三个点】菜单，点击【更新订阅】。

```url
https://airport-sub.org/api/v1/client/subscribe?token=v2rayng_token
```
> ✏️ **铅笔提示**: 稍等片刻，主页面即可瞬间刷出所有可用节点列表！

### 步骤 3：真连接测速并挑选节点
点击右上角【三个点】菜单 -> 点击【测试全部配置真实连接】。稍微等待数秒，节点卡片右侧会显示实际能连通的握手延迟（毫秒数字）。点击选择一个绿色低延迟的节点，左侧卡片会出现一条高亮色块。

> ✏️ **铅笔提示**: “测试全部配置真实连接”比单纯 Ping 更有参考价值，能真实测试是否能连通 Google。

### 步骤 4：配置分流模式并启动
点击左上角汉堡菜单 -> 进入【设置】。找到【预定义规则】，建议选择【绕过局域网及大陆地址 (Bypass LAN and mainland China)】。设置完毕返回主界面，轻触右下角圆形的【V】按钮，在弹出的“网络连接请求”弹窗中点击【确定】。

> ✏️ **铅笔提示**: 当右下角按钮变为深色，顶部通知栏出现一把【小钥匙】图标时，即代表翻墙成功！


---

## 三、进阶分流与防泄露建议
1. 分应用代理（白名单/黑名单）：在【设置】->【分应用代理】中，可指定仅 Telegram、Chrome、YouTube 等指定海外 App 走代理，微信/淘宝等直接直连，省电且不影响外卖和打车定位。
2. 后台保活策略：在系统设置中为 v2rayNG 设置【允许后台高耗电】和【自启动】，并将多任务卡片加锁，防止系统杀后台。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么连上后国内 App 提示网络连接失败？
**A**: 请检查设置里的【预定义规则】是否误改为了全局代理，或者分应用代理是否勾选了冲突规则；请确保选择【绕过局域网及大陆地址】。

#### Q: 为什么通知栏经常莫名其妙断开？
**A**: 这是国内各家定制安卓系统（如澎湃OS、ColorOS、OriginOS、HarmonyOS）积极杀后台所致。请在手机【应用管理】中关闭“智能省电优化”，开启“无限制后台运行”。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | AndroidMaster | #1 | 首次更新 | `b492aa8` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
