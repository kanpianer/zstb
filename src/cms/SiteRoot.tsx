import { lazy, Suspense, useEffect, useState } from 'react';
import App from '../App';
const CmsView = lazy(() => import('../components/CmsView'));
import { createDefaultContent, fetchContent, setActiveContent, SiteContent } from './content';
import { createBlankClickGesture } from './gesture';

export function SiteRoot() {
  const [cms, setCms] = useState(() => /^\/dtms\/?$/.test(location.pathname));
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => createDefaultContent());
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    fetchContent().then(next => {
      if (cancelled) return;
      setActiveContent(next); setContent(next); setError('');
    }).catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : '内容加载失败'); })
      .finally(() => { if (!cancelled) setLoaded(true); });
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    const pop = () => setCms(/^\/dtms\/?$/.test(location.pathname));
    const gesture = createBlankClickGesture(() => {
      if (/^\/dtms\/?$/.test(location.pathname)) return;
      history.pushState({}, '', '/dtms'); setCms(true);
    });
    window.addEventListener('popstate', pop);
    document.addEventListener('click', gesture, true);
    return () => { window.removeEventListener('popstate', pop); document.removeEventListener('click', gesture, true); };
  }, []);
  useEffect(() => { document.title = cms ? `DTMS · ${content.settings.siteName}` : `${content.settings.siteName} · ${content.settings.siteSubtitle}`; }, [cms, content]);
  const exit = () => { history.pushState({}, '', '/'); setCms(false); };
  if (!loaded) return <div className="h-full flex items-center justify-center" role="status">正在加载站点内容…</div>;
  // CMS edits repository resources, not the deployed snapshot. A successful commit must not
  // silently replace the public site's current content before its deployment has finished.
  if (cms) return <Suspense fallback={<div className="h-full flex items-center justify-center" role="status">正在加载内容工作台…</div>}><CmsView initialContent={content} loadError={error} onExit={exit} /></Suspense>;
  return <App />;
}
