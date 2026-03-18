"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function SlideNav({ prevSlug, nextSlug }: SlideNavProps) {
  return (
    <div className="flex gap-2">
      {prevSlug ? (
        <Link
          href={`/slides/${prevSlug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex-1"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex-1 opacity-50 pointer-events-none"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </span>
      )}
      {nextSlug ? (
        <Link
          href={`/slides/${nextSlug}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "flex-1"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "flex-1 opacity-50 pointer-events-none"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </div>
  );
}
