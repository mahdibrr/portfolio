"use client"

import React from "react"
import { motion } from "framer-motion"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export function SplitText({ children, className = "", delay = 0 }: SplitTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
