"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const SIZES = "(max-width: 768px) 100vw, 700px";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-lg border border-border"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
    >
      {/* Base layer: after */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes={SIZES}
        className="object-cover"
        draggable={false}
      />
      {/* Top layer: before, clipped to the left of the handle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes={SIZES}
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-2 top-2 rounded bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-2 top-2 rounded bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="mx-auto h-full w-0.5 bg-white/80" />
        <button
          type="button"
          role="slider"
          aria-label="Reveal before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 7-5 5 5 5" />
            <path d="m15 7 5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
