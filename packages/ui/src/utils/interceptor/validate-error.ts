import { AxiosResponse } from 'axios';

export default err => {
  console.log(err);
  throw err;
};
