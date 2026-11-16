import React, { useState, useEffect, useRef } from 'react';
import { SubSystemCategory, SystemCategory, SoftwareTool } from './types/tutorial';
import { getToolById } from './data/tutorials';
import { getIpCheckSiteById } from './data/ipCheckSites';
import { PencilHeader } from './components/PencilHeader';
import { PencilFooter } from './components/PencilFooter';
import { QuadrantHome } from './components/QuadrantHome';
import { AppleQuadrantView } from './components/AppleQuadrantView';
import { SystemListView } from './components/SystemListView';
import { TutorialDetailView } from './components/TutorialDetailView';
import { IpCheckListView } from './components/IpCheckListView';
import { IpCheckDetailView } from './components/IpCheckDetailView';
import { CrowdsourceModal } from './components/CrowdsourceModal';

export interface NavigationState {
  category: SystemCategory | null;
  subSystem: SubSystemCategory | null;
  toolId: string | null;
  isIpPage?: boolean;
  ipSiteId?: string | null;
}

export interface HistoryEntry {
  state: NavigationState;
  scrollTop: number;
}

const parseNavigationStateFromUrl = (): NavigationState => {
  if (typeof window === 'undefined') {
    return { category: null, subSystem: null, toolId: null, isIpPage: false, ipSiteId: null };
  }
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const ipParam = params.get('ip');

  if (view === 'ip' || ipParam !== null) {
    const siteId = params.get('tool') || (ipParam && ipParam !== '1' && ipParam !== 'true' ? ipParam : null);
    return {
      category: null,
      subSystem: null,
      toolId: null,
      isIpPage: true,
      ipSiteId: siteId || null,
    };
  }

  const toolId = params.get('tool');
  if (toolId) {
    const t = getToolById(toolId);
    if (t) return { category: t.category, subSystem: t.system, toolId, isIpPage: false, ipSiteId: null };
  }
  const sub = params.get('sub');
  if (sub === 'ios' || sub === 'macos') {
    return { category: 'apple', subSystem: sub as SubSystemCategory, toolId: null, isIpPage: false, ipSiteId: null };
  }
  if (sub === 'android' || sub === 'windows' || sub === 'linux') {
    return { category: sub as SystemCategory, subSystem: sub as SubSystemCategory, toolId: null, isIpPage: false, ipSiteId: null };
  }
  const cat = params.get('cat');
  if (cat === 'apple' || cat === 'android' || cat === 'windows' || cat === 'linux') {
    return {
      category: cat,
      subSystem: cat === 'apple' ? null : (cat as SubSystemCategory),
      toolId: null,
      isIpPage: false,
      ipSiteId: null,
    };
  }
  return { category: null, subSystem: null, toolId: null, isIpPage: false, ipSiteId: null };
};

const getSearchStringFromState = (state: NavigationState): string => {
  const params = new URLSearchParams();
  if (state.isIpPage) {
    params.set('view', 'ip');
    if (state.ipSiteId) {
      params.set('tool', state.ipSiteId);
    }
  } else if (state.toolId) {
    params.set('tool', state.toolId);
  } else if (state.subSystem) {
    params.set('sub', state.subSystem);
  } else if (state.category) {
    params.set('cat', state.category);
  }
  return params.toString() ? `?${params.toString()}` : window.location.pathname;
};

const areStatesEqual = (a: NavigationState, b: NavigationState): boolean => {
  return (
    a.category === b.category &&
    a.subSystem === b.subSystem &&
    a.toolId === b.toolId &&
    !!a.isIpPage === !!b.isIpPage &&
    a.ipSiteId === b.ipSiteId
  );
};

export const App: React.FC = () => {
  const [navState, setNavState] = useState<NavigationState>(parseNavigationStateFromUrl);
  const { category: currentCategory, subSystem: currentSubSystem, toolId: currentToolId, isIpPage, ipSiteId } = navState;
  const currentIpSite = isIpPage && ipSiteId ? getIpCheckSiteById(ipSiteId) || null : null;

  // History stack records visited pages in this session to support returning to previous page with scroll restoration
  const historyStackRef = useRef<HistoryEntry[]>([]);
  const historyIndexRef = useRef<number>(0);
  const isInternalNavRef = useRef<boolean>(false);
  const navStateRef = useRef<NavigationState>(navState);
  const scrollMapRef = useRef<Map<number, number>>(new Map());
  const pageScrollMapRef = useRef<Map<string, number>>(new Map());
  const pendingScrollTopRef = useRef<number | null>(null);

  useEffect(() => {
    navStateRef.current = navState;
  }, [navState]);

  // Synchronize browser history and popstate events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize root history entry
    const initialSearch = getSearchStringFromState(navState);
    const existingIdx = (window.history.state && typeof window.history.state.idx === 'number')
      ? window.history.state.idx
      : 0;
    historyIndexRef.current = existingIdx;
    if (!window.history.state || typeof window.history.state.idx !== 'number') {
      window.history.replaceState({ idx: 0, scrollTop: 0 }, '', initialSearch);
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isInternalNavRef.current) {
        isInternalNavRef.current = false;
        return;
      }

      const prevIdx = historyIndexRef.current;
      const newIdx = (e.state && typeof e.state.idx === 'number') ? e.state.idx : prevIdx - 1;
      historyIndexRef.current = newIdx;

      const newState = parseNavigationStateFromUrl();
      if (newIdx < prevIdx) {
        // Navigated backward (返回上一页)
        let targetScroll = 0;
        if (historyStackRef.current.length > 0) {
          const prevEntry = historyStackRef.current.pop()!;
          targetScroll = prevEntry.scrollTop;
        } else if (scrollMapRef.current.has(newIdx)) {
          targetScroll = scrollMapRef.current.get(newIdx)!;
        } else if (typeof e.state?.scrollTop === 'number') {
          targetScroll = e.state.scrollTop;
        } else {
          const pageKey = getSearchStringFromState(newState);
          targetScroll = pageScrollMapRef.current.get(pageKey) ?? 0;
        }
        pendingScrollTopRef.current = targetScroll;
      } else {
        // Navigated forward in browser history
        const currentScroll = mainContentRef.current ? mainContentRef.current.scrollTop : 0;
        historyStackRef.current.push({
          state: navStateRef.current,
          scrollTop: currentScroll,
        });
        let targetScroll = 0;
        if (scrollMapRef.current.has(newIdx)) {
          targetScroll = scrollMapRef.current.get(newIdx)!;
        } else if (typeof e.state?.scrollTop === 'number') {
          targetScroll = e.state.scrollTop;
        }
        pendingScrollTopRef.current = targetScroll;
      }
      navStateRef.current = newState;
      setNavState(newState);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Crowdsource modal state
  const [isCrowdsourceModalOpen, setIsCrowdsourceModalOpen] = useState<boolean>(false);
  const [crowdsourceTool, setCrowdsourceTool] = useState<SoftwareTool | null>(null);
  const [crowdsourceMode, setCrowdsourceMode] = useState<'pr' | 'issue' | 'guide'>('guide');

  // Ref for the scrollable main container inside the frame
  const mainContentRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Restore scroll position when returning to previous page, or scroll to top for fresh page
  useEffect(() => {
    const el = mainContentRef.current;
    if (!el) return;

    const targetScroll = pendingScrollTopRef.current ?? 0;
    pendingScrollTopRef.current = null;

    if (targetScroll <= 0) {
      el.scrollTop = 0;
      setScrollProgress(0);
      return;
    }

    // Returning to previous page with a saved scroll position > 0:
    let rafId: number | null = null;
    let cancelled = false;

    const onUserInteraction = () => {
      cancelled = true;
      cleanup();
    };

    const cleanup = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.removeEventListener('wheel', onUserInteraction);
      el.removeEventListener('touchstart', onUserInteraction);
      el.removeEventListener('pointerdown', onUserInteraction);
    };

    el.addEventListener('wheel', onUserInteraction, { passive: true });
    el.addEventListener('touchstart', onUserInteraction, { passive: true });
    el.addEventListener('pointerdown', onUserInteraction, { passive: true });

    let attempts = 0;
    const maxAttempts = 30; // Check over ~500ms for images and DOM layout to settle

    const attemptRestore = () => {
      if (cancelled) return;
      el.scrollTop = targetScroll;

      // Update scroll progress
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 5) {
        setScrollProgress(0);
      } else {
        const rawProgress = el.scrollTop / maxScroll;
        setScrollProgress(Math.min(1, Math.max(0, rawProgress)));
      }

      attempts += 1;
      const isAtTarget = Math.abs(el.scrollTop - targetScroll) <= 2;
      const isAtMax = maxScroll > 0 && Math.abs(el.scrollTop - maxScroll) <= 2;

      if (isAtTarget || (isAtMax && attempts > 10) || attempts >= maxAttempts) {
        cleanup();
      } else {
        rafId = requestAnimationFrame(attemptRestore);
      }
    };

    attemptRestore();

    return () => {
      cleanup();
    };
  }, [currentCategory, currentSubSystem, currentToolId, isIpPage, ipSiteId]);

  // Track reading scroll progress inside the main container and maintain live scroll positions
  useEffect(() => {
    const el = mainContentRef.current;
    if (!el) return;

    let ticking = false;

    const updateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      scrollMapRef.current.set(historyIndexRef.current, scrollTop);
      pageScrollMapRef.current.set(getSearchStringFromState(navStateRef.current), scrollTop);

      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 5) {
        setScrollProgress(0);
      } else {
        if (scrollTop + clientHeight >= scrollHeight - 2) {
          setScrollProgress(1);
        } else if (scrollTop <= 2) {
          setScrollProgress(0);
        } else {
          const rawProgress = scrollTop / maxScroll;
          setScrollProgress(Math.min(1, Math.max(0, rawProgress)));
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      scrollMapRef.current.set(historyIndexRef.current, el.scrollTop);
      pageScrollMapRef.current.set(getSearchStringFromState(navStateRef.current), el.scrollTop);

      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    updateScrollProgress();

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const ro = new ResizeObserver(() => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    });
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      ro.disconnect();
    };
  }, [currentCategory, currentSubSystem, currentToolId, isIpPage, ipSiteId]);

  // Scroll to top handler for inner content
  const handleScrollContentToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Forward navigation: pushes to session history stack and browser history
  const navigateTo = (nextState: NavigationState) => {
    if (areStatesEqual(navStateRef.current, nextState)) return;
    const currentScroll = mainContentRef.current ? mainContentRef.current.scrollTop : 0;
    historyStackRef.current.push({
      state: navStateRef.current,
      scrollTop: currentScroll,
    });
    scrollMapRef.current.set(historyIndexRef.current, currentScroll);
    pageScrollMapRef.current.set(getSearchStringFromState(navStateRef.current), currentScroll);

    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(
        { ...(window.history.state || {}), idx: historyIndexRef.current, scrollTop: currentScroll },
        ''
      );
    }

    historyIndexRef.current += 1;
    // 前进到新页面时，从页面顶部开始浏览
    pendingScrollTopRef.current = 0;

    navStateRef.current = nextState;
    setNavState(nextState);
    if (typeof window !== 'undefined' && window.history) {
      const searchStr = getSearchStringFromState(nextState);
      window.history.pushState({ idx: historyIndexRef.current, scrollTop: 0 }, '', searchStr);
    }
  };

  // 返回按钮：返回到进入当前页面之前的上一个页面，回到页面当时的浏览位置
  const handleBack = () => {
    if (historyStackRef.current.length > 0) {
      const currentScroll = mainContentRef.current ? mainContentRef.current.scrollTop : 0;
      scrollMapRef.current.set(historyIndexRef.current, currentScroll);
      pageScrollMapRef.current.set(getSearchStringFromState(navStateRef.current), currentScroll);

      const prevEntry = historyStackRef.current.pop()!;
      isInternalNavRef.current = true;
      historyIndexRef.current = Math.max(0, historyIndexRef.current - 1);

      // 回到页面当时的浏览位置，而不是回到上一个页面的顶部
      pendingScrollTopRef.current = prevEntry.scrollTop;

      navStateRef.current = prevEntry.state;
      setNavState(prevEntry.state);
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
        setTimeout(() => {
          isInternalNavRef.current = false;
        }, 150);
      }
    } else {
      // 容错兜底：若直接从外链或刷新进入当前页面（无先前历史），返回主页
      handleNavigateHome();
    }
  };

  const handleNavigateHome = () => {
    navigateTo({ category: null, subSystem: null, toolId: null, isIpPage: false, ipSiteId: null });
  };

  const handleNavigateIpCheck = () => {
    navigateTo({ category: null, subSystem: null, toolId: null, isIpPage: true, ipSiteId: null });
  };

  const handleSelectIpSite = (siteId: string) => {
    navigateTo({ category: null, subSystem: null, toolId: null, isIpPage: true, ipSiteId: siteId });
  };

  const handleSelectCategory = (cat: SystemCategory) => {
    if (cat === 'apple') {
      navigateTo({ category: 'apple', subSystem: null, toolId: null, isIpPage: false, ipSiteId: null });
    } else {
      navigateTo({ category: cat, subSystem: cat as SubSystemCategory, toolId: null, isIpPage: false, ipSiteId: null });
    }
  };

  const handleSelectSubSystem = (sub: SubSystemCategory) => {
    const cat = (sub === 'ios' || sub === 'macos') ? 'apple' : (sub as SystemCategory);
    navigateTo({ category: cat, subSystem: sub, toolId: null, isIpPage: false, ipSiteId: null });
  };

  const handleSelectTool = (toolId: string) => {
    const tool = getToolById(toolId);
    if (tool) {
      navigateTo({ category: tool.category, subSystem: tool.system, toolId, isIpPage: false, ipSiteId: null });
    }
  };

  const handleOpenCrowdsource = (tool?: SoftwareTool | null, mode: 'pr' | 'issue' | 'guide' = 'guide') => {
    setCrowdsourceTool(tool || (currentToolId ? getToolById(currentToolId) || null : null));
    setCrowdsourceMode(mode);
    setIsCrowdsourceModalOpen(true);
  };

  const currentTool = currentToolId ? getToolById(currentToolId) : null;

  // 判断上一页是否为主页：若历史栈末项的 category 为 null 且非 IP 页面，则返回按钮会回到主页，无需额外显示「主页」按钮
  const lastHistoryEntry = historyStackRef.current.length > 0
    ? historyStackRef.current[historyStackRef.current.length - 1]
    : null;
  const prevIsHome =
    lastHistoryEntry
      ? lastHistoryEntry.state.category === null && !lastHistoryEntry.state.isIpPage
      : false;

  return (
    <div className="h-full min-h-0 w-full overflow-hidden flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 box-border select-auto">
      {/* 
        A4 Sheet Container:
        Applies standard paper margins, shadows, and subtle ruled guide lines 
        simulating an authentic drafting table / A4 engineering notebook.
        Maintains fixed and identical dimensions across all pages (Home, Apple, System List, Tutorial Detail)
        and both desktop & mobile viewport, without expanding with content.
      */}
      <div 
        className="w-full max-w-[1020px] h-full min-h-0 md:h-[773px] md:max-h-full a4-sheet border-2 sm:border-4 border-pencil rounded-2xl p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-pencil-lg relative box-border"
      >
        {/* Unified Top Navigation Header: Fixed position inside the top of the frame */}
        <PencilHeader
          currentCategory={currentCategory}
          currentSubSystem={currentSubSystem}
          currentTool={currentTool}
          isIpPage={isIpPage}
          currentIpSite={currentIpSite}
          onNavigateHome={handleNavigateHome}
          onBack={handleBack}
          onOpenCrowdsourceModal={() => handleOpenCrowdsource(null, 'guide')}
          prevIsHome={prevIsHome}
        />

        {/* Dynamic Main Body Content: scrollable inside the frame, hidden scrollbar */}
        <main 
          ref={mainContentRef}
          className="w-full flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar flex flex-col justify-start"
        >
          {/* VIEW 5: IP Check Detail View (使用教程与功能核对详细页面) */}
          {currentIpSite && (
            <IpCheckDetailView
              site={currentIpSite}
              onBack={handleBack}
              onNavigateHome={handleNavigateHome}
            />
          )}

          {/* VIEW 6: IP Check Tools List (4个 IP 地址检测网站卡片展示) */}
          {isIpPage && !currentIpSite && (
            <div className="w-full md:my-auto">
              <IpCheckListView
                onSelectSite={handleSelectIpSite}
                onNavigateHome={handleNavigateHome}
              />
            </div>
          )}

          {/* VIEW 1: Four Quadrants Home Page */}
          {!currentCategory && !isIpPage && (
            <div className="w-full my-auto">
              <QuadrantHome
                onSelectCategory={handleSelectCategory}
                onSelectSubSystem={handleSelectSubSystem}
                onSelectTool={handleSelectTool}
                onOpenCrowdsourceModal={() => handleOpenCrowdsource(null, 'guide')}
              />
            </div>
          )}

          {/* VIEW 2: Apple Quadrant View (Upper iOS / Lower macOS sub-quadrants) */}
          {currentCategory === 'apple' && !currentSubSystem && !currentToolId && (
            <div className="w-full md:my-auto">
              <AppleQuadrantView
                onBackToHome={handleNavigateHome}
                onSelectSubSystem={handleSelectSubSystem}
                onSelectTool={handleSelectTool}
              />
            </div>
          )}

          {/* VIEW 3: System Tools List View (Max 4 tools per system) */}
          {currentSubSystem && !currentToolId && (
            <div className="w-full md:my-auto">
              <SystemListView
                category={currentCategory!}
                subSystem={currentSubSystem}
                onBack={handleBack}
                onNavigateHome={handleNavigateHome}
                onSelectTool={handleSelectTool}
                onOpenCrowdsourceForTool={(t) => handleOpenCrowdsource(t, 'pr')}
              />
            </div>
          )}

          {/* VIEW 4: Standardized Illustrated Tutorial Detail View */}
          {currentTool && (
            <TutorialDetailView
              tool={currentTool}
              onBack={handleBack}
              onNavigateHome={handleNavigateHome}
              onNavigateIpCheck={handleNavigateIpCheck}
              onOpenCrowdsourceModal={(t, mode) => handleOpenCrowdsource(t, mode || 'pr')}
            />
          )}
        </main>

        {/* Global Footer: Fixed position inside the bottom of the frame */}
        <PencilFooter
          onOpenCrowdsource={() => handleOpenCrowdsource(null, 'guide')}
          onScrollToTop={handleScrollContentToTop}
          onNavigateIpCheck={handleNavigateIpCheck}
          scrollProgress={scrollProgress}
        />
      </div>

      {/* Interactive GitHub Crowdsourcing Modal */}
      <CrowdsourceModal
        isOpen={isCrowdsourceModalOpen}
        onClose={() => setIsCrowdsourceModalOpen(false)}
        selectedTool={crowdsourceTool}
        initialMode={crowdsourceMode}
      />
    </div>
  );
};

export default App;
