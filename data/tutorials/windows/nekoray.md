---
id: "nekoray"
name: "NekoRay / Matsuri (Windows)"
system: "windows"
category: "windows"
tagline: "基于 Qt 与 sing-box 核心构建的高性能极客桌面代理客户端"

# 必填固定标准格式字段
updated_at: "2026-03-12"
is_open_source: true
license: "GPL-3.0 开源协议"
released_at: "2022-06-08"
latest_version: "v3.26"
update_path: "data/tutorials/windows/nekoray.md"

official_site: ""
github_repo: "https://github.com/MatsuriDayo/nekoray"

specs:
  compatibility: "Windows 10 / Windows 11 (64位)"
  architecture: "x64 / arm64"
  core_engine: "sing-box core / Xray-core 双核自选"
  protocols: ["VLESS-Reality", "Hysteria 2", "TUIC v5", "Shadowsocks", "Trojan", "VMess", "NaïveProxy", "WireGuard"]
  traffic_handling: "系统代理 + Wintun 驱动 TUN 虚拟网卡"
  resource_footprint: "Qt 原生编译，常驻内存仅需 ~25MB - 40MB"

screenshot:
  device_type: "windows"
  device_spec: "Windows 11 Workstation"
  resolution: "2560 × 1440 像素"
  title: "NekoRay Qt 原生主窗口、路由设置与快速测速"
  caption: ""
---

# NekoRay / Matsuri (Windows) 众包图文教程

> **独立更新路径**: `data/tutorials/windows/nekoray.md`  
> **更新时间**: 2026-03-12 | **开源性质**: 开源 (GPL-3.0 开源协议) | **最初发布**: 2022-06-08

## 一、软件简介与核心规格
NekoRay 采用 C++ Qt 构建，拥有极其轻量的原生性能与低内存占用。底层支持 sing-box 与 Xray 双引擎自由切换，对新协议响应极快，并且具备完备的链式代理与高级路由分流能力。

### 规格参数
- **支持架构**: x64 / arm64
- **系统要求**: Windows 10 / Windows 11 (64位)
- **底层引擎**: sing-box core / Xray-core 双核自选
- **流量接管模式**: 系统代理 + Wintun 驱动 TUN 虚拟网卡
- **资源消耗**: Qt 原生编译，常驻内存仅需 ~25MB - 40MB
- **支持协议**: VLESS-Reality, Hysteria 2, TUIC v5, Shadowsocks, Trojan, VMess, NaïveProxy, WireGuard

---

## 二、风格化截图与图解规格
- **设备线框规格**: Windows 11 Workstation (2560 × 1440 像素)

### 关键控制点标注
- **① 核心切换**: 【首选项】中可在 sing-box 与 Xray 核心之间任意选择
- **② 顶部功能开关**: 【系统代理】与【VPN 模式】独立开关，根据需要自由组合
- **③ 路由分流规则**: 内置绕过局域网与大陆 IP，支持自定义正则表达式与域名集

---

## 三、标准操作步骤指南

### 步骤 1：下载与解压
在 GitHub Releases 下载 `nekoray-xxx-windows64.zip`。解压到无中文路径的文件夹即可，绿色免安装。

> ✏️ **铅笔提示**: 首次启动选择默认的 sing-box 核心即可获得最佳新协议兼容性。

### 步骤 2：添加订阅分组
点击菜单【分组】->【分组设置】->【新建分组】。类型选择【订阅】，填入订阅链接后点击确定。在主界面右键分组点击【更新订阅】。

```url
https://sub.airport.org/nekoray?token=xxx
```
> ✏️ **铅笔提示**: 支持批量自动测速，直接回车选中目标节点。

### 步骤 3：勾选系统代理或 VPN 模式
在主界面顶部直接勾选【系统代理】或勾选【VPN 模式】（需要以管理员权限运行）。右下角状态指示灯亮起绿色即代表就绪。

> ✏️ **铅笔提示**: VPN 模式可接管各类不支持系统代理的客户端软件。


---

## 四、进阶分流与防泄露建议
1. 路由设置：可在路由列表中拖拽规则顺序，自定义直连与阻断域名。

---

## 五、常见问题与避坑 FAQ
#### Q: 为什么勾选 VPN 模式报错没有权限？
**A**: 退出软件，在 `nekoray.exe` 上右键选择【以管理员身份运行】即可正常加载 Wintun 驱动。


---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
| 2026-03-12 | QtGeek | #91 | 完善 Qt 界面与 Wintun 驱动管理员提权说明 | `c418bc0` |

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
