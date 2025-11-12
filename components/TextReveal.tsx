'use client';

import { motion } from 'framer-motion';
import { characterVariants, usePrefersReducedMotion } from '@/lib/animation-utils';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  variant?: 'character' | 'word' | 'line';
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  variant = 'character',
}: TextRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const getElements = () => {
    if (variant === 'character') {
      return children.split('');
    }
    if (variant === 'word') {
      return children.split(' ');
    }
    return [children];
  };

  const elements = getElements();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {elements.map((element, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={characterVariants}
          className={variant === 'character' ? 'inline-block' : ''}
        >
          {element}
          {variant === 'word' && i < elements.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </motion.div>
  );
}
