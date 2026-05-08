"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function SharePost({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (platform: "twitter" | "linkedin") => {
    const url = window.location.href;
    const href =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground">Share</span>
      <Button variant="outline" size="sm" onClick={copy}>
        {copied ? (
          <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 mr-1.5" />
        )}
        {copied ? "Copied!" : "Copy link"}
      </Button>
      <Button variant="outline" size="sm" onClick={() => openShare("twitter")}>
        X / Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={() => openShare("linkedin")}>
        LinkedIn
      </Button>
    </div>
  );
}
