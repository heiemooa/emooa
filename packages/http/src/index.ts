import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import validateStatus from './interceptor/validate-status';

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

  instance.interceptors.response.use(validateStatus);

  return instance;
};
