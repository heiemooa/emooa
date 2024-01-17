import React from 'react';

const cache = new Set<string>();

function isValidCustomScriptUrl(url: string): boolean {
  return Boolean(typeof url === 'string' && url.length && !cache.has(url));
}

interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  rotate?: number;
}

export interface IconFontProps<T extends string = string>
  extends IconBaseProps {
  icon: T;
}

export function createScriptUrlElements(
  urls: string[],
  index: number = 0,
): void {
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

interface CustomIconOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: Record<string, unknown>;
}
export function createFromIconfontCN<T extends string = string>(
  options: CustomIconOptions = {},
): React.FC<IconFontProps<T>> {
  const { scriptUrl, extraCommonProps = {} } = options;

  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    scriptUrl &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    if (Array.isArray(scriptUrl)) {
      // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl]);
    }
  }

  const Iconfont = React.forwardRef<HTMLSpanElement, IconFontProps<T>>(
    (props, ref) => {
      const { type, children, ...restProps } = props;

      // children > type
      let content: React.ReactNode = null;
      if (props.type) {
        content = <use xlinkHref={`#${type}`} />;
      }
      if (children) {
        content = children;
      }
      return (
        <Icon {...extraCommonProps} {...restProps} ref={ref}>
          {content}
        </Icon>
      );
    },
  );

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
