import React, { createRef, useRef, ReactElement } from 'react';
import HookModal, { HookModalRef } from './hookModal';
import { normalizeConfig } from '../confirm';
import { ConfirmProps, ModalHookReturnType, ModalReturnProps } from '../interface';
import { destroyList } from '../config';
import ContextHolderElement, { HolderRef } from '@/_utils/contextHolder';

function useModal(): [ModalHookReturnType, ReactElement] {
  const contextHolderRef = useRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;

  let uuid = 0;

  function addNewModal(config) {
    uuid += 1;
    const modalRef = createRef<HookModalRef>();
    let currentConfig = { ...config };

    function afterClose() {
      config.afterClose && config.afterClose();
      removeModalInstance();
    }

    const modal = <HookModal key={uuid} ref={modalRef} {...normalizeConfig({ ...config })} afterClose={afterClose} />;

    contextHolderRef.current?.add(modal);

    function removeModalInstance() {
      contextHolderRef.current?.remove(modal);
    }

    function close() {
      modalRef.current?.close();
    }

    function update(newConfig) {
      currentConfig = {
        ...currentConfig,
        ...newConfig,
      };
      modalRef.current?.update(normalizeConfig({ ...currentConfig }));
    }

    destroyList.push(close);

    return {
      close,
      update,
    };
  }

  const modalFuncs: ModalHookReturnType = {
    confirm: (config: ConfirmProps) => {
      return addNewModal({
        ...config,
      });
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
  };

  ['info', 'success', 'warning', 'error'].forEach((type: keyof Omit<ModalHookReturnType, 'confirm'>) => {
    modalFuncs[type] = (config: ConfirmProps) => {
      return addNewModal({
        ...config,
        isNotice: true,
        noticeType: type,
      });
    };
  });

  return [modalFuncs, holderEle];
}

export default useModal;
