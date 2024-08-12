import dayjs from 'dayjs';
import en from './en';
import zhCN from './zh-cn';

import { Locale } from './interface';

const locales = {
  en,
  'zh-cn': zhCN,
};

const locale: Locale = locales[dayjs.locale() || 'zh-cn'];

export default locale;
