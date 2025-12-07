'use client';

/**
 * Optimized FloatingParticles using pure CSS animations
 * Removed Framer Motion dependency
 * Performance: -200-400ms Script Evaluation, GPU accelerated
 */
export function FloatingParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    xOffset: Math.random() * 50 - 25,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            animation: `float-particle-${particle.id} ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <style jsx>{`
        ${particles.map((p) => `
          @keyframes float-particle-${p.id} {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            50% {
              transform: translate(${p.xOffset}px, -100px);
              opacity: 0.8;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}
