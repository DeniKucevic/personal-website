import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { urlFor } from '@/lib/sanity/image'
import { getSiteSettings, getWorkExperience } from '@/lib/sanity/queries'
import { cn } from '@/lib/utils'
import { Download, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Denis Kucevic, software developer based in Pančevo, Serbia.',
}

function formatDateRange(startDate: string, endDate?: string, current?: boolean, yearOnly?: boolean) {
  const fmt = (d: string) => {
    const [year, month] = d.split('-').map(Number)
    if (yearOnly) return String(year)
    return new Date(year, month - 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  }
  return `${fmt(startDate)} to ${current || !endDate ? 'Present' : fmt(endDate)}`
}

export default async function AboutPage() {
  const [settings, experience] = await Promise.all([getSiteSettings(), getWorkExperience()])

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
      {/* Bio */}
      <section className="flex flex-col sm:flex-row gap-8 items-start">
        {settings?.avatar && (
          <Image
            src={urlFor(settings.avatar).width(120).height(120).fit('crop').url()}
            alt={settings?.name ?? 'Avatar'}
            width={120}
            height={120}
            className="rounded-full ring-2 ring-border shrink-0"
          />
        )}
        <div className="space-y-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{settings?.name ?? 'Denis Kucevic'}</h1>
            <p className="text-muted-foreground mt-1">{settings?.tagline ?? 'Software Developer'}</p>
          </div>
          {settings?.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {settings.location}
            </div>
          )}
          {settings?.about && (
            <p className="text-muted-foreground leading-relaxed">{settings.about}</p>
          )}
          {settings?.cv?.asset?.url && (
            <a
              href={settings.cv.asset.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CV
            </a>
          )}
        </div>
      </section>

      <Separator />

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((job: any) => (
              <div key={job._id} className="flex gap-4">
                {job.logo && (
                  <div className="shrink-0 mt-1">
                    <Image
                      src={urlFor(job.logo).width(40).height(40).fit('crop').url()}
                      alt={job.company}
                      width={40}
                      height={40}
                      className="rounded-md object-contain border border-border p-1 bg-card"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="font-medium">{job.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.role}
                        {job.employmentType && ` · ${job.employmentType}`}
                      </p>
                    </div>
                    {job.startDate && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDateRange(job.startDate, job.endDate, job.current, job.yearOnly)}
                      </span>
                    )}
                  </div>
                  {job.description && (
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  )}
                  {job.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {job.achievements.map((a: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-foreground/40 shrink-0">·</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {settings?.skills?.length > 0 && <Separator />}

      {/* Skills */}
      {settings?.skills?.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
          <div className="space-y-4">
            {settings.skills.map((group: any) => (
              <div key={group.category} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items?.map((item: string) => (
                    <Badge key={item} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* Contact */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Get in touch</h2>
        <p className="text-muted-foreground text-sm">
          Open to interesting projects and collaborations.
        </p>
        <div className="flex gap-3">
          {settings?.email && (
            <Link
              href={`mailto:${settings.email}`}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Email me
            </Link>
          )}
          {settings?.linkedin && (
            <Link
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              LinkedIn
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
