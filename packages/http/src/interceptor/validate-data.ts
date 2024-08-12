import { AxiosResponse } from 'axios';
import locale from '@/_locale';

const JsonParse = str => {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
};
export default (response: AxiosResponse, _options) => {
  if (response.data[_options?.code] !== _options.ok) {
    const obj = {
      message: response.data[_options.message],
      title: locale.title.hint,
      code: response.data[_options.code],
      config: {
        method: response.config.method,
        url: response.config.url,
        params: response.config.params,
        body: JsonParse(response.config.data),
        response: {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        },
      },
    };
    return Promise.reject(obj);
  }
  return response.data;
};
