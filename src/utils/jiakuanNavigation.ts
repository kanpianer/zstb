import type { MouseEvent } from 'react';

export const handleJiakuanNavigation = (event: MouseEvent<HTMLAnchorElement>): void => {
  const random = Math.random();
  event.currentTarget.href = random < 0.25
    ? 'https://jiakuan.link/'
    : random < 0.5
      ? 'https://jkdh.pages.dev/'
      : 'https://jkdh.sld.tw/';
};
