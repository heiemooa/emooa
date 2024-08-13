import { AxiosResponse } from 'axios';
import { ErrorModalOption, MappingOptions } from '@/interface';
import { Locale } from '@/_locale/interface';
import { JsonParse, isArray, isObject } from '@/utils';

export default (response: AxiosResponse, mappingOptions: MappingOptions, locale: Locale) => {
  /**
   * 一般接口都会定义返回体，如 data = { code, data, message }
   * 部分接口可能仅仅是为了获取文件数据，因此一般情况下只需要针对 “有结构体的返回数据” 进行判断处理即可。
   */

  if (isObject(response.data)) {
    const ignoreError: boolean = response.config['ignoreError'];

    if (response.data[mappingOptions?.code] !== mappingOptions.ok && !ignoreError) {
      let message = '';
      if (typeof mappingOptions.message === 'string') {
        message = response.data[mappingOptions.message];
      } else if (isArray(mappingOptions.message)) {
        while (!message && mappingOptions.message.length) {
          const head = mappingOptions.message.shift();
          message = response.data[head];
        }
      }

      const obj: ErrorModalOption = {
        message,
        title: locale.title.hint,
        code: response.data[mappingOptions.code],
        config: {
          baseURL: response.config.baseURL,
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
  }

  return response.data;
};
