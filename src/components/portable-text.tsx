import type { PortableTextComponents } from "@portabletext/react";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { highlight } from "sugar-high";

type Tone = "info" | "tip" | "warning" | "success";

const TONES: Record<Tone, { icon: LucideIcon; className: string }> = {
  info: {
    icon: Info,
    className: "border-sky-500/30 bg-sky-500/5 text-sky-200",
  },
  tip: {
    icon: Lightbulb,
    className: "border-primary/30 bg-primary/5 text-primary",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/30 bg-amber-500/5 text-amber-200",
  },
  success: {
    icon: CheckCircle2,
    className: "border-emerald-500/30 bg-emerald-500/5 text-emerald-200",
  },
};

function Callout({ value }: { value: { tone?: Tone; body?: string } }) {
  const { icon: Icon, className } = TONES[value.tone ?? "info"];
  return (
    <div
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="m-0">{value.body}</p>
    </div>
  );
}

function CodeBlock({
  value,
}: {
  value: { language?: string; filename?: string; code?: string };
}) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-card/60">
      {(value.filename || value.language) && (
        <figcaption className="flex items-center justify-between border-b border-border px-4 py-2 text-xs text-muted-foreground">
          <span className="font-mono">{value.filename}</span>
          {value.language && (
            <span className="uppercase tracking-wider">{value.language}</span>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-sm">
        {!value.language || value.language === "text" ? (
          <code className="font-mono">{value.code}</code>
        ) : (
          <code
            className="font-mono"
            dangerouslySetInnerHTML={{ __html: highlight(value.code ?? "") }}
          />
        )}
      </pre>
    </figure>
  );
}

/** Turn a YouTube/Vimeo watch URL into an embeddable URL, or null if unknown. */
function toEmbedUrl(raw?: string): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function VideoEmbed({ value }: { value: { url?: string; caption?: string } }) {
  const embed = toEmbedUrl(value.url);
  if (!embed) {
    return value.url ? (
      <p>
        <a href={value.url} target="_blank" rel="noopener noreferrer">
          {value.url}
        </a>
      </p>
    ) : null;
  }
  return (
    <figure className="not-prose my-6">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
        <iframe
          src={embed}
          title={value.caption ?? "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

function BeforeAfter({
  value,
}: {
  value: {
    layout?: "sideBySide" | "slider";
    before?: { alt?: string };
    after?: { alt?: string };
    beforeLabel?: string;
    afterLabel?: string;
    caption?: string;
  };
}) {
  const { before, after, caption } = value;
  if (!before || !after) return null;

  const beforeLabel = value.beforeLabel ?? "Before";
  const afterLabel = value.afterLabel ?? "After";

  if (value.layout === "slider") {
    return (
      <figure className="not-prose my-6">
        <BeforeAfterSlider
          beforeSrc={urlFor(before).width(1000).height(750).fit("crop").url()}
          afterSrc={urlFor(after).width(1000).height(750).fit("crop").url()}
          beforeAlt={before.alt ?? beforeLabel}
          afterAlt={after.alt ?? afterLabel}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
        />
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const panels = [
    { img: before, label: beforeLabel },
    { img: after, label: afterLabel },
  ];

  return (
    <figure className="not-prose my-6">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border">
        {panels.map(({ img, label }, i) => (
          <div
            key={i}
            className={cn(
              "relative aspect-[4/3]",
              i === 1 && "border-l border-border",
            )}
          >
            <Image
              src={urlFor(img).width(700).height(525).fit("crop").url()}
              alt={img.alt ?? label}
              fill
              sizes="(max-width: 640px) 50vw, 350px"
              className="object-cover"
            />
            <span className="absolute right-2 top-2 rounded bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Renderers shared by every PortableText field (blog posts and projects).
 * Page-specific blocks (e.g. the Pecko embed) are merged on top per page.
 */
export const baseComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="not-prose my-6">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? value.caption ?? ""}
          width={900}
          height={500}
          className="w-full rounded-lg"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: Callout,
    codeBlock: CodeBlock,
    videoEmbed: VideoEmbed,
    beforeAfter: BeforeAfter,
    divider: ({ value }: { value: { variant?: "line" | "dots" } }) =>
      value.variant === "dots" ? (
        <div
          className="my-10 text-center text-lg tracking-[0.6em] text-muted-foreground"
          aria-hidden="true"
        >
          · · ·
        </div>
      ) : (
        <hr className="my-10 border-border" />
      ),
  },
};
