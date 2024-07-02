import useToken from '@/_theme/useToken';
import { isNumber } from '@/_utils/is';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';

export interface DotProps {
  size?: CSSProperties['fontSize'];
}

export default function DotLoading(props: DotProps) {
  const { size } = props;
  const { getPrefixCls }: ConfigProviderProps = useContext(ConfigContext);

  const prefixCls = getPrefixCls('spin-dot');
  const [, , hashId] = useToken();

  const classnames = classNames(hashId, prefixCls, `${prefixCls}-${size}`);

  return (
    <div className={classnames}>
      {[...new Array(3)].map((_, index) => {
        return <div key={index} className={`${prefixCls}-item`} />;
      })}
      {[...new Array(3)].map((_, index) => {
        return <div key={index} className={`${prefixCls}-shadow`} />;
      })}
    </div>
  );
}
