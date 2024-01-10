/**
 * 参考 https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import React, { useRef, useEffect } from "react";

export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  delay?: number; // The placeholder will be rendered if the url is not loaded within the delay time range.
  placeholder?: string | boolean; // Default image placeholder
  options?: IntersectionObserverInit;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Image = (React.FC<ImageProps> = (props) => {
  const {
    src,
    delay = 300,
    placeholder = "data:image/svg+xml;base64,PHN2ZyB0PSIxNzA0ODY2MTIzNTgwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ3OTgiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHBhdGggZD0iTTkyOCA4OTZIOTZjLTUzLjAyIDAtOTYtNDIuOTgtOTYtOTZWMjI0YzAtNTMuMDIgNDIuOTgtOTYgOTYtOTZoODMyYzUzLjAyIDAgOTYgNDIuOTggOTYgOTZ2NTc2YzAgNTMuMDItNDIuOTggOTYtOTYgOTZ6TTIyNCAyNDBjLTYxLjg1NiAwLTExMiA1MC4xNDQtMTEyIDExMnM1MC4xNDQgMTEyIDExMiAxMTIgMTEyLTUwLjE0NCAxMTItMTEyLTUwLjE0NC0xMTItMTEyLTExMnpNMTI4IDc2OGg3NjhWNTQ0bC0xNzUuMDMtMTc1LjAzYy05LjM3Mi05LjM3Mi0yNC41NjgtOS4zNzItMzMuOTQyIDBMNDE2IDY0MGwtMTExLjAzLTExMS4wM2MtOS4zNzItOS4zNzItMjQuNTY4LTkuMzcyLTMzLjk0MiAwTDEyOCA2NzJ2OTZ6IiBmaWxsPSIjZmNmY2ZjIiBwLWlkPSI0Nzk5Ij48L3BhdGg+PC9zdmc+",
    options,
    onError,
    onLoad,
    ...rest
  } = props;
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (imageRef.current!.getAttribute("layz-image")) return;
          if (placeholder) {
            timeoutId = setTimeout(() => {
              if (!imageRef.current!.src) {
                imageRef.current!.src = placeholder;
              }
            }, delay);
          }

          const image = imageRef.current!.cloneNode(true) as HTMLImageElement;
          image.src = src;
          image.onload = (e) => {
            clearTimeout(timeoutId);
            imageRef.current!.replaceWith(image);
            imageRef.current!.setAttribute("layz-image", "success");
            observer.unobserve(entry.target);
            onLoad?.(e);
          };
          image.onerror = (e) => {
            imageRef.current!.setAttribute("layz-image", "error");
            onError?.(e);
          };
        }
      });
    }, options);

    observer.observe(imageRef.current!);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [src]);

  return <img ref={imageRef} {...rest} />;
});

export default Image;
