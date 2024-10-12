import { useState, useEffect } from "react";

/**
 * A custom React hook that tracks the current mouse position.
 *
 * @returns An object containing the current x and y coordinates of the mouse.
 *
 * @example
 * function MouseTracker() {
 *   const { x, y } = useMousePosition();
 *   return <div>Mouse position: ({x}, {y})</div>;
 * }
 *
 * This hook is useful for:
 * - Creating custom cursor effects
 * - Implementing drag and drop functionality
 * - Building interactive data visualizations
 * - Enhancing user interface responsiveness
 */

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
