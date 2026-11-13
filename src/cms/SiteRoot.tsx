import { lazy, Suspense, useEffect, useState } from 'react';
import App from '../App';
const CmsView = lazy(() => import('../components/CmsView'));
import { createDefaultContent, fetchContent, setActiveContent, SiteContent } from './content';
import { createBlankClickGesture } from './gesture';
import { clearLocalPreview, loadLocalPreview, saveLocalPreview } from './preview';

export function SiteRoot() {
  const [cms, setCms] = useState(() => /^\/dtms\/?$/.test(location.pathname));
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => createDefaultContent());
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      let next = createDefaultContent();
      try { next = await fetchContent(); }
      catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : '内容加载失败'); }
      try {
        const local = loadLocalPreview(localStorage);
        if (local) { next = local; if (!cancelled) setPreview(true); }
      } catch { if (!cancelled) setPreviewError('本地预览无法读取，已使用已部署内容。可进入 CMS 重新应用，或退出本地预览。'); }
      if (!cancelled) { setActiveContent(next); setContent(next); setLoaded(true); }
    }
    void load();
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
  const apply = (next: SiteContent) => {
    const snapshot = saveLocalPreview(localStorage, next);
    setActiveContent(snapshot); setContent(snapshot); setPreview(true); setPreviewError('');
    setRevision(previous => previous + 1);
  };
  const stopPreview = () => {
    try { clearLocalPreview(localStorage); location.reload(); }
    catch { setPreviewError('无法清除本地预览，请检查浏览器存储权限后重试。'); }
  };
  // A GitHub commit alone never applies content; local previews require an explicit action.
  if (cms) return <Suspense fallback={<div className="h-full flex items-center justify-center" role="status">正在加载内容工作台…</div>}><CmsView initialContent={content} loadError={error} onExit={exit} onApply={apply} localPreview={preview} /></Suspense>;
  return <div className="site-root-layout">
    {(preview || previewError) && <aside className="local-preview-banner" aria-label="本地预览"><span role="status">{previewError || '本地预览中 · 仅此浏览器可见，尚未发布到线上'}</span><button type="button" onClick={() => { history.pushState({}, '', '/dtms'); setCms(true); }}>继续编辑</button><button type="button" onClick={stopPreview}>退出本地预览</button></aside>}
    <div className="site-root-content"><App key={revision} /></div>
  </div>;
}
