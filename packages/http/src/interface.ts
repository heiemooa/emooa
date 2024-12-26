import { AxiosRequestHeaders, Method } from 'axios';
import { ModalProps } from '@emooa/ui';
import React from 'react';

/**
 * 错误弹窗内容
 */
export interface ErrorModalOption {
  /**
   * 错误消息
   */
  message: string;
  /**
   * 错误标题
   */
  title: string;
  /**
   * 错误码
   */
  code: string | number;
  /**
   * 接口部分配置
   */
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
 * 如 { status: 0, msg: 'response message' } 时，mapping 为 { code: 'status', ok: 0, msaage: 'msg' }
 * @defaultValue { code: 'code', ok: 0, message: 'message' }
 */
export interface MappingOptions {
  /**
   * 指定某个字段来代表接口返回的状态 Key
   * @defaultValue code
   */
  code?: string;
  /**
   * 指定返回状态码
   * @defaultValue 0
   */
  ok?: number | string;
  /**
   * 指定某个字段来返回消息的 Key，一般用于接口错误提示
   * @defaultValue message
   */
  message?: string | string[];
}

export interface Options {
  /**
   * 接口返回值 Data 的映射关系
   * @defaultValue { code: 'code', ok: 0, message: 'message' }
   */
  mapping?: MappingOptions;
  /**
   * 提示语言
   * @defaultValue zhCN
   */
  locale?: 'zhCN' | 'en';
  scheme?: 'light' | 'dark';
  /**
   * 主题色
   * @defaultValue #1677ff
   */
  colorPrimary?: React.CSSProperties['color'];
  /**
   * 错误弹窗样式，参考 https://docs.emooa.com/ui/modal#modal
   */
  modal?: ModalProps & {
    /**
     * 自定义提示内容
     */
    content?: React.ReactNode;
    /**
     * 非错误弹窗，属于通知类的弹窗样式，401 可能需要单独提示
     */
    info?: {
      [key: number | string]: ModalProps & { content?: React.ReactNode };
    };
  };
}
