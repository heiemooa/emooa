import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import ErrorModal from '@/error-modal';
import validateData from '@/interceptor/validate-data';
import validateError from '@/interceptor/validate-error';
import { Options } from '@/interface';
import merge from 'lodash.merge';
import * as locales from '@/_locale';
import { Locale } from './_locale/interface';

const abortControler = new AbortController();

export { Options, abortControler };

export default class Http {
  options: Options = {
    locale: 'zhCN',
    mapping: {
      code: 'code',
      ok: 0,
      message: 'message',
    },
    colorPrimary: '#1677ff',
    modal: {
      onOk: () => {
        console.log('ok');
      },
    },
  };

  constructor(options?: Options) {
    this.options = merge({}, this.options, options);
  }

  create(config?: CreateAxiosDefaults<any>) {
    const locale: Locale = locales[this.options.locale];

    const error = new ErrorModal(locale, this.options.colorPrimary, this.options.modal);

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
        error.show(err);
        return Promise.reject(err);
      },
    );

    return instance;
  }
}
