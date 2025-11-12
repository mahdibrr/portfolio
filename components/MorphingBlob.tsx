'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/animation-utils';

interface MorphingBlobProps {
  className?: string;
  duration?: number;
  colors?: string[];
}

export function MorphingBlob({
  className = '',
  duration = 8,
  colors = ['#3b82f6', '#06b6d4', '#10b981'],
}: MorphingBlobProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const blobVariants = {
    animate: {
      borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 30% 70% 70% / 70% 30% 30% 70%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
      scale: [1, 1.05, 1.1, 1],
      x: [0, 20, -20, 0],
      y: [0, -20, 20, 0],
    },
  };

  return (
    <motion.div
      className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
      variants={blobVariants}
      animate={prefersReducedMotion ? 'initial' : 'animate'}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
      }}
    />
  );
}
