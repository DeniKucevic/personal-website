"use client"

import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface GalleryImage {
  _id: string
  caption?: string
  image: any
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const close = () => setIndex(null)

  const prev = useCallback(() => {
    setLoading(true)
    setIndex(i => (i !== null ? (i - 1 + images.length) % images.length : null))
  }, [images.length])

  const next = useCallback(() => {
    setLoading(true)
    setIndex(i => (i !== null ? (i + 1) % images.length : null))
  }, [images.length])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [index, prev, next])

  const open = (i: number) => {
    setLoading(true)
    setIndex(i)
  }

  const active = index !== null ? images[index] : null

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((item, i) => (
          <div
            key={item._id}
            className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-zoom-in"
            onClick={() => open(i)}
          >
            <Image
              src={urlFor(item.image).width(600).url()}
              alt={item.caption ?? "Gallery image"}
              width={600}
              height={400}
              placeholder={item.image.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={item.image.asset?.metadata?.lqip}
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

      {active && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
            onClick={close}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image + arrows row */}
          <div className="flex items-center w-full max-w-5xl px-4 gap-2 sm:gap-4">
            <button
              className="shrink-0 p-2 text-white/60 hover:text-white transition-colors"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-7 w-7 sm:h-9 sm:w-9" />
            </button>

            <div className="relative flex-1 min-w-0 flex items-center justify-center" onClick={e => e.stopPropagation()}>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-white/40 animate-spin" />
                </div>
              )}
              <Image
                key={active._id}
                src={urlFor(active.image).width(1400).url()}
                alt={active.caption ?? "Gallery image"}
                width={1400}
                height={1400}
                placeholder={active.image.asset?.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={active.image.asset?.metadata?.lqip}
                onLoad={() => setLoading(false)}
                className="max-h-[80vh] w-full object-contain rounded-lg"
              />
            </div>

            <button
              className="shrink-0 p-2 text-white/60 hover:text-white transition-colors"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next"
            >
              <ChevronRight className="h-7 w-7 sm:h-9 sm:w-9" />
            </button>
          </div>

          {active.caption && (
            <p className="mt-4 text-center text-sm text-white/60 px-4">{active.caption}</p>
          )}

          <p className="mt-2 text-xs text-white/30">
            {(index ?? 0) + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
