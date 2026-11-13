import React, { useState } from 'react';
import { SoftwareTool } from '../types/tutorial';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { TutorialImagePreview } from './TutorialImagePreview';
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

const ACTION_BUTTON_BASE_CLASSES =
  "inline-flex items-center gap-1 text-[11px] sm:text-xs font-sans font-bold leading-normal rounded-md px-2 py-0.5 shadow-xs transition-colors";

const renderInlineElements = (text: string): React.ReactNode[] => {
  const tokenRegex = /(\[!\[([^\]]*)\]\(([^)]+)\)\s*([^\]]*)\]\(([^)]+)\)|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|([（(]https?:\/\/[^\s<>（()）\u3000-\u303f\uff00-\uffef]+[)）]|https?:\/\/[^\s<>（()）\u3000-\u303f\uff00-\uffef]+)|\n)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const [fullMatch, , linkImgAlt, linkImgSrc, linkImgText, linkImgUrl, imgAlt, imgSrc, linkText, linkUrl, boldText, codeText, bareUrl] = match;

    if (linkImgUrl) {
      const isBxdt = linkImgText?.includes('不想搭梯') || linkImgUrl?.includes('bxdt') || linkImgSrc?.includes('bxdt');
      elements.push(
        <a
          key={match.index}
          href={linkImgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isBxdt
              ? `${ACTION_BUTTON_BASE_CLASSES} text-blue-600 bg-blue-50/90 border border-blue-200/90 hover:bg-blue-100 hover:border-blue-300 align-middle mx-1`
              : "inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 hover:underline align-baseline"
          }
          title={linkImgText ? `前往 ${linkImgText}` : undefined}
        >
          <img
            src={linkImgSrc}
            alt={linkImgAlt || 'icon'}
            className="w-3.5 h-3.5 object-contain rounded-xs shrink-0"
            width={14}
            height={14}
          />
          {linkImgText && <span>{linkImgText}</span>}
        </a>
      );
    } else if (imgSrc) {
      elements.push(
        <img
          key={match.index}
          src={imgSrc}
          alt={imgAlt || 'image'}
          className="inline-block w-3.5 h-3.5 object-contain align-middle -mt-0.5 mx-0.5"
          width={14}
          height={14}
        />
      );
    } else if (linkUrl) {
      const isBxdt = linkText?.includes('不想搭梯') || linkUrl?.includes('bxdt');
      elements.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isBxdt
              ? `${ACTION_BUTTON_BASE_CLASSES} text-blue-600 bg-blue-50/90 border border-blue-200/90 hover:bg-blue-100 hover:border-blue-300 align-middle mx-1`
              : "inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 hover:underline align-baseline"
          }
          title={linkText ? `前往 ${linkText}` : undefined}
        >
          {isBxdt && (
            <img
              src="/bxdt-icon.png"
              alt="不想搭梯"
              className="w-3.5 h-3.5 object-contain rounded-xs shrink-0"
              width={14}
              height={14}
            />
          )}
          <span>{linkText}</span>
        </a>
      );
    } else if (boldText) {
      elements.push(
        <strong key={match.index} className="font-bold text-pencil-dark">
          {renderInlineElements(boldText)}
        </strong>
      );
    } else if (codeText) {
      elements.push(
        <code key={match.index} className="px-1 py-0.5 bg-paper-200/90 text-pencil-dark rounded font-mono text-[11px] border border-pencil/20">
          {codeText}
        </code>
      );
    } else if (bareUrl) {
      const unwrapped = bareUrl.replace(/^[（(]|[)）]$/g, '');
      const url = unwrapped.replace(/[.,;:!?]+$/, '');
      const punctuation = unwrapped.slice(url.length);
      elements.push(
        <a key={match.index} href={url} target="_blank" rel="noopener noreferrer"
          className="font-bold text-blue-700 hover:text-blue-900 underline underline-offset-2 break-words"
          title={`前往 ${url}`}>
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
      );
      if (punctuation) elements.push(punctuation);
    } else if (fullMatch === '\n') {
      elements.push(<br key={match.index} />);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
};

export const FormattedRichText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className={className}>
      {paragraphs.map((para, pIdx) => (
        <p key={pIdx} className={pIdx > 0 ? 'mt-2 leading-relaxed' : 'leading-relaxed'}>
          {renderInlineElements(para)}
        </p>
      ))}
    </div>
  );
};

export const TutorialDetailView: React.FC<TutorialDetailViewProps> = ({
  tool,
  onBack,
  onNavigateHome,
  onOpenCrowdsourceModal
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string; caption: string } | null>(null);
  // 版本字段可包含渠道、核查日期等备注，页头仅展示首个版本号。
  const displayVersion = tool.latestVersion.match(/\b[vV]?\d+(?:\.\d+)+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?(?:\+[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?\b/)?.[0];

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
            {displayVersion && (
              <div className="flex items-center gap-2 mb-2">
                <span aria-label="软件版本" className="text-xs font-mono bg-paper-200 border border-pencil/30 px-2 py-0.5 rounded text-pencil-dark">
                  {displayVersion}
                </span>
              </div>
            )}

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
            <div className="text-xs text-pencil/80 mt-1 italic font-sans">
              <FormattedRichText text={tool.description} />
            </div>
          </div>

          {/* Official links */}
          <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0 font-mono text-xs">
            {tool.officialSite && (
              <a
                href={tool.officialSite}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title={tool.officialSiteLabel ? `访问 ${tool.officialSiteLabel}` : '访问官方网站'}
              >
                {tool.officialSiteIcon && (
                  <img src={tool.officialSiteIcon} alt="" className="w-3.5 h-3.5 object-contain rounded-xs" width={14} height={14} />
                )}
                <span>{tool.officialSiteLabel || '官方网站'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.appStoreUrl && (
              <a
                href={tool.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title="前往 App Store 下载"
              >
                <span>App Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.playStoreUrl && (
              <a
                href={tool.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title="前往 Google Play 下载"
              >
                <span>Google Play</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.homebrewUrl && (
              <a
                href={tool.homebrewUrl}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title="通过 Homebrew 安装"
              >
                <span>Homebrew</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.releasesUrl && (
              <a
                href={tool.releasesUrl}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title="前往 GitHub Releases 下载"
              >
                <span>软件下载</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {tool.githubRepo && (
              <a
                href={tool.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="pencil-btn-secondary py-1.5 px-3 flex items-center justify-center gap-1.5 hover:bg-paper-100"
                title="查看 GitHub 源码"
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
            <span className="text-[10px] text-pencil-faint block uppercase">最近更新:</span>
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
          <div className="text-xs text-pencil-light font-sans mt-1">
            <FormattedRichText text={tool.tutorial.overview} />
          </div>
        </div>

        {/* Prerequisites */}
        {tool.tutorial.prerequisites.length > 0 && (
          <div className="relative mb-6 p-4 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-xl text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="font-bold text-amber-900 font-serif flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>准备工作：</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {(tool.tutorial.prerequisiteActions ?? [
                  tool.tutorial.prerequisiteAction ?? {
                    prefixText: '到',
                    url: 'https://jkdh.sld.tw/',
                    name: '家宽导航',
                    iconSrc: '/jkdh-favicon.png',
                    suffixText: '购买节点',
                    title: '前往家宽导航',
                  },
                ]).map((action, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-800">
                    {action.prefixText && <span>{action.prefixText}</span>}
                    <a
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${ACTION_BUTTON_BASE_CLASSES} text-amber-950 bg-amber-100/80 border border-amber-300/80 hover:bg-amber-200/80 hover:border-amber-400`}
                      title={action.title ?? `前往 ${action.name}`}
                    >
                      {action.iconSrc && (
                        <img
                          src={action.iconSrc}
                          alt={action.name}
                          className="w-3.5 h-3.5 object-contain rounded-xs shrink-0"
                          width={14}
                          height={14}
                        />
                      )}
                      <span>{action.name}</span>
                    </a>
                    {action.suffixText && <span>{action.suffixText}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-full" aria-label="准备工作列表">
              <ul className="space-y-1 text-amber-950 font-sans">
                {tool.tutorial.prerequisites.map((pre, idx) => (
                  <li key={idx} className="leading-relaxed flex items-baseline gap-2">
                    <span aria-hidden="true" className="shrink-0 text-black">•</span>
                    <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{renderInlineElements(pre)}</span>
                  </li>
                ))}
              </ul>
            </div>
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

              <FormattedRichText text={step.description} className="text-xs text-pencil-light font-sans" />

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

              {step.images && step.images.length > 0 && (
                <div
                  className={`mt-4 grid gap-3 ${step.imageColumns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
                  aria-label={`${step.title}操作截图`}
                >
                  {step.images.map((image) => (
                    <figure key={image.src} className="min-w-0">
                      <button type="button" onClick={() => setPreviewImage(image)} aria-label={`放大预览：${image.alt}`} aria-haspopup="dialog" className="block w-full cursor-zoom-in rounded-lg border border-pencil/30 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700" title="点击放大预览">
                        <img src={image.src} alt={image.alt} loading="lazy" className="block w-full h-auto" />
                      </button>
                      <figcaption className="mt-1.5 text-xs text-pencil-light font-sans leading-relaxed">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* Tip */}
              {step.pencilTip && (
                <div className="mt-3 p-2.5 bg-paper-200/70 border-l-4 border-pencil-gold rounded-r text-xs text-pencil-dark font-sans flex items-start gap-2">
                  <span className="font-bold text-pencil-gold shrink-0">提示:</span>
                  <div className="flex-1">
                    <FormattedRichText text={step.pencilTip} />
                  </div>
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
              <span className="font-mono font-bold text-pencil-dark shrink-0">[{idx + 1}]</span>
              <div className="flex-1">
                <FormattedRichText text={rule} />
              </div>
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
                <span className="text-red-700 font-mono shrink-0">Q:</span>
                <div className="flex-1">
                  <FormattedRichText text={item.question} />
                </div>
              </div>
              <div className="text-pencil-light mt-1 pl-4 font-sans leading-relaxed flex items-start gap-1.5">
                <span className="text-emerald-700 font-mono font-bold shrink-0">A:</span>
                <div className="flex-1">
                  <FormattedRichText text={item.answer} />
                </div>
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
              教程更新记录
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
      {previewImage && <TutorialImagePreview image={previewImage} onClose={() => setPreviewImage(null)} />}
    </article>
  );
};
