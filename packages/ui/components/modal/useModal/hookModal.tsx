import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Modal from '../index';
import { ConfirmProps } from '../interface';
import omit from '@/_utils/omit';
import { merge } from 'lodash';

export type HookModalRef = {
  update: (config: ConfirmProps) => void;
  close: () => void;
};

function HookModal(props: ConfirmProps, ref) {
  const [visible, setVisible] = useState(true);
  const [config, setConfig] = useState<ConfirmProps>(props);

  useImperativeHandle(ref, () => ({
    update: (config: ConfirmProps) => {
      setConfig(config);
    },
    close: () => {
      setVisible(false);
    },
  }));

  function onOk() {
    const ret = config.onOk?.();
    if (ret && ret.then) {
      setConfig(config => ({
        ...config,
        confirmLoading: true,
      }));
      ret.then(
        () => {
          setVisible(false);
        },
        (e: Error) => {
          console.error(e);
          setConfig(config => ({
            ...config,
            confirmLoading: false,
          }));
        },
      );
    }
    if (!ret) {
      setVisible(false);
    }
  }

  function onCancel() {
    config.onCancel?.();
    setVisible(false);
  }

  return (
    <Modal
      {...omit(config, ['noticeType', 'content'])}
      open={visible}
      unmountOnExit
      onOk={onOk}
      onCancel={config?.isNotice ? void 0 : onCancel} // 如果是 notice 类型，不支持点击 mask 进行关闭
      style={Object.assign({}, { width: 400 }, config.style)}
      styles={merge({}, { content: { paddingBlock: 0, marginLeft: '1.625rem' } }, config.styles)}
    >
      {config.content}
    </Modal>
  );
}

export default forwardRef<HookModalRef, ConfirmProps>(HookModal);
