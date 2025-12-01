import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Role / Tagline', type: 'string' }),
    defineField({ name: 'bio', title: 'Short Bio (homepage)', type: 'text', rows: 3 }),
    defineField({ name: 'about', title: 'About (long, About page)', type: 'text', rows: 6 }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({
      name: 'cv',
      title: 'CV (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),
  ],
})
