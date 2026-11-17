export interface PageMetadata {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export const DEFAULT_SITE_METADATA: PageMetadata = {
  title: '紙上談兵 · 主流翻墙工具教程',
  description: '全平台科学上网客户端图文教程库与众包知识库，精选 iOS、macOS、Android、Windows 及 Linux / 软路由主流翻墙工具使用教程与配置指南。',
  url: 'https://zstb.sld.tw/',
  image: 'https://zstb.sld.tw/og-image.png',
};

export function updatePageMetadata(metadata: Partial<PageMetadata>): void {
  if (typeof document === 'undefined') return;

  const title = metadata.title || DEFAULT_SITE_METADATA.title;
  const description = metadata.description || DEFAULT_SITE_METADATA.description;
  const url = metadata.url || DEFAULT_SITE_METADATA.url;
  const image = metadata.image || DEFAULT_SITE_METADATA.image;

  document.title = title;

  const setMeta = (nameOrProp: string, value: string, isProp = false) => {
    const attr = isProp ? 'property' : 'name';
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${nameOrProp}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, nameOrProp);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', url, true);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:url', url);

  if (image) {
    setMeta('og:image', image, true);
    setMeta('og:image:secure_url', image, true);
    setMeta('twitter:image', image);
  }

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', url);
  }
}
