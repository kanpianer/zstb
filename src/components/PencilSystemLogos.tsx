import React from 'react';

export interface PencilLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * 苹果系统 (Apple) 铅笔素描黑白手绘 Logo
 * 特征：经典被咬一口的苹果轮廓、斜向水滴叶片、细密铅笔排线素描明暗、草稿重叠手绘笔触
 */
export const PencilAppleLogo: React.FC<PencilLogoProps> = ({
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
      {/* 顶部苹果叶片 */}
      <path
        d="M34 16 C34 9 40 4 46.5 4.5 C47.5 11 41.5 17 34 16 Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* 叶片中央叶脉 */}
      <path
        d="M35 14 C38.5 10 42.5 7 45.5 5.5"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* 叶片素描排线 */}
      <line x1="38" y1="12" x2="41" y2="14" strokeWidth="1" opacity="0.65" strokeLinecap="round" />
      <line x1="41" y1="9" x2="43.5" y2="11.5" strokeWidth="1" opacity="0.65" strokeLinecap="round" />

      {/* 苹果手绘主外轮廓 */}
      <path
        d="M32 20 
           C28.5 16.5 23.5 15 19.5 17.5 
           C14.5 20.5 11.5 26.5 11.5 33 
           C11.5 42 16.5 51 22 56 
           C25 58.5 28 58.5 32 55.8 
           C36 58.5 39 58.5 42 56 
           C47.5 51 52.5 42 52.5 35 
           C45.5 35 41.5 30 42.5 24 
           C43.5 19 47 16.5 48.5 16 
           C45 15 40 16 36 19 
           C34.2 20.3 33.2 20.5 32 20 Z"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.03"
      />

      {/* 咬痕边缘手绘双线（增加咬痕立体切面手绘感） */}
      <path
        d="M48.5 16 C45.5 18 43 21 42.5 24.5 C42 29 45.5 33.5 51.5 34.5"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* 咬痕内凹处素描短排线 */}
      <line x1="44" y1="21" x2="41.5" y2="22.5" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
      <line x1="43.2" y1="24.5" x2="40.8" y2="25.2" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
      <line x1="43.8" y1="28" x2="41.5" y2="29" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
      <line x1="46" y1="31.5" x2="44" y2="33" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />

      {/* 草图微抖动复线（铅笔重绘笔触） */}
      <path
        d="M19.5 18 C15.5 21 12.5 27 12.5 33 C12.5 41.5 17.5 50.5 22.5 55 C25 57.5 28 57.5 32 55.2"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
        strokeDasharray="20 4 30 5"
      />

      {/* 苹果左侧与下腹素描阴影排线 (Diagonal Hatching Lines) */}
      <g strokeWidth="1.3" strokeLinecap="round" opacity="0.75">
        <line x1="16" y1="27" x2="22" y2="33" />
        <line x1="15" y1="32" x2="24" y2="41" />
        <line x1="15.5" y1="37" x2="26" y2="47.5" />
        <line x1="17.5" y1="42" x2="28" y2="52.5" />
        <line x1="21" y1="46" x2="29.5" y2="54.5" />
        <line x1="25.5" y1="50" x2="31" y2="55.5" />
      </g>

      {/* 底部右侧辅助微排线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.5">
        <line x1="37" y1="53" x2="41" y2="57" />
        <line x1="41" y1="50" x2="45" y2="54" />
        <line x1="44.5" y1="45" x2="48" y2="48.5" />
      </g>

      {/* 顶部中央凹陷素描小笔触 */}
      <path
        d="M30.5 20.5 C31.5 22.5 32.5 22.5 33.5 20.5"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
};

/**
 * 安卓系统 (Android) 铅笔素描黑白手绘 Logo
 * 特征：经典机器人半圆穹顶头部、小天线、双眼、圆角躯干、悬浮手脚，带立体素描明暗排线
 */
export const PencilAndroidLogo: React.FC<PencilLogoProps> = ({
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
      {/* 左天线 */}
      <path
        d="M23 15 L17 7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="6.5" r="1.1" fill="currentColor" />

      {/* 右天线 */}
      <path
        d="M41 15 L47 7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="47.5" cy="6.5" r="1.1" fill="currentColor" />

      {/* 头部半圆穹顶 */}
      <path
        d="M17 25 C17 16.5 23.5 10 32 10 C40.5 10 47 16.5 47 25 Z"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 头部草图复线 */}
      <path
        d="M18 24.5 C18 17.5 24 11.5 32 11.5 C39.5 11.5 45.8 17.2 46.2 24.5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* 眼睛：手绘小圆圈带白高光 */}
      <circle cx="24" cy="19" r="2.2" strokeWidth="1.4" fill="currentColor" />
      <circle cx="23.3" cy="18.3" r="0.7" fill="white" stroke="none" />

      <circle cx="40" cy="19" r="2.2" strokeWidth="1.4" fill="currentColor" />
      <circle cx="39.3" cy="18.3" r="0.7" fill="white" stroke="none" />

      {/* 头部右侧弧形素描明暗排线 */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.65">
        <line x1="39" y1="12" x2="43" y2="16" />
        <line x1="42" y1="16" x2="45" y2="20" />
        <line x1="43.5" y1="20" x2="46" y2="24" />
      </g>

      {/* 身体躯干 (圆角下半身) */}
      <path
        d="M17 28.5 L47 28.5 L47 44.5 C47 48 44 50.5 40 50.5 L24 50.5 C20 50.5 17 48 17 44.5 Z"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.03"
      />
      {/* 躯干草图辅助复线 */}
      <path
        d="M18 29.5 L46 29.5 L46 44 C46 47 43.5 49.5 39.8 49.5 L24.2 49.5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 左手臂 */}
      <rect
        x="10.5"
        y="29"
        width="4"
        height="13"
        rx="2"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 右手臂 */}
      <rect
        x="49.5"
        y="29"
        width="4"
        height="13"
        rx="2"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 左小腿 */}
      <rect
        x="22.5"
        y="50.5"
        width="4.2"
        height="9"
        rx="2.1"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 右小腿 */}
      <rect
        x="37.3"
        y="50.5"
        width="4.2"
        height="9"
        rx="2.1"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 躯干右下侧素描排线阴影 */}
      <g strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
        <line x1="34" y1="32" x2="44" y2="42" />
        <line x1="36" y1="37" x2="45" y2="46" />
        <line x1="38" y1="42" x2="43" y2="47" />
        <line x1="28" y1="44" x2="33" y2="49" />
      </g>

      {/* 右手臂阴影排线 */}
      <line x1="51" y1="35" x2="52.5" y2="37" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <line x1="51" y1="38" x2="52.5" y2="40" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

      {/* 底部草图铅笔阴影地面线 */}
      <path
        d="M15 61 C22 61.5 42 61.5 49 61"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
        strokeDasharray="4 3 8 2"
      />
    </svg>
  );
};

/**
 * Windows 系统 (Windows) 铅笔素描黑白手绘 Logo
 * 特征：经典透视四格窗，手绘出头交接线、不同密度的多向素描排线，建筑制图草图风
 */
export const PencilWindowsLogo: React.FC<PencilLogoProps> = ({
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
      {/* 窗格 1：左上 (透视四边形) */}
      <path
        d="M9 20 L28 16.5 L28 29.5 L9 29.5 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 草图出头线 (建筑画风手绘交叉线) */}
      <line x1="7" y1="20.5" x2="12" y2="19.5" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <line x1="26" y1="17" x2="30" y2="16" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      {/* 窗格 1 排线：45度斜向素描 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <line x1="12" y1="27" x2="19" y2="20" />
        <line x1="15" y1="29.5" x2="24" y2="20.5" />
        <line x1="20" y1="29.5" x2="27" y2="22.5" />
      </g>

      {/* 窗格 2：右上 (透视更高更大) */}
      <path
        d="M32 15.5 L55 10 L55 29.5 L32 29.5 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* 窗格 2 排线：密集 -45度斜向排线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.8">
        <line x1="36" y1="17" x2="45" y2="26" />
        <line x1="41" y1="15.5" x2="50" y2="24.5" />
        <line x1="46" y1="14" x2="54" y2="22" />
        <line x1="34" y1="22.5" x2="41" y2="29.5" />
        <line x1="44" y1="22.5" x2="51" y2="29.5" />
      </g>

      {/* 窗格 3：左下 (透视收敛) */}
      <path
        d="M9 33.5 L28 33.5 L28 46.5 L9 43 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* 窗格 3 排线：十字交叉排线 (Cross-hatching) */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.75">
        {/* 正斜线 */}
        <line x1="11" y1="40" x2="18" y2="34" />
        <line x1="14" y1="42" x2="23" y2="34.5" />
        <line x1="19" y1="44.5" x2="27" y2="37" />
        {/* 反斜线 */}
        <line x1="12" y1="35" x2="19" y2="42" />
        <line x1="16" y1="34" x2="25" y2="43" />
        <line x1="21" y1="34" x2="27" y2="40.5" />
      </g>

      {/* 窗格 4：右下 (透视向下延伸) */}
      <path
        d="M32 33.5 L55 33.5 L55 53 L32 47.5 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* 窗格 4 排线：水平细腻草图线 */}
      <g strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <line x1="35" y1="37" x2="52" y2="37" />
        <line x1="35" y1="40.5" x2="52" y2="40.5" />
        <line x1="35" y1="44" x2="49" y2="44" />
        <line x1="38" y1="47.5" x2="53" y2="47.5" />
      </g>

      {/* 中心十字轴线的手绘微延长虚线 */}
      <line x1="5" y1="31.5" x2="59" y2="31.5" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.35" />
      <line x1="30" y1="9" x2="30" y2="54" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.35" />
    </svg>
  );
};

/**
 * Linux 系统 (Linux Tux Penguin) 铅笔素描黑白手绘 Logo
 * 特征：经典 Tux 企鹅，圆鼓鼓身体、大眼睛、小喙、小翅膀小脚丫，浓郁黑色羽毛铅笔排线素描
 */
export const PencilLinuxLogo: React.FC<PencilLogoProps> = ({
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
      {/* Tux 企鹅身体主轮廓 (头顶+背部+身体) */}
      <path
        d="M32 9 
           C27.5 9 24 12.5 23.5 16.5 
           C23 19.5 21.5 23 18 26 
           C13 29.5 9.5 35 12 40 
           C13.5 43 17 40 18 36 
           C18 42 20 50 24 53 
           C27 55 37 55 40 53 
           C44 50 46 42 46 36 
           C47 40 50.5 43 52 40 
           C54.5 35 51 29.5 46 26 
           C42.5 23 41 19.5 40.5 16.5 
           C40 12.5 36.5 9 32 9 Z"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />

      {/* 草图辅助复线 (头部与肩部重线) */}
      <path
        d="M32 10.5 C28.2 10.5 25 13.2 24.5 17 C24 20 22.5 23.2 19 26"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M32 10.5 C35.8 10.5 39 13.2 39.5 17 C40 20 41.5 23.2 45 26"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* 标志性白色大肚皮 (Belly) 轮廓 */}
      <path
        d="M24.5 30 
           C21 34 21 44 24 49 
           C27 53 37 53 40 49 
           C43 44 43 34 39.5 30 
           C37 32 27 32 24.5 30 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.02"
      />

      {/* 黑色毛皮部分：背部与翅膀的铅笔排线素描阴影 */}
      {/* 左翅膀与左侧身体排线 */}
      <g strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <line x1="12" y1="37" x2="16" y2="34" />
        <line x1="11" y1="34" x2="17" y2="30" />
        <line x1="13" y1="30" x2="19" y2="28" />
        <line x1="19" y1="40" x2="22" y2="44" />
        <line x1="19.5" y1="45" x2="23" y2="48.5" />
      </g>

      {/* 右翅膀与右侧身体排线 */}
      <g strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <line x1="48" y1="34" x2="52" y2="37" />
        <line x1="47" y1="30" x2="53" y2="34" />
        <line x1="45" y1="28" x2="51" y2="30" />
        <line x1="42" y1="44" x2="45" y2="40" />
        <line x1="41" y1="48.5" x2="44.5" y2="45" />
      </g>

      {/* 头顶两侧毛皮阴影微排线 */}
      <g strokeWidth="1" strokeLinecap="round" opacity="0.65">
        <line x1="26" y1="14" x2="28" y2="17" />
        <line x1="36" y1="17" x2="38" y2="14" />
      </g>

      {/* 大眼睛 */}
      {/* 左眼 */}
      <ellipse cx="28" cy="18.5" rx="3" ry="4" strokeWidth="1.4" fill="currentColor" fillOpacity="0.05" />
      <circle cx="28.5" cy="18.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="27.8" cy="17.8" r="0.6" fill="white" stroke="none" />

      {/* 右眼 */}
      <ellipse cx="36" cy="18.5" rx="3" ry="4" strokeWidth="1.4" fill="currentColor" fillOpacity="0.05" />
      <circle cx="35.5" cy="18.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="34.8" cy="17.8" r="0.6" fill="white" stroke="none" />

      {/* 嘴巴（扁扁萌喙 Beak） */}
      <path
        d="M27 23 C29 25.5 35 25.5 37 23 C35.5 21.5 28.5 21.5 27 23 Z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <line x1="28" y1="23.2" x2="36" y2="23.2" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

      {/* 肚皮底部微阴影弧线排线 */}
      <g strokeWidth="0.9" strokeLinecap="round" opacity="0.5">
        <line x1="28" y1="47" x2="32" y2="49" />
        <line x1="32" y1="49" x2="36" y2="47" />
        <line x1="29" y1="49" x2="35" y2="49" />
      </g>

      {/* 左脚掌 */}
      <path
        d="M20 51.5 L14 55.5 C15.5 57 23 57 25 54 L22 52 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <line x1="17" y1="56" x2="19" y2="54" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

      {/* 右脚掌 */}
      <path
        d="M44 51.5 L50 55.5 C48.5 57 41 57 39 54 L42 52 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <line x1="47" y1="56" x2="45" y2="54" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

      {/* 地面素描投影线条 */}
      <path
        d="M13 58 C21 59 43 59 51 58"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
        strokeDasharray="6 3 10 3"
      />
    </svg>
  );
};

/**
 * 通用系统 Logo 分发组件
 */
export const PencilSystemLogo: React.FC<PencilLogoProps & { system: 'apple' | 'android' | 'windows' | 'linux' }> = ({
  system,
  ...props
}) => {
  switch (system) {
    case 'apple':
      return <PencilAppleLogo {...props} />;
    case 'android':
      return <PencilAndroidLogo {...props} />;
    case 'windows':
      return <PencilWindowsLogo {...props} />;
    case 'linux':
      return <PencilLinuxLogo {...props} />;
    default:
      return null;
  }
};
