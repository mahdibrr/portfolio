'use client';

import { useSlideIn } from '@/lib/micro-animations';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * Optimized FadeIn component using Web Animations API
 * Removed Framer Motion dependency
 * Performance: Part of -1000-1500ms Script Evaluation reduction
 */
export function FadeIn({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) {
  const ref = useSlideIn(direction, {
    duration: 700,
    delay: delay * 1000, // Convert to milliseconds
    easing: 'cubic-bezier(0.21, 0.47, 0.32, 0.98)',
    once: true,
  })

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
