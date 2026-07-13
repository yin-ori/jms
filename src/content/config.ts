import { defineCollection, z } from 'astro:content';

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['de', 'en', 'ja']),
    keywords: z.array(z.string()),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['de', 'en', 'ja']),
    keywords: z.array(z.string()),
    publishedDate: z.string(),
    modifiedDate: z.string(),
    readTime: z.string(),
    author: z.string().default('JM Sugawara'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  research: researchCollection,
  blog: blogCollection,
};
