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

export default React.FC<ImageProps> = (props) => {
  const {
    src,
    delay = 300,
    placeholder = "data:image/svg+xml;base64,PHN2ZyB0PSIxNzA1MDI4NDQ4OTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0MjUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNOTI4IDg5Nkg5NmMtNTMuMDIgMC05Ni00Mi45OC05Ni05NlYyMjRjMC01My4wMiA0Mi45OC05NiA5Ni05Nmg4MzJjNTMuMDIgMCA5NiA0Mi45OCA5NiA5NnY1NzZjMCA1My4wMi00Mi45OCA5Ni05NiA5NnpNMjI0IDI0MGMtNjEuODU2IDAtMTEyIDUwLjE0NC0xMTIgMTEyczUwLjE0NCAxMTIgMTEyIDExMiAxMTItNTAuMTQ0IDExMi0xMTItNTAuMTQ0LTExMi0xMTItMTEyek0xMjggNzY4aDc2OFY1NDRsLTE3NS4wMy0xNzUuMDNjLTkuMzcyLTkuMzcyLTI0LjU2OC05LjM3Mi0zMy45NDIgMEw0MTYgNjQwbC0xMTEuMDMtMTExLjAzYy05LjM3Mi05LjM3Mi0yNC41NjgtOS4zNzItMzMuOTQyIDBMMTI4IDY3MnY5NnoiIGZpbGw9IiNmOGY4ZjgiIHAtaWQ9IjQ0MjYiPjwvcGF0aD48L3N2Zz4=",
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
          if (imageRef.current!.getAttribute("data-lazy")) return;
          if (placeholder && typeof placeholder === "string") {
            timeoutId = setTimeout(() => {
              if (!imageRef.current!.src) {
                imageRef.current!.src = placeholder as string;
              }
            }, delay);
          }

          const image = imageRef.current!.cloneNode(true) as HTMLImageElement;
          image.src = src;
          image.onload = (e) => {
            clearTimeout(timeoutId);
            imageRef.current!.replaceWith(image);
            imageRef.current!.setAttribute("data-lazy", "success");
            observer.unobserve(entry.target);
            onLoad?.(e);
          };
          image.onerror = (e) => {
            imageRef.current!.setAttribute("data-lazy", "error");
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
};
