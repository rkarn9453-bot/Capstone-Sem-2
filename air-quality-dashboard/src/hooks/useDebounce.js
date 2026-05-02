import { useState, useEffect } from "react";

// Debounce hook — delays updating value until user stops typing
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // Cleanup on change
  }, [value, delay]);

  return debounced;
}