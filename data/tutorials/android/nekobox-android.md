---
id: "nekobox-android"
name: "NekoBox"
system: "android"
category: "android"
tagline: "基于 sing-box 核心的多协议极客利器与 Matsuri 正统继承者"

# 必填固定标准格式字段
updated_at: "2026-02-09"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-09-01"
latest_version: "v1.4.2"
update_path: "data/tutorials/android/nekobox-android.md"

official_site: ""
github_repo: "https://github.com/MatsuriDayo/NekoBoxForAndroid"

specs:
  compatibility: "Android 6.0 及更高版本"
  architecture: "arm64-v8a / armeabi-v7a"
  core_engine: "sing-box core + 自定义插件模块"
  protocols: ["VLESS-Reality", "Hysteria 2", "TUIC v5", "Shadowsocks", "Trojan", "VMess", "WireGuard", "NaïveProxy"]
  traffic_handling: "VpnService TUN 模式 + 链式转发"
---

# NekoBox 众包图文教程

> **教程文件路径**: `data/tutorials/android/nekobox-android.md`  
> **最近更新**: 2026-02-09 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-09-01

## 一、软件简介与核心规格
NekoBox for Android 是广受欢迎的 Matsuri（茉莉）项目分支继承者。以 sing-box 为底层核心，兼具强大的通用协议支持、精细的路由分流规则与自定义链式代理功能，是高阶极客的安卓心头好。

### 规格参数
- **支持架构**: arm64-v8a / armeabi-v7a
- **系统要求**: Android 6.0 及更高版本
- **底层引擎**: sing-box core + 自定义插件模块
- **流量接管模式**: VpnService TUN 模式 + 链式转发
- **支持协议**: VLESS-Reality, Hysteria 2, TUIC v5, Shadowsocks, Trojan, VMess, WireGuard, NaïveProxy

---

## 二、标准操作步骤指南

### 步骤 1：下载并安装客户端
从 GitHub Releases 页面下载 `NB4A-xxx-arm64-v8a.apk`，安装到手机上。

> ✏️ **铅笔提示**: NekoBox 内置了完整的 sing-box 核心，无需额外下载插件核心。

### 步骤 2：添加配置分组
点击右上角【+】号，选择【分组设置】或添加单个自建节点；也可以直接选择【从剪贴板导入】或【扫描二维码】。

```text
vless://uuid@domain:443?security=reality&sni=example.com&pbk=key&type=grpc#HK-Node
```
> ✏️ **铅笔提示**: 支持多种协议混排，兼容性表现极佳。

### 步骤 3：选择出站并启动
在节点列表中点击选中目标节点，轻触下方启动按钮建立连接。系统弹窗确认 VPN 授权后即可正常翻墙。

> ✏️ **铅笔提示**: 可开启“URL 延迟测试”自动找出当期响应速度最快的可用节点。


---

## 三、进阶分流与防泄露建议
1. 配置链式代理：把中转节点作为前置出站，落地机作为后置出站，实现双重跳板隐藏真实 IP。

---

## 四、常见问题与避坑 FAQ
#### Q: 为什么有的 Hysteria 2 节点测速超时？
**A**: 检查运营商是否对 UDP 进行了高烈度 QoS 阻断；可尝试在配置中调低端口跳跃（Port Hopping）频率或调小发包速率。


---

## 五、教程更新记录与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-12 | NekoMaster | #1 | 首次更新 | `d220ff1` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
