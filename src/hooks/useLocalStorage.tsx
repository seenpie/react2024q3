import { useCallback, useEffect, useRef, useState } from "react";

const key = "term";

const getFromLocalStorage = (key: string): string => {
  const value = localStorage.getItem(key);
  return value ? value : "";
};

export function useLocalStorage() {
  const [value, setValue] = useState<string>(() => getFromLocalStorage(key));
  const valueRef = useRef(value);

  const updateLsValue = useCallback((value: string) => {
    setValue(value);
    valueRef.current = value;
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, valueRef.current);
    };
  }, [value]);

  return { lsValue: value, updateLsValue } as const;
}
