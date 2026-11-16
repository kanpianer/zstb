import React, { useState } from 'react';
import { IpCheckSite } from '../data/ipCheckSites';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Info, 
  HelpCircle, 
  Terminal
} from 'lucide-react';

interface IpCheckDetailViewProps {
  site: IpCheckSite;
  onBack: () => void;
  onNavigateHome: () => void;
}

export const IpCheckDetailView: React.FC<IpCheckDetailViewProps> = ({
  site,
  onBack,
  onNavigateHome,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetIndex(index);
    setTimeout(() => {
      setCopiedSnippetIndex(null);
    }, 2000);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* 顶部主简介横幅卡片 */}
      <section className="pencil-box bg-paper-50 p-4 sm:p-6 md:p-7 relative overflow-hidden">
        {/* 背景大水印手绘 Logo */}
        <div className="absolute right-3 -top-2 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-[0.06] text-pencil-dark select-none -rotate-6">
          <PencilSoftwareLogo toolId={site.id} className="w-full h-full" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            {/* 顶栏徽章与面包屑 */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono bg-paper-200 border border-pencil/30 px-2 py-0.5 rounded text-pencil-dark font-semibold">
                {site.badge}
              </span>
              <span className="text-xs font-mono bg-emerald-100/70 border border-emerald-400 text-emerald-900 px-2 py-0.5 rounded font-bold">
                在线检测
              </span>
              <span className="text-xs font-mono text-pencil-faint">
                {site.url.replace(/^https?:\/\//, '')}
              </span>
            </div>

            {/* 图标与标题 */}
            <div className="flex items-center gap-3 mb-2 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-pencil bg-paper-100/90 flex items-center justify-center p-1.5 shadow-pencil shrink-0">
                <PencilSoftwareLogo toolId={site.id} className="w-full h-full text-pencil-dark" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-pencil-dark tracking-tight truncate">
                  {site.name}
                </h1>
              </div>
            </div>

            {/* 一句话定位与详细描述 */}
            <p className="text-sm font-sans font-medium text-pencil-dark mt-1 leading-snug">
              {site.tagline}
            </p>
            <p className="text-xs text-pencil-light mt-1.5 font-sans leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* 右侧快捷动作按钮 */}
          <div className="shrink-0 z-10">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pencil-btn py-2 px-4 flex items-center justify-center gap-2 text-xs font-bold text-pencil-dark active:scale-95 transition-all shadow-xs"
              title={`直接前往 ${site.url}`}
            >
              <span>访问官网</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
            </a>
          </div>
        </div>

        {/* 适用场景清单 */}
        <div className="mt-4 pt-3 border-t border-dashed border-pencil/25 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-pencil-faint font-mono text-[11px] shrink-0">适用场景:</span>
          {site.scenarios.map((sc, i) => (
            <span
              key={i}
              className="bg-paper-200/80 border border-pencil/25 px-2 py-0.5 rounded text-[11px] text-pencil-dark font-sans"
            >
              {sc}
            </span>
          ))}
        </div>
      </section>

      {/* 规格参数与核心指标矩阵 */}
      <section className="pencil-box bg-paper-50 p-4 sm:p-6">
        <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-3.5">
          <Sparkles className="w-4 h-4 text-pencil" />
          <h2 className="font-serif font-black text-base sm:text-lg text-pencil-dark">
            规格参数与检测维度
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px] font-sans">数据源整合：</span>
            <span className="font-bold text-pencil-dark block mt-0.5">{site.specs.dataSources}</span>
          </div>

          <div className="p-2.5 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px] font-sans">隐私泄露排查：</span>
            <span className="font-bold text-pencil-dark block mt-0.5">{site.specs.leakCheck}</span>
          </div>

          <div className="p-2.5 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px] font-sans">协议栈支持：</span>
            <span className="font-bold text-pencil-dark block mt-0.5">{site.specs.dualStack}</span>
          </div>

          <div className="p-2.5 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px] font-sans">特色能力：</span>
            <span className="font-bold text-pencil-dark block mt-0.5">{site.specs.specialFeature}</span>
          </div>
        </div>
      </section>

      {/* 功能核对与核心指标速查 (用户要求重点核对的功能与指标介绍) */}
      <section className="pencil-box bg-paper-50 p-4 sm:p-6">
        <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-pencil" />
          <h2 className="font-serif font-black text-base sm:text-lg text-pencil-dark">
            功能核对与关键指标解读
          </h2>
        </div>

        <p className="text-xs text-pencil-light mb-4 font-sans leading-relaxed">
          {site.tutorial.overview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {site.tutorial.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-paper-100 rounded-xl border border-pencil/30 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 border-b border-dashed border-pencil/20 pb-1.5 mb-2">
                <span className="font-serif font-black text-sm text-pencil-dark flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pencil shrink-0" />
                  {item.title}
                </span>
                <span className="font-mono text-[10px] bg-paper-200 border border-pencil/30 px-1.5 py-0.2 rounded text-pencil-dark shrink-0">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-pencil-light font-sans leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 保姆级使用教程指南 */}
      <section className="pencil-box bg-paper-50 p-4 sm:p-6 sm:p-8">
        <div className="border-b-2 border-pencil pb-3 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-pencil" />
            <h2 className="font-serif font-black text-xl text-pencil-dark">
              使用教程与操作步骤
            </h2>
          </div>
          <p className="text-xs text-pencil-light font-sans mt-1">
            按以下标准步骤完成节点网络体检，准确定位分流、泄露与风控问题：
          </p>
        </div>

        {/* 步骤列表 */}
        <div className="space-y-6">
          {site.tutorial.steps.map((s, idx) => (
            <div
              key={s.stepNumber}
              className="relative pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-dashed sm:border-pencil/40 space-y-3"
            >
              {/* 步骤编号与标题 */}
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-pencil text-paper-50 flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                  {s.stepNumber}
                </span>
                <h3 className="font-serif font-black text-base text-pencil-dark tracking-tight">
                  {s.title}
                </h3>
              </div>

              {/* 步骤说明 */}
              <div className="text-xs text-pencil-dark/90 font-sans pl-8 sm:pl-0 leading-relaxed">
                {s.desc}
              </div>

              {/* 代码片段 / 快捷指令 */}
              {s.codeSnippet && (
                <div className="pl-8 sm:pl-0 my-2">
                  <div className="relative rounded-lg border border-pencil/30 bg-paper-200/80 p-3 font-mono text-xs overflow-x-auto shadow-inner group">
                    <div className="flex justify-between items-center mb-1 text-[10px] text-pencil-faint border-b border-pencil/15 pb-1">
                      <span>{s.codeLang || 'bash'}</span>
                      <button
                        onClick={() => handleCopyCode(s.codeSnippet!, idx)}
                        className="flex items-center gap-1 hover:text-pencil-dark cursor-pointer transition-colors"
                        title="复制代码"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>复制</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-pencil-dark whitespace-pre leading-relaxed">
                      {s.codeSnippet}
                    </pre>
                  </div>
                </div>
              )}

              {/* 铅笔小提示 */}
              {s.pencilTip && (
                <div className="pl-8 sm:pl-0">
                  <div className="p-2.5 sm:p-3 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-lg text-xs font-sans text-amber-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span className="font-bold mr-1">铅笔小提示:</span>
                      {s.pencilTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 进阶规则与防泄露避坑建议 */}
      {site.tutorial.advancedTips && site.tutorial.advancedTips.length > 0 && (
        <section className="pencil-box bg-paper-50 p-4 sm:p-6">
          <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
            <Terminal className="w-4 h-4 text-pencil" />
            <h2 className="font-serif font-black text-base sm:text-lg text-pencil-dark">
              进阶技巧与优化建议
            </h2>
          </div>

          <ul className="space-y-2 text-xs text-pencil-dark font-sans">
            {site.tutorial.advancedTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-pencil-faint font-mono mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 常见问题排坑 FAQ */}
      {site.tutorial.faq && site.tutorial.faq.length > 0 && (
        <section className="pencil-box bg-paper-50 p-4 sm:p-6">
          <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
            <HelpCircle className="w-4 h-4 text-pencil" />
            <h2 className="font-serif font-black text-base sm:text-lg text-pencil-dark">
              常见问题与排坑 FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {site.tutorial.faq.map((f, i) => (
              <div key={i} className="p-3 bg-paper-100 rounded-xl border border-pencil/20 text-xs">
                <div className="font-serif font-bold text-pencil-dark flex items-start gap-1.5 mb-1.5">
                  <span className="font-mono text-pencil-light font-bold">Q{i + 1}:</span>
                  <span>{f.question}</span>
                </div>
                <div className="text-pencil-light font-sans pl-5 leading-relaxed">
                  {f.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 底部导航与访问链接 */}
      <div className="flex items-center justify-end gap-2 pt-3 pb-2 border-t border-dashed border-pencil/30 text-xs font-mono">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pencil-btn py-1.5 px-4 flex items-center justify-center gap-1.5 text-pencil-dark font-bold shadow-xs active:scale-95 transition-all w-full sm:w-auto"
        >
          <span>直接访问 {site.name}</span>
          <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
        </a>
      </div>
    </div>
  );
};
