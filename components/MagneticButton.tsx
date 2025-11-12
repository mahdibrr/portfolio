'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticButton, useRippleEffect, usePrefersReducedMotion } from '@/lib/animation-utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const offset = useMagneticButton(buttonRef);
  const { ripples, handleClick } = useRippleEffect(buttonRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 px-8 py-3 rounded-lg';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white',
    secondary: 'border-2 border-cyan-400 hover:bg-cyan-400/10 text-white',
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(e);
    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleButtonClick}
      disabled={disabled}
      animate={
        prefersReducedMotion
          ? {}
          : {
              x: offset.x,
              y: offset.y,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/30"
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
          }}
          animate={{
            width: 300,
            height: 300,
            x: ripple.x - 150,
            y: ripple.y - 150,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
}
