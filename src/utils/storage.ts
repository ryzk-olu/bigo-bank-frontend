export function getStorageItem<T>(
  key: string
): T | null {

  try {

    const value =
      localStorage.getItem(key);


    if (!value) {
      return null;
    }


    return JSON.parse(value) as T;


  } catch {

    localStorage.removeItem(key);

    return null;
  }
}
