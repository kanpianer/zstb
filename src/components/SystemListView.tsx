import React from 'react';
import { SubSystemCategory, SystemCategory, SoftwareTool } from '../types/tutorial';
import { getToolsBySubSystem } from '../data/tutorials';
import { 
  BookOpen, 
  GitPullRequest, 
  Calendar, 
} from 'lucide-react';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';

interface SystemListViewProps {
  category: SystemCategory;
  subSystem: SubSystemCategory;
  onBack: () => void;
  onNavigateHome?: () => void;
  onSelectTool: (toolId: string) => void;
  onOpenCrowdsourceForTool: (tool: SoftwareTool) => void;
}

export const SystemListView: React.FC<SystemListViewProps> = ({
  subSystem,
  onSelectTool,
  onOpenCrowdsourceForTool
}) => {
  const tools = getToolsBySubSystem(subSystem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 min-h-[520px] md:h-[560px] w-full">
      {tools.map((tool, idx) => (
        <div
          key={tool.id}
          className="pencil-box bg-paper-50 hover:bg-paper-200 p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden group h-full transition-colors"
        >
          {/* Card Background Watermark Logo at the top (在卡片背景上方的手绘底纹 Logo) */}
          <div className="absolute right-1 -top-1 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-[0.07] group-hover:opacity-[0.15] transition-all text-pencil-dark select-none -rotate-6">
            <PencilSoftwareLogo toolId={tool.id} className="w-full h-full" />
          </div>

          {/* Top Section */}
          <div className="relative z-10">
            {/* Top Serial & Badges */}
            <div className="flex items-center justify-between border-b border-dashed border-pencil/30 pb-1.5 mb-2 text-xs">
              <span className="font-mono font-bold text-pencil-faint text-xs">
                #{idx + 1}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px]">
                <span className={`px-1.5 py-0.5 rounded border ${
                  tool.isOpenSource 
                    ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold' 
                    : 'bg-amber-100/70 border-amber-400 text-amber-900'
                }`}>
                  {tool.isOpenSource ? '开源' : '闭源'}
                </span>
                <span className="bg-paper-200 border border-pencil/30 px-1.5 py-0.5 rounded text-pencil-dark">
                  {tool.category === 'apple'
                    ? tool.latestVersion.match(/\b[vV]?\d+(?:\.\d+)+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?(?:\+[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?\b/)?.[0] ?? '版本待确认'
                    : tool.latestVersion}
                </span>
              </div>
            </div>

            {/* Title & Tagline with Pencil Software Logo */}
            <div className="flex items-center justify-between gap-1.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg border border-pencil/30 bg-paper-100/90 flex items-center justify-center p-1 shadow-xs shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                  <PencilSoftwareLogo toolId={tool.id} className="w-full h-full text-pencil-dark" />
                </div>
                <h3 
                  onClick={() => onSelectTool(tool.id)}
                  className="text-[15px] sm:text-base font-serif font-black text-pencil-dark hover:underline cursor-pointer leading-tight truncate"
                  title={tool.name}
                >
                  {tool.name}
                </h3>
              </div>
              {tool.category !== 'apple' && (
                <span className="text-[10px] sm:text-[11px] font-mono font-normal bg-pencil/10 px-1.5 py-0.5 rounded text-pencil-dark shrink-0">
                  {tool.badgeText}
                </span>
              )}
            </div>

            {/* Detailed Introduction / 简介: 统一两行展示，保持卡片匀称并留足底部按钮空间 */}
            <p 
              className="text-xs text-pencil-light mt-1.5 line-clamp-2 font-sans leading-relaxed" 
              title={tool.description}
            >
              {tool.description}
            </p>

            {/* Compact Metadata Box */}
            <div className="mt-2.5 p-2 sm:p-2.5 bg-paper-200/70 border border-pencil/30 rounded-lg font-mono text-[10px] sm:text-[11px] text-pencil-dark flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-pencil-faint text-[10px]">最近更新:</span>
                  <span className="font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-pencil-light" />
                    {tool.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-pencil-faint text-[10px]">发布时间:</span>
                  <span>{tool.releasedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="text-pencil-faint text-[10px] shrink-0">支持协议:</span>
                <div className="flex items-center gap-1 flex-wrap overflow-hidden">
                  {tool.specs.protocols.slice(0, 4).map((p, i) => (
                    <span key={i} className="bg-white border border-pencil/20 px-1 py-0.2 rounded text-[9px] sm:text-[10px] leading-tight shrink-0">
                      {p}
                    </span>
                  ))}
                  {tool.specs.protocols.length > 4 && (
                    <span className="text-pencil-faint text-[9px] sm:text-[10px] shrink-0 font-sans">
                      +{tool.specs.protocols.length - 4}项
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions - 适度留白与舒适点击区，避免按钮紧贴底边 */}
          <div className="mt-auto pt-2 pb-1.5 sm:pb-2.5 flex items-center justify-between gap-2 relative z-10">
            <button
              onClick={() => onOpenCrowdsourceForTool(tool)}
              className="pencil-btn-secondary text-[11px] flex items-center gap-1 py-1 px-2.5"
              title="提交 PR 更新教程"
            >
              <GitPullRequest className="w-3 h-3 text-blue-700" />
              <span>更新 (PR)</span>
            </button>

            <button
              onClick={() => onSelectTool(tool.id)}
              className="pencil-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>查看教程 ➔</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
