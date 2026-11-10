# 纸上谈兵 · 翻墙工具教程众包贡献指南 (Contributing Guide)

欢迎加入 **纸上谈兵 (PencilNet Guide)** 众包维护计划！本项目通过 GitHub 众包方式协同管理与更新全平台主流翻墙工具（Shadowrocket, Clash, Clash Verge Rev, v2rayN, sing-box, dae 等）的标准图文教程。

---

## 🌟 核心维护准则

1. **每一个软件都有独立的更新路径**:
   - iOS: `data/tutorials/ios/<tool>.md`
   - macOS: `data/tutorials/macos/<tool>.md`
   - Android: `data/tutorials/android/<tool>.md`
   - Windows: `data/tutorials/windows/<tool>.md`
   - Linux: `data/tutorials/linux/<tool>.md`
   每个教程的 Git 历史提交记录独立，互不冲突。

2. **系统上限约束（四象限准则）**:
   - 每一个系统下**最多只可以收录 4 款翻墙工具**。
   - 苹果系统分为 iOS (最多 4 款) 与 macOS (最多 4 款) 上下子象限。
   - 若要提名收录新工具，必须在 Issue 中提议替换哪一款现有工具并给出充足理由。

3. **固定标准格式**:
   所有教程文档与前端展示必须包括但不限于：
   - **更新时间** (Last Updated: YYYY-MM-DD)
   - **工具是否开源** 及开源许可证 (GPL / MIT / 商业闭源)
   - **工具最初发布时间**
   - **当前最新版本号**
   - **截图及其规格（风格化）**：提供对应系统的设备分辨率、架构参数与图解标注
   - **清晰的操作步骤 (Step 1 ~ Step 4)**
   - **常见排错 FAQ**

---

## 🛠️ 参与方式

### 方式一：通过 Pull Request 更新或新建教程
1. Fork 本仓库并 Clone 到本地；
2. 找到对应软件的独立更新文件（例如 `data/tutorials/ios/shadowrocket.md` 和 `src/data/tutorials/ios/shadowrocket.ts`）；
3. 修改或补全新版本操作步骤、协议支持说明；
4. 运行 `npm run build` 确保 TypeScript 与格式检验通过；
5. 提交 PR，等待 GitHub Actions 自动校验并由维护团队合并。

### 方式二：通过 GitHub Issues 提交报错或更新请求
若不熟悉 Git 命令，可直接使用仓库预置的 Issue 模板：
- 点击仓库 **Issues -> New Issue**；
- 选择 `📝 教程更新或报错反馈` 模板；
- 填写软件名称、失效步骤说明与期望更新的内容；
- 维护者将在 24 小时内根据 Issue 内容更新对应文件。

---

## 📐 A4 纸张与铅笔设计风格
- 网站整体背景模拟真实质感的 A4 纸张纤维；
- 线条、方框、按钮、边框均为铅笔素描笔触风格；
- 四大象限背景采用对应系统下最具代表性工具的高斯模糊图片。
