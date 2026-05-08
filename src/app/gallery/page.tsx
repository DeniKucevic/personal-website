import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { getGalleryImages } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos by Denis Kucevic.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-muted-foreground">
          3D prints, electronics, cars, and everything else.
        </p>
      </div>

      {images?.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <p className="text-center text-muted-foreground py-24">
          No images yet.
        </p>
      )}
    </div>
  );
}
