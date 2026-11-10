import React, { useState } from 'react';
import { SoftwareTool } from '../types/tutorial';
import { ALL_TOOLS } from '../data/tutorials';
import { 
  X, 
  GitPullRequest, 
  AlertCircle, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles,
  BookOpen,
  Send,
  HelpCircle
} from 'lucide-react';

interface CrowdsourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTool?: SoftwareTool | null;
  initialMode?: 'pr' | 'issue' | 'guide';
}

export const CrowdsourceModal: React.FC<CrowdsourceModalProps> = ({
  isOpen,
  onClose,
  selectedTool,
  initialMode = 'guide'
}) => {
  const [activeTab, setActiveTab] = useState<'pr' | 'issue' | 'guide'>(initialMode);
  const [currentToolId, setCurrentToolId] = useState<string>(selectedTool ? selectedTool.id : ALL_TOOLS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  // Form states for generating Issue or PR template
  const currentTool = ALL_TOOLS.find(t => t.id === currentToolId) || ALL_TOOLS[0];
  const [updateSummary, setUpdateSummary] = useState<string>('更新协议支持与最新客户端版本');
  const [newVersion, setNewVersion] = useState<string>(currentTool.latestVersion);
  const [updateReason, setUpdateReason] = useState<string>('原教程中的部分规则在新版中已有变更，特此提交更新。');

  if (!isOpen) return null;

  const repoOwner = 'kanpianer';
  const repoName = 'zstb';

  // Generate standardized markdown template
  const generateMarkdownTemplate = () => {
    return `---
id: "${currentTool.id}"
name: "${currentTool.name}"
system: "${currentTool.system}"
category: "${currentTool.category}"
updated_at: "${new Date().toISOString().split('T')[0]}"
is_open_source: ${currentTool.isOpenSource}
license: "${currentTool.license}"${currentTool.price ? `\nprice: "${currentTool.price}"` : ''}
released_at: "${currentTool.releasedAt}"
latest_version: "${newVersion}"
update_path: "${currentTool.updatePath}"
official_site: "${currentTool.officialSite || ''}"
github_repo: "${currentTool.githubRepo || ''}"
specs:
  compatibility: "${currentTool.specs.compatibility}"
  architecture: "${currentTool.specs.architecture}"
  core_engine: "${currentTool.specs.coreEngine}"
  protocols: [${currentTool.specs.protocols.map(p => `"${p}"`).join(', ')}]
  traffic_handling: "${currentTool.specs.trafficHandling}"
---

# ${currentTool.name} 标准图文教程

> 独立更新路径: \`${currentTool.updatePath}\`
> 提交 PR 众包维护更新

## 一、规格与特性参数
- **系统适配**: ${currentTool.specs.compatibility}
- **核心引擎**: ${currentTool.specs.coreEngine}
- **开源性质**: ${currentTool.isOpenSource ? '开源 (' + currentTool.license + ')' : '闭源'}

## 二、图文安装与配置流程
${currentTool.tutorial.steps.map(s => `### 步骤 ${s.stepNumber}：${s.title}\n${s.description}\n${s.codeSnippet ? `\`\`\`${s.codeLanguage || 'text'}\n${s.codeSnippet}\n\`\`\`\n` : ''}${s.pencilTip ? `> ✏️ 铅笔批注：${s.pencilTip}\n` : ''}`).join('\n')}

## 三、进阶分流与防泄露最佳实践
${currentTool.tutorial.advancedRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

## 四、常见问题 FAQ
${currentTool.tutorial.faq.map(f => `- **Q: ${f.question}**\n  - A: ${f.answer}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownTemplate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const githubPrUrl = `https://github.com/${repoOwner}/${repoName}/edit/main/${currentTool.updatePath}`;
  const githubIssueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(`[教程更新] ${currentTool.name} 内容更新/报错`)}&body=${encodeURIComponent(
    `### 软件名称\n${currentTool.name}\n\n### 独立更新文件路径\n\`${currentTool.updatePath}\`\n\n### 当前版本 / 拟更新版本\n- 当前: ${currentTool.latestVersion}\n- 最新: ${newVersion}\n\n### 问题描述或更新说明\n${updateReason}\n\n### 补充截图或日志规范\n请附上规格化截图及测试情况。`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pencil-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] bg-paper-100 border-4 border-pencil rounded-2xl shadow-pencil-lg flex flex-col overflow-hidden relative a4-sheet">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b-2 border-pencil bg-paper-200/90">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-pencil" />
            <h2 className="font-serif font-black text-lg text-pencil-dark">
              GitHub 众包维护与贡献中心
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-pencil bg-paper-100 flex items-center justify-center hover:bg-pencil hover:text-paper-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-dashed border-pencil/40 bg-paper-200/50 text-xs font-mono font-semibold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'guide'
                ? 'bg-paper-100 border-b-2 border-pencil text-pencil-dark font-bold'
                : 'text-pencil-light hover:bg-paper-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>贡献流程</span>
          </button>

          <button
            onClick={() => setActiveTab('pr')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'pr'
                ? 'bg-paper-100 border-b-2 border-pencil text-pencil-dark font-bold'
                : 'text-pencil-light hover:bg-paper-200/80'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5 text-blue-700" />
            <span>提交 PR</span>
          </button>

          <button
            onClick={() => setActiveTab('issue')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'issue'
                ? 'bg-paper-100 border-b-2 border-pencil text-pencil-dark font-bold'
                : 'text-pencil-light hover:bg-paper-200/80'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>提交 Issue</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
          {/* TAB 1: WORKFLOW EXPLANATION */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1">1. 独立文件</div>
                  <p className="text-[11px] text-pencil-light font-sans">
                    每个软件拥有独立的 Markdown 文件，提交修改互不冲突。
                  </p>
                </div>

                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1">2. 提交 PR</div>
                  <p className="text-[11px] text-pencil-light font-sans">
                    修改后发起 Pull Request，CI 自动进行代码与格式检查。
                  </p>
                </div>

                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1">3. Issue 反馈</div>
                  <p className="text-[11px] text-pencil-light font-sans">
                    遇到失效步骤或界面变更，可使用 Issue 模板提交更新反馈。
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-paper-50 border-2 border-dashed border-pencil/40 rounded-xl space-y-1.5">
                <h4 className="font-bold text-pencil-dark font-serif">教程包含内容：</h4>
                <ul className="list-disc list-inside space-y-1 text-pencil-light text-[11px]">
                  <li>更新时间、开源状态及许可证、首发时间</li>
                  <li>支持协议与环境参数</li>
                  <li>详细图文配置步骤</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PULL REQUEST GENERATOR */}
          {activeTab === 'pr' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block font-bold text-pencil-dark mb-1">目标软件：</label>
                  <select
                    value={currentToolId}
                    onChange={(e) => setCurrentToolId(e.target.value)}
                    className="w-full p-2 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none"
                  >
                    {ALL_TOOLS.map(tool => (
                      <option key={tool.id} value={tool.id}>
                        [{tool.system.toUpperCase()}] {tool.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-pencil-dark mb-1">拟更新版本号：</label>
                  <input
                    type="text"
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    className="w-full p-2 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none"
                    placeholder="如: v2.3.0"
                  />
                </div>
              </div>

              <div className="p-3 bg-paper-200/80 border border-pencil/30 rounded-lg text-xs font-mono">
                <span className="text-pencil-faint block">对应 GitHub 独立更新文件：</span>
                <code className="text-pencil-dark font-bold">{currentTool.updatePath}</code>
              </div>

              {/* Code Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-pencil-dark font-serif">标准 Markdown 教程内容预览：</span>
                  <button
                    onClick={handleCopyMarkdown}
                    className="pencil-btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? '已复制全部' : '复制标准模板'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-pencil-dark text-paper-50 rounded-xl max-h-48 overflow-y-auto font-mono text-[10px] leading-relaxed border border-pencil">
                  {generateMarkdownTemplate()}
                </pre>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={githubPrUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pencil-btn flex-1 py-2 text-center text-xs bg-paper-50 hover:bg-white text-pencil-dark font-bold"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-blue-700" />
                  <span>在 GitHub Web 编辑器中发起 PR ➔</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: ISSUE REPORTER */}
          {activeTab === 'issue' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block font-bold text-pencil-dark mb-1">选择反馈软件：</label>
                  <select
                    value={currentToolId}
                    onChange={(e) => setCurrentToolId(e.target.value)}
                    className="w-full p-2 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none"
                  >
                    {ALL_TOOLS.map(tool => (
                      <option key={tool.id} value={tool.id}>
                        [{tool.system.toUpperCase()}] {tool.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-pencil-dark mb-1">反馈类型：</label>
                  <input
                    type="text"
                    value={updateSummary}
                    onChange={(e) => setUpdateSummary(e.target.value)}
                    className="w-full p-2 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none"
                    placeholder="如: 节点失效、教程步骤变更"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-pencil-dark mb-1 font-serif">详细报错或更新建议：</label>
                <textarea
                  rows={4}
                  value={updateReason}
                  onChange={(e) => setUpdateReason(e.target.value)}
                  className="w-full p-2.5 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none font-sans text-xs"
                  placeholder="请详细描述哪一步操作出现问题，或者新版客户端有哪些界面发生了变化..."
                />
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  点击下方按钮将自动唤起带有预填参数的 GitHub Issue 页面，无需手动排版。
                </span>
              </div>

              <div className="pt-2">
                <a
                  href={githubIssueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pencil-btn w-full py-2.5 text-center text-xs bg-paper-50 hover:bg-white text-pencil-dark font-bold"
                >
                  <Send className="w-3.5 h-3.5 text-pencil" />
                  <span>携带模板前往 GitHub 创建 Issue ➔</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-dashed border-pencil/30 bg-paper-200/80 flex items-center justify-between text-[11px] font-mono text-pencil-faint">
          <span>仓库: github.com/{repoOwner}/{repoName}</span>
          <button
            onClick={onClose}
            className="hover:underline text-pencil-dark font-bold"
          >
            关闭窗口
          </button>
        </div>
      </div>
    </div>
  );
};
