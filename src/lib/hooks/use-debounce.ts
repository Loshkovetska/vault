import { useEffect, useRef, useState } from 'react';

export function useDebounce(value: string, timeout: number) {
  const ref = useRef<number | null>(null);
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    if (!value.length) {
      setDebouncedValue(value);
      return;
    }
    ref.current = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(ref.current);
    };
  }, [timeout, value]);

  return debouncedValue;
}
