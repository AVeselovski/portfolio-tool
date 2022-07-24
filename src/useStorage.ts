import { useCallback, useEffect, useState } from "react";

/**
 * Get and set values in storage (local and session).
 */
function useStorage(key: string, defaultValue: any, storageObject: Storage) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);

    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue, remove];
}

export function useLocalStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage);
}
