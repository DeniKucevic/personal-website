import type { MetadataRoute } from 'next'
import { getAllProjects, getAllPosts } from '@/lib/sanity/queries'

const BASE = 'https://deniskucevic.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/work`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p: any) => ({
    url: `${BASE}/work/${p.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p: any) => ({
    url: `${BASE}/blog/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
