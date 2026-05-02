import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity/queries'
import { ProjectGrid } from './ProjectGrid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects by Denis Kučević, things I have built.',
}

export default async function WorkPage() {
  const projects = await getAllProjects()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Work</h1>
        <p className="text-muted-foreground">Things I have built.</p>
      </div>
      <ProjectGrid projects={projects ?? []} />
    </div>
  )
}
