import React, { useState, useEffect, useRef } from 'react';
import { SubSystemCategory, SystemCategory, SoftwareTool } from './types/tutorial';
import { getToolById } from './data/tutorials';
import { PencilHeader } from './components/PencilHeader';
import { PencilFooter } from './components/PencilFooter';
import { QuadrantHome } from './components/QuadrantHome';
import { AppleQuadrantView } from './components/AppleQuadrantView';
import { SystemListView } from './components/SystemListView';
import { TutorialDetailView } from './components/TutorialDetailView';
import { CrowdsourceModal } from './components/CrowdsourceModal';

export const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<SystemCategory | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('tool');
    if (toolId) {
      const t = getToolById(toolId);
      if (t) return t.category;
    }
    const cat = params.get('cat');
    if (cat === 'apple' || cat === 'android' || cat === 'windows' || cat === 'linux') return cat;
    const sub = params.get('sub');
    if (sub === 'ios' || sub === 'macos') return 'apple';
    if (sub === 'android' || sub === 'windows' || sub === 'linux') return sub as SystemCategory;
    return null;
  });

  const [currentSubSystem, setCurrentSubSystem] = useState<SubSystemCategory | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('tool');
    if (toolId) {
      const t = getToolById(toolId);
      if (t) return t.system;
    }
    const sub = params.get('sub');
    if (sub === 'ios' || sub === 'macos' || sub === 'android' || sub === 'windows' || sub === 'linux') {
      return sub as SubSystemCategory;
    }
    return null;
  });

  const [currentToolId, setCurrentToolId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('tool');
  });

  // Crowdsource modal state
  const [isCrowdsourceModalOpen, setIsCrowdsourceModalOpen] = useState<boolean>(false);
  const [crowdsourceTool, setCrowdsourceTool] = useState<SoftwareTool | null>(null);
  const [crowdsourceMode, setCrowdsourceMode] = useState<'pr' | 'issue' | 'guide'>('guide');

  // Ref for the scrollable main container inside the frame
  const mainContentRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Sync URL query params with current view state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (currentToolId) {
      params.set('tool', currentToolId);
    } else if (currentSubSystem) {
      params.set('sub', currentSubSystem);
    } else if (currentCategory) {
      params.set('cat', currentCategory);
    }
    const searchStr = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', searchStr);
  }, [currentCategory, currentSubSystem, currentToolId]);

  // Scroll inner main container to top on navigation change and reset progress
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
  }, [currentCategory, currentSubSystem, currentToolId]);

  // Track reading scroll progress inside the main container
  useEffect(() => {
    const el = mainContentRef.current;
    if (!el) return;

    let ticking = false;

    const updateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
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
  }, [currentCategory, currentSubSystem, currentToolId]);

  // Scroll to top handler for inner content
  const handleScrollContentToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation handlers
  const handleNavigateHome = () => {
    setCurrentCategory(null);
    setCurrentSubSystem(null);
    setCurrentToolId(null);
  };

  const handleBack = () => {
    if (currentToolId) {
      setCurrentToolId(null);
    } else if (currentSubSystem) {
      if (currentCategory === 'apple') {
        setCurrentSubSystem(null); // Back to Apple Upper/Lower sub-quadrants
      } else {
        handleNavigateHome(); // Back to 4 quadrants home
      }
    } else if (currentCategory) {
      handleNavigateHome();
    }
  };

  const handleSelectCategory = (cat: SystemCategory) => {
    setCurrentCategory(cat);
    setCurrentToolId(null);
    if (cat === 'apple') {
      setCurrentSubSystem(null); // Show the Apple upper/lower sub-quadrants
    } else {
      setCurrentSubSystem(cat as SubSystemCategory);
    }
  };

  const handleSelectSubSystem = (sub: SubSystemCategory) => {
    if (sub === 'ios' || sub === 'macos') {
      setCurrentCategory('apple');
    } else {
      setCurrentCategory(sub as SystemCategory);
    }
    setCurrentSubSystem(sub);
    setCurrentToolId(null);
  };

  const handleSelectTool = (toolId: string) => {
    const tool = getToolById(toolId);
    if (tool) {
      setCurrentCategory(tool.category);
      setCurrentSubSystem(tool.system);
      setCurrentToolId(toolId);
    }
  };

  const handleOpenCrowdsource = (tool?: SoftwareTool | null, mode: 'pr' | 'issue' | 'guide' = 'guide') => {
    setCrowdsourceTool(tool || (currentToolId ? getToolById(currentToolId) || null : null));
    setCrowdsourceMode(mode);
    setIsCrowdsourceModalOpen(true);
  };

  const currentTool = currentToolId ? getToolById(currentToolId) : null;

  return (
    <div className="h-full h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 box-border select-auto">
      {/* 
        A4 Sheet Container:
        Applies standard paper margins, shadows, and subtle ruled guide lines 
        simulating an authentic drafting table / A4 engineering notebook.
        Maintains fixed and identical dimensions across all pages (Home, Apple, System List, Tutorial Detail)
        and both desktop & mobile viewport, without expanding with content.
      */}
      <div 
        className="w-full max-w-[1020px] h-full md:h-[773px] md:max-h-full a4-sheet border-2 sm:border-4 border-pencil rounded-2xl p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-pencil-lg relative box-border"
      >
        {/* Unified Top Navigation Header: Fixed position inside the top of the frame */}
        <PencilHeader
          currentCategory={currentCategory}
          currentSubSystem={currentSubSystem}
          currentTool={currentTool}
          onNavigateHome={handleNavigateHome}
          onBack={handleBack}
          onOpenCrowdsourceModal={() => handleOpenCrowdsource(null, 'guide')}
        />

        {/* Dynamic Main Body Content: scrollable inside the frame, hidden scrollbar */}
        <main 
          ref={mainContentRef}
          className="w-full flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar flex flex-col justify-start"
        >
          {/* VIEW 1: Four Quadrants Home Page */}
          {!currentCategory && (
            <div className="w-full md:my-auto">
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
              onOpenCrowdsourceModal={(t, mode) => handleOpenCrowdsource(t, mode || 'pr')}
            />
          )}
        </main>

        {/* Global Footer: Fixed position inside the bottom of the frame */}
        <PencilFooter
          onOpenCrowdsource={() => handleOpenCrowdsource(null, 'guide')}
          onScrollToTop={handleScrollContentToTop}
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
