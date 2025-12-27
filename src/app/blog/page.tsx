import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/sanity/queries'
import { PostGrid } from './PostGrid'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about things Denis Kučević builds, learns, and tinkers with.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">Writing about things I build, learn, and tinker with.</p>
      </div>
      <PostGrid posts={posts ?? []} />
    </div>
  )
}
