interface ImageBaseProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  preview?: boolean; // 是否开启预览
  src?: string;
  error?: React.ReactNode; // 错误状态下显示的内容
  delay?: number; // The placeholder will be rendered if the url is not loaded within the delay time range.
  placeholder?: boolean | string | React.ReactNode; // Default image placeholder
  onError?: (e: any) => void;
  onLoad?: (e: any) => void;
}

export type ObserverImageProps = {
  lazy: boolean | IntersectionObserverInit; // 开启懒加载
} & ImageBaseProps;

export type ImageProps = Partial<ObserverImageProps>;
