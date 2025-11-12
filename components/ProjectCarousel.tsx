'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ProjectCarouselProps {
  images: string[];
  projectName: string;
}

export function ProjectCarousel({ images, projectName }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="relative w-full group/carousel">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl border-2 border-slate-700/50 shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
                <Image
                  src={image}
                  alt={`${projectName} screenshot ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900/90 to-slate-800/90 hover:from-cyan-600/90 hover:to-blue-600/90 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-md shadow-lg opacity-0 group-hover/carousel:opacity-100 border border-slate-700/50 hover:border-cyan-400/50"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900/90 to-slate-800/90 hover:from-cyan-600/90 hover:to-blue-600/90 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-md shadow-lg opacity-0 group-hover/carousel:opacity-100 border border-slate-700/50 hover:border-cyan-400/50"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-gradient-to-r from-cyan-400 to-blue-400 w-12 shadow-lg shadow-cyan-400/50'
                : 'bg-slate-600 w-2 hover:bg-slate-500 hover:w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-3 text-sm font-semibold text-slate-400">
        <span className="text-cyan-400">{selectedIndex + 1}</span> / {images.length}
      </div>
    </div>
  );
}
