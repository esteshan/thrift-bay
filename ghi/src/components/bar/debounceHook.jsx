import { useEffect, useRef } from "react";

function useDebounce(value, timeout, callback) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    clearTimer();

    if (value) {
      timerRef.current = setTimeout(() => {
        callbackRef.current(value);
      }, timeout);
    }

    // Cleanup
    return () => {
      clearTimer();
    };
  }, [value, timeout]);
}

export default useDebounce;
