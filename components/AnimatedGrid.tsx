'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/animation-utils';

interface AnimatedGridProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export function AnimatedGrid({
  className = '',
  opacity = 0.1,
  color = 'rgb(59, 130, 246)',
}: AnimatedGridProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="animated-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#animated-grid)" />
      </svg>

      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              ${color} 2px,
              ${color} 4px
            )`,
            backgroundSize: '40px 40px',
            opacity: opacity * 0.3,
          }}
        />
      )}
    </div>
  );
}
