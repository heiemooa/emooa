import { Dayjs } from 'dayjs';
import React from 'react';
import { ReactNode, isValidElement } from 'react';
import { isPlainObject, isElement } from 'lodash';

const opt = Object.prototype.toString;

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

export function isEmptyObject(obj: any): boolean {
  return isPlainObject(obj) && Object.keys(obj).length === 0;
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
    isPlainObject(time) &&
    (('$y' in time && '$M' in time && '$D' in time && '$d' in time && '$H' in time && '$m' in time && '$s' in time) ||
      time._isAMomentObject) // 兼容 moment 的验证
  );
}

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
  if (isElement(element)) {
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
