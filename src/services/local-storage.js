export const setItem = (key, value) => {
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};


