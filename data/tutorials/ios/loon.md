---
id: "loon"
name: "Loon"
system: "ios"
category: "apple"
tagline: "活跃更新、生态丰富、对标 Surge 的高性价比进阶工具"

# 必填固定标准格式字段
updated_at: "2026-03-27"
is_open_source: false
license: "商业闭源软件"
released_at: "2019-11-20"
latest_version: "v3.2.4"
update_path: "data/tutorials/ios/loon.md"

official_site: "https://loon.so"
github_repo: ""

specs:
  compatibility: "iOS 15.0 / iPadOS 15.0 或更高版本"
  architecture: "Apple Silicon ARM64 原生"
  core_engine: "Loon Engine + 动态插件生态"
  protocols: ["Shadowsocks", "ShadowsocksR", "VMess", "VLESS", "Trojan", "Hysteria 2", "WireGuard", "HTTP/SOCKS5"]
  traffic_handling: "TUN 全局/分流模式 + 动态插件拦截"
  resource_footprint: "空闲 ~22MB / 满载 42MB"

screenshot:
  device_type: "iphone"
  device_spec: "Apple iPhone 16"
  resolution: "1179 × 2556 像素"
  title: "Loon 策略组、插件中心与状态仪表盘"
  caption: ""
---

# Loon 众包图文教程

> **独立更新路径**: `data/tutorials/ios/loon.md`  
> **更新时间**: 2026-03-27 | **开源性质**: 闭源 | **最初发布**: 2019-11-20

## 一、软件简介与核心规格
Loon 凭借强大的插件与模块体系、活跃的开发者迭代节奏以及对新兴协议的快速跟进，成为目前 iOS 平台替代昂贵 Surge 的最强性价比之选。

### 规格参数
- **支持架构**: Apple Silicon ARM64 原生
- **系统要求**: iOS 15.0 / iPadOS 15.0 或更高版本
- **底层引擎**: Loon Engine + 动态插件生态
- **流量接管模式**: TUN 全局/分流模式 + 动态插件拦截
- **资源消耗**: 空闲 ~22MB / 满载 42MB
- **支持协议**: Shadowsocks, ShadowsocksR, VMess, VLESS, Trojan, Hysteria 2, WireGuard, HTTP/SOCKS5

---

## 二、风格化截图与图解规格
- **设备线框规格**: Apple iPhone 16 (1179 × 2556 像素)

### 关键控制点标注
- **① 插件中心**: 一键启用社区精选插件（去广告、解锁、通知美化等）
- **② 节点策略**: 灵活嵌套的代理策略组与延迟排序算法
- **③ 捕获日志**: 清晰易读的请求日志分析与错误重试

---

## 三、标准操作步骤指南

### 步骤 1：安装应用并初次授权
在非国区 App Store 搜索购买 Loon，启动后根据引导开启 VPN 配置权限。

> ✏️ **铅笔提示**: UI 风格亲和现代，支持中文界面。

### 步骤 2：导入机场订阅与节点
点击底部导航栏【配置】-> 找到【订阅】区域 -> 点击【+】添加订阅。输入机场名称与 URL 链接后点击保存，系统将自动拉取所有节点。

```url
https://sub.airport-example.com/api/v1/client/subscribe?token=loon_token
```
> ✏️ **铅笔提示**: 可勾选“自动更新”，设置每隔 12 小时静默拉取一次最新节点。

### 步骤 3：使用【插件】功能增强能力
在底部点击【插件】，即可直接添加各类去开屏广告、流媒体重定向及网络增强模块。点击即可开启，完全免去手动写正则规则的痛苦。

> ✏️ **铅笔提示**: 社区有很多一键安装的优秀插件，例如各平台净化插件。

### 步骤 4：启动主开关
回到首页，点击右上角电源启动按钮。此时所有的分流与插件均会生效，即可畅享国际互联网。

> ✏️ **铅笔提示**: 可点击节点列表上方的测试图标一键全量测速。


---

## 四、进阶分流与防泄露建议
1. 启用捕获调试：当某个网站打不开时，在首页打开【捕获】，重试访问即可看到具体的拦截规则或连接错误。
2. 节点映射与自动测速策略组：支持按可用性回退（Fallback）。

---

## 五、常见问题与避坑 FAQ
#### Q: Loon 与 Surge 相比有什么优势？
**A**: Loon 售价通常仅为 Surge 的一小部分，且一次性买断无年费；同时其“插件中心 (Plugin)”让小白也能一键复用社区规则，易用性极高。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-27 | LoonPilot | #109 | 升级 Loon 3.2.4 新版插件语法说明与 Hysteria 2 适配注意事项 | `e69a4c2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
