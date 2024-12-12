import { useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (func: (args?:unknown)=> unknown ) => void;
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */

export function useDebounce<Func extends SomeFunction>(
  delay = 1500
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((func) => {
    const newTimer = setTimeout(() => {
      func();
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}