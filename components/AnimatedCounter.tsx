'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useScrollTrigger, usePrefersReducedMotion } from '@/lib/animation-utils';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(ref, 0.5);
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionValue = useMotionValue(prefersReducedMotion ? to : from);
  const displayValue = useTransform(motionValue, (value) =>
    Math.floor(value).toString()
  );

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      motionValue.set(to);
      return;
    }

    const timer = setTimeout(() => {
      animate(motionValue, to, {
        duration: duration,
        ease: 'easeOut',
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, to, duration, delay, motionValue, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      <motion.span>{prefix}</motion.span>
      <motion.span>{displayValue}</motion.span>
      <motion.span>{suffix}</motion.span>
    </div>
  );
}
