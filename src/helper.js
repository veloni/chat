export const getDataFromLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

export const setDataFromLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
};
