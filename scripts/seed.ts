import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding Sanity...\n')

  // ─── Site Settings ────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: 'Denis Kučević',
    tagline: 'Software Developer · Frontend & Mobile',
    bio: "I take projects from idea to market. Across frontend, mobile and back-end, grounded in electronics and embedded systems. I'm the kind of developer who can own a product end to end, independently, and deliver something people actually depend on.",
    about: 'Licensed radio operator · YU4AIE · 3D modeller, electronics builder, car enthusiast and avid reader. Based in Pančevo, Serbia.',
    location: 'Pančevo, Serbia',
    email: 'denikucevic@gmail.com',
    github: 'https://github.com/DeniKucevic',
    linkedin: 'https://www.linkedin.com/in/denis-kucevic/',
    skills: [
      {
        _key: 'frontend',
        category: 'Frontend & Mobile',
        items: ['TypeScript', 'React', 'Next.js', 'Ionic', 'Capacitor', 'Kotlin', 'Vue'],
      },
      {
        _key: 'backend',
        category: 'Backend & Data',
        items: ['Node.js', '.NET/C#', 'PostgreSQL', 'Supabase', 'Prisma', 'Oracle PL/SQL'],
      },
      {
        _key: 'embedded',
        category: 'Mobile & Embedded',
        items: ['Android/Kotlin', 'ESP32/C++'],
      },
      {
        _key: 'tooling',
        category: 'Tooling',
        items: ['GitHub Actions', 'NX monorepo', 'Firebase', 'Vercel', 'Figma', 'Drupal', 'Electron'],
      },
    ],
  })
  console.log('✓ Site settings')

  // ─── Work Experience ──────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const experiences: any[] = [
    {
      _id: 'we-advania',
      _type: 'workExperience',
      company: 'Advania',
      role: 'Software Developer',
      employmentType: 'Full-time',
      startDate: '2021-01-01',
      current: true,
      order: 1,
      achievements: [
        'Grew Smástund from an unnamed prototype to a production app with 10,000+ users across Icelandic government institutions, hospitals, airports and emergency services',
        'Primary developer on the entire app codebase (Ionic/React + Capacitor) for 2+ years — independently taking features from requirements through research, design, implementation and release',
        'Contributed heavily to .NET back-end development; implemented Android CI/CD pipeline with GitHub Actions including automated build and release to Firebase and Google Play Store',
        'Actively involved in product planning and UI/UX design decisions throughout the project lifecycle',
      ],
    },
    {
      _id: 'we-olgerdin',
      _type: 'workExperience',
      company: 'Ölgerðin',
      role: 'Android Developer',
      employmentType: 'Freelance',
      startDate: '2022-01-01',
      current: true,
      order: 2,
      achievements: [
        "Took over sole ownership of a business-critical Android app (Kotlin) for Iceland's largest alcoholic beverage producer",
        'App manages production shifts on the factory floor — quality control checklists, torque and weight monitoring, photo uploads, report generation and offline-first data sync',
        "Ensures compliance with Iceland's strict alcohol production regulations across shifts",
        'Delivered a complete new production hall module from scratch; currently leading a full rewrite with full technical autonomy and a one year delivery target',
      ],
    },
    {
      _id: 'we-spark',
      _type: 'workExperience',
      company: 'Spark Analytics Ltd',
      role: 'Full Stack Developer',
      employmentType: 'Full-time',
      startDate: '2021-01-01',
      endDate: '2021-12-31',
      current: false,
      order: 3,
      achievements: [
        'Significantly improved application stability — eliminated DOM bloat, resolved persistent UI issues and improved responsiveness across the board',
        'Sole back-end developer on a Vue/Node stack — optimised queries, indexed the database and introduced performance monitoring to identify and fix bottlenecks',
        'Built a custom tiered subscription system with back-office management for manual account upgrades',
        'Standardised repository structure, coding practices and implemented multi-language support',
      ],
    },
    {
      _id: 'we-divac',
      _type: 'workExperience',
      company: 'Foundation Ana & Vlade Divac',
      role: 'IT Expert',
      employmentType: 'Full-time',
      startDate: '2020-01-01',
      endDate: '2021-01-01',
      current: false,
      order: 4,
      achievements: [
        'Owned and maintained jednaki.rs; developed custom Drupal CMS solutions, resolved critical email deliverability issues and deduplicated a large mismanaged CRM database',
      ],
    },
    {
      _id: 'we-svea',
      _type: 'workExperience',
      company: 'Svea Ekonomi',
      role: 'Intern',
      employmentType: 'Internship',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      current: false,
      order: 5,
      achievements: [
        'Built a full-stack food ordering SPA in React across organised sprints — delivered fully working and hosted on time, still live in production',
      ],
    },
  ]

  for (const exp of experiences) {
    await client.createOrReplace(exp)
    console.log(`✓ ${exp.company}`)
  }

  // ─── Projects ─────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any[] = [
    {
      _id: 'proj-gymos',
      _type: 'project',
      title: 'GymOS',
      slug: { _type: 'slug', current: 'gymos' },
      category: 'personal',
      description:
        'Commissioned by Fitness M gym — full-stack membership system with Next.js + PostgreSQL + Prisma, ESP32 RFID/PIN door access and a member phone portal. Live in active use.',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'ESP32', 'TypeScript'],
      featured: true,
      status: 'active',
      publishedAt: '2023-01-01',
    },
    {
      _id: 'proj-sony-remote',
      _type: 'project',
      title: 'Sony Remote',
      slug: { _type: 'slug', current: 'sony-remote' },
      category: 'personal',
      description:
        'Open-source Sony Bravia remote app, built out of frustration with ad-heavy alternatives. Live on Google Play with 5K+ downloads.',
      tech: ['Android', 'Kotlin'],
      githubUrl: 'https://github.com/DeniKucevic/sony-bravia-remote',
      featured: true,
      status: 'active',
      publishedAt: '2022-01-01',
    },
    {
      _id: 'proj-capacitor-wifi',
      _type: 'project',
      title: 'capacitor-plugin-wifi-ip',
      slug: { _type: 'slug', current: 'capacitor-plugin-wifi-ip' },
      category: 'personal',
      description:
        'Native Capacitor plugin for device IP retrieval. On npm, featured on Capgo, 10K+ downloads.',
      tech: ['Capacitor', 'TypeScript', 'Android', 'iOS'],
      githubUrl: 'https://github.com/DeniKucevic/capacitor-plugin-wifi-ip',
      featured: true,
      status: 'active',
      publishedAt: '2022-06-01',
    },
    {
      _id: 'proj-hamtrade',
      _type: 'project',
      title: 'hamtrade.net',
      slug: { _type: 'slug', current: 'hamtrade' },
      category: 'personal',
      description:
        'Commissioned by radio club YU1EXY — HAM radio marketplace with Next.js + Supabase, realtime messaging and multi-language support. Live.',
      tech: ['Next.js', 'Supabase', 'TypeScript'],
      liveUrl: 'https://hamtrade.net',
      featured: false,
      status: 'active',
      publishedAt: '2023-06-01',
    },
    {
      _id: 'proj-zelara',
      _type: 'project',
      title: 'ZELARA',
      slug: { _type: 'slug', current: 'zelara' },
      category: 'professional',
      description:
        'Commissioned by Advania Serbia — workplace SaaS for parking spot booking. Ionic/React + Supabase, multi-language, CI/CD.',
      tech: ['Ionic', 'React', 'Supabase', 'TypeScript'],
      employer: { _type: 'reference', _ref: 'we-advania' },
      featured: false,
      status: 'active',
      publishedAt: '2022-06-01',
    },
    {
      _id: 'proj-jednaki',
      _type: 'project',
      title: 'jednaki.rs',
      slug: { _type: 'slug', current: 'jednaki' },
      category: 'professional',
      description:
        'Commissioned by the Serbian Ministry of Demographics & Foundation Ana and Vlade Divac — Vue.js website for the Ulične akcije social project. Live.',
      tech: ['Vue.js', 'Drupal'],
      liveUrl: 'https://jednaki.rs',
      employer: { _type: 'reference', _ref: 'we-divac' },
      featured: false,
      status: 'active',
      publishedAt: '2021-01-01',
    },
  ]

  for (const project of projects) {
    await client.createOrReplace(project)
    console.log(`✓ ${project.title}`)
  }

  console.log('\n✅ Seed complete! Now upload your avatar and company logos in the Studio.')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
