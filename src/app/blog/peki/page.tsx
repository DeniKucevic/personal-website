import type { Metadata } from "next";
import { PeckoBuilder } from "@/components/peki";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PEKI — napravi svog chatbota",
  description:
    "Napravi svog keyword chatbota u stilu originalnog PECKO programa iz 1999. Sačuvaj, exportuj, podeli.",
};

export default function PeckoBuilderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-8">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2",
        )}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to blog
      </Link>

      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold tracking-tight">PEKI</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Napravi svog keyword chatbota. Dodaj pravila, prevuci za redosled,
          testiraj uživo. Isto kako je radio originalni PECKO iz 1999, lista
          ključnih reči, prva koja pogodi daje odgovor.
        </p>
      </div>

      <PeckoBuilder />

      <p className="text-xs text-muted-foreground border-t pt-4">
        Inspirisano originalnim PECKO 1.2F (PowerBASIC, ~1999) Predrag
        Damnjanovic (Peca).
      </p>
    </div>
  );
}
