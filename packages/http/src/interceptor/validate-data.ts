import { AxiosResponse } from 'axios';
import { ErrorModalProps, IErrorModal, IMappingOptions } from '@/interface';
import get from 'lodash.get';

const JsonParse = str => {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
};
export default (response: AxiosResponse, mappingOptions: IMappingOptions, values: ErrorModalProps) => {
  if (response.data[mappingOptions?.code] !== mappingOptions.ok) {
    const obj: IErrorModal = {
      message: response.data[mappingOptions.message],
      title: get(values, 'locale.title.hint', ''),
      code: response.data[mappingOptions.code],
      config: {
        headers: response.config.headers,
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
