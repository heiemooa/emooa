import Http from '@emooa/http';

const axios = new Http({
  mapping: {
    code: 'code',
    ok: 200,
    message: ['message'],
  },
});

const http = axios.create();

http.interceptors.response.use(response => response.data);

export default http;
