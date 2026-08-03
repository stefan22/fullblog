import type { MetadataRoute } from 'next';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchQuery(api.posts.getPosts);
    postRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post._id}`,
      lastModified: new Date(post.updatedAt ?? post._creationTime),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // Convex unavailable at build time — still ship static routes.
  }

  return [...staticRoutes, ...postRoutes];
}
