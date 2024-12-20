import React, { useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { CopyProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { IconCheck, IconCopy } from '@emooa/icon';
import { clipboard } from '@/_utils/react-dom';
import { isNumber, isString } from 'lodash';

const Copy = forwardRef<HTMLDivElement, CopyProps>((props: CopyProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const { className, children, text, hover, onCopy, ...rest }: CopyProps = Object.assign({}, components?.Copy, props);

  const prefixCls = getPrefixCls('copy');
  const [hashId] = useStyle(prefixCls);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  const classnames = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-hover`]: hover && !copied,
    },
    className,
  );

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
      copyTimer.current = null;
    };
  }, []);

  function onClickCopy(e) {
    if (copied) return;
    const _text = text || mergedToString(children);
    clipboard(_text);
    setCopied(true);
    onCopy?.(e, _text);

    copyTimer.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  function mergedToString(children: any): string {
    const isSingleNode = (child: React.ReactNode) => {
      return isString(child) || isNumber(child);
    };

    const mergedResult = [''];
    React.Children.forEach(children, child => {
      const prevIndex = mergedResult.length - 1;
      const prevChild = mergedResult[prevIndex];

      if (isSingleNode(child) && isSingleNode(prevChild)) {
        mergedResult[prevIndex] = `${prevChild}${child}`;
      } else if (child && child.props && child.props.children) {
        mergedResult.push(mergedToString(child.props.children));
      }
    });

    return mergedResult.join('');
  }

  return (
    <div ref={ref} className={classnames} {...rest}>
      <article className={`${prefixCls}-content`}>{children}</article>
      <span className={classNames(`${prefixCls}-icon`, { [`${prefixCls}-icon-copied`]: copied })} onClick={onClickCopy}>
        {copied ? <IconCheck /> : <IconCopy />}
      </span>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Copy.displayName = 'Copy';
}

export default Copy;
