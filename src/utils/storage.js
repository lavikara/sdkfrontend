exports.removeItem = (key) => {
  return localStorage.removeItem(key);
};

exports.setItem = (key, item) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

exports.getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

exports.clearStorage = () => {
  return localStorage.clear();
};
