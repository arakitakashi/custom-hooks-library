import React, { useState, useRef, useEffect } from "react";

/**
 * A custom hook that manages state in local storage.
 *
 * Use cases:
 * - Persisting user preferences across sessions
 * - Maintaining form data between page reloads
 * - Caching API responses locally
 * - Implementing a "remember me" feature for login
 *
 * @param key - The key to use for storing in localStorage
 * @param defaultValue - The initial value if no stored value is found
 * @param options - Optional serialization and deserialization functions
 * @returns A stateful value and a function to update it
 */
function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  } = {}
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  const prevKeyRef = useRef<string>(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
