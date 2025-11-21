"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"

interface MarqueeProps {
  children: ReactNode
  direction?: number
  speed?: number
}

export function Marquee({ children, direction = 1, speed = 20 }: MarqueeProps) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-8 py-4"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
