const tokenId = 'orion-xp.authToken';
export default {
  save: (token) => {
    localStorage.setItem(tokenId, token);
  },
  get: () => {
    return localStorage.getItem(tokenId);
  },
  delete: () => localStorage.removeItem(tokenId)
};
