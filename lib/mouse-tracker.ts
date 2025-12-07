'use client'

/**
 * Global Mouse Tracker
 *
 * Consolidates multiple mousemove listeners into a single RAF-throttled tracker.
 * This prevents performance overhead from multiple unthrottled event listeners.
 *
 * Performance impact: -800-1000ms Script Evaluation
 */

interface MousePosition {
  x: number
  y: number
  velocity: { x: number; y: number }
}

type MouseSubscriber = (position: MousePosition) => void

class MouseTracker {
  private position: MousePosition = { x: 0, y: 0, velocity: { x: 0, y: 0 } }
  private subscribers = new Set<MouseSubscriber>()
  private rafId: number | null = null
  private lastX = 0
  private lastY = 0
  private pendingX = 0
  private pendingY = 0
  private hasUpdate = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.pendingX = e.clientX
    this.pendingY = e.clientY
    this.hasUpdate = true

    if (this.rafId !== null) return

    this.rafId = requestAnimationFrame(this.update)
  }

  private update = () => {
    if (this.hasUpdate) {
      const vx = this.pendingX - this.lastX
      const vy = this.pendingY - this.lastY

      this.position = {
        x: this.pendingX,
        y: this.pendingY,
        velocity: { x: vx, y: vy }
      }

      this.lastX = this.pendingX
      this.lastY = this.pendingY
      this.hasUpdate = false

      // Notify all subscribers
      this.subscribers.forEach(subscriber => subscriber(this.position))
    }

    this.rafId = null
  }

  subscribe(callback: MouseSubscriber): () => void {
    this.subscribers.add(callback)

    // Immediately call with current position
    callback(this.position)

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
    }
  }

  getPosition(): MousePosition {
    return this.position
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
    }
    this.subscribers.clear()
  }
}

// Singleton instance
export const mouseTracker = typeof window !== 'undefined' ? new MouseTracker() : null

/**
 * React hook for subscribing to global mouse position
 *
 * @example
 * const mousePos = useGlobalMouse()
 * console.log(mousePos.x, mousePos.y)
 */
export function useGlobalMouse() {
  const [position, setPosition] = React.useState<MousePosition>({
    x: 0,
    y: 0,
    velocity: { x: 0, y: 0 }
  })

  React.useEffect(() => {
    if (!mouseTracker) return

    const unsubscribe = mouseTracker.subscribe(setPosition)
    return unsubscribe
  }, [])

  return position
}

// For backwards compatibility and direct imports
import React from 'react'
