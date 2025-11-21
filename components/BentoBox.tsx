"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"

interface BentoBoxProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BentoBox({ children, className = "", delay = 0 }: BentoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-white/20 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  )
}
