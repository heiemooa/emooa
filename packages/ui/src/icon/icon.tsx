import React, { ForwardRefExoticComponent, RefAttributes, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import { ConfigContext } from '../config-provider';

const cache = new Set<string>();

function isValidCustomScriptUrl(url: string): boolean {
  return Boolean(typeof url === 'string' && url.length && !cache.has(url));
}

function createScriptUrlElements(urls: string[], index: number = 0): void {
  const url = urls[index];
  if (isValidCustomScriptUrl(url)) {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('data-namespace', url);
    if (urls.length > index + 1) {
      script.onload = () => {
        createScriptUrlElements(urls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlElements(urls, index + 1);
      };
    }
    cache.add(url);
    document.body.appendChild(script);
  }
}

createScriptUrlElements(['https://at.alicdn.com/t/c/font_4218892_xxgw44ykptf.js']);

function createFromIconfontCN(props) {
  const { url, options = {} } = props;

  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    url &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    if (Array.isArray(url)) {
      // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(url.reverse());
    } else {
      createScriptUrlElements([url]);
    }
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return <Icon ref={ref} {...options} {...props} />;
  });

  return Iconfont;
}

interface IconComponent extends ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> {
  createFromIconfontCN: typeof createFromIconfontCN; // 假设 createFromIconfontCN 是一个函数
}

const Icon: IconComponent = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { prefixCls, getPrefixCls, components } = useContext(ConfigContext);
  const { type, className, ...rest }: IconProps = Object.assign({}, components?.Icon, props);

  const classnames = classNames(
    prefixCls,
    getPrefixCls('icon'),
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    className,
  );

  return (
    <svg
      ref={ref}
      className={classnames}
      height="1em"
      width="1em"
      aria-hidden="true"
      fill="currentColor"
      cursor={!!rest.onClick ? 'pointer' : 'auto'}
      {...rest}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}) as IconComponent; // 避免 TS 不知道 Icon 组件包含 createFromIconfontCN 属性

Icon.createFromIconfontCN = createFromIconfontCN;

export default Icon;
