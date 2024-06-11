/**
 * lazy 懒加载参考 https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import React, { useRef, useEffect, useContext, forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import { ImageProps } from './interface';
import { ConfigContext } from '@/config-provider';
import useStyle from './style';
import { IconImageClose, IconLoading } from '@emooa/icon';
import { ConfigProviderProps } from '@/config-provider/interface';

type Loaded = 'loading' | 'error' | 'loaded';

const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const refImg = useRef<HTMLImageElement>(null);
  const timeout = useRef<NodeJS.Timeout>(null);
  const observer = useRef<IntersectionObserver>(null);
  const [loaded, setLoaded] = useState<Loaded>('loading');
  const loading = useRef(false);

  const { getPrefixCls, components, rtl, locale }: ConfigProviderProps = useContext(ConfigContext);

  const {
    src,
    delay,
    placeholder,
    className,
    onError,
    onLoad,
    preview = true,
    lazy,
    width,
    height,
    style,
    error,
    alt,
    ...rest
  }: ImageProps = Object.assign({}, components?.Image, props);

  const prefixCls = getPrefixCls('image');

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-loading`]: loaded === 'loading',
      [`${prefixCls}-loading-error`]: loaded === 'error',
      [`${prefixCls}-with-preview`]: loaded === 'loaded' && preview,
    },
    cssVarCls,
    className,
  );

  useEffect(() => {
    if (!refImg.current) return;
    onImageLazyLoad();
    return () => {
      observer.current?.disconnect?.();
      clearTimeout(timeout.current);
    };
  }, [src]);

  const onImageLazyLoad = () => {
    loading.current = true;

    /**
     * 懒加载
     */
    if (lazy) {
      const options = typeof lazy === 'boolean' ? undefined : lazy;
      observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            onImageLoad();
          }
        });
      }, options);
      observer.current.observe(refImg.current!);
    } else {
      /**
       * 普通加载
       */
      onImageLoad();
    }
  };

  /**
   * 加载图片
   */
  const onImageLoad = () => {
    if (refImg.current.src !== src) {
      refImg.current.src = src;
    } else {
      if (refImg.current.getAttribute('image-lazy') === 'error') {
        refImg.current.src = `${src}?${Date.now()}`;
        refImg.current.getAttribute('image-lazy') === 'loading';
        loading.current = true;
      }
    }

    if (loading.current && !refImg.current.complete) {
      if (delay) {
        timeout.current = setTimeout(() => {
          setLoaded('loading');
        }, delay);
      } else {
        setLoaded('loading');
      }
    }
  };

  /**
   * 加载成功
   */
  function onImgLoaded(e) {
    loading.current = false;
    clearTimeout(timeout.current);
    setLoaded('loaded');
    if (lazy) {
      observer.current.unobserve(e.target);
    }
    onLoad?.(e);
  }

  /**
   * 加载失败
   */
  function onImgLoadError(e) {
    loading.current = false;
    clearTimeout(timeout.current);
    setLoaded('error');
    onError?.(e);
  }

  const renderError = () => (
    <div className={`${prefixCls}-error`}>
      {error || (
        <div className={`${prefixCls}-error-icon`}>
          <IconImageClose />
          <div className={`${prefixCls}-error-icon-text`}>{alt}</div>
        </div>
      )}
    </div>
  );

  const DefaultLoader = (
    <div className={`${prefixCls}-loader`}>
      <div className={`${prefixCls}-loader-spin`}>
        <IconLoading />
        <div className={`${prefixCls}-loader-spin-text`}>{locale.Image.loading}</div>
      </div>
    </div>
  );

  const renderLoader = () => {
    if (placeholder === true) return DefaultLoader;
    const ele = placeholder ? (
      <div className={`${prefixCls}-loader`}>
        {typeof placeholder === 'string' ? (
          <img
            className={`${prefixCls}-loader-placeholder`}
            src={placeholder}
            width={width}
            height={height}
            {...rest}
          />
        ) : (
          placeholder
        )}
      </div>
    ) : (
      DefaultLoader
    );
    // 懒加载展示占位。
    if (lazy || placeholder || delay) {
      return ele;
    }
    return null;
  };

  return wrapCSSVar(
    <div
      ref={ref}
      className={classnames}
      style={Object.assign(
        {
          width,
          height,
        },
        style,
      )}
    >
      <img
        className={`${prefixCls}-img`}
        ref={refImg}
        alt={alt}
        width={width}
        height={height}
        onLoad={onImgLoaded}
        onError={onImgLoadError}
        src={lazy ? undefined : src}
        image-lazy={loaded}
        {...rest}
      />
      {loaded !== 'loaded' && (
        <div className={`${prefixCls}-overlay`}>
          {loaded === 'error' && renderError()}
          {loaded === 'loading' && renderLoader()}
        </div>
      )}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
