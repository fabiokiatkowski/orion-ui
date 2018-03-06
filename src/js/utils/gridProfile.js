import axios from '../axios-orion';

const getCurrentColumns = (gridName) => {
  const url = `/api/grid/${gridName}/current-columns`;
  return axios.get(url);
};

const getCurrentProfile = (gridName) => {
  const url = `/api/grid/${gridName}/current-columns`;
  return axios.get(url);
};

const updateColumns = (params) => {
  const url = '/api/grid/column/update';
  axios.post(url, params)
    .then(res => console.log(res));
};

export { getCurrentColumns, getCurrentProfile, updateColumns };
