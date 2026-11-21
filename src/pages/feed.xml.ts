import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { readArchive, pathFor } from '../lib/archive';
export async function GET({ site }: APIContext) {
  const archive = await readArchive();
  return rss({
    title: 'Oussama Elgoumri’s workshop',
    description: 'Case files, experiments, patches, and notes.',
    site: site!,
    items: archive.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: pathFor(entry),
    })),
  });
}
