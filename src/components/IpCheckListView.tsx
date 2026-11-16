import React from 'react';
import { IP_CHECK_SITES, IpCheckSite } from '../data/ipCheckSites';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { ExternalLink, BookOpen, CheckCircle2 } from 'lucide-react';

interface IpCheckListViewProps {
  onSelectSite: (siteId: string) => void;
  onNavigateHome: () => void;
}

export const IpCheckListView: React.FC<IpCheckListViewProps> = ({
  onSelectSite,
}) => {
  const handleVisit = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 min-h-[520px] md:h-[560px] w-full">
      {IP_CHECK_SITES.map((site: IpCheckSite, idx: number) => (
        <div
          key={site.id}
          onClick={() => onSelectSite(site.id)}
          className="pencil-box bg-paper-50 hover:bg-paper-200 p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden group h-full transition-colors cursor-pointer select-none"
          title={`点击查看 ${site.name} 详细教程与功能介绍`}
        >
          {/* 卡片背景手绘底纹 Watermark */}
          <div className="absolute right-1 -top-1 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] transition-all text-pencil-dark select-none -rotate-6">
            <PencilSoftwareLogo toolId={site.id} className="w-full h-full" />
          </div>

          {/* 卡片上半部分内容 */}
          <div className="relative z-10">
            {/* 顶部序号与标签 */}
            <div className="flex items-center justify-between border-b border-dashed border-pencil/30 pb-1.5 mb-2 text-xs">
              <span className="font-mono font-bold text-pencil-faint text-xs">
                #{idx + 1}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] bg-paper-200 border border-pencil/30 px-1.5 py-0.5 rounded text-pencil-dark">
                {site.badge}
              </span>
            </div>

            {/* 标题、手绘 Logo 与一句话介绍 */}
            <div className="flex items-center justify-between gap-1.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-pencil/30 bg-paper-100/90 flex items-center justify-center p-1 shadow-xs shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform overflow-hidden">
                  <PencilSoftwareLogo toolId={site.id} className="w-full h-full text-pencil-dark" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] sm:text-base font-serif font-black text-pencil-dark group-hover:underline leading-tight truncate">
                    {site.name}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-pencil-faint shrink-0 truncate max-w-[120px] sm:max-w-[160px]">
                {site.url.replace(/^https?:\/\//, '').replace(/\/?\?.*$/, '')}
              </span>
            </div>

            {/* 详细简介 (保持两行紧凑展示) */}
            <p
              className="text-xs text-pencil-light mt-1.5 line-clamp-2 font-sans leading-relaxed"
              title={site.description}
            >
              {site.description}
            </p>

            {/* 核心检测能力速览框 */}
            <div className="mt-2.5 p-2 sm:p-2.5 bg-paper-200/70 border border-pencil/30 rounded-lg font-mono text-[10px] sm:text-[11px] text-pencil-dark flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                <span className="text-pencil-faint text-[10px] shrink-0 font-sans">核心特色:</span>
                <div className="flex items-center gap-1 min-w-0 overflow-hidden flex-nowrap">
                  {site.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="bg-surface border border-pencil/20 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] leading-tight shrink-0 flex items-center gap-0.5"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      <span>{f.title}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-pencil-faint">
                <span className="truncate">适用: {site.scenarios[0]}</span>
              </div>
            </div>
          </div>

          {/* 卡片底部操作按钮 */}
          <div className="mt-auto pt-2 pb-1.5 sm:pb-2.5 flex items-center justify-between gap-2 relative z-10 border-t border-dashed border-pencil/20">
            {/* 访问按钮：点击直接新标签页打开目标网站 */}
            <button
              type="button"
              onClick={(e) => handleVisit(e, site.url)}
              className="pencil-btn-secondary text-[11px] flex items-center gap-1.5 py-1 px-3 text-pencil-dark hover:bg-paper-100 font-bold active:scale-95 transition-all shadow-xs"
              title={`在新窗口中直接访问 ${site.url}`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>访问</span>
            </button>

            {/* 查看教程与功能介绍按钮 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSite(site.id);
              }}
              className="pencil-btn text-xs py-1.5 px-3 flex items-center gap-1.5 text-pencil-dark active:scale-95 transition-all"
              title="查看使用教程与功能指标核对"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>教程与功能 ➔</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
