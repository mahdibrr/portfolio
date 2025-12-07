"use client"

import React, { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  direction?: number
  speed?: number
}

/**
 * Optimized Marquee using pure CSS animations
 * Removed Framer Motion dependency
 * Performance: -50-100ms Script Evaluation, GPU accelerated
 */
export function Marquee({ children, direction = 1, speed = 20 }: MarqueeProps) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className="flex gap-8 py-4 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 1 ? 'normal' : 'reverse',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
