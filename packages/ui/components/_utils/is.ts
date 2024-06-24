import { Dayjs } from 'dayjs';
import React from 'react';
import { ReactNode, isValidElement } from 'react';

const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]';
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]';
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]';
}

function isHex(color) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color);
}
export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isNull(obj: any): obj is null {
  return obj === null;
}

export function isNullOrUndefined(obj: any): boolean {
  return obj === null || obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function';
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isEmptyReactNode(content: any, trim?: boolean): boolean {
  if (content === null || content === undefined || content === false) {
    return true;
  }
  if (typeof content === 'string' && (trim ? content.trim() === '' : content === '')) {
    return true;
  }
  return false;
}

export function isExist(obj: any): boolean {
  return obj || obj === 0;
}

export function isWindow(el: any): el is Window {
  return el === window;
}

export function isDayjs(time): time is Dayjs {
  // dayjs.isDayjs 在实际应用场景，比如多个版本的 dayjs 会失效
  return (
    isObject(time) &&
    (('$y' in time && '$M' in time && '$D' in time && '$d' in time && '$H' in time && '$m' in time && '$s' in time) ||
      time._isAMomentObject) // 兼容 moment 的验证
  );
}

export function isBoolean(value: any): value is Boolean {
  return typeof value === 'boolean';
}

// 判断是否是最基础的dom元素，如 div，span
export const isDOMElement = (element: ReactNode): boolean => {
  return isValidElement(element) && typeof element.type === 'string';
};

// 函数组件
export const isReactComponent = (element: ReactNode): boolean => {
  return element && isValidElement(element) && typeof element.type === 'function';
};

// 类组件
export const isClassComponent = (element: any): boolean => {
  return isReactComponent(element) && !!element.type.prototype?.isReactComponent;
};

// 传入的元素是否可以设置 ref 引用
export const supportRef = (element: any): boolean => {
  if (isDOMElement(element)) {
    return true;
  }

  if (isValidElement(element) && (element.type as any)?.$$typeof === React.forwardRef((props, ref) => null).$$typeof) {
    return true;
  }

  if (isReactComponent(element)) {
    return isClassComponent(element); // 函数组件且没有被 forwardRef，无法设置 ref
  }

  return false;
};
