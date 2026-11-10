import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface PencilFooterProps {
  onOpenCrowdsource: () => void;
  onScrollToTop?: () => void;
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
  scrollProgress = 0
}) => {
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

  return (
    <footer className="h-[36px] shrink-0 mt-2 sm:mt-3 pt-2 text-xs text-pencil-light select-none">
      <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-pencil-faint h-full">
        <div className="flex items-center gap-2 truncate">
          <span className="truncate">© 2026 纸上谈兵 · 翻墙工具教程知识库</span>
          <span className="hidden sm:inline">·</span>
          <button
            onClick={onOpenCrowdsource}
            className="hover:underline text-pencil-dark font-semibold shrink-0 hidden sm:inline"
          >
            参与贡献 (GitHub)
          </button>
        </div>

        <button
          ref={buttonRef}
          onClick={handleScrollToTop}
          className="pencil-btn-secondary w-[82px] h-[27px] !p-0 justify-center text-[10px] flex items-center gap-1 text-pencil-dark shrink-0 cursor-pointer active:scale-95 transition-all relative select-none group"
          title={`回到内容顶部${progressPercent > 0 ? ` (已读 ${progressPercent}%)` : ''}`}
        >
          {/* 记录阅读进度：随滚动沿边缘不断填实的深色铅笔实线边框 (hover 时隐藏以展现返回按钮默认实线外观) */}
          {clampedProgress > 0 && (
            <span
              className="absolute pointer-events-none group-hover:opacity-0 transition-opacity duration-150"
              style={{
                inset: '-1.5px',
                borderRadius: '200px 15px 210px 15px / 15px 210px 15px 200px',
                border: '1.6px solid #2b2e34',
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
