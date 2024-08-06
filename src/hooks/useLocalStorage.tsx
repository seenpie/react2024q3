import { useCallback, useState } from "react";

const key = "term";

const getFromLocalStorage = (key: string): string => {
  if (typeof window === "undefined") {
    return "";
  }
  const value = localStorage.getItem(key);
  return value ? value : "";
};

export function useLocalStorage() {
  const [value, setValue] = useState(() => getFromLocalStorage(key));

  const updateLsValue = useCallback((value: string) => {
    setValue(value);
    localStorage.setItem(key, value);
  }, []);

  return { lsValue: value, updateLsValue } as const;
}
