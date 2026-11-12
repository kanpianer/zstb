// A rolling window: all five clicks, not merely adjacent pairs, must fit in 1500 ms.
export function createBlankClickGesture(open: () => void, now = () => performance.now()) {
  let clicks: number[] = [];
  return (event: MouseEvent) => {
    if (event.button !== 0 || !event.isTrusted) return;
    const target = event.target;
    if (!(target instanceof Element)) { clicks = []; return; }
    // Interactive regions (including non-button clickable cards) and visible text aren't blank.
    if (target.closest('button,a,input,textarea,select,label,summary,[role="button"],[contenteditable="true"],.cursor-pointer,[data-cms-ignore]') ||
      !['DIV', 'MAIN', 'SECTION', 'HEADER', 'FOOTER', 'BODY'].includes(target.tagName)) {
      clicks = []; return;
    }
    const text = Array.from(target.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
    if (text) { clicks = []; return; }
    const timestamp = now();
    clicks = clicks.filter(t => timestamp - t <= 1500);
    clicks.push(timestamp);
    if (clicks.length === 5) { clicks = []; open(); }
  };
}
