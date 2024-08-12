import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import ErrorModal from './error-modal';
import validateData from './interceptor/validate-data';
import validateError from './interceptor/validate-error';

const error = new ErrorModal();

const abortControler = new AbortController();

interface Options {
  code?: string;
  ok?: number;
  message?: string;
}
const create = (config?: CreateAxiosDefaults<any>, options?: Options): AxiosInstance => {
  const _options = Object.assign(
    {
      code: 'code',
      ok: 0,
      message: 'message',
    },
    options,
  );

  const instance: AxiosInstance = axios.create(
    Object.assign(
      {
        baseURL: '/',
        signal: abortControler.signal,
      },
      config,
    ),
  );

  instance.interceptors.response.use(
    res => validateData(res, _options),
    err => validateError(err),
  );

  instance.interceptors.response.use(
    res => res,
    err => {
      error.show(err);
      throw err;
    },
  );

  return instance;
};

export default {
  create,
  abortControler,
};
