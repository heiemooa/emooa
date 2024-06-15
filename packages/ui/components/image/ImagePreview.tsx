import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ImagePreviewProps } from './interface';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import useValue from '@/_utils/hooks/useValue';
import Portal from '@/portal';
import classNames from 'classnames';

const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>((props, ref) => {
  const { getPrefixCls, components, rtl, locale }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    style,
    src,
    defaultVisible,
    visible: _visible,
    onVisibleChange,
    extra: extraNode = null,
    imgAttributes = {},

    // maskClosable,
    // closable,
    // breakPoint,
    // actions,
    // actionsLayout,
    getPopupContainer,
    // scales,
    // escToExit,
    // imageRender,
    // resetTranslate,
    ...rest
  }: ImagePreviewProps = Object.assign({}, components?.Image?.preview, props);

  const prefixCls = getPrefixCls('image');
  const previewPrefixCls = `${prefixCls}-preview`;

  const classnames = classNames(
    previewPrefixCls,
    {
      [`${previewPrefixCls}-hide`]: !_visible,
      [`${previewPrefixCls}-rtl`]: rtl,
    },
    className,
  );

  const [visible, setVisible] = useValue(false, {
    defaultValue: defaultVisible,
    value: _visible,
  });

  const [container, setContainer] = useState<HTMLElement>();

  const getContainer = useCallback(() => container, [container]);

  useEffect(() => {
    const container = getPopupContainer?.();
    const containerDom = container || document.body;
    setContainer(containerDom);
  }, [getPopupContainer]);

  return (
    <Portal visible={visible} getContainer={getContainer}>
      <div className={classnames} ref={ref}>
        <div className={`${previewPrefixCls}-mask`} />
      </div>
    </Portal>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ImagePreview.displayName = 'ImagePreview';
}

export default ImagePreview;
