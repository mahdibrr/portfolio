"use client"

import { useTextReveal } from "@/lib/micro-animations"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

/**
 * Optimized SplitText component using Web Animations API
 * Removed Framer Motion dependency
 * Performance: Part of -1000-1500ms Script Evaluation reduction
 */
export function SplitText({ children, className = "", delay = 0 }: SplitTextProps) {
  const ref = useTextReveal({
    duration: 800,
    delay: delay * 1000, // Convert to milliseconds
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    once: true,
  })

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        {children}
      </div>
    </div>
  )
}
