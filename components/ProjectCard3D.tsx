"use client"

import React, { useRef } from "react"
import { motion, useSpring } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCard3DProps {
  title: string
  description: string
  tags: string[]
  githubLink?: string
  liveLink?: string
  image?: string
  icon?: React.ReactNode
  accentColor?: string
}

export function ProjectCard3D({
  title,
  description,
  tags,
  githubLink,
  liveLink,
  icon,
  accentColor = "from-cyan-500 to-blue-600",
}: ProjectCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct * 10)
    y.set(yPct * -10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: y,
        rotateY: x,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full rounded-3xl bg-slate-900 border border-white/10 p-1"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10`}
      />

      <div className="relative h-full overflow-hidden rounded-[22px] bg-slate-900/95 backdrop-blur-xl">
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {icon && (
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${accentColor} flex items-center justify-center shadow-lg`}>
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {title}
                </h3>
              </div>
            </div>
            <div className="flex gap-2">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors hover:scale-110"
                >
                  <Github size={18} />
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors hover:scale-110"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
