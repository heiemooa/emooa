import Http from '@emooa/http';

const axios = new Http();

const http = axios.create({
  baseURL: '/',
  headers: {
    'X-Client-Token': '******',
  },
});

http.interceptors.request.use(config => {
  config.headers!['TOKEN'] = '******';
  return config;
});

http.interceptors.response.use(response => {
  return response;
});

export default http;
