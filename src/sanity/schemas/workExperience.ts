import { defineArrayMember, defineField, defineType } from 'sanity'

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: { list: ['Full-time', 'Freelance', 'Part-time', 'Internship'] },
    }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
    defineField({ name: 'endDate', title: 'End Date (leave empty if current)', type: 'date' }),
    defineField({ name: 'current', title: 'Current Position', type: 'boolean', initialValue: false }),
    defineField({ name: 'yearOnly', title: 'Show year only (hide month)', type: 'boolean', initialValue: false }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'order', title: 'Display Order (lower = first)', type: 'number' }),
  ],
  orderings: [
    { title: 'Date, Newest First', name: 'dateDesc', by: [{ field: 'startDate', direction: 'desc' }] },
    { title: 'Manual Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'company', subtitle: 'role', media: 'logo' },
  },
})
