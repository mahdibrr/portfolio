import { useEffect, useRef, useState } from 'react';

export const customEasings = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  sharp: [0.7, 0, 0.84, 0],
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const characterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
    },
  }),
};

// Custom Hooks

/**
 * Hook for tracking cursor position
 * Now uses centralized mouse tracker for better performance
 */
export const useCursorPosition = () => {
  const { useGlobalMouse } = require('@/lib/mouse-tracker');
  const mousePos = useGlobalMouse();
  return { x: mousePos.x, y: mousePos.y };
};

/**
 * Magnetic button effect using centralized mouse tracker
 * Performance improved by removing individual mousemove listener
 */
export const useMagneticButton = (ref: React.RefObject<HTMLElement>) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { useGlobalMouse } = require('@/lib/mouse-tracker');
  const mousePos = useGlobalMouse();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = 100;
    const x = mousePos.x - centerX;
    const y = mousePos.y - centerY;
    const magnitude = Math.sqrt(x * x + y * y);

    if (magnitude < distance) {
      const force = 1 - magnitude / distance;
      setOffset({
        x: (x / magnitude) * force * 20,
        y: (y / magnitude) * force * 20,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [ref, mousePos.x, mousePos.y]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return offset;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export const useParallax = (offset: number = 50) => {
  const ref = useRef<HTMLElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const yPos = rect.top - window.innerHeight / 2;
      setYOffset(yPos * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, yOffset };
};

/**
 * Card tilt effect using centralized mouse tracker
 * Performance improved by removing individual mousemove listener
 */
export const useCardTilt = (ref: React.RefObject<HTMLElement>) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { useGlobalMouse } = require('@/lib/mouse-tracker');
  const mousePos = useGlobalMouse();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = mousePos.x - centerX;
    const y = mousePos.y - centerY;

    const rotateX = (y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;

    setTilt({ x: rotateX, y: rotateY });
  }, [ref, mousePos.x, mousePos.y]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return tilt;
};

export const useRippleEffect = (ref: React.RefObject<HTMLElement>) => {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleIdRef.current++;

    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return { ripples, handleClick };
};

export const useScrollTrigger = (ref: React.RefObject<HTMLElement>, threshold = 0.5) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};
