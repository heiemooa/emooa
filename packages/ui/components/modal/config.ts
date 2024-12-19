export type ModalConfigType = {};

let modalConfig: ModalConfigType = {};

export const setModalConfig = (config: ModalConfigType) => {
  modalConfig = {
    ...modalConfig,
    ...config,
  };
};

export const getModalConfig = (): ModalConfigType => {
  return modalConfig;
};

export const destroyList: Array<Function> = [];
