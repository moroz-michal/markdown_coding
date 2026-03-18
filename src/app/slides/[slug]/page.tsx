import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSlideBySlug,
  getAdjacentSlides,
  slides,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { SlideNav } from "@/components/slides/SlideNav";
import { AlignLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return slides.map((slide) => ({ slug: slide.slug }));
}

export default async function SlidePage({ params }: PageProps) {
  const { slug } = await params;
  const slide = getSlideBySlug(slug);

  if (!slide) notFound();

  const { prev, next } = getAdjacentSlides(slug);
  const progress = (slide.step / slides.length) * 100;

  return (
    <>
      {/* Sidebar */}
      <aside className="w-[370px] shrink-0 flex flex-col border-r border-border bg-sidebar overflow-y-auto">
        {/* Top progress bar */}
        <div className="h-[3px] bg-border">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col flex-1 p-6">
          {/* Step indicator */}
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">
            Step {slide.step} of {slides.length}
          </p>

          {/* Chapter badge */}
          <Badge
            variant="secondary"
            className="w-fit mb-4 bg-primary/15 text-primary border-0 hover:bg-primary/20"
          >
            {slide.chapter}
          </Badge>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground leading-snug mb-3">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {slide.description}
          </p>

          {/* Goals */}
          {slide.goals.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">
                Goals
              </p>
              <ul className="space-y-2">
                {slide.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Table of contents link */}
          <div className="border-t border-border pt-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <AlignLeft className="w-4 h-4" />
              Table of Contents
            </Link>
          </div>

          {/* Navigation buttons */}
          <SlideNav
            prevSlug={prev?.slug ?? null}
            nextSlug={next?.slug ?? null}
          />

          {/* Keyboard hints */}
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">
              ←
            </kbd>
            <span>prev</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">
              →
            </kbd>
            <span>next</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">
              esc
            </kbd>
            <span>toc</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl px-12 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            {slide.title}
          </h1>

          {/* Markdown content */}
          <div className="prose prose-invert prose-sm max-w-none mb-8 text-foreground/90 leading-relaxed space-y-4">
            {slide.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-semibold text-foreground mt-8 mb-3"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("- ") || block.startsWith("1. ")) {
                const isOrdered = block.startsWith("1.");
                const items = block.split("\n").filter(Boolean);
                return isOrdered ? (
                  <ol key={i} className="space-y-3 list-none">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                          {j + 1}
                        </span>
                        <span
                          className="text-sm text-foreground/90"
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^\d+\.\s/, "")
                              .replace(
                                /\*\*(.+?)\*\*/g,
                                '<strong class="text-foreground">$1</strong>'
                              )
                              .replace(/—/g, '<span class="text-muted-foreground"> — </span>'),
                          }}
                        />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul key={i} className="space-y-3 list-none">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span
                          className="text-sm text-foreground/90"
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^-\s/, "")
                              .replace(
                                /\*\*(.+?)\*\*/g,
                                '<strong class="text-foreground">$1</strong>'
                              )
                              .replace(/—/g, '<span class="text-muted-foreground"> — </span>'),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-sm text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: block
                      .replace(
                        /\*\*(.+?)\*\*/g,
                        '<strong class="text-foreground">$1</strong>'
                      )
                      .replace(/—/g, '<span class="text-muted-foreground"> — </span>'),
                  }}
                />
              );
            })}
          </div>

          {/* Code snippets */}
          {slide.snippets.map((snippet) => (
            <div
              key={snippet.label}
              className="mb-6 rounded-lg border border-border overflow-hidden"
            >
              {/* Code block header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    {snippet.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  {snippet.lang}
                </span>
              </div>
              {/* Code */}
              <pre className="p-4 overflow-x-auto bg-[oklch(0.1_0_0)]">
                <code className="text-sm font-mono text-foreground/85 leading-relaxed">
                  {snippet.code}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
