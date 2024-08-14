export default {
  'GET /api/0': {
    code: 0,
    data: [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ],
    message: 'success',
  },
  'GET /api/403': {
    code: 403,
    message: 'Forbidden',
  },
  'GET /api/401': {
    code: 401,
    message: 'Login failed, please log in again!',
  },
  'GET /api/500': {
    code: 500,
    message: 'Internal Server Error',
  },
  'GET /api/mapping/200': {
    status: 200,
    msg: 'success',
  },
  'GET /api/mapping/500': {
    status: 500,
    msg: 'Internal Server Error',
  },
};
