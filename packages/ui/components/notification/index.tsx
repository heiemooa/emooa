import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import { ConfigNotificationProps, NotificationHookReturnType, NotificationProps, NotificationType } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import EuiCSSTransition from '@/_utils/css-trasition';
import { TransitionGroup } from 'react-transition-group';
import { map, head, isNumber } from 'lodash';
import Notice from '@/_class/notice';
import useNotice from '@/_class/notification';
import useNotification from './useNotication';
import { render } from '@/_utils/react-dom';

type NoticeType = ReturnType<typeof useNotice>;

let notificationInstance: {
  [key in NotificationProps['position']]?: {
    instance?: typeof NotificationComponent & Omit<NoticeType, 'notices' | 'position'>;
    pending?: Promise<null>;
  };
} = {};

let maxCount;
let duration;
let container;
let closable = true;

const defaultProps: NotificationProps = {};

const Component = (props: NotificationProps, ref) => {
  const { prefixCls: rootPrefixCls, getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const { notices, position, add, update, remove, clear } = useNotice();

  const { closable: _closable }: NotificationProps = Object.assign(
    { closable },
    defaultProps,
    components?.Notification,
    props,
  );

  const prefixCls = getPrefixCls('notification');

  const [hashId] = useStyle(prefixCls);

  const classnames = classNames(hashId, `${prefixCls}-wrapper`, `${prefixCls}-wrapper-${position}`);

  const noticesRef = useRef(notices);

  useEffect(() => {
    noticesRef.current = notices; // Keep the ref updated with the latest notices
  }, [notices]);

  useImperativeHandle(
    ref,
    () => {
      return {
        add: _add,
        clear,
        remove: _remove,
        update,
        notices: noticesRef,
      };
    },
    [],
  );

  const _add = (noticeprops: NotificationProps) => {
    const notices = noticesRef.current;
    const found = notices.find(item => item.id === noticeprops.id);
    if (notices.length >= maxCount) {
      const found = notices.find(item => item.id === noticeprops.id);
      if (found) {
        return update({ ...noticeprops, update: true });
      } else {
        const shift = head(notices);
        remove(shift.id);
        return add(noticeprops);
      }
    } else {
      if (found) {
        return update({ ...noticeprops, update: true });
      }
      return add(noticeprops);
    }
  };

  const _remove = (id: string) => {
    const notices = noticesRef.current;
    const noticeItem = notices.find(item => item.id === id);
    if (noticeItem) {
      update({
        ...noticeItem,
        style: noticeItem.style,
      });
    }

    // 100 是透明度动画结束的时间
    setTimeout(() => {
      remove(id);
    }, 100);
  };

  return (
    <div className={classnames}>
      <TransitionGroup component={null}>
        {map(notices, notice => (
          <EuiCSSTransition
            key={notice.id}
            timeout={400}
            appear
            classNames={`${rootPrefixCls}-${
              {
                topRight: 'fade-left',
                topLeft: 'fade-right',
                bottomRight: 'fade-left',
                bottomLeft: 'fade-right',
              }[position]
            }`}
            onEnter={e => {
              if (!e) return;
              e.style.height = `${e.scrollHeight}px`;
            }}
            onExiting={e => {
              if (!e) return;
              e.style.height = 0;
            }}
            onExited={e => {
              if (!e) return;
              e.style.height = 0;
              notice.onClose?.();
            }}
          >
            <Notice
              closable={_closable}
              {...notice}
              prefixCls={prefixCls}
              onClose={_remove}
              noticeType="notification"
              rtl={rtl}
            />
          </EuiCSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

const NotificationComponent = forwardRef<HTMLDivElement, NotificationProps>(Component);

function addInstance(noticeProps: NotificationProps & { type: keyof typeof NotificationType }) {
  const _noticeProps: NotificationProps = {
    position: 'topRight',
    duration,
    ...noticeProps,
  };
  const { position } = _noticeProps;

  let id;

  const { instance, pending } = notificationInstance[position] || {};

  if (instance || pending) {
    const add = () => {
      const { instance } = notificationInstance[position] || {};

      const new_id = instance.add(_noticeProps);
      if (new_id) {
        id = new_id;
      }
    };

    if (instance) {
      add();
    } else if (pending?.then) {
      pending.then(() => {
        add();
        notificationInstance[position].pending = null;
      });
    }
  } else {
    const div = document.createElement('div');
    (container || document.body).appendChild(div);

    notificationInstance[position] = {};

    notificationInstance[position].pending = new Promise(resolve => {
      render(
        <NotificationComponent
          ref={(instance: HTMLDivElement & { add: Function }) => {
            if (!notificationInstance[position]) {
              // getContainer 变化时，会重置 notificationInstance
              // pending 中的逻辑执行晚于重置逻辑时，这里需判空
              notificationInstance[position] = {};
            }
            if (notificationInstance[position].instance) return;
            id = instance?.add?.(_noticeProps);
            notificationInstance[position].instance = instance as any;
            resolve(null);
          }}
        />,
        div,
      );
      return notificationInstance[position].instance;
    });
  }

  const close = () => {
    notificationInstance[position]?.instance?.remove(id);
  };

  return close;
}

const Notification = NotificationComponent as typeof NotificationComponent &
  NotificationHookReturnType & {
    clear: () => void;
    config: (options: ConfigNotificationProps) => void;
    remove: (id: string) => void;
    useNotification: typeof useNotification;
  };

Object.keys(NotificationType)
  .filter(type => isNaN(Number(type)))
  .forEach((type: keyof typeof NotificationType) => {
    Notification[type] = (noticeProps: NotificationProps | string) => {
      const props = typeof noticeProps === 'string' ? { content: noticeProps } : noticeProps;
      return addInstance({
        type,
        ...props,
      });
    };
  });

Notification.clear = () => {
  Object.values(notificationInstance).forEach(({ instance }) => {
    instance?.clear();
  });
};

Notification.remove = (id: string) => {
  Object.values(notificationInstance).forEach(({ instance }) => {
    instance?.remove(id);
  });
};

Notification.config = (options: ConfigNotificationProps) => {
  if (isNumber(options.maxCount)) {
    maxCount = options.maxCount;
  }
  if (isNumber(options.duration)) {
    duration = options.duration;
  }
  if (typeof options.closable === 'boolean') {
    closable = options.closable;
  }
  if (options.getContainer && options.getContainer() !== container) {
    container = options.getContainer();
    Object.values(notificationInstance).forEach(({ instance }) => instance?.clear());
    notificationInstance = {};
  }
};

Notification.useNotification = useNotification;

export default Notification;
