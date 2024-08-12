import { createContext } from 'react';
import * as locales from '@/_locale';
import { ErrorModalProps } from '@/interface';

const { zhCN } = locales;

export const DefaultErrorModalProps: ErrorModalProps = {
  locale: zhCN,
};

export const ErrorModalContext = createContext<ErrorModalProps>(DefaultErrorModalProps);
