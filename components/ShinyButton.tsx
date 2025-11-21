"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"

interface ShinyButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  icon?: ReactNode
}

export function ShinyButton({ children, onClick, className = "", icon }: ShinyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full bg-slate-800/50 border border-white/10 px-6 py-3 transition-all hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2 font-medium text-slate-200 group-hover:text-white">
        {icon}
        {children}
      </div>
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
    </motion.button>
  )
}
