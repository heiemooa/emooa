import React, { useContext, forwardRef, useState } from 'react';
import { TagProps } from './interface';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import classNames from 'classnames';
import useStyle from './style';
import { PresetColors } from '@/_theme/interface';
import { includes } from 'lodash';
import Button from '@/button';
import { IconClose, IconLoading } from '@emooa/icon';

const TagComponent = (props: TagProps, ref) => {
  const { getPrefixCls, components, rtl, scheme }: ConfigProviderProps = useContext(ConfigContext);

  const {
    className,
    style,
    color,
    closable,
    checkable,
    children,
    defaultChecked,
    size = 'small',
    onClose,
    onCheck,
    icon,
    closeIcon,
    bordered = true,
    visible: _visible = true,
    ...rest
  }: TagProps = Object.assign({}, components?.Tag, props);

  const prefixCls = getPrefixCls('tag');
  const [hashId] = useStyle(prefixCls);
  const [visible, setVisible] = useState<boolean>(_visible);
  const [loading, setLoading] = useState<boolean>();

  const _color: string = includes(PresetColors, color) ? color : '';

  const classnames = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-${scheme}`,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-hide`]: !visible,
      [`${prefixCls}-${_color}`]: !!_color,
      [`${prefixCls}-custom-color`]: color && !_color,
      [`${prefixCls}-checkable`]: checkable,
      // [`${prefixCls}-checked`]: _checked,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-rtl`]: rtl,
    },
    className,
  );

  const tagStyle: React.CSSProperties = {
    backgroundColor: color && !_color ? color : undefined,
    ...style,
  };

  function onHandleClose(e) {
    const ret = onClose && onClose(e);
    if (ret && ret.then) {
      setLoading(true);
      ret
        .then(() => {
          setLoading(false);
          setVisible(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setVisible(false);
    }
  }

  return (
    <div ref={ref} className={classnames} style={tagStyle} {...rest}>
      {icon && <span className={`${prefixCls}-icon`}>{icon}</span>}
      <span className={`${prefixCls}-content`}>{children}</span>
      {closable && !loading && (
        <Button
          size="mini"
          onClick={onHandleClose}
          className={classNames(`${prefixCls}-close-btn`, {
            [`${prefixCls}-close-custom-btn`]: closeIcon,
          })}
          type="text"
          shape="circle"
          icon={closeIcon || <IconClose />}
        />
      )}
      {loading && (
        <Button
          size="mini"
          disabled
          className={classNames(`${prefixCls}-close-btn`, {
            [`${prefixCls}-close-custom-btn`]: closeIcon,
          })}
          type="text"
          shape="circle"
          icon={<IconLoading />}
        />
      )}
    </div>
  );
};

const Tag = forwardRef<HTMLDivElement, TagProps>(TagComponent);

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

export default Tag;
