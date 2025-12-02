import { useState, type Dispatch, type SetStateAction } from 'react';

export function useLocalStorageStatus<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageState = (value: T | ((prevState: T) => T)) => {
    setState(prevState => {
      const newState =
        typeof value === 'function'
          ? (value as (prevState: T) => T)(prevState)
          : value;

      localStorage.setItem(key, JSON.stringify(newState));

      return newState;
    });
  };

  return [state, setLocalStorageState];
}
