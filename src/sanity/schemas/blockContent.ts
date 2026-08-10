import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [{ title: "URL", name: "href", type: "url" }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string", title: "Caption (optional)" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "divider",
      title: "Divider",
      fields: [
        {
          name: "variant",
          type: "string",
          title: "Style",
          options: {
            list: [
              { title: "Line", value: "line" },
              { title: "Dots", value: "dots" },
            ],
            layout: "radio",
          },
          initialValue: "line",
        },
      ],
      preview: {
        select: { variant: "variant" },
        prepare: ({ variant }) => ({
          title: "Divider",
          subtitle: variant === "dots" ? "· · ·" : "———",
        }),
      },
    }),
    defineArrayMember({
      type: "object",
      name: "peckoEmbed",
      title: "Pecko Chat",
      fields: [
        { name: "caption", type: "string", title: "Caption (optional)" },
      ],
      preview: {
        select: { title: "caption" },
        prepare: () => ({ title: "🤖 Pecko Chat Embed" }),
      },
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        {
          name: "tone",
          type: "string",
          title: "Tone",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
              { title: "Success", value: "success" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        },
        { name: "body", type: "text", title: "Body", rows: 3 },
      ],
      preview: {
        select: { title: "body", tone: "tone" },
        prepare: ({ title, tone }) => ({
          title: title || "Callout",
          subtitle: tone ? `Callout · ${tone}` : "Callout",
        }),
      },
    }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          options: {
            list: [
              "bash",
              "css",
              "html",
              "json",
              "jsx",
              "tsx",
              "javascript",
              "typescript",
              "python",
              "text",
            ],
          },
          initialValue: "text",
        },
        { name: "filename", type: "string", title: "Filename (optional)" },
        { name: "code", type: "text", title: "Code", rows: 8 },
      ],
      preview: {
        select: { filename: "filename", language: "language" },
        prepare: ({ filename, language }) => ({
          title: filename || "Code snippet",
          subtitle: language || "text",
        }),
      },
    }),
    defineArrayMember({
      type: "object",
      name: "beforeAfter",
      title: "Before / After",
      fields: [
        {
          name: "layout",
          type: "string",
          title: "Layout",
          options: {
            list: [
              { title: "Side by side", value: "sideBySide" },
              { title: "Slider (drag to reveal)", value: "slider" },
            ],
            layout: "radio",
          },
          initialValue: "sideBySide",
        },
        {
          name: "before",
          type: "image",
          title: "Before",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
        {
          name: "after",
          type: "image",
          title: "After",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
        {
          name: "beforeLabel",
          type: "string",
          title: "Before label",
          initialValue: "Before",
        },
        {
          name: "afterLabel",
          type: "string",
          title: "After label",
          initialValue: "After",
        },
        { name: "caption", type: "string", title: "Caption (optional)" },
      ],
      preview: {
        select: { media: "before", caption: "caption" },
        prepare: ({ media, caption }) => ({
          title: "Before / After",
          subtitle: caption,
          media,
        }),
      },
    }),
    defineArrayMember({
      type: "object",
      name: "videoEmbed",
      title: "Video",
      fields: [
        {
          name: "url",
          type: "url",
          title: "Video URL",
          description: "YouTube or Vimeo link",
        },
        { name: "caption", type: "string", title: "Caption (optional)" },
      ],
      preview: {
        select: { title: "caption", url: "url" },
        prepare: ({ title, url }) => ({
          title: title || "Video",
          subtitle: url || "YouTube / Vimeo",
        }),
      },
    }),
  ],
});
