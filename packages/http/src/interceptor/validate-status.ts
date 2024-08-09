import { AxiosResponse } from 'axios';

export default (response: AxiosResponse) => {
  console.log('response', response);
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }

  const obj = {
    title: '提示',
    message: `Invalid response status code ${status}`,
  };

  if (status >= 400 && status < 500) {
    switch (status) {
      case 400:
        // Bad Request
        break;
      case 401:
        // Unauthorized
        obj.message = '登录失效，请重新登录！';
        break;
      case 402:
        // Forbidden
        obj.message = '禁止访问！';
        break;
      case 404:
        // Not Found
        obj.message = '请求地址出错！';
        break;
      default:
        obj.title = '提示';
        obj.message = '客户端错误，请稍后再试！';
        break;
    }
    console.log('Object.assign(obj, response)', Object.assign(obj, response));
    throw Object.assign(obj, response);
  }
  if (status >= 500) {
    const obj = {
      title: '服务错误',
      message: '服务异常，请稍后再试！',
    };
    switch (status) {
      case 500:
        // Internal Server Error
        break;
      case 502:
        // Bad Gateway
        obj.title = '网关错误';
        obj.message = '服务异常，系统可能正在部署，请稍后再试！';
        break;
      case 503:
        // Service Unavailable
        break;
      case 504:
        // Gateway Timeout
        obj.title = '服务超时';
        break;
      default:
        obj.title = '服务错误';
        obj.message = '服务异常，请稍后再试';
        break;
    }
    throw Object.assign(obj, response);
  }

  throw Object.assign(obj, response);
};
