import { useSyncExternalStore } from "react";

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
): [T, (value: T | ((prev: T) => T)) => void] {
  // Function to retrieve data from the store
  const getStorageValue = (): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return deserialize(storedValue);
      } catch (error) {
        console.error(`Error deserializing value for key "${key}":`, error);
      }
    }
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  };

  // Function to subscribe to the store
  const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  };

  // Use useSyncExternalStore to synchronize with the store
  const value = useSyncExternalStore(subscribe, getStorageValue);

  // Function to set the value
  const setValue = (newValue: T | ((prev: T) => T)) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    localStorage.setItem(key, serialize(valueToStore));
    // Manually dispatch storage event
    window.dispatchEvent(new Event("storage"));
  };

  return [value, setValue];
}
