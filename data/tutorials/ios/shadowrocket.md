---
id: "shadowrocket"
name: "Shadowrocket (小火箭)"
system: "ios"
category: "apple"
tagline: "iOS 生态装机量第一的规则分流与全协议代理客户端"

# 必填固定标准格式字段
updated_at: "2026-03-24"
is_open_source: false
license: "商业闭源授权"
price: "约 $2.99 买断"
released_at: "2015-04-12"
latest_version: "v2.2.65"
update_path: "data/tutorials/ios/shadowrocket.md"

official_site: "https://shadowlaunch.com"
github_repo: ""
appstore_url: "https://apps.apple.com/us/app/shadowrocket/id932747118"

specs:
  compatibility: "iOS 12.0 / iPadOS 12.0 或更高版本 (兼容 visionOS)"
  architecture: "ARM64 (Apple A/M 系列芯片原生优化)"
  core_engine: "iOS NetworkExtension + 自研多协议引擎"
  protocols: ["Shadowsocks", "ShadowsocksR", "VMess", "VLESS (Reality)", "Trojan", "Hysteria 2", "TUIC v5", "WireGuard", "Snell", "HTTP/SOCKS5"]
  traffic_handling: "VPN TUN 虚拟网卡全局拦截 + 本地 DNS 缓存分流"
  resource_footprint: "空闲 ~18MB / 满载 45MB，CPU 占用低于 2%"

screenshot:
  device_type: "iphone"
  device_spec: "Apple iPhone 16 Pro (Super Retina XDR)"
  resolution: "1179 × 2556 像素 (460 ppi)"
  title: "Shadowrocket 节点仪表盘与分流工作台"
  caption: ""
---

# Shadowrocket (小火箭) 众包图文教程

> **独立更新路径**: `data/tutorials/ios/shadowrocket.md`  
> **更新时间**: 2026-03-24 | **开源性质**: 闭源 | **最初发布**: 2015-04-12

## 一、软件简介与核心规格
Shadowrocket 是一款基于 iOS NetworkExtension 架构的规则型代理工具，以极高的性价比、傻瓜式机场订阅支持以及对新兴协议极速跟进而闻名，是 iOS 平台最普及的翻墙利器。

### 规格参数
- **支持架构**: ARM64 (Apple A/M 系列芯片原生优化)
- **系统要求**: iOS 12.0 / iPadOS 12.0 或更高版本 (兼容 visionOS)
- **底层引擎**: iOS NetworkExtension + 自研多协议引擎
- **流量接管模式**: VPN TUN 虚拟网卡全局拦截 + 本地 DNS 缓存分流
- **资源消耗**: 空闲 ~18MB / 满载 45MB，CPU 占用低于 2%
- **支持协议**: Shadowsocks, ShadowsocksR, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC v5, WireGuard, Snell, HTTP/SOCKS5

---

## 二、风格化截图与图解规格
- **设备线框规格**: Apple iPhone 16 Pro (Super Retina XDR) (1179 × 2556 像素 (460 ppi))

### 关键控制点标注
- **① 状态开关**: 主页面顶部一键连接开关，自动唤起 iOS VPN 权限确认
- **② 全局路由**: 默认推荐设为【配置】(分流模式)，国内直连海外走代理
- **③ 订阅节点**: 多协议节点列表，点击右上角【+】扫码或粘贴机场订阅
- **④ Ping测速**: 轻触【连通性测试】，支持按毫秒延迟或可用性自动排序

---

## 三、标准操作步骤指南

### 步骤 1：获取并安装客户端
在 iPhone 的 App Store 中退出国区账号，登录外区 Apple ID 后搜索 "Shadowrocket" 进行购买下载。认准原开发者为 "Shadow Launch Technology Limited"，切勿下载国区山寨诈骗应用。

> ✏️ **铅笔提示**: 下载完成后可切换回日常的国区 Apple ID，不影响小火箭后续正常运行与升级。

### 步骤 2：导入节点与订阅链接
打开 Shadowrocket，点击右上角的【+】加号。在最顶部的【类型】一栏点击下拉菜单选择【Subscribe】（订阅），在【URL】处粘贴机场提供的订阅链接，【备注】填入服务商名称，点击右上角【完成】保存。

```url
https://your-airport-provider.com/api/v1/client/subscribe?token=xyz123
```
> ✏️ **铅笔提示**: 如果机场提供二维码，可以直接点击左上角扫描按钮进行秒级导入！

### 步骤 3：选择节点并开启规则分流
在首页节点列表中点击【连通性测试】，挑选一个延迟较低的节点（如绿色低延迟节点）。确保主界面【全局路由】保持为【配置】（Rule），切勿误选为【全局直连】或【全局代理】。

> ✏️ **铅笔提示**: 【配置】模式会自动使国内网站（百度、微信、网易云等）直连，仅国外被屏蔽网站才走代理，节省宝贵流量并降低延迟。

### 步骤 4：启动连接并授权 VPN 权限
将顶部的连接开关拨至打开。首次启动时 iOS 会弹出系统提示：“Shadowrocket 想要添加 VPN 配置”，点击【允许】并输入 iPhone 锁屏密码即可建立安全连接。

> ✏️ **铅笔提示**: 屏幕右上角灵动岛或状态栏出现【VPN】小图标即代表连接成功！


---

## 四、进阶分流与防泄露建议
1. 启用自动更新订阅：点击底部【设置】->【订阅】-> 勾选【打开时更新】与【自动后台更新】。
2. 隐藏 VPN 图标：在设置中开启“按需连接 (On Demand)”，优化网络切换不掉线。
3. 防止 DNS 污染：在【设置】->【DNS】中，将远程 DNS 设置为 8.8.8.8 或 1.1.1.1。

---

## 五、常见问题与避坑 FAQ
#### Q: 为什么国内 App 变慢或提示异地登录？
**A**: 检查首页【全局路由】是否误设成了【代理 (Proxy)】。请务必切换回【配置 (Config)】，这样国内软件将直接走本地蜂窝/Wi-Fi，不再绕道海外。

#### Q: 节点测速全部超时或出现红感叹号怎么办？
**A**: 通常是订阅链接过期、欠费或 Wi-Fi 路由器开启了特定拦截。可尝试切换 4G/5G 蜂窝网络再次点击连通性测试，或在小火箭中长按订阅项选择【更新订阅】。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-24 | CyberPencil-Editor | #104 | 补全 Hysteria 2 与 TUIC v5 新协议配置指引与 iPhone 16 Pro 屏幕适配规格 | `a7f3d91` |
| 2026-01-18 | iOS-Master | #88 | 校对订阅自动更新步骤并添加防 DNS 泄露建议 | `c1b48e2` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
