/**
 * lazy 懒加载参考 https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import React, { useRef, useEffect, useContext, forwardRef, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ImagePreviewProps, ImageProps } from './interface';
import { ConfigContext } from '@/config-provider';
import useStyle from './style';
import { IconImageClose, IconLoading } from '@emooa/icon';
import { ConfigProviderProps } from '@/config-provider/interface';
import useImageStatus from './utils/hooks/useImageStatus';
import useValue from '@/_utils/hooks/useValue';
import ImagePreview from './ImagePreview';
import ImageFooter from './ImageFooter';
import useFooter from './utils/hooks/useFooter';
import ImagePreviewGroup from './ImagePreviewGroup';
import { PreviewGroupContext } from './previewGroupContext';
import omit from '@/_utils/omit';
import { isPlainObject, isNumber, isUndefined } from 'lodash';

type ImagePropsType = ImageProps & { _index?: number };

let uuid = 0;

const ImageComponent = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const refImg = useRef<HTMLImageElement>(null);
  const timeout = useRef<NodeJS.Timeout>(null);
  const observer = useRef<IntersectionObserver>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>();
  const { status, setStatus, isBeforeLoad, isLoading, isLoaded, isError } = useImageStatus('beforeLoad');
  const loading = useRef(false);

  const {
    previewGroup,
    handleVisibleChange: handleGroupVisibleChange,
    registerPreviewUrl,
    registerPreviewProps,
    setCurrentIndex,
    setMousePosition: setGroupMousePosition,
  } = useContext(PreviewGroupContext);

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
    title,
    actions,
    description,
    _index,
    ...rest
  }: ImagePropsType = Object.assign({}, components?.Image, props);

  const preview = useMemo<ImagePreviewProps>(() => {
    if (_preview === false) return {};
    return isPlainObject(_preview) && typeof _preview !== 'boolean'
      ? { ..._preview, src: _preview.src || src }
      : { src };
  }, [_preview]);

  const [previewVisible, setPreviewVisible] = useValue(false, {
    defaultValue: preview.defaultVisible,
    value: preview.visible,
  });

  const [showFooter] = useFooter({ title, description, actions });

  const prefixCls = getPrefixCls('image');

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const isControlled = !isUndefined(preview.visible);

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-motion`]: motion,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-loading-error`]: isError,
      [`${prefixCls}-with-preview`]: isLoaded && !!_preview && !isControlled,
      [`${prefixCls}-with-footer-inner`]: isLoaded && showFooter,
    },
    cssVarCls,
    className,
  );

  const id = useMemo(() => {
    if (!previewGroup) return;
    if (isNumber(_index)) {
      uuid = _index;
      return uuid;
    }
    return uuid++;
  }, []);

  const availablePreviewProps = useMemo(() => {
    return omit(preview, ['visible', 'defaultVisible', 'src', 'onVisibleChange']);
  }, [preview]);

  useEffect(() => {
    if (!previewGroup) return;
    const unRegister = registerPreviewProps(id, availablePreviewProps);
    return () => unRegister(id);
  }, [id, previewGroup, availablePreviewProps]);

  useEffect(() => {
    if (!previewGroup) return;
    const unRegister = registerPreviewUrl(id, preview.src, !!_preview);
    return () => unRegister(id);
  }, [id, previewGroup, preview.src, _preview]);

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
        <>
          <div className={`${prefixCls}-error-icon`}>
            <IconImageClose />
          </div>
          <div className={`${prefixCls}-error-icon-text`}>{alt}</div>
        </>
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
    if (preview && previewGroup) {
      setCurrentIndex(id);
      handleGroupVisibleChange(true);
      setGroupMousePosition({ x: e.clientX, y: e.clientY });
    } else if (preview) {
      togglePreviewVisible(true);
      isLoaded && _preview && !isControlled && setMousePosition({ x: e.clientX, y: e.clientY });
    }
    onClick?.(e);
  }

  function togglePreviewVisible(newVisible) {
    preview.onVisibleChange?.(newVisible, previewVisible);
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
      {isLoaded && showFooter && (
        <ImageFooter title={title} description={description} actions={actions} prefixCls={prefixCls} />
      )}
      {isLoaded && _preview && (
        <ImagePreview
          visible={previewVisible}
          src={preview.src}
          onVisibleChange={togglePreviewVisible}
          mousePosition={mousePosition}
          {...availablePreviewProps}
        />
      )}
    </div>,
  );
});

const Image = ImageComponent as typeof ImageComponent & {
  Preview: typeof ImagePreview;
  PreviewGroup: typeof ImagePreviewGroup;
};

Image.Preview = ImagePreview;
Image.PreviewGroup = ImagePreviewGroup;

// 在 ImagePreviewGroup 组件内 loopImageIndex 函数中需要 displayName 进行逻辑处理
// if (process.env.NODE_ENV !== 'production') {
//   Image.displayName = 'Image';
// }
Image.displayName = 'Image';

export default Image;
