import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'takenAt', title: 'Taken At', type: 'date' }),
    defineField({ name: 'order', title: 'Display Order (lower = first)', type: 'number' }),
  ],
  orderings: [
    { title: 'Manual Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'takenAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
