import React from 'react';
import { AppConfig, useAppProps } from './interface';
import { MessageProps } from '@/message/interface';
import { ConfirmProps, ModalReturnProps } from '@/modal/interface';
import { NotificationProps } from '@/notification/interface';

export const AppConfigContext = React.createContext<AppConfig>({});

const AppContext = React.createContext<useAppProps>({
  modal: {
    confirm: function (config: ConfirmProps): ModalReturnProps {
      throw new Error('Function not implemented.');
    },
    info: function (config: ConfirmProps): ModalReturnProps {
      throw new Error('Function not implemented.');
    },
    success: function (config: ConfirmProps): ModalReturnProps {
      throw new Error('Function not implemented.');
    },
    warning: function (config: ConfirmProps): ModalReturnProps {
      throw new Error('Function not implemented.');
    },
    error: function (config: ConfirmProps): ModalReturnProps {
      throw new Error('Function not implemented.');
    },
  },
  message: {
    info: function (config: string | MessageProps): () => void {
      throw new Error('Function not implemented.');
    },
    success: function (config: string | MessageProps): () => void {
      throw new Error('Function not implemented.');
    },
    warning: function (config: string | MessageProps): () => void {
      throw new Error('Function not implemented.');
    },
    error: function (config: string | MessageProps): () => void {
      throw new Error('Function not implemented.');
    },
    loading: function (config: string | MessageProps): () => void {
      throw new Error('Function not implemented.');
    },
  },
  notification: {
    info: function (config: string | NotificationProps): () => void {
      throw new Error('Function not implemented.');
    },
    success: function (config: string | NotificationProps): () => void {
      throw new Error('Function not implemented.');
    },
    warning: function (config: string | NotificationProps): () => void {
      throw new Error('Function not implemented.');
    },
    error: function (config: string | NotificationProps): () => void {
      throw new Error('Function not implemented.');
    },
  },
});

export default AppContext;
