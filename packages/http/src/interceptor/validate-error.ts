import { Locale } from '../_locale/interface';
import { ErrorModalOption } from '../interface';
import { JsonParse } from '../utils';

export default (err, locale: Locale) => {
  const ignoreError = err.config.ignoreError;

  if (ignoreError) {
    return err.response.data;
  }
  const { title, message = err.message } = getMessage(locale, err.response.status);
  const obj: ErrorModalOption = {
    message,
    title,
    code: err.code,
    config: {
      baseURL: err.config.baseURL,
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

const getMessage = (locale: Locale, status) => {
  const obj: { title: string; message?: string } = {
    title: locale.title.hint,
  };

  if (status >= 400 && status < 500) {
    obj.message = locale.message['4x'];
    switch (status) {
      case 400:
        // Bad
        break;
      case 401:
        // Unauthorized
        obj.message = locale.message[401];
        break;
      case 403:
        Request;
        // Forbidden
        obj.message = locale.message[403];
        break;
      case 404:
        // Not Found
        obj.message = locale.message[404];
        break;
      default:
        obj.message = locale.message['4x'];
        break;
    }
    return obj;
  }
  if (status >= 500) {
    const obj: { title: string; message?: string } = {
      title: locale.title['5x'],
      message: locale.message['5x'],
    };
    switch (status) {
      case 500:
        // Internal Server Error
        obj.title = locale.title[500];
        obj.message = locale.message[500];
        break;
      case 502:
        // Bad Gateway
        obj.title = locale.title[502];
        obj.message = locale.message[502];
        break;
      case 503:
        // Service Unavailable
        obj.title = locale.title[503];
        obj.message = locale.message[503];
        break;
      case 504:
        // Gateway Timeout
        obj.title = locale.title[504];
        obj.message = locale.message[504];
        break;
      default:
        obj.title = locale.title['5x'];
        obj.message = locale.message['5x'];
        break;
    }
    return obj;
  }

  return obj;
};
