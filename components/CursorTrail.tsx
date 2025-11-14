'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/animation-utils';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const idRef = useRef(0);
  const lastTimeRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#3b82f6', '#06b6d4', '#10b981'];

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle to ~60fps
      const now = Date.now();
      if (now - lastTimeRef.current < 16) return;
      lastTimeRef.current = now;

      pointsRef.current.push({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });

      if (pointsRef.current.length > 30) {
        pointsRef.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current.forEach((point, index) => {
        point.age += 1;
        const opacity = Math.max(0, 1 - point.age / 30);
        const size = 2 + (point.age / 30) * 3;

        const colorIndex = index % colors.length;
        const color = colors[colorIndex];

        ctx.fillStyle = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      pointsRef.current = pointsRef.current.filter((p) => p.age < 30);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ opacity: prefersReducedMotion ? 0 : 1 }}
    />
  );
}
