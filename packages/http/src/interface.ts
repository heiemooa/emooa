import { AxiosRequestHeaders, Method } from 'axios';
import { ModalProps } from '@emooa/ui';
import React from 'react';

export interface ErrorModalOption {
  message: string;
  title: string;
  code: string | number;
  config: {
    baseURL: string;
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
  message?: string | string[];
}

export interface Options {
  mapping?: MappingOptions; // 接口返回值 Data 的映射关系
  locale?: 'zhCN' | 'en'; // 默认 zhCN
  colorPrimary?: React.CSSProperties['color']; // 主题色
  modal?: ModalProps & {
    content?: React.ReactNode;
    info?: {
      // 额外通知类的弹窗
      [key: number | string]: ModalProps & { content?: React.ReactNode };
    };
  };
}
