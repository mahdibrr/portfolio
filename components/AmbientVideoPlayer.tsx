'use client'

import React from 'react'

interface AmbientVideoPlayerProps {
  src: string
  poster?: string
}

export function AmbientVideoPlayer({ src, poster }: AmbientVideoPlayerProps) {
  return (
    <div className="relative group">
      {/* Ambient Glow behind video */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
        <video controls className="w-full h-auto object-cover" poster={poster} playsInline>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Overlay (Optional - disappears on play) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>
    </div>
  )
}
