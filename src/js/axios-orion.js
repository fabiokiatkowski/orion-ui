import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.120:8080/orion-server'
});

export default instance;
