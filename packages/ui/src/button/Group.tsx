import React, { useContext } from 'react';
import classnames from 'classnames';
import { ButtonGroupProps } from './interface';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import useToken from '@/_theme/useToken';

function Group(props: ButtonGroupProps, ref) {
  const { className, style, children, ...rest } = props;
  const { getPrefixCls }: ConfigProviderProps = useContext(ConfigContext);

  const prefixCls = getPrefixCls('btn-group');
  const [, , hashId] = useToken();

  const classNames = classnames(hashId, prefixCls, className);

  return (
    <div ref={ref} className={classNames} style={style} {...rest}>
      {children}
    </div>
  );
}

const GroupComponent = React.forwardRef<HTMLDivElement, ButtonGroupProps>(Group);

export default GroupComponent;
