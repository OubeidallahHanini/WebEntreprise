import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type SetValue<T> = T | ((val: T) => T);

function useCookies<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from cookies by key
      const cookie = Cookies.get(key);
      // Parse stored json or if none return initialValue
      return cookie ? JSON.parse(cookie) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect to update cookies when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = typeof storedValue === 'function' ? (storedValue as (val: T) => T)(storedValue) : storedValue;
      // Save state
      Cookies.set(key, JSON.stringify(valueToStore), { expires: 7 });
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useCookies;