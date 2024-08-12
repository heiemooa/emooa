import { ErrorModalProps, IErrorModal } from '@/interface';
import get from 'lodash.get';

const JsonParse = str => {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
};

export default (err, values: ErrorModalProps) => {
  const { title, message } = getMessage(err.response.status);
  const obj: IErrorModal = {
    message: get(values, message, ''),
    title: get(values, title, ''),
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
    title: `locale.title.hint`,
    message: `Invalid response status code ${status}`,
  };

  if (status >= 400 && status < 500) {
    obj.message = `locale.message['4x']`;
    switch (status) {
      case 400:
        // Bad
        break;
      case 401:
        // Unauthorized
        obj.message = `locale.message[401]`;
        break;
      case 403:
        Request;
        // Forbidden
        obj.message = `locale.message[403]`;
        break;
      case 404:
        // Not Found
        obj.message = `locale.message[404]`;
        break;
      default:
        obj.message = `locale.message['4x']`;
        break;
    }
    return obj;
  }
  if (status >= 500) {
    const obj = {
      title: `locale.title['5x']`,
      message: `locale.message['5x']`,
    };
    switch (status) {
      case 500:
        // Internal Server Error
        break;
      case 502:
        // Bad Gateway
        obj.title = `locale.title[502]`;
        obj.message = `locale.message[502]`;
        break;
      case 503:
        // Service Unavailable
        break;
      case 504:
        // Gateway Timeout
        obj.title = `locale.title[504]`;
        break;
      default:
        obj.title = `locale.title['5x']`;
        obj.message = `locale.message['5x']`;
        break;
    }
    return obj;
  }

  return obj;
};
