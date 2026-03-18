import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { chapters } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="px-8 pt-16 pb-12 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="text-primary">Markdown</span>
            <span className="text-foreground"> Coding</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            An interactive step-by-step presentation: how to build applications
            with CLAUDE using markdown files.
          </p>
        </div>
      </div>

      {/* Chapter list */}
      <div className="max-w-3xl mx-auto px-8 py-12 space-y-10">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.title}>
            {/* Chapter heading */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                {chapterIndex + 1}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {chapter.title}
              </h2>
            </div>

            {/* Slides in chapter */}
            <div className="ml-12 space-y-2">
              {chapter.slides.map((slide, slideIndex) => {
                const isFirst =
                  chapterIndex === 0 && slideIndex === 0;
                return (
                  <Link
                    key={slide.slug}
                    href={`/slides/${slide.slug}`}
                    className={`group flex items-center gap-4 px-4 py-3 rounded-lg border transition-colors ${
                      isFirst
                        ? "bg-primary border-transparent hover:bg-primary/90"
                        : "border-transparent hover:bg-secondary hover:border-border"
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 shrink-0 ${
                        isFirst
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-sm ${
                          isFirst
                            ? "text-primary-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {slide.title}
                      </p>
                      <p className={`text-xs mt-0.5 truncate ${isFirst ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {slide.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        isFirst
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
