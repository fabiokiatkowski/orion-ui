const updateObject = (state, updatedObject) => {
  return {
    ...state,
    ...updatedObject
  };
};

export default updateObject;
