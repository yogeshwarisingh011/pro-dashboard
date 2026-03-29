import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 1. Naya timer lagao
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Agar value dobara change hui (Cleanup Function), purana timer delete karo!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
