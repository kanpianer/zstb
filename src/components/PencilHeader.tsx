import React from 'react';
import { ArrowLeft, GitPullRequest } from 'lucide-react';
import { SubSystemCategory, SystemCategory, SoftwareTool } from '../types/tutorial';
import { PencilAppleLogo, PencilSystemLogo } from './PencilSystemLogos';
import { getSettings } from '../cms/content';
import { getQuadrants } from '../data/tutorials';
import { PencilPaperLogo } from './PencilPaperLogo';

export interface PencilHeaderProps {
  currentCategory?: SystemCategory | null;
  currentSubSystem?: SubSystemCategory | null;
  currentTool?: SoftwareTool | null;
  onNavigateHome: () => void;
  onBack?: () => void;
  onOpenCrowdsourceModal: () => void;
  /** 上一页是否是主页（即返回按钮可直接回到主页）。为 true 时隐藏多余的「主页」按钮。 */
  prevIsHome?: boolean;
}

export const PencilHeader: React.FC<PencilHeaderProps> = ({
  currentCategory = null,
  currentSubSystem = null,
  currentTool = null,
  onNavigateHome,
  onBack = () => {},
  onOpenCrowdsourceModal,
  prevIsHome = false,
}) => {
  const settings = getSettings();
  const isHome = !currentCategory && !currentSubSystem && !currentTool;

  const getSystemInfo = (sub: SubSystemCategory) => {
    switch (sub) {
      case 'ios':
        return {
          title: 'iOS系统',
          shortTitle: 'iOS系统',
          desc: '',
        };
      case 'macos':
        return {
          title: 'macOS系统',
          shortTitle: 'macOS系统',
          desc: '',
        };
      case 'android':
        return {
          title: 'Android 安卓系统',
          shortTitle: 'Android 系统',
          desc: '经典开源常青树与新锐 Material 动效多协议代理客户端',
        };
      case 'windows':
        return {
          title: 'Windows 桌面系统',
          shortTitle: 'Windows 系统',
          desc: '自建节点精细控制、多内核热切换与 Wintun 驱动',
        };
      case 'linux':
        return {
          title: 'Linux 系统和软路由',
          shortTitle: 'Linux & 软路由',
          desc: 'Linux GUI 桌面、Web 远程控制面板与内核级 eBPF 透明代理',
        };
    }
  };

  const renderLeft = () => {
    // 1. Tutorial Detail View
    if (currentTool) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="inline-grid grid-flow-col auto-cols-fr gap-1.5 sm:gap-2.5 shrink-0">
            {!prevIsHome && (
              <button
                onClick={onNavigateHome}
                className="pencil-btn-secondary text-xs py-1.5 flex items-center justify-center gap-1 shrink-0 w-full !px-0 sm:!px-5 whitespace-nowrap"
                title="返回主页四象限"
              >
                <span>主页</span>
              </button>
            )}
            <button
              onClick={onBack}
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
              title="返回上一个页面"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>返回</span>
            </button>
          </div>
        </div>
      );
    }

    // 2. System Software Intro Cards List View
    if (currentSubSystem) {
      const sysInfo = getSystemInfo(currentSubSystem);
      return (
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          {currentCategory === 'apple' ? (
            <div className="inline-grid grid-flow-col auto-cols-fr gap-1.5 sm:gap-2.5 shrink-0">
              {!prevIsHome && (
                <button
                  onClick={onNavigateHome}
                  className="pencil-btn-secondary text-xs py-1.5 flex items-center justify-center gap-1 shrink-0 w-full !px-0 sm:!px-5 whitespace-nowrap"
                  title="返回主页四象限"
                >
                  <span>主页</span>
                </button>
              )}
              <button
                onClick={onBack}
                className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
                title="返回上一个页面"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>返回</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onBack}
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
              title="返回上一个页面"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>返回</span>
            </button>
          )}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 ml-1 sm:ml-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-pencil bg-paper-50 flex items-center justify-center p-1 sm:p-1.5 shadow-pencil shrink-0">
              <PencilSystemLogo system={currentCategory!} className="w-full h-full text-pencil-dark" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] sm:text-lg font-serif font-black text-pencil-dark whitespace-nowrap">
                <span className="hidden sm:inline">{sysInfo.title}</span>
                <span className="sm:hidden">{sysInfo.shortTitle}</span>
              </h2>
              {sysInfo.desc && (
                <p className="text-[11px] text-pencil-light font-sans hidden lg:block truncate max-w-[220px] xl:max-w-[340px]">
                  {sysInfo.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 3. Apple System Sub-Quadrants View
    if (currentCategory === 'apple') {
      return (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBack}
            className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
            title="返回上一个页面"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>返回</span>
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 ml-0 sm:ml-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-pencil bg-paper-50 flex items-center justify-center p-1 sm:p-1.5 shadow-pencil shrink-0">
              <PencilAppleLogo className="w-full h-full text-pencil-dark" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-serif font-black text-pencil-dark whitespace-nowrap">
                {getQuadrants().apple.name}
              </h2>
              <p className="text-[11px] text-pencil-light font-sans hidden md:block truncate max-w-[220px]">
                iOS 移动端与 macOS 桌面端
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 4. Home Page: 4 Quadrants
    return (
      <div 
        onClick={onNavigateHome}
        className="cursor-pointer group flex items-center gap-2.5 sm:gap-3 select-none min-w-0"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center transform group-hover:-rotate-6 group-hover:scale-105 transition-all duration-300 shrink-0">
          <PencilPaperLogo className="w-full h-full drop-shadow-sm" />
        </div>
        <div className="min-w-0 flex items-center">
          <h1 className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-pencil-dark whitespace-nowrap text-ultra-bold">
            {settings.siteName}
          </h1>
        </div>
      </div>
    );
  };

  return (
    <header className="relative h-[48px] md:h-[52px] shrink-0 mb-2 sm:mb-3 pb-2 flex items-center justify-between gap-2 sm:gap-4 select-none">
      {/* Left side content */}
      <div
        className={`min-w-0 flex-1 flex items-center ${
          isHome
            ? 'max-w-[45%]'
            : currentTool
            ? 'max-w-[45%]'
            : 'md:max-w-[45%]'
        }`}
      >
        {renderLeft()}
      </div>

      {/* Center Subtitle: 翻墙教程 */}
      <div
        onClick={onNavigateHome}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none cursor-pointer group ${
          isHome || currentTool ? 'flex' : 'hidden md:flex'
        } items-center justify-center`}
        title={`${settings.siteName} · ${settings.siteSubtitle}`}
      >
        <span className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-widest text-pencil-dark group-hover:text-pencil transition-colors whitespace-nowrap">
          {settings.siteSubtitle}
        </span>
      </div>

      {/* Right side action controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 z-10">
        <button
          onClick={onOpenCrowdsourceModal}
          className="pencil-btn text-xs bg-paper-50 hover:bg-white text-pencil-dark font-medium py-1.5 px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
          title="贡献教程"
        >
          <GitPullRequest className="w-3.5 h-3.5 text-blue-700 shrink-0" />
          <span className="hidden sm:inline">贡献教程</span>
          <span className="sm:hidden">贡献</span>
        </button>
      </div>
    </header>
  );
};
