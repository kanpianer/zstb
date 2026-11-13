import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TutorialImagePreviewProps {
  image: { src: string; alt: string; caption: string };
  onClose: () => void;
}

export const TutorialImagePreview: React.FC<TutorialImagePreviewProps> = ({ image, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label="教程图片放大预览"
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none border-0 bg-black/85 p-4 sm:p-8 text-white backdrop:bg-transparent grid place-items-center"
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label="关闭图片预览"
        className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <X className="h-6 w-6" />
      </button>
      <figure className="m-0 min-w-0 max-w-full pointer-events-none">
        <img src={image.src} alt={image.alt} className="block mx-auto max-w-full max-h-[80dvh] object-contain rounded shadow-xl pointer-events-auto" />
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-white/90 pointer-events-auto">
          {image.caption || image.alt}
        </figcaption>
      </figure>
    </dialog>
  );
};
