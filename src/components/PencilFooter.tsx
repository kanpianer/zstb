import React, { useRef, useState, useEffect } from 'react';
import { getSettings } from '../cms/content';
import { ArrowUp, ShieldCheck } from 'lucide-react';

interface PencilFooterProps {
  onOpenCrowdsource?: () => void;
  onScrollToTop?: () => void;
  onNavigateIpCheck?: () => void;
  scrollProgress?: number;
}

/**
 * 将阅读进度 (0~1) 映射为沿按钮边缘顺时针扫过的射线角度 (0~360deg)，
 * 确保实线随阅读距离沿四边匀速填实。
 */
function progressToAngle(p: number, w: number, h: number): number {
  if (p <= 0) return 0;
  if (p >= 1) return 360;
  const halfW = w / 2;
  const halfH = h / 2;
  const totalPerimeter = 2 * (w + h);
  const d = p * totalPerimeter;

  let x = 0;
  let y = -halfH;

  if (d <= halfW) {
    x = d;
    y = -halfH;
  } else if (d <= halfW + h) {
    x = halfW;
    y = -halfH + (d - halfW);
  } else if (d <= halfW + h + w) {
    x = halfW - (d - (halfW + h));
    y = halfH;
  } else if (d <= halfW + h + w + h) {
    x = -halfW;
    y = halfH - (d - (halfW + h + w));
  } else {
    x = -halfW + (d - (halfW + h + w + h));
    y = -halfH;
  }

  const angleRad = Math.atan2(x, -y);
  let angleDeg = (angleRad * 180) / Math.PI;
  if (angleDeg < 0) angleDeg += 360;
  return angleDeg;
}

export const PencilFooter: React.FC<PencilFooterProps> = ({ 
  onOpenCrowdsource,
  onScrollToTop,
  onNavigateIpCheck,
  scrollProgress = 0
}) => {
  const settings = getSettings();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnSize, setBtnSize] = useState<{ width: number; height: number }>({ width: 82, height: 27 });

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setBtnSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clampedProgress = Math.min(1, Math.max(0, scrollProgress));
  const progressPercent = Math.round(clampedProgress * 100);
  const progressAngle = progressToAngle(clampedProgress, btnSize.width, btnSize.height);

  const getDisplayText = () => {
    const rawText = settings.footerText || '主流翻墙工具使用教程';
    const cleaned = rawText
      .replace(/©\s*/g, '')
      .replace(/\b20\d\d\b/g, '')
      .replace(/纸上谈兵/g, '')
      .replace(/IP检测/g, '')
      .replace(/^[·\s\-_]+|[·\s\-_]+$/g, '')
      .trim();
    if (!cleaned || cleaned === '主流翻墙工具教程') {
      return '主流翻墙工具使用教程';
    }
    return cleaned;
  };

  return (
    <footer className="h-[36px] shrink-0 mt-2 sm:mt-3 pt-2 text-xs text-pencil-light select-none">
      <div className="relative flex items-center justify-between gap-3 text-[11px] font-mono text-pencil-faint h-full">
        {/* 左侧：IP检测（虚线按钮，尺寸与右侧回到顶部一致，同样记录阅读进度）与 GitHub 链接 */}
        <div className="flex items-center gap-2 shrink-0 z-10">
          <button
            type="button"
            onClick={onNavigateIpCheck}
            className="pencil-btn-secondary w-[82px] h-[27px] !p-0 justify-center text-[10px] flex items-center gap-1 text-pencil-dark shrink-0 cursor-pointer active:scale-95 transition-all relative select-none group"
            title={`点击进入 IP 地址检测页面${progressPercent > 0 ? ` (已读 ${progressPercent}%)` : ''}`}
          >
            {/* 记录阅读进度：随滚动沿边缘不断填实的深色铅笔实线边框 (hover 时隐藏以展现按钮默认实线外观) */}
            {clampedProgress > 0 && (
              <span
                className="absolute pointer-events-none group-hover:opacity-0 transition-opacity duration-150"
                style={{
                  inset: '-1.5px',
                  borderRadius: '200px 15px 210px 15px / 15px 210px 15px 200px',
                  border: '1.6px solid rgb(var(--ink))',
                  WebkitMaskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, #000 ${progressAngle}deg, transparent ${progressAngle}deg, transparent 360deg)`,
                  maskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, #000 ${progressAngle}deg, transparent ${progressAngle}deg, transparent 360deg)`,
                }}
              />
            )}

            <ShieldCheck className="w-3.5 h-3.5 text-pencil-dark shrink-0 group-hover:scale-105 transition-transform" />
            <span>IP检测</span>
          </button>
          <span className="hidden sm:inline text-pencil/30">·</span>
          <a
            href={settings.footerLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-pencil-dark font-semibold shrink-0 hidden sm:inline"
            title="查看本项目 GitHub 仓库"
          >
            {settings.footerLinkLabel}
          </a>
        </div>

        {/* 中间居中显示：主流翻墙工具使用教程 */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none text-pencil-light text-[11px] font-sans truncate max-w-[42%] sm:max-w-[55%]">
          {getDisplayText()}
        </div>

        <button
          ref={buttonRef}
          onClick={handleScrollToTop}
          className="pencil-btn-secondary w-[82px] h-[27px] !p-0 justify-center text-[10px] flex items-center gap-1 text-pencil-dark shrink-0 cursor-pointer active:scale-95 transition-all relative select-none group z-10"
          title={`回到内容顶部${progressPercent > 0 ? ` (已读 ${progressPercent}%)` : ''}`}
        >
          {/* 记录阅读进度：随滚动沿边缘不断填实的深色铅笔实线边框 (hover 时隐藏以展现返回按钮默认实线外观) */}
          {clampedProgress > 0 && (
            <span
              className="absolute pointer-events-none group-hover:opacity-0 transition-opacity duration-150"
              style={{
                inset: '-1.5px',
                borderRadius: '200px 15px 210px 15px / 15px 210px 15px 200px',
                border: '1.6px solid rgb(var(--ink))',
                WebkitMaskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, #000 ${progressAngle}deg, transparent ${progressAngle}deg, transparent 360deg)`,
                maskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, #000 ${progressAngle}deg, transparent ${progressAngle}deg, transparent 360deg)`,
              }}
            />
          )}

          <ArrowUp className="w-2.5 h-2.5" />
          <span>回到顶部</span>
        </button>
      </div>
    </footer>
  );
};
