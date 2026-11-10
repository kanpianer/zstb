import fs from 'fs';
import path from 'path';
import { ALL_TOOLS } from '../src/data/tutorials/index';

for (const tool of ALL_TOOLS) {
  const filePath = path.resolve(tool.updatePath);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `---
id: "${tool.id}"
name: "${tool.name}"
system: "${tool.system}"
category: "${tool.category}"
tagline: "${tool.tagline}"

# 必填固定标准格式字段
updated_at: "${tool.updatedAt}"
is_open_source: ${tool.isOpenSource}
license: "${tool.license}"${tool.price ? `\nprice: "${tool.price}"` : ''}
released_at: "${tool.releasedAt}"
latest_version: "${tool.latestVersion}"
update_path: "${tool.updatePath}"

official_site: "${tool.officialSite || ''}"
github_repo: "${tool.githubRepo || ''}"

specs:
  compatibility: "${tool.specs.compatibility}"
  architecture: "${tool.specs.architecture}"
  core_engine: "${tool.specs.coreEngine}"
  protocols: [${tool.specs.protocols.map(p => `"${p}"`).join(', ')}]
  traffic_handling: "${tool.specs.trafficHandling}"
  resource_footprint: "${tool.specs.resourceFootprint}"

screenshot:
  device_type: "${tool.screenshot.deviceType}"
  device_spec: "${tool.screenshot.deviceSpec}"
  resolution: "${tool.screenshot.screenResolution}"
  title: "${tool.screenshot.title}"
  caption: "${tool.screenshot.caption || ''}"
---

# ${tool.name} 众包图文教程

> **独立更新路径**: \`${tool.updatePath}\`  
> **更新时间**: ${tool.updatedAt} | **开源性质**: ${tool.isOpenSource ? '开源 (' + tool.license + ')' : '闭源'} | **最初发布**: ${tool.releasedAt}

## 一、软件简介与核心规格
${tool.description}

### 规格参数
- **支持架构**: ${tool.specs.architecture}
- **系统要求**: ${tool.specs.compatibility}
- **底层引擎**: ${tool.specs.coreEngine}
- **流量接管模式**: ${tool.specs.trafficHandling}
- **资源消耗**: ${tool.specs.resourceFootprint}
- **支持协议**: ${tool.specs.protocols.join(', ')}

---

## 二、风格化截图与图解规格
- **设备线框规格**: ${tool.screenshot.deviceSpec} (${tool.screenshot.screenResolution})
${tool.screenshot.caption ? `- **图解说明**: ${tool.screenshot.caption}\n` : ''}
### 关键控制点标注
${tool.screenshot.annotations.map(a => `- **${a.label}**: ${a.note}`).join('\n')}

---

## 三、标准操作步骤指南

${tool.tutorial.steps.map(s => `### 步骤 ${s.stepNumber}：${s.title}
${s.description}

${s.codeSnippet ? `\`\`\`${s.codeLanguage || 'text'}
${s.codeSnippet}
\`\`\`
` : ''}${s.pencilTip ? `> ✏️ **铅笔提示**: ${s.pencilTip}
` : ''}`).join('\n')}

---

## 四、进阶分流与防泄露建议
${tool.tutorial.advancedRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

---

## 五、常见问题与避坑 FAQ
${tool.tutorial.faq.map(f => `#### Q: ${f.question}
**A**: ${f.answer}
`).join('\n')}

---

## 六、众包维护历史与贡献者
| 日期 | 维护者 | PR 编号 | 变更说明 | Commit |
| :--- | :--- | :--- | :--- | :--- |
${tool.changelog.map(c => `| ${c.date} | ${c.author} | #${c.prNumber} | ${c.summary} | \`${c.commitHash}\` |`).join('\n')}

---
*本教程通过 GitHub 众包模式协同维护，欢迎在 GitHub 上提交 PR 或 Issue 进行内容更迭。*
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Generated: ${tool.updatePath}`);
}

console.log('All 20 markdown tutorial files generated successfully!');
