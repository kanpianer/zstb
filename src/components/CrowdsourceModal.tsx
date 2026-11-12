import React, { useState, useEffect } from 'react';
import { SoftwareTool } from '../types/tutorial';
import { ALL_TOOLS } from '../data/tutorials';
import { 
  X, 
  GitPullRequest, 
  AlertCircle, 
  BookOpen,
  Send,
  GitFork
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

  // Form states for generating Issue or PR template
  const currentTool = ALL_TOOLS.find(t => t.id === currentToolId) || ALL_TOOLS[0];
  const [updateSummary, setUpdateSummary] = useState<string>('更新协议支持与最新客户端版本');
  const [newVersion, setNewVersion] = useState<string>(currentTool.latestVersion);
  const [updateReason, setUpdateReason] = useState<string>('原教程中的部分规则在新版中已有变更，特此提交更新。');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      if (selectedTool) {
        setCurrentToolId(selectedTool.id);
        setNewVersion(selectedTool.latestVersion);
      }
    }
  }, [isOpen, initialMode, selectedTool]);

  if (!isOpen) return null;

  const repoOwner = 'kanpianer';
  const repoName = 'zstb';

  const handleToolChange = (toolId: string) => {
    setCurrentToolId(toolId);
    const found = ALL_TOOLS.find(t => t.id === toolId);
    if (found) {
      setNewVersion(found.latestVersion);
    }
  };

  const githubForkUrl = `https://github.com/${repoOwner}/${repoName}/fork`;
  const githubPrUrl = `https://github.com/${repoOwner}/${repoName}/edit/main/${currentTool.updatePath}`;
  const githubIssueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(`[教程更新] ${currentTool.name} 内容更新/报错`)}&body=${encodeURIComponent(
    `### 软件名称\n${currentTool.name}\n\n### 教程文件路径\n\`${currentTool.updatePath}\`\n\n### 当前版本 / 拟更新版本\n- 当前: ${currentTool.latestVersion}\n- 最新: ${newVersion}\n\n### 问题描述或更新说明\n${updateReason}\n\n### 补充截图或日志规范\n请附上规格化截图及测试情况。`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pencil-dark/60 backdrop-blur-sm animate-fadeIn">
      {/* Fixed-height container to guarantee tab switching never changes the window height */}
      <div className="w-full max-w-2xl h-[540px] max-h-[90vh] bg-paper-100 border-4 border-pencil rounded-2xl shadow-pencil-lg flex flex-col overflow-hidden relative a4-sheet">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b-2 border-pencil bg-paper-200/90 shrink-0">
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
        <div className="flex bg-paper-200/50 text-xs font-mono font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'guide'
                ? 'bg-paper-100 border-b-2 border-pencil text-pencil-dark font-bold'
                : 'border-b-2 border-transparent text-pencil-light hover:bg-paper-200/80'
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
                : 'border-b-2 border-transparent text-pencil-light hover:bg-paper-200/80'
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
                : 'border-b-2 border-transparent text-pencil-light hover:bg-paper-200/80'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>提交 Issue</span>
          </button>
        </div>

        {/* Modal Body: fills remaining height with scrollable overflow if needed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
          {/* TAB 1: WORKFLOW EXPLANATION */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1 flex items-center gap-1.5">
                    <GitFork className="w-3.5 h-3.5 text-pencil-dark shrink-0" />
                    <span>1. Fork 仓库</span>
                  </div>
                  <p className="text-[11px] text-pencil-light font-sans leading-relaxed">
                    用户需先将本仓库 Fork 到个人 GitHub 账号，在个人分支中编辑与更新教程。
                  </p>
                </div>

                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1 flex items-center gap-1.5">
                    <GitPullRequest className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>2. 提交 PR</span>
                  </div>
                  <p className="text-[11px] text-pencil-light font-sans leading-relaxed">
                    在分支修改或补充教程内容后发起 Pull Request，CI 自动化进行校验合并。
                  </p>
                </div>

                <div className="p-3 bg-paper-50 border-2 border-pencil rounded-lg">
                  <div className="font-bold text-pencil-dark mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>3. Issue 反馈</span>
                  </div>
                  <p className="text-[11px] text-pencil-light font-sans leading-relaxed">
                    遇到配置失效、链接变动或客户端报错，可通过标准 Issue 模板直接提交反馈。
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-paper-50 border-2 border-pencil/40 rounded-xl space-y-2">
                <h4 className="font-bold text-pencil-dark font-serif text-sm">开源协同贡献说明：</h4>
                <ul className="list-disc list-inside space-y-1.5 text-pencil-light text-[11px] leading-relaxed">
                  <li>通过 Fork 个人仓库提交更改，保证主干安全与多人协作顺畅</li>
                  <li>支持直接在 GitHub 浏览器网页编辑器中修改教程，免配置本地开发环境</li>
                  <li>每次 PR 合并后将自动同步至对应软件的“教程更新记录”</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PULL REQUEST WORKFLOW */}
          {activeTab === 'pr' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block font-bold text-pencil-dark mb-1">目标软件：</label>
                  <select
                    value={currentToolId}
                    onChange={(e) => handleToolChange(e.target.value)}
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
                <span className="text-pencil-faint block">对应教程文件路径：</span>
                <code className="text-pencil-dark font-bold">{currentTool.updatePath}</code>
              </div>

              {/* PR Step Guidelines */}
              <div className="p-3.5 bg-paper-50 border-2 border-pencil rounded-xl space-y-2">
                <h4 className="font-bold text-pencil-dark font-serif text-sm">Fork 与 PR 提交步骤：</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-pencil-light text-[11px] leading-relaxed">
                  <li>点击下方按钮直接跳转到该教程在 GitHub 的在线 Web 编辑器。</li>
                  <li>若您尚未 Fork 仓库，GitHub 将自动提示为您 Fork 到个人空间并创建分支。</li>
                  <li>根据实际界面修改文字与配置说明，填写简要提交说明后发起 Pull Request。</li>
                </ol>
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
                    onChange={(e) => handleToolChange(e.target.value)}
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
                  rows={3}
                  value={updateReason}
                  onChange={(e) => setUpdateReason(e.target.value)}
                  className="w-full p-2.5 bg-paper-50 border-2 border-pencil rounded-lg focus:outline-none font-sans text-xs"
                  placeholder="请详细描述哪一步操作出现问题，或者新版客户端有哪些界面发生了变化..."
                />
              </div>

              <div className="p-2.5 bg-amber-50/80 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  点击下方按钮将自动唤起带有预填参数的 GitHub Issue 页面，无需手动排版。
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button Section: Guaranteed to sit at the exact same position across all 3 tabs */}
        <div className="px-5 py-3 bg-paper-100 shrink-0">
          {activeTab === 'guide' && (
            <a
              href={githubForkUrl}
              target="_blank"
              rel="noreferrer"
              className="pencil-btn w-full py-2.5 text-center text-xs bg-paper-50 hover:bg-white text-pencil-dark font-bold flex items-center justify-center gap-1.5"
            >
              <GitFork className="w-3.5 h-3.5 text-pencil-dark" />
              <span>一键 Fork 本项目 ➔</span>
            </a>
          )}
          {activeTab === 'pr' && (
            <a
              href={githubPrUrl}
              target="_blank"
              rel="noreferrer"
              className="pencil-btn w-full py-2.5 text-center text-xs bg-paper-50 hover:bg-white text-pencil-dark font-bold flex items-center justify-center gap-1.5"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-blue-700" />
              <span>在 GitHub Web 编辑器中发起 PR ➔</span>
            </a>
          )}
          {activeTab === 'issue' && (
            <a
              href={githubIssueUrl}
              target="_blank"
              rel="noreferrer"
              className="pencil-btn w-full py-2.5 text-center text-xs bg-paper-50 hover:bg-white text-pencil-dark font-bold flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-pencil" />
              <span>携带模板前往 GitHub 创建 Issue ➔</span>
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-paper-200/80 flex items-center justify-between text-[11px] font-mono text-pencil-faint shrink-0">
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
