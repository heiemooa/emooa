import Http from '@emooa/http';

const axios = new Http({
  colorPrimary: 'green',
});

const http = axios.create();

export default http;
