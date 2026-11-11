---
id: "quantumult-x"
name: "Quantumult X (圈X)"
system: "ios"
category: "apple"
tagline: "高颜值手绘仪表盘与强大 JS 脚本生态的进阶利器"

# 必填固定标准格式字段
updated_at: "2026-03-05"
is_open_source: false
license: "商业闭源软件"
price: "约 $7.99 买断"
released_at: "2019-07-15"
latest_version: "v1.5.8"
update_path: "data/tutorials/ios/quantumult-x.md"

official_site: "https://quantumult.app"
github_repo: ""
appstore_url: "https://apps.apple.com/us/app/quantumult/id1252015438"

specs:
  compatibility: "iOS 14.0 / iPadOS 14.0 或更高版本"
  architecture: "ARM64 原生"
  core_engine: "Quantumult 自研网络核心"
  protocols: ["Shadowsocks", "ShadowsocksR", "VMess", "Trojan", "HTTP/SOCKS5"]
  traffic_handling: "虚拟 TUN 网卡 + 全面 MITM 重写 + JS 运行时"
  resource_footprint: "空闲 ~20MB / 满载 40MB"

screenshot:
  device_type: "iphone"
  device_spec: "Apple iPhone 15 Pro"
  resolution: "1179 × 2556 像素"
  title: "Quantumult X 节点风车罗盘与网络活动仪表盘"
  caption: ""
---

# Quantumult X (圈X) 众包图文教程

> **独立更新路径**: `data/tutorials/ios/quantumult-x.md`  
> **更新时间**: 2026-03-05 | **开源性质**: 闭源 | **最初发布**: 2019-07-15

## 一、软件简介与核心规格
Quantumult X（俗称圈X）拥有 iOS 平台最精致的网络活动与策略组可视化界面，其强大的 JavaScript 脚本重写、定时签到任务和去广告生态深受老玩家和发烧友的喜爱。

### 规格参数
- **支持架构**: ARM64 原生
- **系统要求**: iOS 14.0 / iPadOS 14.0 或更高版本
- **底层引擎**: Quantumult 自研网络核心
- **流量接管模式**: 虚拟 TUN 网卡 + 全面 MITM 重写 + JS 运行时
- **资源消耗**: 空闲 ~20MB / 满载 40MB
- **支持协议**: Shadowsocks, ShadowsocksR, VMess, Trojan, HTTP/SOCKS5

---

## 二、风格化截图与图解规格
- **设备线框规格**: Apple iPhone 15 Pro (1179 × 2556 像素)

### 关键控制点标注
- **① 风车菜单**: 长按或点击右下角风车图标，展开配置中心与分流重写控制台
- **② 策略矩阵**: 横向滑动切换不同媒体策略（如 Netflix、YouTube、Spotify 等）
- **③ 脚本与Task**: 支持自动化 JS 定时签到与网络请求内容重写

---

## 三、标准操作步骤指南

### 步骤 1：下载并初次启动
在美区或其他外区 App Store 搜索购买 Quantumult X。首次启动需要授予 VPN 权限与通知权限。

> ✏️ **铅笔提示**: QX 独特的风车图标是核心交互入口。

### 步骤 2：添加节点引用资源
轻触右下角风车 -> 滚动到【节点】区域 -> 点击【引用 (资源)】。点击右上角【+】，填入资源名称与机场提供的 Quantumult X 节点订阅链接，勾选【更新】即可。

```ini
[server_remote]
https://airport.com/sub/qx?token=xxx, tag=我的机场, enabled=true
```
> ✏️ **铅笔提示**: 可以在设置中开启“资源更新时自动测速并选优”。

### 步骤 3：添加分流规则与分流策略组
在【分流】区域点击【引用 (资源)】，添加常见的大陆直连规则集与流媒体规则集，随后在主界面的策略栏将海外分流指向机场节点。

> ✏️ **铅笔提示**: 圈X支持多重分流嵌套，可以单独指定某些应用只走特定地区的节点。

### 步骤 4：启动服务并享受极速网络
回到首页，将右上角的开关向右拨动开启，系统状态栏显示 VPN 标志即已成功进入代理状态。

> ✏️ **铅笔提示**: 在主界面长按节点名称可以触发单节点测速。


---

## 四、进阶分流与防泄露建议
1. 开启 Task 定时签到：在配置文件底部加入 Task 脚本，每日定时获取金币与签到。
2. MitM 根证书信任：前往 iOS 设置 -> 通用 -> 关于本机 -> 证书信任设置，信任 Quantumult X 生成的自签名证书。

---

## 五、常见问题与避坑 FAQ
#### Q: 圈X支持 VLESS-Reality 或 Hysteria 2 协议吗？
**A**: 目前圈X官方版本对新兴协议（如 Reality / Hy2）更新较为缓慢，若主用此类新协议，推荐搭配 Karing 或 Shadowrocket。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-05 | ScriptLover | #74 | 完善脚本重写与 MitM 证书信任安装指引 | `d482fe1` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
