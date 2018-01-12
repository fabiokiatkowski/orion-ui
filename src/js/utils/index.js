import MultiCheckFilter from '../components/MultiCheckFilter';

const ColumnPersist = {
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const columns = JSON.parse(localStorage.getItem(key))
      .map((c) => {
        // This is a need trick(gambi), because after deserialize
        // from localstorage, the config return 'MultiCheckFilter'
        return { ...c, filterRenderer: MultiCheckFilter };
      });

    return columns;
  },
  delete: key => localStorage.removeItem(key)
};

export default ColumnPersist;
