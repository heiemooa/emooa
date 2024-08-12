import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import ErrorModal from '@/error-modal';
import validateData from '@/interceptor/validate-data';
import validateError from '@/interceptor/validate-error';
import { IMappingOptions } from '@/interface';
import { DefaultErrorModalProps } from '@/error-modal/context';
import * as locales from '@/_locale';

const locale = 'zhCN';
const values = Object.assign({}, DefaultErrorModalProps, { locale: locales[locale] });

const abortControler = new AbortController();

const create = (config?: CreateAxiosDefaults<any>, options?: IMappingOptions): AxiosInstance => {
  const _options: IMappingOptions = Object.assign(
    {
      code: 'code',
      ok: 0,
      message: 'message',
    },
    options,
  );

  console.log('values', values);

  const error = new ErrorModal(values);

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
    res => validateData(res, _options, values),
    err => validateError(err, values),
  );

  instance.interceptors.response.use(
    res => res,
    err => {
      error.show(err);
      return Promise.reject(err);
    },
  );

  return instance;
};

export default {
  create,
  abortControler,
};
