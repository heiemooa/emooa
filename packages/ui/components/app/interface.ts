import { ConfigMessageProps, MessageHookReturnType } from '@/message/interface';
import { ModalHookReturnType } from '@/modal/interface';
import { CSSProperties, ComponentType, ReactNode } from 'react';

type AnyObject = Record<PropertyKey, any>;

type CustomComponent<P = AnyObject> = ComponentType<P> | string;

export interface AppConfig {
  message?: ConfigMessageProps;
}

export interface useAppProps {
  modal: ModalHookReturnType;
  message: MessageHookReturnType;
}

export interface AppProps<P = AnyObject> extends AppConfig {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  component?: CustomComponent<P> | false;
}
