import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { chapters } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="px-8 pt-16 pb-12 border-b border-border">
        <div className="max-w-3xl mx-auto relative">
          <a
            href="https://github.com/moroz-michal/markdown_coding"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View on GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
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
