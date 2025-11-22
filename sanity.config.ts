import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Work Experience')
              .schemaType('workExperience')
              .child(S.documentTypeList('workExperience').title('Work Experience')),
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projects')),
            S.divider(),
            S.listItem()
              .title('Blog Posts & Guides')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Posts')),
            S.divider(),
            S.listItem()
              .title('Gallery')
              .schemaType('galleryImage')
              .child(S.documentTypeList('galleryImage').title('Gallery')),
          ]),
    }),
    visionTool(),
  ],
})
