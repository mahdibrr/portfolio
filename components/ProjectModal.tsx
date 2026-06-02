"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import { ProjectCarousel } from "@/components/ProjectCarousel"

type ProjectMedia =
  | { type: "gallery"; images: string[]; video?: { src: string; poster: string } }
  | { type: "mockup"; domain: string; note?: string }

export interface ModalProject {
  title: string
  description: string
  status: "live" | "dev"
  tech: string[]
  links: { live?: string; github?: string }
  media: ProjectMedia
  icon: React.ComponentType<{ size?: number; className?: string }>
}

interface ProjectModalProps {
  project: ModalProject | null
  onClose: () => void
  labels: { live: string; dev: string; visit: string; code: string }
}

export function ProjectModal({ project, onClose, labels }: ProjectModalProps) {
  // Lock scroll + close on Escape while open
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#101018] shadow-2xl"
          >
            <button
              onClick={onClose}
              className="sticky top-4 left-full -ml-12 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8 -mt-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-400/10 border border-white/10 flex items-center justify-center text-indigo-300">
                  <project.icon size={22} />
                </div>
                <StatusPill status={project.status} live={labels.live} dev={labels.dev} />
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">{project.title}</h3>
              <p className="mt-3 text-white/65 leading-relaxed">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm font-mono text-white/65">
                    {tech}
                  </span>
                ))}
              </div>

              {(project.links.live || project.links.github) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-400"
                    >
                      {labels.visit}
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                    >
                      <Github size={16} />
                      {labels.code}
                    </a>
                  )}
                </div>
              )}

              <div className="mt-7">
                {project.media.type === "gallery" && (
                  <div className="space-y-5">
                    <ProjectCarousel images={project.media.images} projectName={project.title} />
                    {project.media.video && (
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black">
                        <video
                          controls
                          className="w-full h-auto"
                          poster={project.media.video.poster}
                          playsInline
                          aria-label={`${project.title} demo video`}
                        >
                          <source src={project.media.video.src} type="video/mp4" />
                          <track kind="captions" label="captions" />
                        </video>
                      </div>
                    )}
                  </div>
                )}

                {project.media.type === "mockup" && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl overflow-hidden border border-white/10 group/mock"
                  >
                    <div className="bg-[#15151e] px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      </div>
                      <span className="flex-1 text-center text-xs font-mono text-white/60">{project.media.domain}</span>
                      <ExternalLink size={13} className="text-white/55 group-hover/mock:text-indigo-400 transition-colors" />
                    </div>
                    <div className="h-56 bg-gradient-to-br from-indigo-900/20 to-[#0a0a0f] flex flex-col items-center justify-center gap-3">
                      <project.icon size={40} className="text-indigo-400/50" />
                      <div className="text-center">
                        <p className="text-white font-medium">{project.media.domain}</p>
                        {project.media.note && <p className="text-xs text-white/60 mt-1">{project.media.note}</p>}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StatusPill({ status, live, dev }: { status: "live" | "dev"; live: string; dev: string }) {
  const isLive = status === "live"
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
        isLive ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-teal-400" : "bg-amber-400"}`} />
      {isLive ? live : dev}
    </span>
  )
}
