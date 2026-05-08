import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["personal", "professional"], layout: "radio" },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "content", title: "Content", type: "blockContent" }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    }),
    defineField({
      name: "tech",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({
      name: "employer",
      title: "Employer (professional projects only)",
      type: "reference",
      to: [{ type: "workExperience" }],
      hidden: ({ document }) => document?.category !== "professional",
    }),
    defineField({
      name: "order",
      title: "Display Order (lower = first)",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["active", "wip", "archived"], layout: "radio" },
      initialValue: "active",
    }),
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
