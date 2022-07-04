import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
        // getting value from local storage
    const jsonValue = localStorage.getItem(key);
        // checking if value is existing in local storage, then return it
    if (jsonValue != null) return JSON.parse(jsonValue);

        // if value is not existing, return default value
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  // updating local storage whenever key or value change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}

