import React, { useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { CopyProps } from './interface';
import { ConfigContext } from '@/config-provider';
import classNames from 'classnames';
import { ConfigProviderProps } from '@/config-provider/interface';
import useStyle from './style';
import { IconCheck, IconCopy, IconLoading } from '@emooa/icon';
import { clipboard } from '@/_utils/react-dom';
import { isNumber, isString } from 'lodash';

const Copy = forwardRef<HTMLDivElement, CopyProps>((props: CopyProps, ref) => {
  const { getPrefixCls, components, rtl }: ConfigProviderProps = useContext(ConfigContext);
  const { className, children, text, hover, onCopy, icon, ...rest }: CopyProps = Object.assign(
    {},
    components?.Copy,
    props,
  );

  const prefixCls = getPrefixCls('copy');
  const [hashId] = useStyle(prefixCls);
  const [state, setState] = useState<'copy' | 'loading' | 'copied'>('copy');
  const copyTimer = useRef(null);

  const classnames = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-hover`]: hover && state === 'copy',
    },
    className,
  );

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
      copyTimer.current = null;
    };
  }, []);

  async function onClickCopy(e) {
    if (state !== 'copy') return;
    let _text = mergedToString(children);
    if (text) {
      if (typeof text === 'string') {
        _text = text;
      } else if (typeof text === 'function') {
        setState('loading');
        _text = await text();
      }
    }

    clipboard(_text);
    setState('copied');
    onCopy?.(_text, e);

    copyTimer.current = setTimeout(() => {
      setState('copy');
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
      <span
        className={classNames(`${prefixCls}-icon`, {
          [`${prefixCls}-icon-loading`]: state === 'loading',
          [`${prefixCls}-icon-copied`]: state === 'copied',
        })}
        onClick={onClickCopy}
      >
        {state === 'copy' && <>{icon?.[0] || <IconCopy />}</>}
        {state === 'loading' && <IconLoading />}
        {state === 'copied' && <>{icon?.[1] || <IconCheck />}</>}
      </span>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Copy.displayName = 'Copy';
}

export default Copy;
