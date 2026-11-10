import React from 'react';
import { SubSystemCategory } from '../types/tutorial';
import { getToolsBySubSystem } from '../data/tutorials';
import { Smartphone, Laptop } from 'lucide-react';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';

interface AppleQuadrantViewProps {
  onBackToHome?: () => void;
  onSelectSubSystem: (subSystem: SubSystemCategory) => void;
  onSelectTool: (toolId: string) => void;
}

export const AppleQuadrantView: React.FC<AppleQuadrantViewProps> = ({
  onSelectSubSystem,
  onSelectTool
}) => {
  const iosTools = getToolsBySubSystem('ios');
  const macosTools = getToolsBySubSystem('macos');

  return (
    <div className="relative border-4 border-pencil rounded-2xl overflow-hidden shadow-pencil-lg bg-paper-100 min-h-[520px] md:h-[560px] w-full flex flex-col divide-y-4 divide-pencil">
      {/* UPPER SUB-QUADRANT: iOS */}
      <div className="group relative flex-1 min-h-[260px] p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden bg-paper-100/60 hover:bg-paper-50/70 transition-all">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 
              onClick={() => onSelectSubSystem('ios')}
              className="text-lg sm:text-xl lg:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2 cursor-pointer hover:underline"
            >
              <Smartphone className="w-5 h-5 lg:w-6 lg:h-6 text-pencil-dark" />
              <span>iOS (iPhone / iPad)</span>
            </h3>
          </div>
        </div>

        {/* 4 iOS Tools Cards Grid */}
        <div className="relative z-10 mt-2 sm:mt-2.5 lg:mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3">
          {iosTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="p-2 sm:p-2.5 lg:p-3.5 bg-paper-50/95 border-2 border-pencil rounded-xl shadow-xs hover:shadow-pencil hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm h-[88px] sm:h-[92px] lg:h-[156px] lg:min-h-[156px] relative overflow-hidden group/card"
            >
              {/* Card Background Watermark Logo at the top */}
              <div className="absolute right-1 -top-1 w-16 h-16 pointer-events-none opacity-[0.06] group-hover/card:opacity-[0.14] transition-all text-pencil-dark select-none -rotate-6">
                <PencilSoftwareLogo toolId={tool.id} className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-0.5 lg:mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <PencilSoftwareLogo toolId={tool.id} className="w-4 h-4 text-pencil-dark shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-pencil-dark font-serif truncate">{tool.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[9px]">
                    <span className="bg-paper-200 border border-pencil/30 px-1 py-0.2 rounded text-pencil-dark">
                      {tool.isOpenSource ? '开源' : '闭源'}
                    </span>
                  </div>
                </div>

                {/* Primary Tagline: 移动端保留短介绍，桌面端隐藏 */}
                <p className="text-[11px] text-pencil-dark font-medium line-clamp-1 mt-0.5 font-sans leading-snug lg:hidden">
                  {tool.tagline}
                </p>

                {/* Detailed Introduction: 移动端隐藏长介绍，桌面端保留三行内容 */}
                <p className="text-[10px] text-pencil-light font-sans hidden lg:line-clamp-3 mt-1 leading-relaxed">
                  {tool.description}
                </p>

                {/* Protocol & Core Feature Tags */}
                <div className="hidden lg:flex items-center gap-1 mt-1.5 overflow-hidden">
                  <span className="text-[9px] font-mono bg-paper-200 border border-pencil/20 px-1 py-0.2 rounded text-pencil-dark font-semibold shrink-0">
                    {tool.latestVersion}
                  </span>
                  {tool.specs.protocols.slice(0, 3).map((p, i) => (
                    <span key={i} className="text-[9px] font-mono bg-white border border-pencil/20 px-1 py-0.2 rounded text-pencil-light truncate shrink-0">
                      {p}
                    </span>
                  ))}
                  {tool.specs.protocols.length > 3 && (
                    <span className="text-[9px] font-mono text-pencil-faint shrink-0">
                      +{tool.specs.protocols.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative z-10 mt-1 pt-1 lg:mt-2 lg:pt-1.5 border-t border-dashed border-pencil/30 flex items-center justify-between text-[10px] font-mono text-pencil-light">
                <span>更新: {tool.updatedAt}</span>
                <span className="font-bold text-pencil-dark underline">教程 ➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOWER SUB-QUADRANT: macOS */}
      <div className="group relative flex-1 min-h-[260px] p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden bg-paper-100/60 hover:bg-paper-50/70 transition-all">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 
              onClick={() => onSelectSubSystem('macos')}
              className="text-lg sm:text-xl lg:text-2xl font-serif font-black text-pencil-dark flex items-center gap-2 cursor-pointer hover:underline"
            >
              <Laptop className="w-5 h-5 lg:w-6 lg:h-6 text-pencil-dark" />
              <span>macOS (MacBook / Mac)</span>
            </h3>
          </div>
        </div>

        {/* 4 macOS Tools Cards Grid */}
        <div className="relative z-10 mt-2 sm:mt-2.5 lg:mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3">
          {macosTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="p-2 sm:p-2.5 lg:p-3.5 bg-paper-50/95 border-2 border-pencil rounded-xl shadow-xs hover:shadow-pencil hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm h-[88px] sm:h-[92px] lg:h-[156px] lg:min-h-[156px] relative overflow-hidden group/card"
            >
              {/* Card Background Watermark Logo at the top */}
              <div className="absolute right-1 -top-1 w-16 h-16 pointer-events-none opacity-[0.06] group-hover/card:opacity-[0.14] transition-all text-pencil-dark select-none -rotate-6">
                <PencilSoftwareLogo toolId={tool.id} className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-0.5 lg:mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <PencilSoftwareLogo toolId={tool.id} className="w-4 h-4 text-pencil-dark shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-pencil-dark font-serif truncate">{tool.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[9px]">
                    <span className="bg-paper-200 border border-pencil/30 px-1 py-0.2 rounded text-pencil-dark">
                      {tool.isOpenSource ? '开源' : '闭源'}
                    </span>
                  </div>
                </div>

                {/* Primary Tagline: 移动端保留短介绍，桌面端隐藏 */}
                <p className="text-[11px] text-pencil-dark font-medium line-clamp-1 mt-0.5 font-sans leading-snug lg:hidden">
                  {tool.tagline}
                </p>

                {/* Detailed Introduction: 移动端隐藏长介绍，桌面端保留三行内容 */}
                <p className="text-[10px] text-pencil-light font-sans hidden lg:line-clamp-3 mt-1 leading-relaxed">
                  {tool.description}
                </p>

                {/* Protocol & Core Feature Tags */}
                <div className="hidden lg:flex items-center gap-1 mt-1.5 overflow-hidden">
                  <span className="text-[9px] font-mono bg-paper-200 border border-pencil/20 px-1 py-0.2 rounded text-pencil-dark font-semibold shrink-0">
                    {tool.latestVersion}
                  </span>
                  {tool.specs.protocols.slice(0, 3).map((p, i) => (
                    <span key={i} className="text-[9px] font-mono bg-white border border-pencil/20 px-1 py-0.2 rounded text-pencil-light truncate shrink-0">
                      {p}
                    </span>
                  ))}
                  {tool.specs.protocols.length > 3 && (
                    <span className="text-[9px] font-mono text-pencil-faint shrink-0">
                      +{tool.specs.protocols.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative z-10 mt-1 pt-1 lg:mt-2 lg:pt-1.5 border-t border-dashed border-pencil/30 flex items-center justify-between text-[10px] font-mono text-pencil-light">
                <span>更新: {tool.updatedAt}</span>
                <span className="font-bold text-pencil-dark underline">教程 ➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
