import { notFound } from "next/navigation";
import { getSlideBySlug, getAdjacentSlides, slides } from "@/lib/mock-data";
import { SlideView } from "@/components/slides/SlideView";

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

  return (
    <SlideView
      slide={slide}
      prevSlug={prev?.slug ?? null}
      nextSlug={next?.slug ?? null}
      totalSteps={slides.length}
    />
  );
}
