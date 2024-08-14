import Http from '@emooa/http';

const axios = new Http({
  locale: 'en',
});

const http = axios.create();

export default http;
