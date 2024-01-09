/**
 * 参考 https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import React, { useRef, useEffect } from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  options: IntersectionObserverInit;
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
  const { src, options, ...rest } = props;
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 加载图片
          imageRef.current!.src = src;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(imageRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img ref={imageRef} {...rest} />;
};

export default Image;
