import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'tzp-theme';
const listeners = new Set<() => void>();

function read(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* storage unavailable */
  }
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

let current: Theme = typeof window === 'undefined' ? 'light' : read();

function apply(theme: Theme, animate = false) {
  const root = document.documentElement;
  // Elements with `transition-all` (cards, buttons) can get stuck mid-transition on
  // mobile Safari when only an inherited CSS variable changes, leaving them in the old
  // theme's colours. Suppress transitions while the variables swap, then restore them.
  if (animate) root.classList.add('theme-switching');
  root.dataset.theme = theme;
  // Colours the mobile browser's address / status bar to match the page.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#faf7ed');
  if (animate) {
    void root.offsetHeight; // flush styles with transitions disabled
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
  }
}

if (typeof window !== 'undefined') {
  apply(current);
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            current = e.matches ? 'dark' : 'light';
            apply(current, true);
            listeners.forEach((l) => l());
          }
        } catch { /* storage unavailable */ }
      });
    } catch { /* media listener unsupported */ }
  }
}

export function setTheme(theme: Theme) {
  current = theme;
  apply(theme, true);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* storage unavailable */ }
  listeners.forEach(l => l());
}

export function toggleTheme() {
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, () => current, () => 'light' as Theme);
}
