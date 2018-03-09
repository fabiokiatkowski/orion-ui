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

const getProfiles = (gridName) => {
  const url = `/api/grid/${gridName}/get-profiles`;
  return axios.get(url);
};

const createProfile = (gridName, payload) => {
  const url = `/api/grid/${gridName}/create-profile`;
  return axios.post(url, payload);
};

const changeProfile = (gridName, profileId) => {
  const url = `/api/grid/${gridName}/profile/${profileId}/update-user-profile`;
  return axios.post(url);
};

export {
  getCurrentColumns,
  getCurrentProfile,
  updateColumns,
  getProfiles,
  createProfile,
  changeProfile
};
