import { AxiosRequestHeaders, Method } from 'axios';
import { Locale } from './_locale/interface';

export interface IErrorModal {
  message: string;
  title: string;
  code: string | number;
  config: {
    headers: AxiosRequestHeaders;
    method: Method | string;
    url: string;
    params: any;
    body: any;
    response: {
      data: any;
      status: number;
      statusText: string;
    };
  };
}

/**
 * 返回值的映射关系
 */
export interface IMappingOptions {
  code?: string;
  ok?: number;
  message?: string;
}

export interface ErrorModalProps {
  locale: Locale;
}
