'use client';

import { motion } from 'framer-motion';
import { useScrollTrigger, usePrefersReducedMotion } from '@/lib/animation-utils';
import { useRef } from 'react';

interface AnimatedSkillBarProps {
  label: string;
  percentage: number;
  color?: string;
  delay?: number;
}

export function AnimatedSkillBar({
  label,
  percentage,
  color = 'from-cyan-400 to-blue-400',
  delay = 0,
}: AnimatedSkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(ref, 0.5);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-300">{label}</label>
        <motion.span
          className="text-xs font-bold text-cyan-400"
          animate={
            prefersReducedMotion || !isVisible
              ? { opacity: 0.5 }
              : { opacity: 1 }
          }
          transition={{ duration: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full shadow-lg`}
          initial={{ width: 0 }}
          animate={
            isVisible && !prefersReducedMotion
              ? { width: `${percentage}%` }
              : { width: 0 }
          }
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      </div>
    </div>
  );
}
