import { createContext } from 'react';
import * as locales from '@/_locale';
import { Locale } from '@/_locale/interface';

const { zhCN } = locales;

interface ErrorModalProps {
  locale: Locale;
}
export const DefaultErrorModalProps: ErrorModalProps = {
  locale: zhCN,
};

export const ErrorModalContext = createContext<ErrorModalProps>(DefaultErrorModalProps);
