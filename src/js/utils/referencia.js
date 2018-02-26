export default (ref) => {
  console.log(ref);
  const firstChar = ref[0];
  if (firstChar.match(/[a-z]/i)) {
    console.log(`2${ref.slice(1)}`);
    return `2${ref.slice(1)}`;
  }
  return ref;
};
