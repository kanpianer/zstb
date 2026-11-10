import React, { useEffect, useRef, useState } from 'react';

interface PencilQuadrantCrossProps {
  className?: string;
}

/**
 * 分隔四象限的高拟真手绘铅笔十字线 (Desktop)
 * 
 * 融合现代前端顶级手绘素描仿真技术：
 * 1. 真实石墨颗粒与纸纹咬合 (Microscopic Graphite Grain & Paper Tooth)
 * 2. 真实 2B 铅笔主墨芯与运笔微手颤 (Organic Hand Tremor & Core Pressure)
 * 3. 伴生草图复描笔触 (Double-pass Sketching / Companion Re-strokes)
 * 4. 2H 底稿轻引线与两端微伸 (Under-drawing Guide Lines & Architectural Extension)
 * 5. 石墨擦笔微晕染 (Soft Graphite Friction Dust Smudge)
 * 6. 十字交叉原点光学物理叠印与沉淀 (Physical Multiply Graphite Accumulation)
 * 7. 响应式像素对齐与重绘 (HiDPI / Retina Crisp Pixel Scaling)
 */
export const PencilQuadrantCross: React.FC<PencilQuadrantCrossProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0 || size.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    ctx.scale(dpr, dpr);

    const w = size.width;
    const h = size.height;

    // 清屏
    ctx.clearRect(0, 0, w, h);

    // 确定性随机数发生器（保持重绘时笔触质感稳定不闪烁）
    let seed = 742938;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    /**
     * 绘制高仿真素描铅笔线条
     */
    function drawPencilStroke(x1: number, y1: number, x2: number, y2: number, isHorizontal: boolean) {
      if (!ctx) return;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      const ang = Math.atan2(dy, dx);
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);

      // 1. 底层石墨碎屑晕染（擦笔微灰雾：模拟手擦或石墨在纸面微孔上的揉拭感）
      ctx.save();
      ctx.strokeStyle = '#2a2d36';
      ctx.lineWidth = 4.2;
      ctx.globalAlpha = 0.09;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1 + cos * 6, y1 + sin * 6);
      ctx.lineTo(x2 - cos * 6, y2 - sin * 6);
      ctx.stroke();
      ctx.restore();

      // 2. 底稿引线（2H 坚硬铅笔基线：极细、极淡、端点微伸 4px，充满图纸手绘感）
      ctx.save();
      ctx.strokeStyle = '#4e5462';
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.36;
      ctx.beginPath();
      ctx.moveTo(x1 - cos * 4, y1 - sin * 4);
      ctx.lineTo(x2 + cos * 4, y2 + sin * 4);
      ctx.stroke();
      ctx.restore();

      // 3. 主笔触（2B 沉稳墨芯：富含碳素石墨深灰色，微手颤呼吸起伏）
      ctx.save();
      ctx.strokeStyle = '#1d1f26';
      ctx.lineWidth = 2.15;
      ctx.globalAlpha = 0.94;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const step = 8;
      const numSteps = Math.ceil(len / step);
      const mainPts: { x: number; y: number }[] = [];

      for (let i = 0; i <= numSteps; i++) {
        const t = i / numSteps;
        const d = t * len;
        // 人手画线时的生理微起伏（缓慢主谐波 + 高频肌肉微颤）
        const slowWave = Math.sin(t * Math.PI * 2.8) * 0.75;
        const microTremor = (rand() - 0.5) * 0.45;
        const offset = slowWave + microTremor;

        mainPts.push({
          x: x1 + d * cos - offset * sin,
          y: y1 + d * sin + offset * cos,
        });
      }

      ctx.beginPath();
      ctx.moveTo(mainPts[0].x, mainPts[0].y);
      for (let i = 1; i < mainPts.length - 1; i++) {
        const xc = (mainPts[i].x + mainPts[i + 1].x) / 2;
        const yc = (mainPts[i].y + mainPts[i + 1].y) / 2;
        ctx.quadraticCurveTo(mainPts[i].x, mainPts[i].y, xc, yc);
      }
      ctx.lineTo(mainPts[mainPts.length - 1].x, mainPts[mainPts.length - 1].y);
      ctx.stroke();
      ctx.restore();

      // 4. 伴生复描笔触（素描大师回笔：人在长距离画线时由两段叠加拼接完成）
      // 4A: 前半段回笔（起笔至过中心点）
      ctx.save();
      ctx.strokeStyle = '#2b2f3a';
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 0.64;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const halfA = Math.ceil(numSteps * 0.54);
      for (let i = 0; i <= halfA; i++) {
        const t = i / numSteps;
        const d = t * len;
        const diverge = Math.sin(t * Math.PI * 3.6) * 0.85 + (rand() - 0.5) * 0.45;
        const px = x1 + d * cos - diverge * sin;
        const py = y1 + d * sin + diverge * cos;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      // 4B: 后半段回笔（过中心点至收笔）
      ctx.save();
      ctx.strokeStyle = '#2b2f3a';
      ctx.lineWidth = 1.25;
      ctx.globalAlpha = 0.60;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const halfB = Math.floor(numSteps * 0.46);
      for (let i = halfB; i <= numSteps; i++) {
        const t = i / numSteps;
        const d = t * len;
        const diverge = -Math.sin(t * Math.PI * 3.2) * 0.8 + (rand() - 0.5) * 0.45;
        const px = x1 + d * cos - diverge * sin;
        const py = y1 + d * sin + diverge * cos;
        if (i === halfB) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      // 5. 石墨微粒（散布于纸张纤维尖齿上的微观石墨斑点，彻底消除数码矢量塑料感）
      const stippleCount = Math.floor(len * 2.8);
      ctx.save();
      ctx.fillStyle = '#171920';
      for (let i = 0; i < stippleCount; i++) {
        const t = rand();
        const d = t * len;
        // 正态分布聚集在墨芯周围
        const spread = (rand() + rand() + rand() - 1.5) * 1.7;
        const px = x1 + d * cos - spread * sin;
        const py = y1 + d * sin + spread * cos;
        const r = rand() * 0.68 + 0.22;
        const a = rand() * 0.42 + 0.12;

        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 6. 微蹭痕与飞白毛刺（偶发的干画铅粉飞溅）
      const flakes = Math.floor(len * 0.12);
      ctx.save();
      ctx.fillStyle = '#22252e';
      for (let i = 0; i < flakes; i++) {
        const d = rand() * len;
        const side = rand() > 0.5 ? 1 : -1;
        const spread = side * (rand() * 2.2 + 1.1);
        const px = x1 + d * cos - spread * sin;
        const py = y1 + d * sin + spread * cos;
        ctx.globalAlpha = rand() * 0.32 + 0.08;
        ctx.fillRect(px, py, 1.0, 1.0);
      }
      ctx.restore();

      // 7. 两端素描微刻线（草图对齐微刻痕）
      ctx.save();
      ctx.strokeStyle = '#383d4a';
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = 0.42;
      ctx.lineCap = 'round';
      if (isHorizontal) {
        ctx.beginPath();
        ctx.moveTo(x1, y1 - 3.5);
        ctx.lineTo(x1, y1 + 3.5);
        ctx.moveTo(x2, y2 - 3.5);
        ctx.lineTo(x2, y2 + 3.5);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x1 - 3.5, y1);
        ctx.lineTo(x1 + 3.5, y1);
        ctx.moveTo(x2 - 3.5, y2);
        ctx.lineTo(x2 + 3.5, y2);
        ctx.stroke();
      }
      ctx.restore();
    }

    const midX = w / 2;
    const midY = h / 2;
    const pad = 8; // 离边界保留微小留白

    // 绘制横向十字线 (贯穿四象限横轴)
    drawPencilStroke(pad, midY, w - pad, midY, true);

    // 绘制纵向十字线 (贯穿四象限纵轴)
    drawPencilStroke(midX, pad, midX, h - pad, false);

    // ==========================================
    // 十字相交中心原点：石墨多重沉积与微压痕
    // ==========================================
    ctx.save();
    // 真实石墨核心相叠（暗墨核）
    ctx.fillStyle = '#121419';
    ctx.globalAlpha = 0.88;
    ctx.beginPath();
    ctx.arc(midX, midY, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // 中心微晕染（石墨压力自然扩散）
    const centerSmudge = ctx.createRadialGradient(midX, midY, 1, midX, midY, 10);
    centerSmudge.addColorStop(0, 'rgba(22, 25, 32, 0.42)');
    centerSmudge.addColorStop(0.5, 'rgba(34, 38, 48, 0.16)');
    centerSmudge.addColorStop(1, 'rgba(45, 50, 60, 0)');
    ctx.fillStyle = centerSmudge;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(midX, midY, 10, 0, Math.PI * 2);
    ctx.fill();

    // 自然手绘十字交汇加固线（微错位轻描）
    ctx.strokeStyle = '#181a21';
    ctx.lineWidth = 1.35;
    ctx.globalAlpha = 0.65;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(midX - 6, midY);
    ctx.lineTo(midX + 6, midY);
    ctx.moveTo(midX, midY - 6);
    ctx.lineTo(midX, midY + 6);
    ctx.stroke();
    ctx.restore();

  }, [size]);

  return (
    <div
      ref={containerRef}
      className={`hidden md:block absolute inset-0 pointer-events-none z-10 overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};

/**
 * 移动端专用的手绘铅笔水平分割线
 */
export const PencilMobileDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0) {
        setWidth(Math.round(rect.width));
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const height = 16;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    let seed = 38472;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    const y = height / 2;
    const len = width - 12;
    const x1 = 6;
    const x2 = width - 6;

    // 1. 底稿引线
    ctx.save();
    ctx.strokeStyle = '#4e5462';
    ctx.lineWidth = 0.7;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(x1 - 2, y);
    ctx.lineTo(x2 + 2, y);
    ctx.stroke();
    ctx.restore();

    // 2. 主墨芯
    ctx.save();
    ctx.strokeStyle = '#1d1f26';
    ctx.lineWidth = 2.0;
    ctx.globalAlpha = 0.92;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const steps = Math.ceil(len / 8);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x1 + t * len;
      const py = y + Math.sin(t * Math.PI * 3) * 0.65 + (rand() - 0.5) * 0.4;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();

    // 3. 复描
    ctx.save();
    ctx.strokeStyle = '#2b2f3a';
    ctx.lineWidth = 1.15;
    ctx.globalAlpha = 0.58;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x1 + t * len;
      const py = y + (rand() - 0.5) * 0.7;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();

    // 4. 石墨微粒
    const stipples = Math.floor(len * 1.8);
    ctx.save();
    ctx.fillStyle = '#171920';
    for (let i = 0; i < stipples; i++) {
      const px = x1 + rand() * len;
      const py = y + (rand() + rand() - 1) * 1.6;
      ctx.globalAlpha = rand() * 0.38 + 0.12;
      ctx.beginPath();
      ctx.arc(px, py, rand() * 0.6 + 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }, [width]);

  return (
    <div
      ref={containerRef}
      className={`md:hidden w-full h-4 relative my-2 overflow-visible pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '16px',
          display: 'block',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};
