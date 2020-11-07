import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:49152',
});

export default instance;