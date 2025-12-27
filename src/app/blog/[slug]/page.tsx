import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { urlFor } from '@/lib/sanity/image'
import { getAllPosts, getPostBySlug } from '@/lib/sanity/queries'
import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-10">
      <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2')}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to blog
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">{post.type}</Badge>
          {post.publishedAt && (
            <span className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-muted-foreground">{post.excerpt}</p>}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      {post.coverImage && (
        <Image
          src={urlFor(post.coverImage).width(900).height(500).fit('crop').url()}
          alt={post.coverImage.alt ?? post.title}
          width={900}
          height={500}
          className="w-full rounded-lg object-cover"
          priority
        />
      )}

      {post.content && (
        <>
          <Separator />
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableText
              value={post.content}
              components={{
                types: {
                  image: ({ value }) => (
                    <Image
                      src={urlFor(value).width(900).url()}
                      alt={value.alt ?? ''}
                      width={900}
                      height={500}
                      className="w-full rounded-lg"
                    />
                  ),
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
