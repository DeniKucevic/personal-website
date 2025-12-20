import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { urlFor } from '@/lib/sanity/image'
import { getAllProjects, getProjectBySlug } from '@/lib/sanity/queries'
import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-10">
      <Link href="/work" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2')}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to work
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="capitalize">{project.category}</Badge>
          {project.status === 'wip' && <Badge variant="outline">WIP</Badge>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        {project.description && (
          <p className="text-lg text-muted-foreground">{project.description}</p>
        )}
        <div className="flex gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              <ExternalLink className="h-4 w-4 mr-1.5" /> Live
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              GitHub
            </Link>
          )}
        </div>
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
        )}
      </div>

      {project.coverImage && (
        <Image
          src={urlFor(project.coverImage).width(900).height(500).fit('crop').url()}
          alt={project.coverImage.alt ?? project.title}
          width={900}
          height={500}
          className="w-full rounded-lg object-cover"
          priority
        />
      )}

      {project.content && (
        <>
          <Separator />
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableText
              value={project.content}
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

      {project.images?.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {project.images.map((img: any, i: number) => (
                <Image
                  key={i}
                  src={urlFor(img).width(450).height(300).fit('crop').url()}
                  alt={img.alt ?? `Image ${i + 1}`}
                  width={450}
                  height={300}
                  className="w-full rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
