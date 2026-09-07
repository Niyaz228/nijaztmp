import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, dirname, join } from 'node:path';
const root = resolve('dist');
const errors = [];
const files = readdirSync(root, { recursive: true }).filter((f) =>
  statSync(join(root, f)).isFile(),
);
const pages = files.filter((f) => f.endsWith('.html'));
const titles = new Set();
const target = (path) =>
  join(root, path.endsWith('/') ? path + 'index.html' : path);
for (const file of pages) {
  const html = readFileSync(join(root, file), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title || titles.has(title))
    errors.push(`${file}: missing or duplicate title`);
  titles.add(title);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1)
    errors.push(`${file}: h1 count`);
  if (!html.includes('<meta name="description"'))
    errors.push(`${file}: description missing`);
  for (const m of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    const raw = m[1].replaceAll('&amp;', '&');
    if (!raw.startsWith('/') && !raw.startsWith('#')) continue;
    const [path, hash] = raw.split('#');
    const dest = path ? target(path.split('?')[0]) : join(root, file);
    if (!existsSync(dest)) {
      errors.push(`${file}: missing ${raw}`);
      continue;
    }
    if (
      hash &&
      dest.endsWith('.html') &&
      !readFileSync(dest, 'utf8').includes(`id="${hash}"`)
    )
      errors.push(`${file}: missing anchor ${raw}`);
  }
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  )) {
    try {
      JSON.parse(m[1]);
    } catch {
      errors.push(`${file}: invalid structured data`);
    }
  }
  if (
    /aggregateRating|"price"\s*:|Nike|Jordan|АДЫМ|1897 наград|346 строительство/.test(
      html,
    )
  )
    errors.push(`${file}: forbidden legacy/demo data`);
}
for (const file of files) {
  if (
    /(^|\/)(legacy|sensitive-originals|node_modules)(\/|$)|\.(php|sql|env)$/i.test(
      file,
    )
  )
    errors.push(`Non-public source in build: ${file}`);
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const url = new URL(m[1]);
  if (url.origin !== 'https://nijaz.by' || !existsSync(target(url.pathname)))
    errors.push(`Invalid sitemap URL ${url.href}`);
  if (url.pathname === '/404.html') errors.push('404 must not be in sitemap');
}
for (const file of files.filter((f) => f.endsWith('.css'))) {
  const css = readFileSync(join(root, file), 'utf8');
  for (const m of css.matchAll(/url\(["']?([^\s)"']+)/g)) {
    if (/^(data:|https?:)/.test(m[1])) continue;
    const dest = m[1].startsWith('/')
      ? target(m[1])
      : resolve(root, dirname(file), m[1]);
    if (!existsSync(dest)) errors.push(`${file}: missing CSS asset ${m[1]}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${pages.length} HTML pages, internal links and anchors, metadata, JSON-LD, sitemap, CSS assets, and public-file isolation.`,
  );
