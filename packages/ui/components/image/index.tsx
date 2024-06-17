/**
 * lazy 懒加载参考 https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import React, { useRef, useEffect, useContext, forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { ImagePreviewProps, ImageProps } from './interface';
import { ConfigContext } from '@/config-provider';
import useStyle from './style';
import { IconImageClose, IconLoading } from '@emooa/icon';
import { ConfigProviderProps } from '@/config-provider/interface';
import useImageStatus from './utils/hooks/useImageStatus';
import useValue from '@/_utils/hooks/useValue';
import ImagePreview from './ImagePreview';
import { isObject } from '@/_utils/is';

const ImageComponent = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const refImg = useRef<HTMLImageElement>(null);
  const timeout = useRef<NodeJS.Timeout>(null);
  const observer = useRef<IntersectionObserver>(null);
  const { status, setStatus, isBeforeLoad, isLoading, isLoaded, isError } = useImageStatus('beforeLoad');
  const loading = useRef(false);

  const { getPrefixCls, components, rtl, locale }: ConfigProviderProps = useContext(ConfigContext);

  const {
    src,
    delay,
    placeholder,
    className,
    preview: _preview = true,
    motion = false,
    lazy,
    width,
    height,
    style,
    error,
    alt,
    onError,
    onLoad,
    onClick,
    ...rest
  }: ImageProps = Object.assign({}, components?.Image, props);

  const preview = useMemo<ImagePreviewProps>(() => {
    if (_preview === false) return {};
    return isObject(_preview) ? { ..._preview, src: _preview.src || src } : { src };
  }, [_preview]);

  const [previewVisible, setPreviewVisible] = useValue(false, {
    defaultValue: preview.defaultVisible,
    value: preview.visible,
  });

  const prefixCls = getPrefixCls('image');

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-motion`]: motion,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-loading-error`]: isError,
      [`${prefixCls}-with-preview`]: isLoaded && !!_preview,
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
          setStatus('loading');
        }, delay);
      } else {
        setStatus('loading');
      }
    }
  };

  /**
   * 加载成功
   */
  function onImgLoaded(e) {
    loading.current = false;
    clearTimeout(timeout.current);
    setStatus('loaded');
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
    setStatus('error');
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

  function onImgClick(e) {
    if (preview) {
      togglePreviewVisible(true);
    }
    onClick?.(e);
  }

  function togglePreviewVisible(newVisible) {
    // previewProps.onVisibleChange && previewProps.onVisibleChange(newVisible, previewVisible);
    setPreviewVisible(newVisible);
  }

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
        image-lazy={status}
        onClick={onImgClick}
        {...rest}
      />
      {!isLoaded && (
        <div className={`${prefixCls}-overlay`}>
          {isError && renderError()}
          {isLoading && renderLoader()}
        </div>
      )}
      {isLoaded && _preview && (
        <ImagePreview visible={previewVisible} onVisibleChange={togglePreviewVisible} {...preview} />
      )}
    </div>,
  );
});

const Image = ImageComponent as typeof ImageComponent & {
  Preview: typeof ImagePreview;
};

Image.Preview = ImagePreview;

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
