'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  AlignLeft,
  PanelLeftClose,
  PanelLeft,
  Menu,
} from 'lucide-react'
import { Slide } from '@/types/slides'

interface SlideViewProps {
  slide: Slide
  prevSlug: string | null
  nextSlug: string | null
  totalSteps: number
}

export function SlideView({
  slide,
  prevSlug,
  nextSlug,
  totalSteps,
}: SlideViewProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const progress = (slide.step / totalSteps) * 100
  const [displayProgress, setDisplayProgress] = useState(() =>
    typeof window !== 'undefined'
      ? parseFloat(sessionStorage.getItem('slideProgress') ?? '0')
      : 0
  )

  // Animate progress bar from previous value to current on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisplayProgress(progress))
    })
    return () => cancelAnimationFrame(id)
  }, [progress])

  // Fade content out then navigate
  const navigate = useCallback(
    (slug: string) => {
      sessionStorage.setItem('slideProgress', String(progress))
      setFadeOut(true)
      setTimeout(() => router.push(`/slides/${slug}`), 400)
    },
    [router, progress]
  )

  const navigatePrev = useCallback(() => {
    if (prevSlug) navigate(prevSlug)
  }, [prevSlug, navigate])

  const navigateNext = useCallback(() => {
    if (nextSlug) navigate(nextSlug)
  }, [nextSlug, navigate])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      )
        return

      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev()
          break
        case 'ArrowRight':
          navigateNext()
          break
        case 'Escape':
          router.push('/')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigatePrev, navigateNext, router])

  const sidebarInner = (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Progress bar */}
      <div className="h-[3px] bg-border shrink-0">
        <div
          className="h-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Top row: step + collapse button */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            Step {slide.step} of {totalSteps}
          </p>
          {/* Close sidebar button (desktop only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
          {/* Close sheet button (mobile only) */}
          <button
            onClick={() => setMobileSheetOpen(false)}
            className="flex md:hidden items-center justify-center w-7 h-7 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

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

        {/* Table of Contents link */}
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
        <div className="flex gap-2">
          <button
            onClick={navigatePrev}
            disabled={!prevSlug}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex-1 disabled:opacity-40'
            )}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </button>
          <button
            onClick={navigateNext}
            disabled={!nextSlug}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'flex-1 disabled:opacity-40'
            )}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

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
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background w-full">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex shrink-0 flex-col border-r border-border bg-sidebar overflow-hidden transition-[width] duration-300 ease-in-out',
          sidebarOpen ? 'w-[370px]' : 'w-0'
        )}
      >
        <div
          className={cn(
            'min-w-[370px] h-full transition-[opacity,transform] duration-300 ease-in-out',
            sidebarOpen
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-6'
          )}
        >
          {sidebarInner}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (desktop: show open-sidebar button when closed; mobile: always show hamburger) */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
          {/* Desktop: reopen sidebar button (only when closed) */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Open sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}

          {/* Mobile: hamburger opens Sheet */}
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetTrigger
              className="flex md:hidden items-center justify-center w-7 h-7 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-[370px] bg-sidebar border-r border-border"
            >
              {sidebarInner}
            </SheetContent>
          </Sheet>

          {/* Step indicator in top bar */}
          <span className="text-xs text-muted-foreground">
            Step {slide.step} of {totalSteps}
          </span>

          {/* Mobile nav buttons */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              onClick={navigatePrev}
              disabled={!prevSlug}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'disabled:opacity-40'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={navigateNext}
              disabled={!nextSlug}
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'disabled:opacity-40'
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <motion.div
          className="flex-1 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={
            fadeOut
              ? { opacity: 0, y: -12 }
              : { opacity: 1, y: 0 }
          }
          transition={
            fadeOut
              ? { duration: 0.35, ease: [0.4, 0, 1, 1] }
              : { duration: 0.45, ease: [0, 0, 0.2, 1] }
          }
        >
          <div className="max-w-3xl px-8 md:px-12 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {slide.title}
            </h1>

            {/* Rendered content */}
            <div className="space-y-4 mb-8">
              {slide.content.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2
                      key={i}
                      className="text-xl font-semibold text-foreground mt-8 mb-3"
                    >
                      {block.replace('## ', '')}
                    </h2>
                  )
                }
                if (block.startsWith('- ') || block.startsWith('1. ')) {
                  const isOrdered = block.startsWith('1.')
                  const items = block.split('\n').filter(Boolean)
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
                                .replace(/^\d+\.\s/, '')
                                .replace(
                                  /\*\*(.+?)\*\*/g,
                                  '<strong class="text-foreground">$1</strong>'
                                )
                                .replace(
                                  /—/g,
                                  '<span class="text-muted-foreground"> — </span>'
                                ),
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
                                .replace(/^-\s/, '')
                                .replace(
                                  /\*\*(.+?)\*\*/g,
                                  '<strong class="text-foreground">$1</strong>'
                                )
                                .replace(
                                  /—/g,
                                  '<span class="text-muted-foreground"> — </span>'
                                ),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  )
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
                        .replace(
                          /—/g,
                          '<span class="text-muted-foreground"> — </span>'
                        ),
                    }}
                  />
                )
              })}
            </div>

            {/* Code snippets */}
            {slide.snippets.map((snippet) => (
              <div
                key={snippet.label}
                className="mb-6 rounded-lg border border-border overflow-hidden"
              >
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
                <pre className="p-4 overflow-x-auto bg-[oklch(0.1_0_0)]">
                  <code className="text-sm font-mono text-foreground/85 leading-relaxed">
                    {snippet.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
