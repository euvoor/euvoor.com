import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entries = defineCollection({
  loader: glob({ base: './src/content', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.coerce.date(),
    related: z.array(reference('entries')).default([]),
    instrument: z.enum(['ampersand', 'delivery']).optional(),
    evidence: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.url().startsWith('https://'),
        }),
      )
      .default([]),
  }),
});
export const collections = { entries };
