import axios from '../axios-orion';

const getCurrentColumns = (gridName) => {
  const url = `/api/grid/${gridName}/current-columns`;
  return axios.get(url);
};

const getCurrentProfile = (gridName) => {
  const url = `/api/grid/${gridName}/current-columns`;
  return axios.get(url);
};

export { getCurrentColumns, getCurrentProfile };
