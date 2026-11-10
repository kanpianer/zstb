import React, { useState } from 'react';
import { SoftwareTool } from '../types/tutorial';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { 
  ArrowLeft, 
  GitPullRequest, 
  Calendar, 
  Code, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Info,
  History,
  HelpCircle,
  Share2
} from 'lucide-react';

interface TutorialDetailViewProps {
  tool: SoftwareTool;
  onBack: () => void;
  onNavigateHome?: () => void;
  onOpenCrowdsourceModal: (tool: SoftwareTool, mode?: 'pr' | 'issue') => void;
}

const formatOpenSourceLicense = (license?: string): string => {
  if (!license) return '';
  // 过滤掉是否免费相关文字，仅保留纯开源协议名称
  return license.replace(/\s*\/?\s*[（(]?免费[)）]?/g, '').trim();
};

export const TutorialDetailView: React.FC<TutorialDetailViewProps> = ({
  tool,
  onBack,
  onNavigateHome,
  onOpenCrowdsourceModal
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(text);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <article className="flex flex-col gap-8 pb-12">
      {/* Tutorial Header (Pencil Card) */}
      <section className="pencil-box bg-paper-50 p-6 sm:p-8 relative overflow-hidden">
        {/* Card Background Watermark Logo at the top (在软件简介卡片背景上方的手绘底纹 Logo) */}
        <div className="absolute right-4 -top-3 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none opacity-[0.07] text-pencil-dark select-none -rotate-6">
          <PencilSoftwareLogo toolId={tool.id} className="w-full h-full" />
        </div>

        {/* 软件价格显示在教程页面上方中心，以灰色字体显示 */}
        {tool.price && (
          <div className="relative z-10 w-full text-center -mt-1 sm:-mt-2 mb-3">
            <span className="font-mono text-xs sm:text-sm text-pencil-faint tracking-wide">
              {tool.price}
            </span>
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono bg-paper-200 border border-pencil/30 px-2 py-0.5 rounded text-pencil-dark">
                {tool.latestVersion}
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl border-2 border-pencil bg-paper-100/90 flex items-center justify-center p-2 shadow-pencil shrink-0 group-hover:-rotate-3 transition-transform">
                <PencilSoftwareLogo toolId={tool.id} className="w-full h-full text-pencil-dark" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-pencil-dark tracking-tight">
                {tool.name}
              </h1>
            </div>

            <p className="text-sm font-sans text-pencil-light mt-2 leading-relaxed">
              {tool.tagline}
            </p>
            <p className="text-xs text-pencil/80 mt-1 italic font-sans">
              {tool.description}
            </p>
          </div>

          {/* Official links */}
          <div className="flex md:flex-col gap-2 flex-shrink-0 font-mono text-xs">
            {tool.officialSite && (
              <a
                href={tool.officialSite}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
              >
                <span>官方网站</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.githubRepo && (
              <a
                href={tool.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
              >
                <span>GitHub 源码</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="mt-6 p-4 bg-paper-200/80 border-2 border-pencil rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-2 bg-paper-100 rounded border border-pencil/20">
            <span className="text-[10px] text-pencil-faint block uppercase">更新时间:</span>
            <span className="text-pencil-dark font-bold text-sm flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              {tool.updatedAt}
            </span>
          </div>

          <div className="p-2 bg-paper-100 rounded border border-pencil/20">
            <span className="text-[10px] text-pencil-faint block uppercase">开源状态:</span>
            {tool.isOpenSource ? (
              <span className="font-bold text-sm block mt-0.5 text-emerald-700 truncate">
                开源
                {tool.license && (
                  <span className="text-xs font-normal text-pencil-light ml-1 font-mono">
                    ({formatOpenSourceLicense(tool.license)})
                  </span>
                )}
              </span>
            ) : (
              <span className="font-bold text-sm block mt-0.5 text-amber-800">
                闭源
              </span>
            )}
          </div>

          <div className="p-2 bg-paper-100 rounded border border-pencil/20">
            <span className="text-[10px] text-pencil-faint block uppercase">发布时间:</span>
            <span className="text-pencil-dark font-bold text-sm block mt-0.5">
              {tool.releasedAt}
            </span>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="pencil-box bg-paper-50 p-6">
        <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
          <Sparkles className="w-4 h-4 text-pencil" />
          <h2 className="font-serif font-black text-lg text-pencil-dark">
            规格参数
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px]">系统与架构适配：</span>
            <span className="font-bold text-pencil-dark">{tool.specs.compatibility}</span>
            <span className="text-pencil-light block mt-1">{tool.specs.architecture}</span>
          </div>

          <div className="p-3 bg-paper-200/50 rounded-lg border border-pencil/20">
            <span className="text-pencil-faint block text-[10px]">底层内核与流量处理：</span>
            <span className="font-bold text-pencil-dark">{tool.specs.coreEngine}</span>
            <span className="text-pencil-light block mt-1">{tool.specs.trafficHandling}</span>
          </div>

          <div className="p-3 bg-paper-200/50 rounded-lg border border-pencil/20 col-span-1 md:col-span-2">
            <span className="text-pencil-faint block text-[10px]">支持协议：</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {tool.specs.protocols.map((protocol, i) => (
                <span
                  key={i}
                  className="bg-paper-50 border border-pencil/40 px-2.5 py-0.5 rounded text-pencil-dark font-semibold text-[11px]"
                >
                  {protocol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Tutorial Guide */}
      <section className="pencil-box bg-paper-50 p-6 sm:p-8">
        <div className="border-b-2 border-pencil pb-3 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-pencil" />
            <h2 className="font-serif font-black text-xl text-pencil-dark">
              使用教程
            </h2>
          </div>
          <p className="text-xs text-pencil-light font-sketch mt-1">
            {tool.tutorial.overview}
          </p>
        </div>

        {/* Prerequisites */}
        {tool.tutorial.prerequisites.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-xl text-xs">
            <div className="font-bold text-amber-900 font-serif mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>准备工作：</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-amber-950 font-sans">
              {tool.tutorial.prerequisites.map((pre, idx) => (
                <li key={idx}>{pre}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps Timeline */}
        <div className="flex flex-col gap-6">
          {tool.tutorial.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="relative p-5 bg-paper-100 rounded-xl border-2 border-pencil shadow-sm"
            >
              {/* Step Number Tag */}
              <div className="flex items-center gap-3 mb-2.5">
                <span className="w-7 h-7 rounded-full bg-pencil text-paper-50 flex items-center justify-center font-bold text-xs font-mono shadow-pencil">
                  {step.stepNumber}
                </span>
                <h3 className="font-bold text-base text-pencil-dark font-serif">
                  {step.title}
                </h3>
              </div>

              <p className="text-xs text-pencil-light leading-relaxed font-sans">
                {step.description}
              </p>

              {/* Code Snippet Box (if available) */}
              {step.codeSnippet && (
                <div className="mt-3 p-3 bg-pencil-dark text-paper-50 rounded-lg font-mono text-xs flex items-center justify-between border border-pencil">
                  <code className="break-all">{step.codeSnippet}</code>
                  <button
                    onClick={() => handleCopy(step.codeSnippet!)}
                    className="p-1.5 bg-pencil-light/60 hover:bg-pencil-light rounded text-paper-50 transition-colors ml-2 flex-shrink-0"
                    title="复制到剪贴板"
                  >
                    {copiedSnippet === step.codeSnippet ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Tip */}
              {step.pencilTip && (
                <div className="mt-3 p-2.5 bg-paper-200/70 border-l-4 border-pencil-gold rounded-r text-xs text-pencil-dark font-sketch flex items-start gap-2">
                  <span className="font-bold text-pencil-gold">提示:</span>
                  <span>{step.pencilTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Rules */}
      <section className="pencil-box bg-paper-50 p-6">
        <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-pencil" />
          <h2 className="font-serif font-black text-lg text-pencil-dark">
            进阶设置
          </h2>
        </div>

        <ul className="space-y-2 text-xs text-pencil-light font-sans">
          {tool.tutorial.advancedRules.map((rule, idx) => (
            <li key={idx} className="p-2.5 bg-paper-100 rounded border border-pencil/20 flex items-start gap-2">
              <span className="font-mono font-bold text-pencil-dark">[{idx + 1}]</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="pencil-box bg-paper-50 p-6">
        <div className="flex items-center gap-2 border-b-2 border-pencil pb-2 mb-4">
          <HelpCircle className="w-4 h-4 text-pencil" />
          <h2 className="font-serif font-black text-lg text-pencil-dark">
            常见问题
          </h2>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          {tool.tutorial.faq.map((item, idx) => (
            <div key={idx} className="p-3 bg-paper-100 rounded-lg border border-pencil/30">
              <div className="font-bold text-pencil-dark font-serif flex items-start gap-1.5">
                <span className="text-red-700 font-mono">Q:</span>
                <span>{item.question}</span>
              </div>
              <div className="text-pencil-light mt-1 pl-4 font-sans leading-relaxed flex items-start gap-1.5">
                <span className="text-emerald-700 font-mono font-bold">A:</span>
                <span>{item.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Changelog Table */}
      <section className="pencil-box bg-paper-50 p-6">
        <div className="flex items-center justify-between border-b-2 border-pencil pb-2 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-pencil" />
            <h2 className="font-serif font-black text-lg text-pencil-dark">
              更新记录
            </h2>
          </div>
          <button
            onClick={() => onOpenCrowdsourceModal(tool, 'pr')}
            className="pencil-btn-secondary text-xs py-1 px-2.5 flex items-center gap-1"
          >
            <GitPullRequest className="w-3 h-3 text-blue-700" />
            <span>提交更新 (PR)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-paper-200/80 border-b-2 border-pencil text-pencil-dark">
                <th className="p-2">日期</th>
                <th className="p-2">维护者</th>
                <th className="p-2">PR #</th>
                <th className="p-2">更新摘要</th>
                <th className="p-2">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pencil/20">
              {tool.changelog.map((log, i) => (
                <tr key={i} className="hover:bg-paper-100/80 transition-colors">
                  <td className="p-2 text-pencil-faint">{log.date}</td>
                  <td className="p-2 font-bold text-pencil-dark">{log.author}</td>
                  <td className="p-2">
                    <span className="bg-blue-50 text-blue-800 border border-blue-300 px-1.5 py-0.2 rounded font-bold">
                      #{log.prNumber}
                    </span>
                  </td>
                  <td className="p-2 font-sans text-pencil-light">{log.summary}</td>
                  <td className="p-2 text-pencil-faint"><code>{log.commitHash}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
};
