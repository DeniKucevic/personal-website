import { client } from "./client";

const revalidate = { next: { revalidate: 60 } };

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
    ...,
    cv { asset-> }
  }`,
    {},
    revalidate,
  );
}

export async function getFeaturedProjects() {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
      _id, title, slug, category, description, tech, status,
      coverImage { asset->, alt }
    }`,
    {},
    revalidate,
  );
}

export async function getAllProjects(category?: "personal" | "professional") {
  const filter = category
    ? `*[_type == "project" && category == "${category}"]`
    : `*[_type == "project"]`;
  return client.fetch(
    `${filter} | order(coalesce(order, 99) asc, publishedAt desc) {
      _id, title, slug, category, description, tech, status, featured,
      coverImage { asset->, alt }
    }`,
    {},
    revalidate,
  );
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, description, content, tech, status,
      liveUrl, githubUrl,
      coverImage { asset->, alt },
      images[] { asset->, alt },
      employer->{ company, role }
    }`,
    { slug },
    revalidate,
  );
}

export async function getAllPosts(type?: "blog" | "guide") {
  const filter = type
    ? `*[_type == "post" && type == "${type}"]`
    : `*[_type == "post"]`;
  return client.fetch(
    `${filter} | order(publishedAt desc) {
      _id, title, slug, type, excerpt, tags, publishedAt, featured,
      coverImage { asset->, alt }
    }`,
    {},
    revalidate,
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, type, excerpt, content, tags, publishedAt,
      coverImage { asset->, alt }
    }`,
    { slug },
    revalidate,
  );
}

export async function getRecentPosts(count = 3) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...${count}] {
      _id, title, slug, type, excerpt, tags, publishedAt,
      coverImage { asset->, alt }
    }`,
    {},
    revalidate,
  );
}

export async function getWorkExperience() {
  return client.fetch(
    `*[_type == "workExperience"] | order(coalesce(order, 99)) {
      _id, company, role, employmentType, startDate, endDate, current, yearOnly,
      description, achievements,
      logo { asset-> }
    }`,
    {},
    revalidate,
  );
}

export async function getGalleryImages() {
  return client.fetch(
    `*[_type == "galleryImage"] | order(coalesce(order, 99)) {
      _id, caption, takenAt,
      image { asset->, hotspot, crop }
    }`,
    {},
    revalidate,
  );
}
