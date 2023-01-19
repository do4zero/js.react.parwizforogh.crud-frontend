import axios from 'axios';
const { REACT_APP_URL } = process.env;

const $axios = axios.create({
  baseURL: REACT_APP_URL,
});

export default $axios;
