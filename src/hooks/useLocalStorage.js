import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    // getting value from local storage
    const jsonValue = localStorage.getItem(key);
    // checking if value is existing in local storage, then return it
    if (jsonValue != null) return JSON.parse(jsonValue);

    // if value is not existing, return default value
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  // updating local storage whenever key or value change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
