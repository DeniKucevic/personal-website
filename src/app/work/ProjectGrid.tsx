import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

export function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/work/${project.slug.current}`}
            className="group h-full"
          >
            <Card className="h-full flex flex-col border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              {project.coverImage && (
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    src={urlFor(project.coverImage)
                      .width(600)
                      .height(320)
                      .fit("crop")
                      .url()}
                    alt={project.coverImage.alt ?? project.title}
                    width={600}
                    height={320}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium leading-snug transition-colors group-hover:text-primary">
                    {project.title}
                  </h2>
                  {project.status === "wip" && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      WIP
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="gap-1.5 flex-wrap mt-auto min-h-[5rem] items-start content-start">
                {project.tech?.slice(0, 5).map((t: string) => (
                  <Badge key={t} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No projects yet.
        </p>
      )}
    </>
  );
}
