import { useSyncExternalStore } from "react";

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

const createMousePositionStore = () => {
  let listeners: (() => void)[] = [];
  let currentPosition: MousePosition = { x: 0, y: 0 };

  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const handleMouseMove = (event: MouseEvent) => {
    currentPosition = { x: event.clientX, y: event.clientY };
    emitChange();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
  }

  return {
    subscribe,
    getSnapshot: () => currentPosition,
  };
};

const mousePositionStore = createMousePositionStore();

function useMousePosition(): MousePosition {
  const mousePosition = useSyncExternalStore(
    mousePositionStore.subscribe,
    mousePositionStore.getSnapshot
  );

  return mousePosition;
}

export default useMousePosition;
