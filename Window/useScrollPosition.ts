import { useSyncExternalStore } from "react";

/**
 * A custom hook that returns the current vertical scroll position of the window.
 *
 * This hook uses `useSyncExternalStore` to efficiently track the scroll position
 * and update the component when it changes.
 *
 * @returns {number} The current vertical scroll position in pixels.
 *
 * @example
 * function ScrollIndicator() {
 *   const scrollY = useScrollPosition();
 *   return <div>Current scroll position: {scrollY}px</div>;
 * }
 */
function useScrollPosition() {
  const scrollPosition = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return scrollPosition;
}

// Subscribe to scroll events
function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback);
  return () => window.removeEventListener("scroll", callback);
}

// Get the current scroll position
function getSnapshot() {
  return window.pageYOffset;
}

// Return a default value for server-side rendering
function getServerSnapshot() {
  return 0;
}

export default useScrollPosition;
