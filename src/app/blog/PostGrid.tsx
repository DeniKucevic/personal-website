'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type PostType = 'all' | 'blog' | 'guide'

export function PostGrid({ posts }: { posts: any[] }) {
  const [filter, setFilter] = useState<PostType>('all')

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.type === filter)

  return (
    <>
      <div className="flex gap-2">
        {(['all', 'blog', 'guide'] as PostType[]).map((t) => (
          <Button
            key={t}
            variant={filter === t ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(t)}
          >
            {t === 'all' ? 'All' : t === 'guide' ? 'Guides' : 'Blog'}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <Card className="h-full hover:border-border transition-colors group">
              {post.coverImage && (
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(320).fit('crop').url()}
                    alt={post.coverImage.alt ?? post.title}
                    width={600}
                    height={320}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs capitalize">{post.type}</Badge>
                  {post.publishedAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <h2 className="font-medium leading-snug group-hover:underline underline-offset-2">{post.title}</h2>
              </CardHeader>
              {post.excerpt && (
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
              )}
              {post.tags?.length > 0 && (
                <CardFooter className="gap-1.5 flex-wrap">
                  {post.tags.slice(0, 4).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </CardFooter>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No posts yet.</p>
      )}
    </>
  )
}
