import React from 'react';

export interface PencilSoftwareLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * 1. Shadowrocket (小火箭) 铅笔手绘 Logo
 * 经典的 45 度仰角冲天火箭、机身观察圆窗、后掠翼尾翼与喷气尾迹铅笔素描
 */
export const PencilShadowrocketLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 火箭流线型锥体机身 */}
      <path
        d="M 48 16 
           C 40 18, 26 27, 23 41 
           L 29 47 
           C 43 44, 52 30, 54 22 
           C 54 18, 52 16, 48 16 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 头部尖端双线金属包边 */}
      <path
        d="M 45 17.5 L 48.5 21"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 机身舷窗圆环 */}
      <circle
        cx="36"
        cy="28"
        r="4.5"
        strokeWidth="2.1"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <circle
        cx="35"
        cy="27"
        r="1.2"
        fill="currentColor"
        stroke="none"
      />
      {/* 舷窗外圈铅笔复线 */}
      <circle
        cx="36"
        cy="28"
        r="6"
        strokeWidth="0.9"
        strokeDasharray="4 2"
        opacity="0.5"
      />
      {/* 左侧后掠尾翼 */}
      <path
        d="M 23 41 L 14 43 L 19 33 C 21 35, 22 38, 23 41 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* 右侧后掠尾翼 */}
      <path
        d="M 29 47 L 31 56 L 21 51 C 24 50, 27 49, 29 47 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* 尾部喷气推进喷口 */}
      <path
        d="M 23 44 L 20 47"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* 喷口烈焰与喷气流素描 */}
      <path
        d="M 19 48 C 14 53, 11 58, 7 57 C 12 52, 16 49, 19 48 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M 17 52 C 13 56, 10 59, 6 60"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 2"
        opacity="0.6"
      />
      {/* 机身下腹部 45 度素描阴影排线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.7">
        <line x1="26" y1="41" x2="29" y2="44" />
        <line x1="29" y1="38" x2="33" y2="42" />
        <line x1="33" y1="34" x2="38" y2="39" />
        <line x1="38" y1="30" x2="43" y2="35" />
      </g>
      {/* 机翼素描阴影排线 */}
      <line x1="16" y1="41" x2="19" y2="37" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <line x1="24" y1="52" x2="28" y2="49" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 2. Clash (iOS / 通用) 铅笔手绘 Logo
 * 参考官方截图精准重绘：经典蹲坐猫咪吉祥物剪影、尖挺双耳、左侧优雅上扬卷尾、两颗标志性圆圆纯真大眼睛
 */
export const PencilClashLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 底部手绘投影基准虚线 */}
      <line
        x1="12"
        y1="56"
        x2="56"
        y2="56"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
        strokeDasharray="4 3 12 3"
      />

      {/* Clash 经典蹲坐猫身全剪影轮廓（包含左侧卷尾） */}
      <path
        d="M 25 10 
           L 29 16 
           Q 36 17.5 43 16 
           L 47 10 
           L 50 17 
           Q 52.5 35 54 53 
           L 16 53 
           C 10 53, 6 46, 6 38 
           C 6 32, 9.5 30, 12 32 
           C 13.8 33.5, 13.5 37, 13 40 
           C 12.2 44.5, 14 48.5, 17.5 50.5 
           C 19.5 51.5, 21.5 51.5, 23 49 
           C 21.8 38, 21.2 26, 22 17 
           Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* 猫咪外轮廓手绘草图复线 */}
      <path
        d="M 25.5 11.5 L 29 17 Q 36 18.2 42.5 17 L 46.5 11.5 L 49.2 18 Q 51.5 35 53 52 L 23 52"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 双耳内轮廓与耳尖素描阴影 */}
      <line x1="26" y1="12" x2="28.5" y2="16.5" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
      <line x1="46" y1="12" x2="43.5" y2="16.5" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
      <line x1="26.5" y1="14" x2="28" y2="16" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
      <line x1="45.5" y1="14" x2="44" y2="16" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />

      {/* 猫身内部素描质感排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.35">
        <line x1="27" y1="36" x2="34" y2="43" />
        <line x1="33" y1="36" x2="40" y2="43" />
        <line x1="39" y1="36" x2="46" y2="43" />
        <line x1="45" y1="36" x2="50" y2="41" />
      </g>

      {/* 左侧卷曲尾巴素描阴影排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.4">
        <line x1="7.5" y1="42" x2="11.5" y2="39" />
        <line x1="8.5" y1="46" x2="12.5" y2="43" />
        <line x1="10" y1="50" x2="14" y2="47" />
      </g>

      {/* 标志性圆圆大眼睛（双眼纯净白色纸张底色镂空与黑眼框） */}
      <circle
        cx="29"
        cy="28"
        r="2.8"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="#FAF7F0"
      />
      <circle
        cx="43"
        cy="28"
        r="2.8"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="#FAF7F0"
      />
      {/* 眼睛手绘微小瞳孔高光点 */}
      <circle cx="29" cy="28" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="43" cy="28" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
};

/**
 * 3. Quantumult (圈X / 通用) 铅笔手绘 Logo
 * 参考官方截图精准重绘：标志性圆形徽章内嵌世界地图素描背景、三枚平行倾斜梯形圆角滑块阶梯排布
 */
export const PencilQuantumultXLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 外圈手绘圆形底盘 */}
      <circle
        cx="32"
        cy="32"
        r="24"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 圆徽章手绘草图复线 */}
      <circle
        cx="32"
        cy="32"
        r="22.2"
        strokeWidth="0.8"
        strokeDasharray="18 4 22 5"
        opacity="0.35"
      />

      {/* 四向罗盘刻度标（圈X 标志性微量刻度） */}
      <line x1="32" y1="6.5" x2="32" y2="9.5" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="54.5" x2="32" y2="57.5" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="6.5" y1="32" x2="9.5" y2="32" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="54.5" y1="32" x2="57.5" y2="32" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* 底盘背景：精致的世界大陆素描勾勒（美洲、欧亚非、大洋洲） */}
      <g strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.25">
        {/* 美洲板块 */}
        <path d="M 17 20 C 19 20, 22 23, 21 27 C 19 29, 17 31, 19 33 C 21 35, 23 38, 22 42 C 20 44, 18 43, 17 41" />
        {/* 欧亚板块与非洲 */}
        <path d="M 33 16 C 37 15, 42 16, 46 19 C 48 21, 46 25, 43 25 C 41 27, 43 32, 41 36 C 39 40, 36 41, 35 38 C 34 35, 33 30, 31 27" />
        {/* 大洋洲 */}
        <path d="M 44 43 C 47 42, 49 44, 47 47 C 45 48, 43 46, 44 43 Z" />
      </g>

      {/* 
        核心 Quantumult 标志性三枚倾斜阶梯滑块 (Top / Middle / Bottom)
        自右上向左下等间距阶梯分布，倾角约 25°，两端平整微圆角
      */}
      {/* 1. 上方滑块 (Top Block: 中心 x=38.2, y=22.2) */}
      <path
        d="M 34.2 19.6 
           L 44.4 19.6 
           Q 45.8 19.6 46.1 20.6 
           L 43.9 23.8 
           Q 43.6 24.8 42.2 24.8 
           L 32.0 24.8 
           Q 30.6 24.8 30.3 23.8 
           L 32.5 20.6 
           Q 32.8 19.6 34.2 19.6 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />
      {/* 上方滑块内部素描排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.5">
        <line x1="34" y1="23.5" x2="36" y2="20.5" />
        <line x1="37" y1="23.5" x2="39" y2="20.5" />
        <line x1="40" y1="23.5" x2="42" y2="20.5" />
      </g>

      {/* 2. 中间滑块 (Middle Block: 中心 x=32.0, y=32.0) */}
      <path
        d="M 28.0 29.4 
           L 38.2 29.4 
           Q 39.6 29.4 39.9 30.4 
           L 37.7 33.6 
           Q 37.4 34.6 36.0 34.6 
           L 25.8 34.6 
           Q 24.4 34.6 24.1 33.6 
           L 26.3 30.4 
           Q 26.6 29.4 28.0 29.4 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />
      {/* 中间滑块内部素描排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.5">
        <line x1="28" y1="33.3" x2="30" y2="30.3" />
        <line x1="31" y1="33.3" x2="33" y2="30.3" />
        <line x1="34" y1="33.3" x2="36" y2="30.3" />
      </g>

      {/* 3. 下方滑块 (Bottom Block: 中心 x=25.8, y=41.8) */}
      <path
        d="M 21.8 39.2 
           L 32.0 39.2 
           Q 33.4 39.2 33.7 40.2 
           L 31.5 43.4 
           Q 31.2 44.4 29.8 44.4 
           L 19.6 44.4 
           Q 18.2 44.4 17.9 43.4 
           L 20.1 40.2 
           Q 20.4 39.2 21.8 39.2 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />
      {/* 下方滑块内部素描排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.5">
        <line x1="22" y1="43.1" x2="24" y2="40.1" />
        <line x1="25" y1="43.1" x2="27" y2="40.1" />
        <line x1="28" y1="43.1" x2="30" y2="40.1" />
      </g>
    </svg>
  );
};

/**
 * 4. Karing (iOS / 跨平台通用) 铅笔手绘 Logo
 * 参考官方 App 图标精准重绘：标志性圆角方盘徽章底座、两条相互穿插咬合的平行链环 (Link)、内部核心数据胶囊与建筑素描排线
 */
export const PencilKaringLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 1. 手绘圆角方形 App 图标底盘 (带圆角和素描复线) */}
      <rect
        x="7"
        y="7"
        width="50"
        height="50"
        rx="13"
        ry="13"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      <rect
        x="8.5"
        y="8.5"
        width="47"
        height="47"
        rx="11.5"
        ry="11.5"
        strokeWidth="0.8"
        strokeDasharray="14 3 18 4"
        opacity="0.35"
      />

      {/* 2. 四角与边缘素描阴影排线 (烘托手绘图标立体质感) */}
      <g strokeWidth="0.8" strokeLinecap="round" opacity="0.25">
        <line x1="12" y1="17" x2="17" y2="12" />
        <line x1="14" y1="21" x2="21" y2="14" />
        <line x1="47" y1="12" x2="52" y2="17" />
        <line x1="43" y1="14" x2="50" y2="21" />
        <line x1="12" y1="47" x2="17" y2="52" />
        <line x1="14" y1="43" x2="21" y2="50" />
        <line x1="47" y1="52" x2="52" y2="47" />
        <line x1="43" y1="50" x2="50" y2="43" />
      </g>

      {/* 3. Karing 标志性互锁链环 (Interlocking Link) */}
      {/* 左环主干 (从底部水平开口端，绕过左侧大圆弧，经顶部横梁向右下弯折互锁) */}
      <path
        d="M 23.5 39.5 
           L 19 39.5 
           A 7.5 7.5 0 0 1 19 24.5 
           L 28.5 24.5 
           C 32.5 24.5, 35.5 27, 35.5 31 
           C 35.5 35, 33 37, 30 37"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 左环手绘草图复线 */}
      <path
        d="M 23 40.5 L 19 40.5 A 8.5 8.5 0 0 1 19 23.5 L 28.5 23.5 C 33 23.5, 36.5 26.5, 36.5 31"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 右环主干 (180度严格旋转对称：从顶部水平开口端，绕过右侧大圆弧，经底部横梁向左上弯折互锁) */}
      <path
        d="M 40.5 24.5 
           L 45 24.5 
           A 7.5 7.5 0 0 1 45 39.5 
           L 35.5 39.5 
           C 31.5 39.5, 28.5 37, 28.5 33 
           C 28.5 29, 31 27, 34 27"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 右环手绘草图复线 */}
      <path
        d="M 41 23.5 L 45 23.5 A 8.5 8.5 0 0 1 45 40.5 L 35.5 40.5 C 31 40.5, 27.5 37.5, 27.5 33"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 4. 双环中央核心数据胶囊 (Capsule / Pill) */}
      <rect
        x="17.5"
        y="30.5"
        width="6.5"
        height="3"
        rx="1.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <rect
        x="40"
        y="30.5"
        width="6.5"
        height="3"
        rx="1.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.12"
      />

      {/* 5. 互锁与圆弧处的素描质感排线 */}
      <g strokeWidth="0.8" strokeLinecap="round" opacity="0.4">
        {/* 左环圆弧内排线 */}
        <line x1="14" y1="29" x2="16" y2="31" />
        <line x1="14" y1="33" x2="16" y2="35" />
        {/* 右环圆弧内排线 */}
        <line x1="48" y1="29" x2="50" y2="31" />
        <line x1="48" y1="33" x2="50" y2="35" />
        {/* 中央互锁咬合阴影排线 (增强层叠进深感) */}
        <line x1="30" y1="29.5" x2="33" y2="32.5" />
        <line x1="31" y1="31.5" x2="34" y2="34.5" />
      </g>
    </svg>
  );
};

export const PencilLoonLogo = PencilKaringLogo;

/**
 * 5. Clash Verge Rev (Mac / Win / Linux) 铅笔手绘 Logo
 * 参考官方截图精准重绘：圆形底盘徽章内嵌纯粹极简白猫剪影、向上微挑的杏仁形猫眼与倒三角小猫鼻
 */
export const PencilClashVergeLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 经典圆形徽章底盘 */}
      <circle
        cx="32"
        cy="32"
        r="24"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 圆徽章草图复线 */}
      <circle
        cx="32"
        cy="32"
        r="22.2"
        strokeWidth="0.8"
        strokeDasharray="18 4 22 5"
        opacity="0.35"
      />

      {/* 底盘四周的铅笔阴影排线 (烘托中央主体猫头) */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.35">
        <line x1="16" y1="20" x2="22" y2="14" />
        <line x1="42" y1="14" x2="48" y2="20" />
        <line x1="14" y1="42" x2="20" y2="48" />
        <line x1="44" y1="48" x2="50" y2="42" />
      </g>

      {/* 核心白猫剪影主体轮廓：圆润下巴、微凸脸颊、两只尖尖耸立的灵动猫耳 */}
      <path
        d="M 21 17 
           C 24 22, 28 22.5, 32 22.5 
           C 36 22.5, 40 22, 43 17 
           C 46.5 23, 48 29, 47.5 35 
           C 46.8 42.5, 40.5 47.5, 32 47.5 
           C 23.5 47.5, 17.2 42.5, 16.5 35 
           C 16 29, 17.5 23, 21 17 Z"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />

      {/* 猫头轮廓手绘微抖复线 */}
      <path
        d="M 21.5 18 C 24.5 22.5, 28 23, 32 23 C 36 23, 39.5 22.5, 42.5 18 C 45.8 23.5, 47 29, 46.8 35 C 46.2 41.8, 40 46.8, 32 46.8 C 24 46.8, 17.8 41.8, 17.2 35"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* 镂空杏仁猫眼 (左眼：向上朝左耳微挑) */}
      <path
        d="M 22 34 
           C 23.2 31.8, 26.8 32.2, 28 33.6 
           C 26.6 35.8, 23 35.8, 22 34 Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />

      {/* 镂空杏仁猫眼 (右眼：向上朝右耳微挑) */}
      <path
        d="M 42 34 
           C 40.8 31.8, 37.2 32.2, 36 33.6 
           C 37.4 35.8, 41 35.8, 42 34 Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />

      {/* 镂空倒三角形圆角小猫鼻 */}
      <path
        d="M 30.5 38 
           C 31.2 37.6, 32.8 37.6, 33.5 38 
           C 33.2 39.5, 32.4 40.2, 32 40.2 
           C 31.6 40.2, 30.8 39.5, 30.5 38 Z"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );
};

/**
 * 6. Surge for Mac 铅笔手绘 Logo
 * 脉冲浪涌高压电弧、示波器正弦波爆发与圆形能量护盾
 */
export const PencilSurgeLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      <circle
        cx="32"
        cy="32"
        r="23"
        strokeWidth="2.3"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.03"
      />
      <circle
        cx="32"
        cy="32"
        r="21"
        strokeWidth="0.9"
        strokeDasharray="14 4 18 5"
        opacity="0.4"
      />

      {/* 核心穿透脉冲闪电浪涌波形 */}
      <path
        d="M 12 32 
           L 22 32 
           L 27 15 
           L 36 49 
           L 41 27 
           L 44 35 
           L 52 32"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 23 32 L 27.5 17 L 35 47 L 40 28"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* 上下共振频率余波 */}
      <path
        d="M 17 26 C 24 24, 28 20, 32 20 C 36 20, 40 24, 47 26"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 17 38 C 24 40, 28 44, 32 44 C 36 44, 40 40, 47 38"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 放射线条 */}
      <line x1="27" y1="11" x2="27" y2="8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="53" x2="36" y2="56" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="13" x2="21" y2="11" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="31" y1="13" x2="33" y2="11" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

/**
 * 7. Clash Party (Mac / Win) 铅笔手绘 Logo
 * 参考官方截图精准重绘：端坐的极简猫咪剪影、尖尖双耳、两颗圆黑大眼、前肢爪迹轮廓、右侧卷尾与右耳畔气泡
 */
export const PencilClashPartyLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 底部手绘投影基准虚线 */}
      <line
        x1="12"
        y1="56"
        x2="56"
        y2="56"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 3 10 3"
        opacity="0.3"
      />

      {/* Clash Party 端坐猫咪主体轮廓 */}
      <path
        d="M 22.5 14.5
           C 25 17.5, 27 18.5, 29 18.5
           C 31 18.5, 33 17.5, 35.5 14.5
           C 37 19.5, 38.5 25, 39.2 31
           C 40.2 39, 42 47, 42 50.5
           C 42 52.5, 40 53.5, 37 53.5
           L 21 53.5
           C 18 53.5, 16 52.5, 16 50.5
           C 16 47, 17.8 39, 18.8 31
           C 19.5 25, 21 19.5, 22.5 14.5 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* 猫咪外轮廓手绘草图复线 */}
      <path
        d="M 23 15.5 C 25 18, 27 19, 29 19 C 31 19, 33 18, 35 15.5 C 36.5 20, 38 25, 38.8 31 C 39.8 39, 41.3 47, 41.3 50.5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 双耳内轮廓素描微阴影 */}
      <line x1="23.5" y1="16.5" x2="25.5" y2="19.5" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
      <line x1="34.5" y1="16.5" x2="32.5" y2="19.5" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />

      {/* 标志性两颗圆形大眼睛 */}
      <circle cx="25.5" cy="24.5" r="2.3" fill="currentColor" stroke="none" />
      <circle cx="32.5" cy="24.5" r="2.3" fill="currentColor" stroke="none" />

      {/* 前胸端坐双腿爪印线条 */}
      <path
        d="M 21 44 C 23.5 44, 25.5 46.5, 25.5 53.5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 37 44 C 34.5 44, 32.5 46.5, 32.5 53.5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 身体腹部手绘素描排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.3">
        <line x1="26" y1="34" x2="32" y2="40" />
        <line x1="29" y1="31" x2="35" y2="37" />
      </g>

      {/* 右侧上卷猫尾 */}
      <path
        d="M 41.5 51.5 
           C 47 52, 52.5 49.5, 52.5 44 
           C 52.5 38.5, 47.5 37, 43 37 
           C 42 37, 42 39.5, 43 39.5 
           C 46.5 39.5, 49.5 40.8, 49.5 44 
           C 49.5 47.2, 45.8 48.8, 41.5 48.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M 43 38.2 C 47 38.2, 51 40.2, 51 44 C 51 47.5, 46.5 49.8, 41.5 49.5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 右耳畔标志性圆球气泡 (带指向猫颊的微小气嘴) */}
      <path
        d="M 44.5 24 L 40.5 25.2 L 44 26.8 
           A 6.2 6.2 0 1 0 44.5 24 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <circle cx="49.5" cy="22.5" r="5" strokeWidth="0.8" opacity="0.35" strokeDasharray="8 3" />
    </svg>
  );
};

/**
 * 8. sing-box (Mac / Android) 铅笔手绘 Logo
 * 经典的轴测立体三维魔方盒子、共振声波刻线与空间阴影面
 */
export const PencilSingBoxLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      <path
        d="M 32 10 
           L 52 21 
           L 52 44 
           L 32 55 
           L 12 44 
           L 12 21 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.03"
      />

      <path
        d="M 32 32 L 52 21 M 32 32 L 12 21 M 32 32 L 32 55"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 右侧面密集素描阴影排线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.7">
        <line x1="36" y1="35" x2="49" y2="28" />
        <line x1="36" y1="40" x2="49" y2="33" />
        <line x1="36" y1="45" x2="49" y2="38" />
        <line x1="36" y1="50" x2="49" y2="43" />
      </g>

      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.4">
        <line x1="16" y1="28" x2="28" y2="35" />
        <line x1="16" y1="33" x2="28" y2="40" />
        <line x1="16" y1="38" x2="28" y2="45" />
      </g>

      {/* 顶面镌刻的 "S" 形声波律动 */}
      <path
        d="M 28 17 C 32 15, 36 17, 33 21 C 30 25, 34 27, 37 25"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <line x1="28" y1="7" x2="28" y2="5" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="32" y1="6" x2="32" y2="3" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="36" y1="7" x2="36" y2="5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 9. v2rayNG (Android / Windows) 铅笔手绘 Logo
 * 参考官方截图精准重绘：圆环底徽内置经典极具辨识度的 V2Ray 粗衬线 “V” 字徽标
 */
export const PencilV2RayNGLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 经典外圆徽章底框 */}
      <circle
        cx="32"
        cy="32"
        r="24"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 徽章手绘圆环复线 */}
      <circle
        cx="32"
        cy="32"
        r="22.2"
        strokeWidth="0.8"
        strokeDasharray="18 4 22 5"
        opacity="0.35"
      />

      {/* 核心 v2rayNG 标志性字形 “V” */}
      <path
        d="M 19 19.5 
           H 27.5 
           V 22.2 
           H 25.5 
           V 31 
           L 32.5 44.5 
           L 44.5 19.5 
           H 38 
           L 31.5 34.5 
           L 26 24.5 
           V 22.2 
           H 22.5 
           V 21 
           H 19 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />

      {/* 标志性 “V” 内部手绘斜向素描阴影排线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <line x1="22" y1="23" x2="25" y2="26" />
        <line x1="22" y1="27" x2="25" y2="30" />
        <line x1="26" y1="33" x2="31" y2="38" />
        <line x1="30" y1="39" x2="33" y2="42" />
        <line x1="33" y1="34" x2="38" y2="29" />
        <line x1="36" y1="28" x2="41" y2="23" />
        <line x1="39" y1="23" x2="43" y2="19.5" />
      </g>

      {/* 右侧主笔画外缘复线 */}
      <line
        x1="33.5"
        y1="44"
        x2="45"
        y2="20"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeDasharray="10 3"
        opacity="0.4"
      />
    </svg>
  );
};

/**
 * 10. FlClash (Android) 铅笔手绘 Logo
 * 参考官方截图精准重绘：标志性三段式设计——上方倾斜长圆角胶囊、中部平行短胶囊、下方圆形圆点，构成动感极简 “F”
 */
export const PencilFlClashLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 顶部主胶囊 (倾斜向上的长条圆角药丸) */}
      <path
        d="M 17.5 23.2 
           L 44.5 8.2 
           A 5.2 5.2 0 0 1 49.5 17.2 
           L 22.5 32.2 
           A 5.2 5.2 0 0 1 17.5 23.2 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* 顶部主胶囊草图复线 */}
      <path
        d="M 19 24.5 L 43.5 11 A 3.8 3.8 0 0 1 47.5 16 L 23 29.5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* 顶部胶囊内部素描排线 */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.65">
        <line x1="24" y1="25" x2="28" y2="29" />
        <line x1="30" y1="21.5" x2="34" y2="25.5" />
        <line x1="36" y1="18" x2="40" y2="22" />
        <line x1="42" y1="14.5" x2="46" y2="18.5" />
      </g>

      {/* 中部平行次胶囊 (较短圆角药丸) */}
      <path
        d="M 21.2 34.6 
           L 38.8 24.8 
           A 4.8 4.8 0 0 1 43.2 33.2 
           L 25.6 43 
           A 4.8 4.8 0 0 1 21.2 34.6 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* 中部胶囊内部素描排线 */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.65">
        <line x1="27" y1="36" x2="31" y2="40" />
        <line x1="32" y1="33" x2="36" y2="37" />
        <line x1="37" y1="30" x2="41" y2="34" />
      </g>

      {/* 底部正圆圆点 */}
      <circle
        cx="28.5"
        cy="51"
        r="4.4"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* 圆点草图复线 */}
      <circle
        cx="28.5"
        cy="51"
        r="3"
        strokeWidth="0.8"
        strokeDasharray="6 2"
        opacity="0.4"
      />
      {/* 圆点素描排线 */}
      <line x1="26" y1="50" x2="30" y2="52" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

/**
 * 11. NekoBox / NekoRay (Android / Windows) 铅笔手绘 Logo
 * 参考官方截图精准重绘：快递纸箱中探出小脑袋的猫耳萌娘、整齐刘海、直勾勾大眼睛、右侧白色发饰绒球与箱前小猫涂鸦
 */
export const PencilNekoBoxLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* --- 箱中猫娘萌妹头部与发型 --- */}
      {/* 左猫耳 (黑色外壳带折角) */}
      <path
        d="M 21 21 L 19 11 L 28 17 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <line x1="21" y1="16" x2="25" y2="18" strokeWidth="1" strokeLinecap="round" opacity="0.65" />

      {/* 右猫耳 */}
      <path
        d="M 36 17 L 45 11 L 43 21 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <line x1="43" y1="16" x2="39" y2="18" strokeWidth="1" strokeLinecap="round" opacity="0.65" />

      {/* 头顶与齐刘海 (Hime Cut 萌发型) */}
      <path
        d="M 20 20 C 24 16, 40 16, 44 20"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 垂在额前的整齐发帘与鬓角 */}
      <path
        d="M 20 20 L 19 34 M 44 20 L 45 34"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M 20 26 
           C 23 28.5, 26 28, 28 28.5 
           C 30 28, 33 29, 36 27.5 
           C 39 29, 41 28, 44 26"
        strokeWidth="2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* 标志性萌系大眼 (直勾勾的纯白椭圆眼睛带黑色手绘轮廓) */}
      <ellipse
        cx="26"
        cy="28"
        rx="2.5"
        ry="3.4"
        strokeWidth="1.8"
        fill="white"
      />
      <ellipse
        cx="37"
        cy="28"
        rx="2.5"
        ry="3.4"
        strokeWidth="1.8"
        fill="white"
      />

      {/* 脸蛋轻微红晕线条 */}
      <line x1="21.5" y1="31" x2="24" y2="31" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="39" y1="31" x2="41.5" y2="31" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />

      {/* 头发右侧挂着的纯白小绒球发饰 */}
      <circle
        cx="46.5"
        cy="23"
        r="3.2"
        strokeWidth="1.6"
        fill="white"
      />
      <circle cx="46.5" cy="23" r="1.5" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 1" />

      {/* --- 前景瓦楞纸箱 (Cardboard Delivery Box) --- */}
      {/* 纸箱左侧下折外翻盖 */}
      <path
        d="M 13 34 L 7 43 L 13 45 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />
      {/* 纸箱右侧后扬翻盖 */}
      <path
        d="M 51 34 L 57 27 L 51 26 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />

      {/* 纸箱正面主体四方立面 */}
      <path
        d="M 13 34 
           L 51 34 
           L 49 55 
           L 15 55 Z"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FAF7F0"
      />

      {/* 纸箱上沿折痕复线 */}
      <line x1="13" y1="36" x2="51" y2="36" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

      {/* 纸箱右侧小猫涂鸦 (还原原图纸箱上的手绘小猫图案) */}
      <path
        d="M 40 44 L 41.5 41 L 43.5 43 L 45.5 41 L 47 44 C 47.5 47, 44 48.5, 40 47"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <circle cx="42.5" cy="44.5" r="0.6" fill="currentColor" />
      <circle cx="45" cy="44.5" r="0.6" fill="currentColor" />

      {/* 纸箱阴影排线 */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.55">
        <line x1="18" y1="51" x2="22" y2="55" />
        <line x1="23" y1="51" x2="27" y2="55" />
        <line x1="28" y1="51" x2="32" y2="55" />
      </g>
    </svg>
  );
};

/**
 * 12. v2rayN (Windows) 铅笔手绘 Logo
 * 共享统一标准的经典 V2Ray 徽标
 */
export const PencilV2RayNLogo: React.FC<PencilSoftwareLogoProps> = (props) => {
  return <PencilV2RayNGLogo {...props} />;
};

/**
 * 13. v2rayA (Linux / 软路由) 铅笔手绘 Logo
 * 参考官方截图精准重绘：圆环底徽内嵌苍劲浑厚、带飞白提笔出锋的中国传统毛笔书法 “V” 字
 */
export const PencilV2RayALogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 经典外圆徽章底框 */}
      <circle
        cx="32"
        cy="32"
        r="24"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 徽章手绘圆环复线 */}
      <circle
        cx="32"
        cy="32"
        r="22.2"
        strokeWidth="0.8"
        strokeDasharray="18 4 22 5"
        opacity="0.35"
      />

      {/* 核心书法毛笔 “V” 字：
          左侧下笔顿笔藏锋 (圆润浑厚)，向右下运笔弧线转折；
          右侧向上提笔出锋，带有明显的毛笔枯笔飞白 (Dry-brush) 笔触。
      */}
      <path
        d="M 21.5 20 
           C 24.5 19, 27.5 20.5, 27 24 
           C 26.5 28, 29.5 37, 32.5 45.5 
           C 34 45.5, 35 44, 36.5 40 
           C 39 33, 42 26, 45 19.5 
           C 43.5 20.5, 41 23, 40 26 
           C 36.5 34, 33 40, 31.5 41 
           C 28.5 35, 25 27, 23.5 23 
           C 22.5 20.5, 19.5 21, 21.5 20 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.14"
      />

      {/* 书法起笔 (左上端) 浑厚墨韵排线 */}
      <g strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <line x1="22" y1="21" x2="26" y2="23" />
        <line x1="23" y1="25" x2="26" y2="28" />
        <line x1="25.5" y1="30" x2="28" y2="34" />
        <line x1="28.5" y1="37" x2="31" y2="41" />
      </g>

      {/* 书法右上提笔飞白 (枯笔丝纹) 特征还原 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        {/* 飞白干枯笔触线条 */}
        <line x1="41" y1="26" x2="44" y2="19.5" />
        <line x1="42.5" y1="28" x2="45.5" y2="21" />
        <line x1="43.5" y1="32" x2="47" y2="23.5" />
      </g>
      {/* 飞白末端小墨点飞溅 */}
      <circle cx="46" cy="18.5" r="0.9" fill="currentColor" />
      <circle cx="48" cy="21.5" r="0.8" fill="currentColor" />
    </svg>
  );
};

/**
 * 14. OpenClash (Linux / 软路由) 铅笔手绘 Logo
 * 参考官方截图精准重绘：经典的深蓝金字塔梯形猫身剪影、高耸双耳、两颗纯真大白眼、呆萌 w 形猫唇与左侧上扬卷尾
 */
export const PencilOpenClashLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 底部手绘投影基准虚线 */}
      <line
        x1="10"
        y1="56"
        x2="56"
        y2="56"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 3 10 3"
        opacity="0.3"
      />

      {/* OpenClash 经典梯形金字塔猫身全剪影轮廓 */}
      <path
        d="M 25 12.5 
           C 28 17.5, 31.5 19, 35.5 19 
           C 39.5 19, 43 17.5, 46 12.5 
           C 47.8 24, 49.8 38, 51 49 
           C 51.5 51.5, 49.5 53, 47 53 
           L 24 53 
           C 21.5 53, 20 51.5, 21 48.5 
           C 22.2 38, 23.8 24, 25 12.5 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />

      {/* 猫身外轮廓手绘复线 */}
      <path
        d="M 25.5 14 C 28.5 18.5, 31.5 20, 35.5 20 C 39.5 20, 42.5 18.5, 45.2 14 C 47 24.5, 48.8 38, 50 48.5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 双耳内轮廓与耳尖素描阴影 */}
      <line x1="26" y1="14.5" x2="28" y2="18" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
      <line x1="45" y1="14.5" x2="43" y2="18" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />

      {/* 标志性深蓝猫体质感素描排线 (45 度斜排线) */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.35">
        <line x1="28" y1="36" x2="35" y2="43" />
        <line x1="34" y1="36" x2="41" y2="43" />
        <line x1="40" y1="36" x2="47" y2="43" />
        <line x1="25" y1="44" x2="32" y2="51" />
        <line x1="31" y1="44" x2="38" y2="51" />
        <line x1="37" y1="44" x2="44" y2="51" />
      </g>

      {/* 左侧灵动上扬卷尾 */}
      <path
        d="M 22.5 50.5 
           C 16 50.5, 11 46, 11 41 
           C 11 36, 13.5 32.5, 16.5 32.5 
           C 17.5 32.5, 18.2 33.2, 18 34.2 
           C 17 37, 15.5 39.5, 15.5 42 
           C 15.5 45, 18 47.5, 23 48"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M 12.5 41 C 12.5 37.5, 14.5 34, 16.5 34"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* 标志性纯洁圆白大眼 (纸张底色镂空与黑眼框) */}
      <circle
        cx="31"
        cy="26"
        r="2.7"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="#FAF7F0"
      />
      <circle
        cx="40"
        cy="26"
        r="2.7"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="#FAF7F0"
      />
      {/* 瞳孔中心微小黑铅笔着力点 */}
      <circle cx="31" cy="26" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="40" cy="26" r="0.8" fill="currentColor" stroke="none" />

      {/* 标志性呆萌 'w' 形小猫嘴 */}
      <path
        d="M 34.2 29.5 Q 35 30.8 35.5 29.8 Q 36 30.8 36.8 29.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 15. dae (Linux / 内核级 eBPF) 铅笔手绘 Logo
 * 标志性 Untitled Goose '大鹅叼刀' (Peace was never an option) 经典吉祥物素描重绘：
 * 经典疾走鹅身轮廓、翘尾羽毛、长扁鹅喙牢牢咬紧黄油刀、双足腾空飞奔与 eBPF 吞吐风速微线
 */
export const PencilDaeLogo: React.FC<PencilSoftwareLogoProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'url(#pencil-stroke)',
      }}
      stroke="currentColor"
      {...props}
    >
      {/* 底部手绘奔跑投影虚线 */}
      <line
        x1="9"
        y1="56"
        x2="53"
        y2="56"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 3 10 3"
        opacity="0.3"
      />

      {/* 奔跑风速素描线 (大鹅高速偷刀飞奔动感，呼应 eBPF 万兆吞吐) */}
      <path
        d="M 5 21 C 7 19.5, 8.5 21.5, 10 20"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 4 26 C 6 25, 7.5 27, 9 25.5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* 1. 腾空后蹬的左腿与展开蹼足 (后足) */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 17.5 42 L 12.8 47.2"
          strokeWidth="2.2"
        />
        <path
          d="M 12.8 47.2 L 7.8 48.2
             M 12.8 47.2 L 9.6 53.5
             M 12.8 47.2 L 15.2 50.2"
          strokeWidth="2.0"
        />
        <path
          d="M 7.8 48.2 Q 8.5 51.5 9.6 53.5 Q 12.5 52.2 15.2 50.2"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.12"
        />
      </g>

      {/* 2. 大鹅身体核心轮廓 (翘尾、背颈、头部、丰满胸腹剪影) */}
      <path
        d="M 12.5 17
           C 14 23, 17.5 24, 22.5 24.5
           C 27.5 25, 32.5 26.5, 36.5 28.5
           C 39.5 27, 42.5 26, 45 26.8
           C 47.5 27.8, 48 29.5, 46.8 32
           C 44.5 34, 40.5 36.5, 37.5 39.5
           C 34.5 42.5, 29.5 44, 23 44
           C 17 44, 14 40.5, 14.5 34
           C 15 28, 11.5 21.5, 12.5 17 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* 翘尾羽毛层次手绘草图复线 */}
      <path
        d="M 13.5 18.5 C 14.8 24, 18 24.8, 23 25.5 C 28 26, 32.5 27.5, 36 29.5 C 39 28, 42 27.2, 44.2 27.8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M 15 20 L 16.8 24"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* 3. 鹅翅膀翼羽波浪轮廓与层次 */}
      <path
        d="M 20.5 26.5
           C 17 30, 16 34.5, 16.5 38
           C 18.5 39.5, 21.2 39, 23.2 38
           C 25.2 39.5, 27.8 39, 30.2 37.5
           C 32.2 36, 33.8 33, 32.8 29.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 翅羽内部素描质感排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.35">
        <line x1="20" y1="31.5" x2="23" y2="35.5" />
        <line x1="24" y1="31.5" x2="27" y2="35.5" />
        <line x1="28" y1="31.5" x2="31" y2="35" />
      </g>

      {/* 4. 前跨踏地的右腿与蹼足 (前足) */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 31.8 43.5 L 35.2 48.2"
          strokeWidth="2.2"
        />
        <path
          d="M 35.2 48.2 L 32.2 50.8
             M 35.2 48.2 L 36.2 54.8
             M 35.2 48.2 L 41.5 50.8"
          strokeWidth="2.0"
        />
        <path
          d="M 32.2 50.8 Q 33.8 53.8 36.2 54.8 Q 38.8 53.2 41.5 50.8"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.12"
        />
      </g>

      {/* 5. 叼着的经典黄油刀 (刀柄朝左下，刀身冲向右上) */}
      {/* 刀柄木质握把 (向下后方倾斜圆润刀柄) */}
      <path
        d="M 43.8 33.5 
           L 40.2 39.5 
           C 39.5 40.8, 41.2 41.8, 42.2 40.8 
           L 45.8 34.8 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* 刀柄中心手绘素描质感微线 */}
      <line
        x1="43.5"
        y1="35.5"
        x2="41.5"
        y2="39"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* 黄油刀金属刀刃 (自喙部向前上方伸出，带圆头安全刀尖) */}
      <path
        d="M 47.8 31.2 
           L 57.5 25 
           C 59.2 24, 60.5 25.4, 59.2 27 
           L 49.2 33.4 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* 刀刃金属反光素描线 */}
      <line
        x1="50"
        y1="31.2"
        x2="57.2"
        y2="26.4"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 6. 标志性大鹅长扁喙 (上下喙牢牢咬紧刀身) */}
      <path
        d="M 45.5 28.2 
           L 52 30.8 
           C 52.2 31.8, 51.5 32.6, 50.2 32.8 
           L 46.2 34 Z"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.18"
      />
      {/* 鹅嘴鼻孔微点 */}
      <circle cx="47" cy="29.2" r="0.5" fill="currentColor" stroke="none" />

      {/* 7. 鹅眼：纯黑小圆眼与纯白高光点，透出'大鹅出击'的坚定与诙谐 */}
      <circle cx="43.5" cy="29.2" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="43.2" cy="28.9" r="0.45" fill="#FAF7F0" stroke="none" />

      {/* 8. 鹅腹与下胸素描阴影排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.3">
        <line x1="20" y1="41.5" x2="23" y2="44" />
        <line x1="24" y1="41.5" x2="27" y2="44" />
        <line x1="28" y1="41.5" x2="31" y2="44" />
      </g>
    </svg>
  );
};

/**
 * 软件 ID 与铅笔 Logo 映射统一解析组件
 * 保证不同系统平台的同一款软件 Logo 严格保持一致
 */
export const PencilSoftwareLogo: React.FC<{
  toolId: string;
  className?: string;
  size?: number | string;
}> = ({ toolId, className = 'w-6 h-6', size, ...props }) => {
  switch (toolId) {
    case 'shadowrocket':
      return <PencilShadowrocketLogo className={className} size={size} {...props} />;
    
    case 'clash-ios':
    case 'clash-mac':
      return <PencilClashLogo className={className} size={size} {...props} />;
    
    case 'quantumult-x':
      return <PencilQuantumultXLogo className={className} size={size} {...props} />;
    
    case 'karing':
    case 'loon':
      return <PencilKaringLogo className={className} size={size} {...props} />;
    
    // Clash Verge Rev (macOS / Windows / Linux 全平台保持完全一致)
    case 'clash-verge-rev-mac':
    case 'clash-verge-rev-win':
    case 'clash-verge-rev-linux':
      return <PencilClashVergeLogo className={className} size={size} {...props} />;
    
    case 'surge-mac':
      return <PencilSurgeLogo className={className} size={size} {...props} />;
    
    case 'clash-party-mac':
    case 'clash-party-win':
      return <PencilClashPartyLogo className={className} size={size} {...props} />;
    
    case 'sing-box-mac':
    case 'sing-box-android':
      return <PencilSingBoxLogo className={className} size={size} {...props} />;
    
    // v2rayNG / v2rayN 保持经典 V2Ray 徽标一致
    case 'v2rayng':
    case 'v2rayn':
      return <PencilV2RayNGLogo className={className} size={size} {...props} />;
    
    // FlClash (Android)
    case 'flclash':
      return <PencilFlClashLogo className={className} size={size} {...props} />;
    
    // NekoBox / NekoRay 保持官方纸箱萌猫徽标一致
    case 'nekobox-android':
    case 'nekoray':
      return <PencilNekoBoxLogo className={className} size={size} {...props} />;
    
    // v2rayA (Linux / 软路由)
    case 'v2raya':
      return <PencilV2RayALogo className={className} size={size} {...props} />;
    
    case 'openclash':
      return <PencilOpenClashLogo className={className} size={size} {...props} />;
    
    case 'dae':
      return <PencilDaeLogo className={className} size={size} {...props} />;
    
    default:
      return <PencilClashLogo className={className} size={size} {...props} />;
  }
};
