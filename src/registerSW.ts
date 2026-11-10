/**
 * PWA Service Worker & Static Asset Persistence Handler
 * Ensures font files and static resources are cached in CacheStorage
 * and persisted against browser eviction.
 */

export async function registerServiceWorker(): Promise<void> {
  // 1. Request persistent storage from browser to prevent cache eviction under disk pressure
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      if (isPersisted) {
        console.log('[Storage] 持久化存储权限已生效，字体与静态资源将免受浏览器清理');
      } else {
        console.log('[Storage] 持久化存储未启用（普通临时配额）');
      }
    } catch (err) {
      console.warn('[Storage] 请求持久化存储失败:', err);
    }
  }

  // 2. Register Service Worker for CacheStorage interception
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('[SW] Service Worker 注册成功，作用域:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[SW] 发现新版本静态文件与字体，已在后台就绪');
              }
            });
          }
        });
      } catch (error) {
        console.warn('[SW] Service Worker 注册失败:', error);
      }
    });
  }
}
