import React, { createRef } from 'react';
import { ConfigNotificationProps, NotificationHookReturnType, NotificationProps, NotificationType } from './interface';
import ContextHolderElement, { HolderRef } from '@/_utils/contextHolder';
import Notification from './index';
import useNotice from '@/_class/notification';
import { size, head } from 'lodash';

type NoticeType = ReturnType<typeof useNotice>;

function useNotification(
  props: Omit<ConfigNotificationProps, 'getContainer'> = {},
): [NotificationHookReturnType, JSX.Element] {
  const { maxCount, ...rest } = props;
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;
  const notificationInstance: { [key in NotificationProps['position']]?: Omit<NoticeType, 'notices' | 'position'> } =
    {};

  function addNotice(config: NotificationProps & { type: keyof typeof NotificationType }) {
    const _noticeProps = {
      position: 'topRight',
      ...rest,
      ...config,
    };
    const { position } = _noticeProps;
    let id;
    if (notificationInstance[position]) {
      const notices = notificationInstance[position].notices.current;
      const found = notices.find(item => item.id === _noticeProps.id);

      if (size(notices) >= maxCount) {
        if (found) {
          id = notificationInstance[position].update({ ..._noticeProps, update: true });
        } else {
          const shift = head(notices);
          notificationInstance[position].remove(shift.id);
          id = notificationInstance[position].add(_noticeProps);
        }
      } else {
        if (found) {
          id = notificationInstance[position].update({ ..._noticeProps, update: true });
        } else {
          id = notificationInstance[position].add(_noticeProps);
        }
      }
    } else {
      const notice = (
        <Notification
          ref={instance => {
            if (notificationInstance[position]) return;
            notificationInstance[position] = instance;
            if (notificationInstance[position]) {
              id = notificationInstance[position].add(_noticeProps);
            }
          }}
        />
      );
      contextHolderRef.current.add(notice);
    }

    const close = () => {
      if (notificationInstance[position]) {
        notificationInstance[position].remove(id);
      }
    };

    return close;
  }

  const notificationFuncs: NotificationHookReturnType = {
    info: function (config: NotificationProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    success: function (config: NotificationProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    warning: function (config: NotificationProps | string): () => void {
      throw new Error('Function not implemented.');
    },
    error: function (config: NotificationProps | string): () => void {
      throw new Error('Function not implemented.');
    },
  };

  Object.keys(NotificationType)
    .filter(type => isNaN(Number(type)))
    .forEach((type: keyof typeof NotificationType) => {
      notificationFuncs[type] = (config: NotificationProps | string) => {
        const _config: NotificationProps = typeof config === 'string' ? { content: config } : config;
        return addNotice({
          ..._config,
          type,
        });
      };
    });

  return [notificationFuncs, holderEle];
}

export default useNotification;
