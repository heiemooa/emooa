import React, {
  Component,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useContext,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import { CustomIconOptions, IconProps } from './interface';
import { ConfigConsumer, ConfigContext } from '../config-provider';

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

function createFromIconfontCN<T extends string = string>(props: CustomIconOptions = {}): React.FC<IconProps<T>> {
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

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps<T>>((props, ref) => {
    return <Icon {...options} {...props} ref={ref} />;
  });

  return Iconfont;
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
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
});

Icon['createFromIconfontCN'] = createFromIconfontCN;

// class Icon extends Component<IconProps> {
//   static createFromIconfontCN = createFromIconfontCN;

//   renderIcon = ({ prefixCls, getPrefixCls, components }) => {
//     const { type, className, ...rest }: IconProps = Object.assign({}, components?.Icon, this.props);

//     const classnames = classNames(
//       prefixCls,
//       getPrefixCls('icon'),
//       {
//         [`${prefixCls}-${type}`]: !!type,
//       },
//       className,
//     );

//     return (
//       <svg
//         className={classnames}
//         height="1em"
//         width="1em"
//         aria-hidden="true"
//         fill="currentColor"
//         cursor={!!rest.onClick ? 'pointer' : 'auto'}
//         {...rest}
//       >
//         <use xlinkHref={`#${type}`}></use>
//       </svg>
//     );
//   };

//   render(): React.ReactNode {
//     return <ConfigConsumer>{this.renderIcon}</ConfigConsumer>;
//   }
// }

export default Icon;
