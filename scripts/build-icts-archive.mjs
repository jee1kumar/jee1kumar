// Generates the ICTS archive pages at deploy time.
//
// Reads every image inside images/icts/archive/ (including subfolders), sorts
// them by file name (so 2.jpg comes before 10.jpg), and writes paginated pages:
//   /icts-archive/       page 1
//   /icts-archive/2/     page 2 ... and so on
// File names are never shown on the pages.
//
// Usage: node scripts/build-icts-archive.mjs [outputRoot]   (default: repo root)

import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_ROOT = process.argv[2] ?? ROOT;
const SOURCE_DIR = join(ROOT, 'images', 'icts', 'archive');
const OUT_DIR = join(OUT_ROOT, 'icts-archive');
const PER_PAGE = 60;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

async function findImages(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return []; }
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await findImages(full));
    else if (IMAGE_EXT.test(entry.name)) files.push(full);
  }
  return files;
}

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Site-relative URL path with each segment percent-encoded (handles spaces etc.).
const toUrlPath = (file) => '/' + relative(ROOT, file).split(sep).map(encodeURIComponent).join('/');
const cdn = (path, params) => `/.netlify/images?url=${encodeURIComponent(path)}&${params}`;
const pageHref = (n) => (n === 1 ? '/icts-archive/' : `/icts-archive/${n}/`);

function pagination(current, total) {
  if (total <= 1) return '';
  const links = [];
  links.push(current > 1
    ? `<a class="page-step" href="${pageHref(current - 1)}" rel="prev">Previous</a>`
    : `<span class="page-step" aria-disabled="true">Previous</span>`);
  const numbers = [];
  for (let n = 1; n <= total; n++) {
    // Show first, last, and pages near the current one; collapse the rest.
    if (n === 1 || n === total || Math.abs(n - current) <= 2) {
      numbers.push(n === current
        ? `<a href="${pageHref(n)}" aria-current="page">${n}</a>`
        : `<a href="${pageHref(n)}">${n}</a>`);
    } else if (numbers[numbers.length - 1] !== '<span class="page-gap">…</span>') {
      numbers.push('<span class="page-gap">…</span>');
    }
  }
  links.push(`<span class="page-numbers">${numbers.join('')}</span>`);
  links.push(current < total
    ? `<a class="page-step" href="${pageHref(current + 1)}" rel="next">Next</a>`
    : `<span class="page-step" aria-disabled="true">Next</span>`);
  return `<nav class="pagination" aria-label="Archive pages">${links.join('')}</nav>`;
}

function renderPage({ images, page, totalPages, totalImages, startIndex }) {
  const pageLabel = totalPages > 1 ? ` — page ${page} of ${totalPages}` : '';
  const countLabel = totalImages === 1 ? '1 PHOTOGRAPH' : `${totalImages} PHOTOGRAPHS`;
  const grid = images.length
    ? `<ul class="archive-grid">${images.map((file, i) => {
        const n = startIndex + i + 1;
        const path = toUrlPath(file);
        const eager = i < 8;
        return `<li><a href="${escapeAttr(cdn(path, 'w=2400'))}" data-number="${n}"><img src="${escapeAttr(cdn(path, 'w=800&h=800&fit=cover&q=70'))}" alt="ICTS archive photograph ${n} of ${totalImages}" width="800" height="800" ${eager ? '' : 'loading="lazy" '}decoding="async"></a></li>`;
      }).join('\n')}</ul>`
    : `<p class="archive-empty">Photographs are coming soon.</p>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="The full ICTS photo archive by JM STUDIO.">
  <meta name="color-scheme" content="dark">
  <title>ICTS archive${pageLabel} | JM STUDIO</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body id="top">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="brand" href="/index.html" aria-label="JM STUDIO home">JM STUDIO</a><nav aria-label="Main navigation"><a href="/index.html#projects" aria-current="page">Projects</a><a href="/about.html">About</a></nav></header>
<main id="main"><section class="project-intro"><a class="text-link" href="/icts.html">Back to ICTS</a><p class="eyebrow">${countLabel}</p><h1>ICTS archive</h1><p>Every photograph from the ICTS series${totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ''}.</p></section>
${grid}
${pagination(page, totalPages)}
<section class="next-project"><p class="eyebrow">CONTINUE EXPLORING</p><a href="/natural-history.html">Studies of natural history</a></section></main>
<footer><span>© 2026 Jeevan Kumar Papaganti</span><a href="/about.html">Behind the photographs</a><a href="#top">Back to top</a></footer>
<dialog class="viewer" aria-label="Photograph viewer">
  <img alt="">
  <p class="viewer-count" aria-live="polite"></p>
  <button type="button" class="viewer-close" aria-label="Close">Close</button>
  <button type="button" class="viewer-prev" aria-label="Previous photograph">‹</button>
  <button type="button" class="viewer-next" aria-label="Next photograph">›</button>
</dialog>
<script src="/archive-viewer.js" defer></script>
</body>
</html>
`;
}

const files = (await findImages(SOURCE_DIR)).sort((a, b) => collator.compare(relative(SOURCE_DIR, a), relative(SOURCE_DIR, b)));
const totalPages = Math.max(1, Math.ceil(files.length / PER_PAGE));

await rm(OUT_DIR, { recursive: true, force: true });
for (let page = 1; page <= totalPages; page++) {
  const startIndex = (page - 1) * PER_PAGE;
  const html = renderPage({
    images: files.slice(startIndex, startIndex + PER_PAGE),
    page, totalPages, totalImages: files.length, startIndex,
  });
  const dir = page === 1 ? OUT_DIR : join(OUT_DIR, String(page));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}
console.log(`ICTS archive: ${files.length} photographs across ${totalPages} page(s).`);
