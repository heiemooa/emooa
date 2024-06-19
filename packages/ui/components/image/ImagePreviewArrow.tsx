import React, { useContext } from 'react';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import { ConfigContext } from '@/config-provider';
import { IconLeft, IconRight } from '@emooa/icon';

interface ImagePreviewArrowProps {
  current: number;
  previewCount: number;
  loop?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

function ImagePreviewArrow(props: ImagePreviewArrowProps) {
  const { current, previewCount, loop = false, onPrev, onNext } = props;
  const { getPrefixCls }: ConfigProviderProps = useContext(ConfigContext);

  const prefixCls = getPrefixCls('image-preview');
  const classnames = classNames(`${prefixCls}-arrow`);
  const disableLeft = !loop && current <= 0;
  const disableRight = !loop && current >= previewCount - 1;

  return (
    <div className={classnames}>
      <div
        className={classNames(`${prefixCls}-arrow-left`, {
          [`${prefixCls}-arrow-disabled`]: disableLeft,
        })}
        onClick={e => {
          e.preventDefault();
          !disableLeft && onPrev?.();
        }}
      >
        <IconLeft />
      </div>
      <div
        className={classNames(`${prefixCls}-arrow-right`, {
          [`${prefixCls}-arrow-disabled`]: disableRight,
        })}
        onClick={e => {
          e.preventDefault();
          !disableRight && onNext?.();
        }}
      >
        <IconRight />
      </div>
    </div>
  );
}

export default ImagePreviewArrow;
