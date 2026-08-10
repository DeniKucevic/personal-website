import type { Metadata } from "next";
import { PeckoChat } from "@/components/pecko-chat";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity/image";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import { baseComponents } from "@/components/portable-text";
import { SharePost } from "@/components/share-post";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: any) => ({ slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${slug}`;

  // The og:image / twitter:image come from the sibling opengraph-image.tsx,
  // which renders a branded title card for every post.
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: ["Denis Kučević"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    url: `https://deniskucevic.com/blog/${slug}`,
    mainEntityOfPage: `https://deniskucevic.com/blog/${slug}`,
    keywords: post.tags,
    ...(post.coverImage
      ? {
          image: urlFor(post.coverImage)
            .width(1200)
            .height(630)
            .fit("crop")
            .url(),
        }
      : {}),
    author: {
      "@type": "Person",
      name: "Denis Kučević",
      alternateName: "Denis Kucevic",
      url: "https://deniskucevic.com",
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2",
        )}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to blog
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {post.type}
          </Badge>
          {post.publishedAt && (
            <span className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        )}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {post.coverImage && (
        <Image
          src={urlFor(post.coverImage).width(900).height(500).fit("crop").url()}
          alt={post.coverImage.alt ?? post.title}
          width={900}
          height={500}
          placeholder={post.coverImage.asset?.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={post.coverImage.asset?.metadata?.lqip}
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
                ...baseComponents,
                types: {
                  ...baseComponents.types,
                  peckoEmbed: ({ value }) => (
                    <div className="not-prose my-8">
                      <PeckoChat />
                      {value?.caption && (
                        <p className="mt-2 text-center text-xs text-muted-foreground">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  ),
                },
              }}
            />
          </div>
        </>
      )}

      <Separator />
      <SharePost title={post.title} />
    </div>
  );
}
