import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import validateData from './interceptor/validate-data';
import validateError from './interceptor/validate-error';

const JsonParse = str => {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
};

export const abortControler = new AbortController();

export const create = (config?: CreateAxiosDefaults<any>): AxiosInstance => {
  const instance: AxiosInstance = axios.create(
    Object.assign(
      {
        baseURL: '/',
        signal: abortControler.signal,
      },
      config,
    ),
  );

  instance.interceptors.response.use(validateData);
  instance.interceptors.response.use(res => {
    console.log(res);
    return res;
  }, validateError);
  return instance;
};
