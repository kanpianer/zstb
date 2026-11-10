import React from 'react';
import { SubSystemCategory, SystemCategory } from '../types/tutorial';
import { QUADRANTS_CONFIG, getToolsByCategory, getToolsBySubSystem } from '../data/tutorials';
import { ArrowUpRight } from 'lucide-react';
import {
  PencilAppleLogo,
  PencilAndroidLogo,
  PencilWindowsLogo,
  PencilLinuxLogo,
} from './PencilSystemLogos';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { PencilQuadrantCross, PencilMobileDivider } from './PencilQuadrantCross';

interface QuadrantHomeProps {
  onSelectCategory: (category: SystemCategory) => void;
  onSelectSubSystem: (subSystem: SubSystemCategory) => void;
  onSelectTool: (toolId: string) => void;
  onOpenCrowdsourceModal: () => void;
}

export const QuadrantHome: React.FC<QuadrantHomeProps> = ({
  onSelectCategory,
  onSelectSubSystem,
  onSelectTool,
}) => {
  return (
    <div className="relative min-h-[520px] md:h-[560px] w-full">
      {/* 分隔四象限的手绘铅笔十字线 (Desktop) */}
      <PencilQuadrantCross />

      {/* 4 Quadrants Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 h-auto md:h-full">
        {/* Quadrant 1 (Top-Left): 苹果系统 */}
        <div
          onClick={() => onSelectCategory('apple')}
          className="group relative h-full min-h-[260px] p-4 sm:p-5 pb-3.5 flex flex-col justify-between cursor-pointer hover:bg-pencil/[0.03] rounded-xl transition-all overflow-hidden"
        >
          {/* Background Watermark Sketch */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-105 transition-all text-pencil-dark select-none">
            <PencilAppleLogo className="w-full h-full" />
          </div>

          {/* Quadrant Header */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-pencil bg-paper-50/90 flex items-center justify-center p-2 shadow-pencil group-hover:-rotate-3 group-hover:scale-105 transition-transform shrink-0">
                <PencilAppleLogo className="w-full h-full text-pencil-dark" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2">
                  <span>{QUADRANTS_CONFIG.apple.name}</span>
                </h2>
                <p className="text-xs text-pencil-light mt-0.5">
                  {QUADRANTS_CONFIG.apple.subTitle}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-pencil bg-paper-100 flex items-center justify-center shadow-pencil group-hover:scale-110 group-hover:bg-pencil group-hover:text-paper-50 transition-all shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Sub-categories and tool tags: Split into Left (iOS) and Right (macOS) sides */}
          <div className="relative z-10 mt-2 sm:mt-2.5 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              {/* Left Column: iOS */}
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-center justify-between px-1 pb-1 text-xs font-serif font-bold text-pencil-dark/75 border-b border-pencil/20 mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span>iOS</span>
                    <span className="text-[10px] font-sans font-normal text-pencil-faint">iPhone / iPad</span>
                  </div>
                </div>

                {/* iOS Software List (1 col x 4 tools) */}
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  {getToolsBySubSystem('ios').map(tool => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTool(tool.id);
                      }}
                      className="bg-paper-50/90 hover:bg-pencil hover:text-paper-50 border border-pencil/30 hover:border-pencil px-2.5 py-1.5 sm:py-2 rounded-xl text-pencil-dark font-medium transition-all shadow-xs hover:shadow-pencil hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-between group/tool text-left"
                      title={`点击查看 ${tool.name} 教程`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <PencilSoftwareLogo toolId={tool.id} className="w-4 h-4 text-pencil-dark group-hover/tool:text-paper-50 shrink-0 transition-colors" />
                        <span className="truncate text-xs font-serif font-bold">{tool.shortName}</span>
                      </div>
                      <span className="text-[9px] font-mono text-pencil-faint group-hover/tool:text-paper-100/75 shrink-0 ml-1 hidden sm:inline">
                        {tool.badgeText}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: macOS */}
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-center justify-between px-1 pb-1 text-xs font-serif font-bold text-pencil-dark/75 border-b border-pencil/20 mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span>macOS</span>
                    <span className="text-[10px] font-sans font-normal text-pencil-faint">MacBook / Mac</span>
                  </div>
                </div>

                {/* macOS Software List (1 col x 4 tools) */}
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  {getToolsBySubSystem('macos').map(tool => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTool(tool.id);
                      }}
                      className="bg-paper-50/90 hover:bg-pencil hover:text-paper-50 border border-pencil/30 hover:border-pencil px-2.5 py-1.5 sm:py-2 rounded-xl text-pencil-dark font-medium transition-all shadow-xs hover:shadow-pencil hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-between group/tool text-left"
                      title={`点击查看 ${tool.name} 教程`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <PencilSoftwareLogo toolId={tool.id} className="w-4 h-4 text-pencil-dark group-hover/tool:text-paper-50 shrink-0 transition-colors" />
                        <span className="truncate text-xs font-serif font-bold">{tool.shortName}</span>
                      </div>
                      <span className="text-[9px] font-mono text-pencil-faint group-hover/tool:text-paper-100/75 shrink-0 ml-1 hidden sm:inline">
                        {tool.badgeText}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 移动端手绘水平分割线 */}
          <PencilMobileDivider />
        </div>

        {/* Quadrant 2 (Top-Right): 安卓系统 */}
        <div
          onClick={() => onSelectCategory('android')}
          className="group relative h-full min-h-[260px] p-4 sm:p-5 pb-3.5 flex flex-col justify-between cursor-pointer hover:bg-pencil/[0.03] rounded-xl transition-all overflow-hidden"
        >
          {/* Background Watermark Sketch */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-105 transition-all text-pencil-dark select-none">
            <PencilAndroidLogo className="w-full h-full" />
          </div>

          {/* Quadrant Header */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-pencil bg-paper-50/90 flex items-center justify-center p-2 shadow-pencil group-hover:-rotate-3 group-hover:scale-105 transition-transform shrink-0">
                <PencilAndroidLogo className="w-full h-full text-pencil-dark" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2">
                  <span>{QUADRANTS_CONFIG.android.name}</span>
                </h2>
                <p className="text-xs text-pencil-light mt-0.5">
                  {QUADRANTS_CONFIG.android.subTitle}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-pencil bg-paper-100 flex items-center justify-center shadow-pencil group-hover:scale-110 group-hover:bg-pencil group-hover:text-paper-50 transition-all shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Tools Content Area */}
          <div className="relative z-10 mt-2 sm:mt-2.5 flex-1 flex flex-col justify-center">
            {/* 2x2 Grid of Comfortable Software Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              {getToolsByCategory('android').map(tool => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTool(tool.id);
                  }}
                  className="bg-paper-50/90 hover:bg-pencil hover:text-paper-50 border border-pencil/30 hover:border-pencil p-2.5 sm:p-3 sm:h-[85.5px] rounded-xl text-pencil-dark transition-all shadow-xs hover:shadow-pencil hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-between group/tool text-left"
                  title={`点击查看 ${tool.name} 教程`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-pencil/25 bg-paper-100 group-hover/tool:bg-paper-50/20 flex items-center justify-center p-1.5 shrink-0 transition-colors">
                      <PencilSoftwareLogo toolId={tool.id} className="w-full h-full text-pencil-dark group-hover/tool:text-paper-50 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs sm:text-sm font-serif font-bold group-hover/tool:text-paper-50">{tool.shortName}</span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-pencil-faint group-hover/tool:text-paper-100/75 truncate block mt-0.5">{tool.badgeText}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-pencil-light group-hover/tool:text-paper-50 opacity-40 group-hover/tool:opacity-100 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* 移动端手绘水平分割线 */}
          <PencilMobileDivider />
        </div>

        {/* Quadrant 3 (Bottom-Left): Windows系统 */}
        <div
          onClick={() => onSelectCategory('windows')}
          className="group relative h-full min-h-[260px] p-4 sm:p-5 pt-3.5 pb-3.5 flex flex-col justify-between cursor-pointer hover:bg-pencil/[0.03] rounded-xl transition-all overflow-hidden"
        >
          {/* Background Watermark Sketch */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-105 transition-all text-pencil-dark select-none">
            <PencilWindowsLogo className="w-full h-full" />
          </div>

          {/* Quadrant Header */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-pencil bg-paper-50/90 flex items-center justify-center p-2 shadow-pencil group-hover:-rotate-3 group-hover:scale-105 transition-transform shrink-0">
                <PencilWindowsLogo className="w-full h-full text-pencil-dark" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2">
                  <span>{QUADRANTS_CONFIG.windows.name}</span>
                </h2>
                <p className="text-xs text-pencil-light mt-0.5">
                  {QUADRANTS_CONFIG.windows.subTitle}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-pencil bg-paper-100 flex items-center justify-center shadow-pencil group-hover:scale-110 group-hover:bg-pencil group-hover:text-paper-50 transition-all shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Tools Content Area */}
          <div className="relative z-10 mt-2 sm:mt-2.5 flex-1 flex flex-col justify-center">
            {/* 2x2 Grid of Comfortable Software Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              {getToolsByCategory('windows').map(tool => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTool(tool.id);
                  }}
                  className="bg-paper-50/90 hover:bg-pencil hover:text-paper-50 border border-pencil/30 hover:border-pencil p-2.5 sm:p-3 sm:h-[85.5px] rounded-xl text-pencil-dark transition-all shadow-xs hover:shadow-pencil hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-between group/tool text-left"
                  title={`点击查看 ${tool.name} 教程`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-pencil/25 bg-paper-100 group-hover/tool:bg-paper-50/20 flex items-center justify-center p-1.5 shrink-0 transition-colors">
                      <PencilSoftwareLogo toolId={tool.id} className="w-full h-full text-pencil-dark group-hover/tool:text-paper-50 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs sm:text-sm font-serif font-bold group-hover/tool:text-paper-50">{tool.shortName}</span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-pencil-faint group-hover/tool:text-paper-100/75 truncate block mt-0.5">{tool.badgeText}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-pencil-light group-hover/tool:text-paper-50 opacity-40 group-hover/tool:opacity-100 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* 移动端手绘水平分割线 */}
          <PencilMobileDivider />
        </div>

        {/* Quadrant 4 (Bottom-Right): Linux 和软路由 */}
        <div
          onClick={() => onSelectCategory('linux')}
          className="group relative h-full min-h-[260px] p-4 sm:p-5 pt-3.5 pb-3.5 flex flex-col justify-between cursor-pointer hover:bg-pencil/[0.03] rounded-xl transition-all overflow-hidden"
        >
          {/* Background Watermark Sketch */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-105 transition-all text-pencil-dark select-none">
            <PencilLinuxLogo className="w-full h-full" />
          </div>

          {/* Quadrant Header */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-pencil bg-paper-50/90 flex items-center justify-center p-2 shadow-pencil group-hover:-rotate-3 group-hover:scale-105 transition-transform shrink-0">
                <PencilLinuxLogo className="w-full h-full text-pencil-dark" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2">
                  <span>{QUADRANTS_CONFIG.linux.name}</span>
                </h2>
                <p className="text-xs text-pencil-light mt-0.5">
                  {QUADRANTS_CONFIG.linux.subTitle}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-pencil bg-paper-100 flex items-center justify-center shadow-pencil group-hover:scale-110 group-hover:bg-pencil group-hover:text-paper-50 transition-all shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Tools Content Area */}
          <div className="relative z-10 mt-2 sm:mt-2.5 flex-1 flex flex-col justify-center">
            {/* 2x2 Grid of Comfortable Software Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              {getToolsByCategory('linux').map(tool => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTool(tool.id);
                  }}
                  className="bg-paper-50/90 hover:bg-pencil hover:text-paper-50 border border-pencil/30 hover:border-pencil p-2.5 sm:p-3 sm:h-[85.5px] rounded-xl text-pencil-dark transition-all shadow-xs hover:shadow-pencil hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-between group/tool text-left"
                  title={`点击查看 ${tool.name} 教程`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-pencil/25 bg-paper-100 group-hover/tool:bg-paper-50/20 flex items-center justify-center p-1.5 shrink-0 transition-colors">
                      <PencilSoftwareLogo toolId={tool.id} className="w-full h-full text-pencil-dark group-hover/tool:text-paper-50 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs sm:text-sm font-serif font-bold group-hover/tool:text-paper-50">{tool.shortName}</span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-pencil-faint group-hover/tool:text-paper-100/75 truncate block mt-0.5">{tool.badgeText}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-pencil-light group-hover/tool:text-paper-50 opacity-40 group-hover/tool:opacity-100 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
