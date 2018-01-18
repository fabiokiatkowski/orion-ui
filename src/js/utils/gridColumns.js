const ColumnPersist = {
  save: (key, map) => {
    console.log(map.entries);
    localStorage.setItem(key, JSON.stringify(Array.from(map.entries())));
  },
  get: (key) => {
    return new Map(JSON.parse(localStorage.getItem(key)));
  },
  delete: key => localStorage.removeItem(key)
};

export default ColumnPersist;
