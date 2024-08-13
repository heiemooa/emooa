import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import ErrorModal from '@/error-modal';
import validateData from '@/interceptor/validate-data';
import validateError from '@/interceptor/validate-error';
import { ErrorModalProps, Options } from '@/interface';
import * as locales from '@/_locale';

export const abortControler = new AbortController();

export default class Http {
  options: Options = {
    locale: 'zhCN',
    mapping: {
      code: 'code',
      ok: 0,
      message: 'message',
    },
    theme: {
      colorPrimary: '#1677ff',
      top: 140,
    },
  };

  constructor(options?: Options) {
    this.options = Object.assign(this.options, options);
  }

  create(config?: CreateAxiosDefaults<any>) {
    const values: ErrorModalProps = { locale: locales[this.options.locale] };

    const error = new ErrorModal(values.locale, this.options.theme);

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
      res => validateData(res, this.options.mapping, values),
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
  }
}
