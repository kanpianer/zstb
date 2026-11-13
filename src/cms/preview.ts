import { parseContent, type SiteContent } from './content';

export const LOCAL_PREVIEW_KEY = 'dtms-preview-v1';

// Store content only: repository credentials and revision metadata never belong here.
export function saveLocalPreview(storage: Pick<Storage, 'setItem'>, content: SiteContent): SiteContent {
  const snapshot = parseContent(content);
  storage.setItem(LOCAL_PREVIEW_KEY, JSON.stringify(snapshot));
  return snapshot;
}

export function loadLocalPreview(storage: Pick<Storage, 'getItem'>): SiteContent | null {
  const raw = storage.getItem(LOCAL_PREVIEW_KEY);
  return raw === null ? null : parseContent(JSON.parse(raw));
}

export function clearLocalPreview(storage: Pick<Storage, 'removeItem'>): void {
  storage.removeItem(LOCAL_PREVIEW_KEY);
}
