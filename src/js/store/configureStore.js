import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

console.log(process.env.NODE_ENV);
console.log(configureStoreDev);
export default (process.env.NODE_ENV === 'production') ? configureStoreProd : configureStoreDev;
