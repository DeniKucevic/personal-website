import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import {
  getFeaturedProjects,
  getRecentPosts,
  getSiteSettings,
} from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const [settings, featuredProjects, recentPosts] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getRecentPosts(3),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings?.name ?? "Denis Kučević",
    alternateName: "Denis Kucevic",
    url: "https://deniskucevic.com",
    jobTitle: settings?.tagline ?? "Software Developer",
    description: settings?.bio,
    ...(settings?.location ? { address: settings.location } : {}),
    ...(settings?.avatar
      ? {
          image: urlFor(settings.avatar)
            .width(400)
            .height(400)
            .fit("crop")
            .url(),
        }
      : {}),
    sameAs: [settings?.github, settings?.linkedin].filter(Boolean),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 space-y-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero */}
      <section className="flex flex-col-reverse sm:flex-row items-start gap-10 sm:gap-16">
        <div className="flex-1 space-y-5">
          <h1 className="fade-up-1 text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
            {settings?.name ?? "Denis Kučević"}
          </h1>
          <p className="fade-up-2 text-xl sm:text-2xl text-primary font-medium">
            {settings?.tagline ?? "Software Developer"}
          </p>
          <p className="fade-up-3 text-muted-foreground leading-relaxed max-w-lg text-base sm:text-lg">
            {settings?.bio ?? "Building web, mobile, and hardware projects."}
          </p>
          <div className="fade-up-4 flex flex-wrap items-center gap-3 pt-1">
            {settings?.github && (
              <Link
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                GitHub
              </Link>
            )}
            {settings?.linkedin && (
              <Link
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                LinkedIn
              </Link>
            )}
            {settings?.email && (
              <Link
                href={`mailto:${settings.email}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                <Mail className="h-4 w-4 mr-1.5" /> Email
              </Link>
            )}
            <Link href="/work" className={cn(buttonVariants({ size: "sm" }))}>
              View my work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        {settings?.avatar && (
          <div className="fade-up-1 shrink-0 relative">
            <div
              className="absolute inset-0 rounded-full bg-primary/25 blur-2xl scale-125"
              aria-hidden="true"
            />
            <Image
              src={urlFor(settings.avatar)
                .width(176)
                .height(176)
                .fit("crop")
                .url()}
              alt={settings.name ?? "Avatar"}
              width={176}
              height={176}
              className="relative rounded-full object-cover ring-1 ring-primary/30"
              priority
            />
          </div>
        )}
      </section>

      {/* Featured projects */}
      {featuredProjects?.length > 0 && (
        <section className="space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <Link
              href="/work"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project: any) => (
              <Link
                key={project._id}
                href={`/work/${project.slug.current}`}
                className="group h-full"
              >
                <Card className="h-full flex flex-col border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  {project.coverImage && (
                    <div className="overflow-hidden rounded-t-lg">
                      <Image
                        src={urlFor(project.coverImage)
                          .width(400)
                          .height(220)
                          .fit("crop")
                          .url()}
                        alt={project.coverImage.alt ?? project.title}
                        width={400}
                        height={220}
                        placeholder={
                          project.coverImage.asset?.metadata?.lqip
                            ? "blur"
                            : "empty"
                        }
                        blurDataURL={project.coverImage.asset?.metadata?.lqip}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium leading-snug transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-xs capitalize"
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </CardContent>
                  {
                    <CardFooter className="flex-wrap gap-1.5 mt-auto min-h-[5rem] items-start content-start">
                      {project.tech?.slice(0, 4).map((t: string) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </CardFooter>
                  }
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      {recentPosts?.length > 0 && (
        <section className="space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All posts
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentPosts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <div className="group -mx-3 flex items-start gap-5 rounded-lg px-3 py-5 transition-colors hover:bg-card/40">
                  {post.coverImage && (
                    <Image
                      src={urlFor(post.coverImage)
                        .width(80)
                        .height(80)
                        .fit("crop")
                        .url()}
                      alt={post.coverImage.alt ?? post.title}
                      width={80}
                      height={80}
                      loading="eager"
                      placeholder={
                        post.coverImage.asset?.metadata?.lqip ? "blur" : "empty"
                      }
                      blurDataURL={post.coverImage.asset?.metadata?.lqip}
                      className="shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {post.type}
                      </Badge>
                      {post.publishedAt && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
