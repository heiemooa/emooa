import { AxiosRequestHeaders, Method } from 'axios';
import { Locale } from './_locale/interface';

export interface ErrorModalOption {
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
export interface MappingOptions {
  code?: string;
  ok?: number;
  message?: string;
}

export interface Options {
  mapping?: MappingOptions; // 接口返回值 Data 的映射关系
  locale?: 'zhCN' | 'en'; // 默认 zhCN
  theme?: {
    colorPrimary?: React.CSSProperties['color']; // 主题色
    top?: React.CSSProperties['top']; // 错误弹窗位置
  };
}

export interface ErrorModalProps {
  locale: Locale;
}
