"use client"

import React, { useState, useEffect } from "react"
import { motion, useSpring } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface SpotlightProps {
  className?: string
}

export function Spotlight({ className = "" }: SpotlightProps) {
  const mousePosition = useMousePosition()
  const mouseX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 })
  const mouseY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      style={{
        background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  )
}
