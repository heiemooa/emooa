import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import errorFunc from './error-modal';
import validateData from './interceptor/validate-data';
import validateError from './interceptor/validate-error';
import merge from 'lodash.merge';
import * as locales from './_locale';
import { Locale } from './_locale/interface';
import { Options } from './interface';

export type { Options } from './interface';

export const abortControler = new AbortController();

export default class Http {
  options: Options = {
    locale: 'zhCN',
    mapping: {
      code: 'code',
      ok: 0,
      message: 'message',
    },
    colorPrimary: '#1677ff',
    modal: {},
  };

  constructor(options?: Options) {
    this.options = merge({}, this.options, options);
  }

  create(config?: CreateAxiosDefaults<any>) {
    const locale: Locale = locales[this.options.locale];

    const error = errorFunc(this.options);

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
      res => validateData(res, this.options.mapping, locale),
      err => validateError(err, locale),
    );

    instance.interceptors.response.use(
      res => res,
      err => {
        error(err);
        return Promise.reject(err);
      },
    );

    return instance;
  }
}
