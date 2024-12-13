import React, { createRef } from 'react';
import { ConfigMessageProps, MessageHookReturnType, MessageProps, MessageType } from './interface';
import ContextHolderElement, { HolderRef } from '@/_utils/contextHolder';
import Message from './index';
import useNotice from '@/_class/notification';
import { size, head } from 'lodash';

type NoticeType = ReturnType<typeof useNotice>;

function useMessage(props: Omit<ConfigMessageProps, 'getContainer'> = {}): [MessageHookReturnType, JSX.Element] {
  const { maxCount, ...rest } = props;
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;
  const messageInstance: { [key in MessageProps['position']]?: Omit<NoticeType, 'notices' | 'position'> } = {};

  function addNotice(config: MessageProps & { type: keyof typeof MessageType }) {
    const _noticeProps = {
      position: 'top',
      ...rest,
      ...config,
    };
    const { position } = _noticeProps;
    let id;
    if (messageInstance[position]) {
      const notices = messageInstance[position].notices.current;
      const found = notices.find(item => item.id === _noticeProps.id);

      if (size(notices) >= maxCount) {
        if (found) {
          id = messageInstance[position].update({ ..._noticeProps, update: true });
        } else {
          const shift = head(notices);
          messageInstance[position].remove(shift.id);
          id = messageInstance[position].add(_noticeProps);
        }
      } else {
        if (found) {
          id = messageInstance[position].update({ ..._noticeProps, update: true });
        } else {
          id = messageInstance[position].add(_noticeProps);
        }
      }
    } else {
      const notice = (
        <Message
          ref={instance => {
            if (messageInstance[position]) return;
            messageInstance[position] = instance;
            if (messageInstance[position]) {
              id = messageInstance[position].add(_noticeProps);
            }
          }}
        />
      );
      contextHolderRef.current.add(notice);
    }

    const close = () => {
      if (messageInstance[position]) {
        messageInstance[position].remove(id);
      }
    };

    return close;
  }

  const messageFuncs: MessageHookReturnType = {
    info: function (config: MessageProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    success: function (config: MessageProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    warning: function (config: MessageProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    error: function (config: MessageProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    loading: function (config: MessageProps | string): () => void {
      throw new Error('Function not implemented.');
    },
  };

  Object.keys(MessageType)
    .filter(type => isNaN(Number(type)))
    .forEach((type: keyof typeof MessageType) => {
      messageFuncs[type] = (config: MessageProps | string) => {
        const _config: MessageProps = typeof config === 'string' ? { content: config } : config;
        return addNotice({
          ..._config,
          type,
        });
      };
    });

  return [messageFuncs, holderEle];
}

export default useMessage;
