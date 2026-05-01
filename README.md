# Denis Kučević — Personal Website

Personal portfolio and blog built with Next.js and Sanity CMS. Features a work history, project showcase, photo gallery, and a fully embedded Sanity Studio for content management.

**Live at:** [deniskucevic.com](https://deniskucevic.com) <!-- update if different -->

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| CMS | Sanity v5 (embedded Studio) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── blog/           # Blog listing + post pages
│   ├── gallery/        # Photo gallery
│   ├── work/           # Work experience + projects
│   └── studio/         # Embedded Sanity Studio
├── components/         # Shared UI components
├── lib/sanity/         # Sanity client, queries, image helpers
└── sanity/schemas/     # Content schemas
scripts/
└── seed.ts             # Seeds Sanity with initial data
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Sanity](https://sanity.io) project

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The embedded Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

### Seed Initial Data

```bash
npm run seed
```

Populates Sanity with site settings, work experience, and projects. Run once on a fresh dataset.

---

## Content Management

All content is managed through the embedded Sanity Studio at `/studio`. No separate Studio deployment needed.

**Schemas:** site settings, work experience, projects, blog posts, gallery images.
