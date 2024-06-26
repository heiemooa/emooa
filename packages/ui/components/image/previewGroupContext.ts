import { createContext } from 'react';
import { ImagePreviewProps } from './interface';

export interface PreviewUrl {
  url: string;
  preview: boolean;
}

export type PreviewUrlMap = Map<number, PreviewUrl>;

export type UnRegisterPreviewUrl = (id: number) => void;
export type UnRegisterPreviewProps = (id: number) => void;

export type RegisterPreviewUrl = (id: number, url: string, preview: boolean) => UnRegisterPreviewUrl;

export type RegisterPreviewProps = (id: number, previewProps?: Partial<ImagePreviewProps>) => UnRegisterPreviewProps;

export interface PreviewGroupContextProps {
  previewGroup: boolean;
  previewUrlMap: Map<number, string>;
  previewPropsMap: Map<number, Partial<ImagePreviewProps>>;
  loop?: boolean;
  currentIndex: number;
  setMousePosition: (mousePosition: { x: number; y: number }) => void;
  setCurrentIndex: (current: number) => void;
  setPreviewUrlMap: (map: PreviewUrlMap) => void;
  registerPreviewUrl: RegisterPreviewUrl;
  registerPreviewProps: RegisterPreviewProps;
  visible: boolean;
  handleVisibleChange: (visible: boolean, preVisible?: boolean) => void;
}

export const PreviewGroupContext = createContext<PreviewGroupContextProps>({
  previewGroup: false,
  previewUrlMap: new Map(),
  previewPropsMap: new Map(),
  loop: true,
  currentIndex: 0,
  setMousePosition: () => null,
  setCurrentIndex: () => null,
  setPreviewUrlMap: () => null,
  registerPreviewUrl: () => null,
  registerPreviewProps: () => null,
  visible: false,
  handleVisibleChange: () => null,
});
