import { useEffect, useRef, useState } from 'react';

export function useProgress(start: boolean, onEnd?: () => void) {
  const timerRef = useRef<number>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  progressRef.current = progress;

  useEffect(() => {
    if (!start) return;
    timerRef.current = setInterval(() => {
      if (progressRef.current === 100) {
        clearInterval(timerRef.current);
        onEnd?.();
      } else {
        setProgress(prev => Math.min(prev + 1, 100));
      }
    }, 100);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [start, onEnd]);

  return progress;
}
