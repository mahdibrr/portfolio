import { useGlobalMouse } from "@/lib/mouse-tracker"

/**
 * Hook for tracking mouse position
 * Now uses centralized mouse tracker for better performance
 */
export function useMousePosition() {
  const mousePos = useGlobalMouse()
  return { x: mousePos.x, y: mousePos.y }
}
