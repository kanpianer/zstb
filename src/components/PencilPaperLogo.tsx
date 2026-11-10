import React from 'react';

interface PencilPaperLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  strokeDark?: string;
  strokeMedium?: string;
  strokeLight?: string;
}

/**
 * PencilPaperLogo - 纸上谈兵 官方网站 Logo
 * 一张微曲边缘、自然破损的铅笔手绘纸张，透明背景。
 */
export const PencilPaperLogo: React.FC<PencilPaperLogoProps> = ({
  className = 'w-10 h-10',
  strokeDark = '#24211d',
  strokeMedium = '#4c4740',
  strokeLight = '#6d665e',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="纸上谈兵 Logo"
      {...props}
    >
      <defs>
        {/* Subtle organic pencil stroke displacement filter */}
        <filter id="logo-pencil-stroke" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08 0.12" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.85" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter="url(#logo-pencil-stroke)">
        {/* Ambient pencil shadow behind paper (transparent background) */}
        <path
          d="M 13.5 9 L 51.5 8 L 53.5 54 L 13 54.5 Z"
          fill="#1f1c19"
          opacity="0.09"
          transform="translate(1.2, 1.6)"
        />

        {/* 
          Main Paper Body (Front surface)
          - Top edge: torn rip at x=28.8..33.2 with jagged fibers and cracks
          - Left edge: small jagged tear nick at y=30.2
          - Bottom edge: slight rough nick at x=20.8
          - Right & Bottom-Right: natural hand-drawn corner with subtle organic curvature
        */}
        <path
          d="M 13.5 9.2 
             C 18 9, 23 8.8, 27.5 8.9
             L 28.8 12
             L 30.5 8.6
             L 32 10.8
             L 33.2 8.7
             C 40 8.4, 46 8.2, 51.5 8.1
             C 52.5 22, 52.8 38, 53.2 53.2
             C 53.2 54.2, 52.2 54.6, 51 54.6
             C 42 54.5, 33 54.8, 22 55.2
             L 20.8 53.5
             L 19.5 55.2
             C 16 55, 14 54.7, 13.2 54.2
             C 12.8 44, 13.1 35, 13 32
             L 11 30.2
             L 13.2 28.8
             C 13 21, 12.9 15, 13.5 9.2
             Z"
          fill="#FAF7F0"
          stroke={strokeDark}
          strokeWidth="1.3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Secondary sketch contour (overlapping hand-drawn pencil line) */}
        <path
          d="M 14.2 9.9 
             C 18.5 9.7, 23.2 9.5, 27 9.6
             M 33.8 9.4
             C 40.2 9.1, 46 8.9, 50.8 8.8
             C 51.8 22.5, 52.1 38, 52.5 52.8
             C 52.5 53.8, 51.5 54, 50.5 54
             C 42 53.9, 33 54.2, 22.2 54.6
             M 19 54.6
             C 16 54.3, 14 54.1, 13.8 53.6
             C 13.5 44, 13.7 35, 13.6 32.5
             M 13.7 28.2
             C 13.5 21, 13.4 15.2, 14 9.9"
          fill="none"
          stroke={strokeMedium}
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Tears and cracks into paper */}
        <path
          d="M 28.8 12 L 29.2 15 L 28.2 17"
          fill="none"
          stroke={strokeDark}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="10.8"
          x2="31.5"
          y2="13.2"
          stroke={strokeMedium}
          strokeWidth="0.55"
          strokeLinecap="round"
        />
        {/* Fine fiber wisps near top tear */}
        <line x1="27.8" y1="9.5" x2="28.4" y2="11.2" stroke="#787065" strokeWidth="0.45" />
        <line x1="30.2" y1="9.2" x2="29.8" y2="10.5" stroke="#787065" strokeWidth="0.45" />
        <line x1="32.8" y1="9.4" x2="32.2" y2="11" stroke="#787065" strokeWidth="0.45" />

        {/* Left notch crack line */}
        <line
          x1="11"
          y1="30.2"
          x2="15.2"
          y2="30"
          stroke={strokeDark}
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Faint ruled notebook / drafting guidelines */}
        <g stroke={strokeLight} strokeWidth="0.65" strokeLinecap="round" opacity="0.32">
          <line x1="18" y1="17" x2="47" y2="16.5" strokeDasharray="8 2 12 1.5 6 1" />
          <line x1="18" y1="25" x2="47.5" y2="24.5" strokeDasharray="14 1.5 6 2 8 1" />
          <line x1="18" y1="33" x2="48" y2="32.5" strokeDasharray="6 2 16 1.5 4 1" />
          <line x1="18" y1="41" x2="47" y2="40.5" strokeDasharray="10 1.5 8 1.5 5 1" />
          <line x1="18" y1="49" x2="45" y2="48.5" strokeDasharray="12 1.5 6 1" />
        </g>
      </g>
    </svg>
  );
};
