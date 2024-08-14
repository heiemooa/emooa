import Http from '@emooa/http';

const axios = new Http({
  mapping: {
    code: 'status',
    ok: 200,
    message: 'msg',
  },
});

const http = axios.create();

export default http;
