import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const root = path.resolve('dist');
const files = await readdir(root, { recursive: true });
const documents = new Map();
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const { document } = parseHTML(await readFile(path.join(root, file), 'utf8'));
  documents.set(file, document);
}
const home = documents.get('index.html');
const origin = new URL(home.querySelector('link[rel="canonical"]').getAttribute('href')).origin;
const failures = [];
for (const [file, document] of documents) {
  const pathname = '/' + file.replace(/index\.html$/, '');
  for (const el of document.querySelectorAll('a[href], link[href], script[src], img[src]')) {
    const url = new URL(el.getAttribute('href') ?? el.getAttribute('src'), origin + pathname);
    if (url.origin !== origin) continue;
    let target = decodeURIComponent(url.pathname.slice(1));
    if (!target || target.endsWith('/')) target += 'index.html';
    if (!(await stat(path.join(root, target)).catch(() => null))?.isFile()) {
      failures.push(file + ' links to missing ' + url.pathname);
    } else if (
      url.hash &&
      documents.has(target) &&
      !documents.get(target).getElementById(decodeURIComponent(url.hash.slice(1)))
    ) {
      failures.push(file + ' links to missing ' + url.pathname + url.hash);
    }
  }
}
if (failures.length) throw new Error(failures.join('\n'));
console.log(
  'Checked local links, assets, and fragment targets in ' + documents.size + ' HTML files.',
);
