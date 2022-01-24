const useStorage = () => {
  const getItem = (key, type) => {
    if (typeof window !== 'undefined') {
      return window[type][key];
    }
    return null;
  };

  const setItem = (key, value, type) => {
    if (typeof window !== 'undefined') {
      window[type].setItem(key, value);
    }
  };

  const removeItem = (key, type) => {
    if (typeof window !== 'undefined') {
      window[type].removeItem(key);
    }
  };
  const clear = (type) => {
    if (typeof window !== 'undefined') {
      window[type].clear();
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
};

export default useStorage;
