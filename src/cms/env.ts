/**
 * Environment detection for CMS workbench:
 * - Local server (e.g. Vite dev server): loads local repository resources and directly modifies local codebase files.
 * - Online server (opened via domain / static hosting): loads remote GitHub repository content and temporarily stores modifications in the browser.
 */
export function isLocalServer(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.location) {
      const search = window.location.search;
      if (search.includes('__force_local_cms=1')) return true;
      if (search.includes('__force_online_cms=1')) return false;
    }
    // In Vite dev mode, import.meta.env.DEV is true
    return Boolean(import.meta.env?.DEV);
  } catch {
    return false;
  }
}
