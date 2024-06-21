// hooks/useLocalStorage.ts

import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (isClient) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error('Error retrieving value from local storage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving value to local storage:', error);
    }
  };

  return [storedValue, setValue];
};
