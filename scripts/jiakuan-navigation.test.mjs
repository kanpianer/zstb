import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const result = await build({
  entryPoints: ['src/utils/jiakuanNavigation.ts'],
  bundle: true, platform: 'node', format: 'esm', write: false,
});
const { handleJiakuanNavigation } = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
);

test('each activation selects a fresh URL using the 25/25/50 probability boundaries', () => {
  const originalRandom = Math.random;
  const event = { currentTarget: { href: 'https://jkdh.sld.tw/' } };
  try {
    for (const [random, expected] of [
      [0, 'https://jiakuan.link/'],
      [0.249999, 'https://jiakuan.link/'],
      [0.25, 'https://jkdh.pages.dev/'],
      [0.499999, 'https://jkdh.pages.dev/'],
      [0.5, 'https://jkdh.sld.tw/'],
      [0.999999, 'https://jkdh.sld.tw/'],
    ]) {
      Math.random = () => random;
      handleJiakuanNavigation(event);
      assert.equal(event.currentTarget.href, expected);
    }
  } finally {
    Math.random = originalRandom;
  }
});
