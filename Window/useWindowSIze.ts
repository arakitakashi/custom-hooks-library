import { useSyncExternalStore } from "react";

/**
 * A custom React hook that tracks the current window size.
 *
 * @returns An object containing the current width and height of the window.
 *
 * @example
 * function ResponsiveComponent() {
 *   const { width, height } = useWindowSize();
 *   return <div>Window size: {width} x {height}</div>;
 * }
 *
 * This hook is useful for:
 * - Creating responsive layouts
 * - Adjusting component behavior based on screen size
 * - Optimizing performance for different device sizes
 * - Implementing adaptive designs
 */

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): WindowSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function getServerSnapshot(): WindowSize {
  return {
    width: 0,
    height: 0,
  };
}
