'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ProjectCarouselProps {
  images: string[]
  projectName: string
}

export function ProjectCarousel({ images, projectName }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group/carousel rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative bg-slate-900">
              <Image
                src={src}
                alt={`${projectName} screenshot ${index + 1}`}
                width={1920}
                height={1080}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient Overlay for text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Glassmorphism) */}
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 -translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-white/20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-white/20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
