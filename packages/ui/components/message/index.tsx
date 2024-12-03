import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import { ConfigMessageProps, MessageHookReturnType, MessageProps, MessageType } from './interface';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigProviderProps } from '../config-provider/interface';
import EuiCSSTransition from '@/_utils/css-trasition';
import { TransitionGroup } from 'react-transition-group';
import { map, head, isUndefined, isNumber, isEmpty } from 'lodash';
import Notice from '@/_class/notice';
import useNotice from '@/_class/notification';
import useMessage from './useMessage';
import { render } from '@/_utils/react-dom';

type NoticeType = ReturnType<typeof useNotice>;

let messageInstance: {
  [key in MessageProps['position']]?: {
    instance?: typeof MessageComponent & Omit<NoticeType, 'notices' | 'position'>;
    pending?: Promise<null>;
  };
} = {};

let maxCount;
let duration;
let container;
let closable;

const defaultProps: MessageProps = {};

const Component = (props: MessageProps, ref) => {
  const { prefixCls: rootPrefixCls, getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const { notices, position, add, update, remove, clear } = useNotice();

  const { closable: _closable, ...rest }: MessageProps = Object.assign({}, defaultProps, components?.Message, props);

  const mergeClosable = !isUndefined(_closable) ? _closable : closable;

  const prefixCls = getPrefixCls('message');

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

  const _add = (noticeprops: MessageProps) => {
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
        style: { ...noticeItem.style, opacity: 0 },
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
                top: 'fade-down',
                bottom: 'fade-up',
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
              {...rest}
              {...notice}
              prefixCls={prefixCls}
              onClose={_remove}
              noticeType="message"
              rtl={rtl}
              {...(isUndefined(mergeClosable) ? {} : { closable: mergeClosable })}
            />
          </EuiCSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

const MessageComponent = forwardRef<HTMLDivElement, MessageProps>(Component);

function addInstance(noticeProps: MessageProps & { type: keyof typeof MessageType }) {
  const _noticeProps: MessageProps = {
    position: 'top',
    duration,
    ...noticeProps,
  };
  const { position, ...rest } = _noticeProps;

  let id;

  const { instance, pending } = messageInstance[position] || {};

  if (instance || pending) {
    const add = () => {
      const { instance } = messageInstance[position] || {};

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
        messageInstance[position].pending = null;
      });
    }
  } else {
    const div = document.createElement('div');
    (container || document.body).appendChild(div);

    messageInstance[position] = {};

    messageInstance[position].pending = new Promise(resolve => {
      render(
        <MessageComponent
          {...rest}
          ref={(instance: HTMLDivElement & { add: Function }) => {
            if (!messageInstance[position]) {
              // getContainer 变化时，会重置 messageInstance
              // pending 中的逻辑执行晚于重置逻辑时，这里需判空
              messageInstance[position] = {};
            }
            if (messageInstance[position].instance) return;
            id = instance?.add?.(_noticeProps);
            messageInstance[position].instance = instance as any;
            resolve(null);
          }}
        />,
        div,
      );
    });
  }

  const result = () => {
    messageInstance[position]?.instance?.remove(id);
  };

  return result;
}

const Message = MessageComponent as typeof MessageComponent &
  MessageHookReturnType & {
    clear: () => void;
    config: (options: ConfigMessageProps) => void;
    useMessage: typeof useMessage;
  };

Object.keys(MessageType)
  .filter(type => isNaN(Number(type)))
  .forEach((type: keyof typeof MessageType) => {
    Message[type] = (noticeProps: MessageProps | string) => {
      const props = typeof noticeProps === 'string' ? { content: noticeProps } : noticeProps;
      return addInstance({
        type,
        ...props,
      });
    };
  });

Message.clear = () => {
  Object.values(messageInstance).forEach(({ instance }) => {
    instance?.clear();
  });
};

Message.config = (options: ConfigMessageProps) => {
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
    Object.values(messageInstance).forEach(({ instance }) => instance?.clear());
    messageInstance = {};
  }
};

Message.useMessage = useMessage;

export default Message;
