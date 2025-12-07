"use client"

import { useEffect, useRef, useState } from 'react'

interface SpotlightProps {
  className?: string
}

/**
 * Optimized Spotlight component using CSS Custom Properties
 * Removed Framer Motion dependency for -300-500ms Script Evaluation
 * Uses RAF-throttled mousemove at 30fps (sufficient for spotlight effect)
 */
export function Spotlight({ className = "" }: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsHovered(true)

    let rafId: number | null = null
    let lastUpdate = 0
    const throttleMs = 32 // ~30fps (sufficient for spotlight effect)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) return
      lastUpdate = now

      if (rafId !== null) return

      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty('--mouse-x', `${e.clientX}px`)
          spotlightRef.current.style.setProperty('--mouse-y', `${e.clientY}px`)
        }
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 78, 216, 0.15), transparent 80%)',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    />
  )
}
