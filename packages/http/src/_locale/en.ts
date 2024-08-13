import { Locale } from './interface';

const locale: Locale = {
  locale: 'en',
  title: {
    '5x': 'Internal Server Error',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Internal Server Error',
    504: 'Gateway Timeout',
    hint: 'Hint',
  },
  message: {
    '4x': 'Client error, please try again later!',
    401: 'Login failed, please log in again!',
    403: 'Access is prohibited!',
    404: 'Request address error!',
    '5x': 'Service abnormality, please try again later!',
    500: 'Service abnormality, please try again later!',
    502: 'Service abnormality, the system may be being deployed, please try again later!',
    503: 'The service is currently unavailable, please try again later!',
    504: 'Service timed out, please try again later!',
  },
  copy: 'Copy',
  ok: 'OK',
  detail: (code: number | string, color: string) =>
    `Error details (error code: <span style="color: ${color}">${code}</span>)`,
};
export default locale;
