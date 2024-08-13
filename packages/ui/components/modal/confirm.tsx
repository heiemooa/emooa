import React, { ReactElement } from 'react';
import Modal from './index';
import { destroyList, getConfigProviderProps } from './config';
import { IconCheckCircleFill, IconCloseCircleFill, IconExclamationCircleFill, IconInfoCircleFill } from '@emooa/icon';
import ConfigProvider from '@/config-provider';
import { ConfirmProps } from './interface';
import ReactDOM from 'react-dom/client';
import omit from '@/_utils/omit';
import { merge } from 'lodash';

const ReactDOMRender = (app: ReactElement, container: Element | DocumentFragment) => {
  const root = ReactDOM.createRoot(container);

  root.render(app);

  root._unmount = function () {
    setTimeout(() => {
      root?.unmount?.();
    });
  };
  return root;
};

// 如果是消息提示型弹出框，那么只有确认按钮
export const normalizeConfig = (_config: ConfirmProps): ConfirmProps => {
  let icon = _config.icon;

  if (!icon && icon !== null) {
    icon = <IconExclamationCircleFill />;
    if (_config.isNotice) {
      switch (_config.noticeType) {
        case 'info':
          icon = <IconInfoCircleFill />;
          break;
        case 'success':
          icon = <IconCheckCircleFill />;
          break;
        case 'warning':
          icon = <IconExclamationCircleFill />;
          break;
        case 'error':
          icon = <IconCloseCircleFill />;
          break;
        default:
          break;
      }
    }
  }

  if (_config.isNotice && !_config.footer) {
    _config.footer = (cancelButtonNode, okButtonNode) => <>{okButtonNode}</>;
  }

  _config.title =
    icon === null && _config.title === null ? null : (
      <span>
        {icon}
        {_config.title}
      </span>
    );

  return _config;
};

function confirm(config: ConfirmProps) {
  let root;
  const div = document.createElement('div');
  //   document.body.appendChild(div);

  const configProviderProps = getConfigProviderProps();

  function render(props: ConfirmProps) {
    const dom = (
      <ConfigProvider {...configProviderProps}>
        <Modal {...omit(props, ['noticeType', 'content'])}>{props.content}</Modal>
      </ConfigProvider>
    );
    if (root) {
      root.render(dom);
    } else {
      root = ReactDOMRender(dom, div);
    }
  }

  let modalConfig: ConfirmProps = {
    ...config,
    style: Object.assign({}, { width: 400 }, config.style),
    styles: merge({}, { content: { paddingBlock: 0, marginLeft: '1.625rem' } }, config.styles),
    open: false,
  };
  const onOk = e => {
    let ret = config.onOk?.();
    if (ret && ret.then) {
      modalConfig.confirmLoading = true;
      render(modalConfig);
      ret.then(
        () => {
          onCancel(e, true);
        },
        (e: Error) => {
          console.error(e);
          modalConfig.confirmLoading = false;
          render(modalConfig);
        },
      );
    }
    if (!ret) {
      onCancel(e, true);
    }
  };
  // 如果是promise，那么处理loading和加载完成关闭
  modalConfig.onOk = onOk;
  modalConfig.onCancel = config?.isNotice ? void 0 : onCancel; // 如果是 notice 类型，不支持点击 mask 进行关闭
  modalConfig = normalizeConfig(modalConfig);

  modalConfig.open = true;
  render(modalConfig);

  function destroy() {
    root = root?._unmount();

    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < destroyList.length; i++) {
      const fn = destroyList[i];
      if (fn === close) {
        destroyList.splice(i, 1);
        break;
      }
    }
  }

  function onCancel(e, isOnOk?: boolean) {
    !isOnOk && config.onCancel?.(e);
    modalConfig.open = false;
    modalConfig.afterClose = () => {
      config.afterClose && config.afterClose();
      destroy();
    };
    render(modalConfig);
  }

  function update(newConfig: ConfirmProps) {
    modalConfig = {
      ...modalConfig,
      title: config.title,
      ...newConfig,
    };

    modalConfig = normalizeConfig(modalConfig);
    render(modalConfig);
  }

  function close() {
    modalConfig.open = false;
    modalConfig.afterClose = () => {
      config.afterClose && config.afterClose();
      destroy();
    };
    render(modalConfig);
  }

  destroyList.push(close);

  return {
    close,
    update,
  };
}

export default confirm;
