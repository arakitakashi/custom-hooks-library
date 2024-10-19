import { useSyncExternalStore } from "react";

/**
 * A custom React hook that listens to a media query and returns whether it matches.
 *
 * This hook uses the `useSyncExternalStore` API to efficiently subscribe to media query changes.
 *
 * @param query - A string representing the media query to evaluate.
 * @returns A boolean indicating whether the media query matches.
 *
 * @example
 * function MyComponent() {
 *   const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 *
 *   return (
 *     <div>
 *       {isLargeScreen ? 'Large screen' : 'Small screen'}
 *     </div>
 *   );
 * }
 */

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => window.matchMedia(query).matches;

  const subscribe = (callback: () => void) => {
    const matchQueryList = window.matchMedia(query);
    matchQueryList.addEventListener("change", callback);
    return () => matchQueryList.removeEventListener("change", callback);
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}
