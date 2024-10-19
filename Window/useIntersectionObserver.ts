import { RefObject, useEffect, useState } from "react";

/**
 * A custom hook that observes the intersection of a target element with an ancestor element or the viewport.
 *
 * @param ref - A React ref object pointing to the target element to observe.
 * @param options - Optional IntersectionObserver options.
 * @returns A boolean indicating whether the target element is currently intersecting.
 *
 * @example
 * const MyComponent = () => {
 *   const ref = useRef(null);
 *   const isVisible = useIntersectionObserver(ref);
 *
 *   return (
 *     <div ref={ref}>
 *       {isVisible ? 'Element is visible' : 'Element is not visible'}
 *     </div>
 *   );
 * };
 */
function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

export default useIntersectionObserver;
