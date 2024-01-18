import React from 'react';
import Icon, { IconProps } from './icon';

const cache = new Set<string>();

function isValidCustomScriptUrl(url: string): boolean {
  return Boolean(typeof url === 'string' && url.length && !cache.has(url));
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
  url?: string | string[];
  options?: Record<string, unknown>;
}

export function createFromIconfontCN<T extends string = string>(
  props: CustomIconOptions = {},
): React.FC<IconProps<T>> {
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

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps<T>>(
    (props, ref) => {
      return <Icon {...options} {...props} ref={ref} />;
    },
  );

  return Iconfont;
}
