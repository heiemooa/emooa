import React, { useContext, forwardRef, useEffect, useRef, useCallback } from 'react';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import useWatermark from '@/watermark/utils/hooks/useWatermark';
import { WatermarkProps } from './interface';

const watermarkOptionsKey = ['zIndex', 'width', 'height', 'rotate', 'image', 'content', 'font', 'gap', 'offset'];

const Watermark = forwardRef<HTMLDivElement, WatermarkProps>((props: WatermarkProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const {
    className,
    children,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    font,
    gap,
    offset,
    ...rest
  }: WatermarkProps = Object.assign({}, components?.Space, props);

  const prefixCls = getPrefixCls('watermark');
  const [hashId] = useStyle(prefixCls);

  const containerRef = useRef<HTMLDivElement>();

  const getContainer = useCallback(() => {
    return containerRef.current;
  }, [containerRef.current]);

  const watermarkOptions = watermarkOptionsKey.reduce((t, key) => {
    if (key in props) {
      t[key] = props[key];
    }
    return t;
  }, {});

  const classnames = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  const { setWatermark } = useWatermark({
    ...watermarkOptions,
    getContainer,
  });

  useEffect(() => {
    setWatermark({
      ...watermarkOptions,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(font),
    JSON.stringify(gap),
    JSON.stringify(offset),
    getContainer,
  ]);

  return children ? (
    <div className={classnames} ref={containerRef} {...rest}>
      {children}
    </div>
  ) : null;
});

if (process.env.NODE_ENV !== 'production') {
  Watermark.displayName = 'Watermark';
}

export default Watermark;
