import { getAllPosts } from "@/lib/sanity/queries";

const BASE = "https://deniskucevic.com";
const TITLE = "Denis Kučević — Blog";
const DESCRIPTION =
  "Writing about things Denis Kučević builds, learns, and tinkers with.";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getAllPosts()) ?? [];

  const items = posts
    .map((post: any) => {
      const url = `${BASE}/blog/${post.slug.current}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : "";
      return `    <item>
      <title>${escapeXml(post.title ?? "")}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ""}
      ${(post.tags ?? [])
        .map((tag: string) => `<category>${escapeXml(tag)}</category>`)
        .join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${BASE}/blog</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
