const JsonParse = str => {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
};

export default err => {
  const { title, message } = getMessage(err.response.status);
  const obj = {
    message: message,
    title: title,
    code: err.code,
    config: {
      headers: err.config.headers,
      method: err.config.method,
      url: err.config.url,
      params: err.config.params,
      body: JsonParse(err.config.data),
      response: {
        data: err.response.data,
        status: err.response.status,
        statusText: err.response.statusText,
      },
    },
  };
  return Promise.reject(obj);
};

const getMessage = status => {
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
    return obj;
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
    return obj;
  }

  return obj;
};
