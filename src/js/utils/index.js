const ColumnPersist = {
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  delete: key => localStorage.removeItem(key)
};

export default ColumnPersist;
