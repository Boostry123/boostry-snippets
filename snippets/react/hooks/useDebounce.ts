import { useEffect, useState } from "react";

/**
 *
 * @param value
 * @param delay in ms
 * @returns new value of same type after delay
 */
export function useDebounce<T>(value: T, delay = 550) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const callChange = setTimeout(() => setCurrentValue(value), delay);
    return () => clearTimeout(callChange);
  }, [value, delay]);

  return currentValue;
}
