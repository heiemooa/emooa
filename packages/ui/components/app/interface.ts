import { ModalHookReturnType } from '@/modal/interface';
import { CSSProperties, ComponentType, ProviderProps, ReactNode } from 'react';

type AnyObject = Record<PropertyKey, any>;

type CustomComponent<P = AnyObject> = ComponentType<P> | string;

export interface AppConfig {
  [key: string]: any;
}

export interface useAppProps {
  modal: ModalHookReturnType;
}

export interface AppProps<P = AnyObject> {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  values?: AppConfig;
  component?: CustomComponent<P> | false;
}
