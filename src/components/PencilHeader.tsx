import React from 'react';
import { ArrowLeft, GitPullRequest, Moon, Sun, ShieldCheck } from 'lucide-react';
import { SubSystemCategory, SystemCategory, SoftwareTool } from '../types/tutorial';
import { IpCheckSite } from '../data/ipCheckSites';
import { PencilAppleLogo, PencilSystemLogo } from './PencilSystemLogos';
import { PencilSoftwareLogo } from './PencilSoftwareLogos';
import { getSettings } from '../cms/content';
import { getQuadrants } from '../data/tutorials';
import { PencilPaperLogo } from './PencilPaperLogo';
import { toggleTheme, useTheme } from '../theme';

export interface PencilHeaderProps {
  currentCategory?: SystemCategory | null;
  currentSubSystem?: SubSystemCategory | null;
  currentTool?: SoftwareTool | null;
  isIpPage?: boolean;
  currentIpSite?: IpCheckSite | null;
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
  isIpPage = false,
  currentIpSite = null,
  onNavigateHome,
  onBack = () => {},
  onOpenCrowdsourceModal,
  prevIsHome = false,
}) => {
  const settings = getSettings();
  const theme = useTheme();
  const isDark = theme === 'dark';
  const isHome = !currentCategory && !currentSubSystem && !currentTool && !isIpPage;

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
    // 0. IP Check Detail View
    if (currentIpSite) {
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
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
              title="返回上一个页面"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>返回</span>
            </button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 ml-1 sm:ml-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-pencil bg-paper-50 flex items-center justify-center p-1 shadow-pencil shrink-0 overflow-hidden">
              <PencilSoftwareLogo toolId={currentIpSite.id} className="w-full h-full text-pencil-dark" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] sm:text-lg font-serif font-black text-pencil-dark whitespace-nowrap truncate">
                {currentIpSite.name}
              </h2>
            </div>
          </div>
        </div>
      );
    }

    // 0.5. IP Check List View (4 cards)
    if (isIpPage) {
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
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
              title="返回上一个页面"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>返回</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 ml-1 sm:ml-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-pencil bg-paper-50 flex items-center justify-center p-1 sm:p-1.5 shadow-pencil shrink-0">
              <ShieldCheck className="w-full h-full text-pencil-dark" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] sm:text-lg font-serif font-black text-pencil-dark whitespace-nowrap">
                IP 地址检测
              </h2>
            </div>
          </div>
        </div>
      );
    }

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
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
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
                className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
                title="返回上一个页面"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>返回</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onBack}
              className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
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
            className="pencil-btn text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
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
      <div className="flex items-center gap-2.5 sm:gap-3 select-none min-w-0">
        <div
          onClick={onNavigateHome}
          className="cursor-pointer group w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center transform hover:-rotate-6 hover:scale-105 transition-all duration-300 shrink-0"
          title="返回主页"
        >
          <PencilPaperLogo className="w-full h-full drop-shadow-sm" />
        </div>
        <div className="min-w-0 flex items-center">
          <h1 className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-pencil-dark whitespace-nowrap text-ultra-bold">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-name"
              title={isDark ? '切换到白天主题' : '切换到暗黑主题'}
              aria-label={isDark ? '当前暗黑主题，点击切换到白天主题' : '当前白天主题，点击切换到暗黑主题'}
            >
              {settings.siteName}
              {isDark ? (
                <Moon className="theme-toggle-icon" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Sun className="theme-toggle-icon" strokeWidth={2.5} aria-hidden="true" />
              )}
            </button>
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

      {/* Center Subtitle: 翻墙教程 / IP检测 (移动端在 IP 检测页面隐藏中间文字，避免与返回导航及标题重叠) */}
      <div
        onClick={onNavigateHome}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none cursor-pointer group ${
          isIpPage || currentIpSite
            ? 'hidden md:flex'
            : isHome || currentTool
            ? 'flex'
            : 'hidden md:flex'
        } items-center justify-center`}
        title={`${settings.siteName} · ${isIpPage || currentIpSite ? 'IP检测' : settings.siteSubtitle}`}
      >
        <span className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-widest text-pencil-dark group-hover:text-pencil transition-colors whitespace-nowrap">
          {isIpPage || currentIpSite ? 'IP检测' : settings.siteSubtitle}
        </span>
      </div>

      {/* Right side action controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 z-10">
        <button
          onClick={onOpenCrowdsourceModal}
          className="pencil-btn text-xs bg-paper-50 hover:bg-surface text-pencil-dark font-medium py-1.5 px-2 sm:px-3 flex items-center justify-center !gap-[3px] sm:!gap-[4.5px] shrink-0 w-[58px] sm:w-auto !px-0 sm:!px-5 whitespace-nowrap"
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
