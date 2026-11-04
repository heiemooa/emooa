import useToken from '@/_theme/useToken';
import { ConfigContext } from '@/config-provider';
import { ConfigProviderProps } from '@/config-provider/interface';
import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';

export interface DotProps {
  size?: CSSProperties['fontSize'];
}

const DotLoading = React.forwardRef<HTMLDivElement, DotProps>((props, ref) => {
  const { size } = props;
  const { getPrefixCls }: ConfigProviderProps = useContext(ConfigContext);

  const prefixCls = getPrefixCls('spin-dot');
  const [, , hashId] = useToken();

  const classnames = classNames(hashId, prefixCls, `${prefixCls}-${size}`);

  return (
    <div ref={ref} className={classnames}>
      {[...new Array(3)].map((_, index) => {
        return <div key={index} className={`${prefixCls}-item`} />;
      })}
      {[...new Array(3)].map((_, index) => {
        return <div key={index} className={`${prefixCls}-shadow`} />;
      })}
    </div>
  );
});

export default DotLoading;
