export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  delay?: number; // The placeholder will be rendered if the url is not loaded within the delay time range.
  placeholder?: string | boolean; // Default image placeholder
  options?: IntersectionObserverInit;
  onError?: (e) => void;
  onLoad?: (e) => void;
}
