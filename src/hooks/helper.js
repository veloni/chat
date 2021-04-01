 function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
} 

function setDataFromLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
} 

module.exports = {
  getDataFromLocalStorage: getDataFromLocalStorage,
  setDataFromLocalStorage: setDataFromLocalStorage,
};

 