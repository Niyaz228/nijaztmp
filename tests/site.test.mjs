import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const pages = [
  '',
  'catalog/',
  'catalog/zabory/',
  'catalog/trotuarnaya-plitka/',
  'catalog/trotuarnaya-plitka/vibropressovannaya/',
  'catalog/trotuarnaya-plitka/vibrolitevaya/',
  'catalog/taktilnaya-plitka/',
  'catalog/metallokonstrukcii/',
  'catalog/ogranichiteli-parkovki/',
  'services/',
  'services/ukladka-trotuarnoj-plitki/',
  'photos/',
  'about/',
  'contacts/',
];
for (const path of pages) {
  test(`/${path} delivers readable content and working contact targets in static HTML`, () => {
    const file = `dist/${path}index.html`;
    assert.ok(existsSync(file), `Page /${path} must be generated`);
    const html = readFileSync(file, 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    assert.ok(html.includes('tel:+375333227636'));
    assert.ok(html.includes('mailto:firma.beton@mail.ru'));
    assert.ok(html.includes(`https://nijaz.by/${path}`));
    assert.ok(
      !html.includes('application/ld+json') ||
        !html.includes('aggregateRating'),
    );
  });
}
test('tactile direction includes all patterns, sizes and the new certificate', () => {
  const file = 'dist/catalog/taktilnaya-plitka/index.html';
  assert.ok(existsSync(file), 'Tactile page must exist');
  const html = readFileSync(file, 'utf8');
  for (const label of [
    'Усечённый конус',
    'Продольный риф',
    'Диагональный риф',
    '40 × 40 × 6',
    '40 × 40 × 9',
    '30 × 30 × 9',
    '/documents/certificate-tactile.jpg',
  ])
    assert.ok(html.includes(label), `Missing ${label}`);
});

test('indexing follows the selected build mode and always excludes the 404 page', () => {
  const live = process.env.PUBLIC_SITE_LIVE === 'true';
  const robots = readFileSync('dist/robots.txt', 'utf8');
  assert.ok(robots.includes(live ? 'Allow: /' : 'Disallow: /'));
  for (const path of pages) {
    const html = readFileSync(`dist/${path}index.html`, 'utf8');
    assert.ok(html.includes(`content="${live ? 'index, follow' : 'noindex, nofollow'}"`));
  }
  assert.ok(readFileSync('dist/404.html','utf8').includes('content="noindex, nofollow"'));
});
