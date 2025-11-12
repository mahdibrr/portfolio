'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCardTilt, usePrefersReducedMotion } from '@/lib/animation-utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableGlow?: boolean;
  glowColor?: string;
}

export function GlassmorphicCard({
  children,
  className = '',
  enableTilt = true,
  enableGlow = true,
  glowColor = 'from-cyan-400 to-blue-400',
}: GlassmorphicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useCardTilt(cardRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/40 ${className}`}
      animate={
        prefersReducedMotion || !enableTilt
          ? {}
          : {
              rotateX: tilt.x,
              rotateY: tilt.y,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d' as const,
        perspective: 1000,
      }}
    >
      {enableGlow && (
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}
        />
      )}
      {children}
    </motion.div>
  );
}
