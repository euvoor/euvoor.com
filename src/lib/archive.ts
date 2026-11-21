import { getCollection, type CollectionEntry } from 'astro:content';
import { sections, type Section } from './sections';

export type Entry = CollectionEntry<'entries'>;
export const pathFor = (entry: Entry) => '/' + entry.id + '/';
export const dateLabel = (value: Date) =>
  value.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export function sectionOf(entry: Entry): Section {
  const [section, slug, extra] = entry.id.split('/');
  if (!Object.hasOwn(sections, section) || !slug || extra) {
    throw new Error('Expected src/content/<section>/<stable-slug>.md for ' + entry.id);
  }
  return section as Section;
}

export async function readArchive() {
  const entries = (await getCollection('entries')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
  const ids = new Set(entries.map((entry) => entry.id));
  for (const entry of entries) {
    sectionOf(entry);
    for (const ref of entry.data.related) {
      if (!ids.has(ref.id) || ref.id === entry.id) {
        throw new Error(entry.id + '.md has an invalid related entry: ' + ref.id);
      }
    }
  }
  return entries;
}

export function neighbors(entry: Entry, archive: Entry[]) {
  return archive.filter(
    (other) =>
      entry.data.related.some((ref) => ref.id === other.id) ||
      other.data.related.some((ref) => ref.id === entry.id),
  );
}

export function traceMarkFor(entry: Entry, archive: Entry[]) {
  return (
    entry.data.instrument ??
    neighbors(entry, archive).find((item) => item.data.instrument)?.data.instrument
  );
}
