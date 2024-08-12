import { Locale } from './interface';

const locale: Locale = {
  locale: 'zh-cn',
  title: {
    '5x': '服务错误',
    500: '服务错误',
    502: '网关错误',
    503: '服务错误',
    504: '服务超时',
    hint: '提示',
  },
  message: {
    '4x': '客户端错误，请稍后再试！',
    401: '登录失效，请重新登录！',
    403: '禁止访问！',
    404: '请求地址出错！',
    '5x': '服务异常，请稍后再试！',
    500: '服务异常，请稍后再试！',
    502: '服务异常，系统可能正在部署，请稍后再试！',
    503: '当前服务不可用，请稍后再试！',
    504: '服务超时，请稍后再试！',
  },
  copy: '复制',
  detail: (code: number | string) => `错误详情（错误码：<span class="text-primary">${code}</span>)`,
};
export default locale;
