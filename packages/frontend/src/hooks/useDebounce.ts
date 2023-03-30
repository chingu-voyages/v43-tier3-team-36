import { useEffect, useState } from 'react';

/**
 * @description Takes a value and "debounces" it each time with a delay
 * until the value is not changed again
 * @param value - stateful value to be set
 * @param delay - interval time (ms) between "debounces"
 * @returns value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
export { useDebounce };
