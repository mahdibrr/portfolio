'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className = '' }: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center', '0% center'],
      }}
      transition={{
        duration: 5,
        ease: 'linear',
        repeat: Infinity,
      }}
      style={{
        backgroundImage: 'linear-gradient(90deg, #60a5fa, #22d3ee, #34d399, #60a5fa)',
      }}
    >
      {children}
    </motion.span>
  );
}
