import type { Metadata } from 'next'
import { urlFor } from '@/lib/sanity/image'
import { getGalleryImages } from '@/lib/sanity/queries'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos by Denis Kucevic.',
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-muted-foreground">3D prints, electronics, cars, and everything else.</p>
      </div>

      {images?.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {images.map((item: any) => (
            <div key={item._id} className="break-inside-avoid group relative overflow-hidden rounded-lg">
              <Image
                src={urlFor(item.image).width(600).url()}
                alt={item.caption ?? 'Gallery image'}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-24">No images yet.</p>
      )}
    </div>
  )
}
