export default (ref) => {
  const firstChar = ref[0];
  if (firstChar.match(/[a-z]/i)) {
    return `2${ref.slice(1)}`;
  }
  return ref;
};
