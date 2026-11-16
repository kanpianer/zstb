import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const ipSitesResult = await build({
  entryPoints: ['src/data/ipCheckSites.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});
const { IP_CHECK_SITES, getIpCheckSiteById } = await import(
  `data:text/javascript;base64,${Buffer.from(ipSitesResult.outputFiles[0].text).toString('base64')}`
);

const contentResult = await build({
  entryPoints: ['src/cms/content.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});
const { createDefaultContent } = await import(
  `data:text/javascript;base64,${Buffer.from(contentResult.outputFiles[0].text).toString('base64')}`
);

test('IP detection sites configuration includes 4 required websites with tutorials and specs', () => {
  assert.equal(IP_CHECK_SITES.length, 4, 'Must have exactly 4 IP check sites');

  const siteMap = new Map(IP_CHECK_SITES.map(s => [s.id, s]));

  // 1. IPOK
  const ipok = siteMap.get('ipok');
  assert.ok(ipok, 'IPOK site must exist');
  assert.equal(ipok.url, 'https://ipok.io');
  assert.ok(ipok.tutorial.steps.length >= 3, 'IPOK must have tutorial steps');
  assert.ok(ipok.tutorial.highlights.length >= 2, 'IPOK must have feature highlights');

  // 2. IPCheck.ing
  const ipcheck = siteMap.get('ipcheck');
  assert.ok(ipcheck, 'IPCheck.ing site must exist');
  assert.equal(ipcheck.url, 'https://ipcheck.ing/?hl=zh');
  assert.ok(ipcheck.tutorial.steps.length >= 3, 'IPCheck.ing must have tutorial steps');

  // 3. IPSuper
  const ipsuper = siteMap.get('ipsuper');
  assert.ok(ipsuper, 'IPSuper site must exist');
  assert.equal(ipsuper.url, 'https://ipsuper.com');
  assert.ok(ipsuper.tutorial.steps.length >= 3, 'IPSuper must have tutorial steps');

  // 4. Net.Coffee
  const netCoffee = siteMap.get('net-coffee');
  assert.ok(netCoffee, 'Net.Coffee site must exist');
  assert.equal(netCoffee.url, 'https://ip.net.coffee');
  assert.ok(netCoffee.tutorial.steps.length >= 3, 'Net.Coffee must have tutorial steps');

  // Test getIpCheckSiteById
  assert.equal(getIpCheckSiteById('ipok')?.name, 'IPOK');
  assert.equal(getIpCheckSiteById('ipcheck')?.name, 'IPCheck.ing');
  assert.equal(getIpCheckSiteById('ipsuper')?.name, 'IPSuper');
  assert.equal(getIpCheckSiteById('net-coffee')?.name, 'Net.Coffee');
  assert.equal(getIpCheckSiteById('non-existent'), undefined);
});

test('footerText removes 纸上谈兵, ©, 2026 and ·, and is 主流翻墙工具使用教程', () => {
  const content = createDefaultContent();
  assert.ok(!content.settings.footerText.includes('纸上谈兵'), 'footerText must not include 纸上谈兵');
  assert.ok(!content.settings.footerText.includes('©'), 'footerText must not include ©');
  assert.ok(!content.settings.footerText.includes('2026'), 'footerText must not include 2026');
  assert.ok(!content.settings.footerText.includes('·'), 'footerText must not include ·');
  assert.equal(content.settings.footerText, '主流翻墙工具使用教程');
});

test('isVpnConnectStep identifies VPN connection steps in tutorials', async () => {
  const viewResult = await build({
    entryPoints: ['src/components/TutorialDetailView.tsx'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    loader: { '.tsx': 'tsx', '.ts': 'ts' },
  });
  const { isVpnConnectStep } = await import(
    `data:text/javascript;base64,${Buffer.from(viewResult.outputFiles[0].text).toString('base64')}`
  );

  assert.equal(isVpnConnectStep({ stepNumber: 4, title: '连接并授权 VPN' }), true);
  assert.equal(isVpnConnectStep({ stepNumber: 4, title: '开启系统代理' }), true);
  assert.equal(isVpnConnectStep({ stepNumber: 3, title: '启动并允许 VPN' }), true);
  assert.equal(isVpnConnectStep({ stepNumber: 4, title: '让浏览器使用代理' }), true);

  // Non-connection steps should be false
  assert.equal(isVpnConnectStep({ stepNumber: 1, title: '从官方入口安装' }), false);
  assert.equal(isVpnConnectStep({ stepNumber: 2, title: '导入并选择配置' }), false);
  assert.equal(isVpnConnectStep({ stepNumber: 3, title: '选择节点' }), false);
  assert.equal(isVpnConnectStep({ stepNumber: 5, title: '浏览器验证与关闭' }), false);
  assert.equal(isVpnConnectStep({ stepNumber: 5, title: '验证连接并停止代理' }), false);
});

test('PencilFooter includes IP检测 dashed button and centered tutorial text', async () => {
  const fs = await import('node:fs/promises');
  const footerCode = await fs.readFile('src/components/PencilFooter.tsx', 'utf-8');

  // Verify dashed button for IP检测 has exact same size as 回到顶部 (w-[82px] h-[27px]) and includes ShieldCheck icon
  assert.ok(footerCode.includes('pencil-btn-secondary'), 'Footer must use pencil-btn-secondary dashed button');
  assert.ok(footerCode.includes('w-[82px] h-[27px]'), 'IP检测 button must match 回到顶部 dimensions');
  assert.ok(footerCode.includes('<ShieldCheck'), 'IP检测 button must include ShieldCheck logo');
  assert.ok(footerCode.includes('IP检测'), 'Footer must have IP检测 button');

  // Verify reading progress is recorded for IP检测 button as well
  assert.ok(
    footerCode.includes('title={`点击进入 IP 地址检测页面${progressPercent > 0 ? ` (已读 ${progressPercent}%)` : \'\'}`'),
    'IP检测 button must record reading progress in title'
  );

  // Verify center text 主流翻墙工具使用教程
  assert.ok(footerCode.includes('absolute left-1/2 -translate-x-1/2'), 'Footer must center the tutorial text');
  assert.ok(footerCode.includes('主流翻墙工具使用教程'), 'Footer must contain 主流翻墙工具使用教程');
});

test('TutorialDetailView uses ShieldCheck icon for IP检测 button matching IP page header', async () => {
  const fs = await import('node:fs/promises');
  const tutorialCode = await fs.readFile('src/components/TutorialDetailView.tsx', 'utf-8');
  assert.ok(
    tutorialCode.includes('<ShieldCheck className="w-3.5 h-3.5 text-pencil-dark shrink-0 group-hover:scale-105 transition-transform" />'),
    'TutorialDetailView must use ShieldCheck icon for IP检测 button'
  );
});
