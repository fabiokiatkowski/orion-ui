// import configureStoreDev from './configureStore.dev';
// import configureStoreProd from './configureStore.prod';
let loaded = null;

loaded = (process.env.NODE_ENV === 'production') ?
  require('./configureStore.prod') : //eslint-disable-line
  require('./configureStore.dev'); //eslint-disable-line
const toExport = loaded;
export default toExport;
