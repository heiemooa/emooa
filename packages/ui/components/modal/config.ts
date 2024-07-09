import { ConfigProviderProps } from '@/config-provider/interface';

let configProvider = {} as ConfigProviderProps;

export function setConfigProviderProps(configProviderProps: ConfigProviderProps) {
  configProvider = {
    ...configProviderProps,
  };
}

export function getConfigProviderProps() {
  return configProvider;
}

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
