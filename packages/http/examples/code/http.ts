import Http from '@emooa/http';

const axios = new Http({
  mapping: {
    code: 'status',
    ok: 200,
    message: ['notice', 'msg'],
  },
});

const http = axios.create();

export default http;
