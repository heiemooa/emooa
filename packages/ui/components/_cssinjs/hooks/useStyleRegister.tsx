import hash from '@emotion/hash';
import type * as CSS from 'csstype';
import { removeCSS, updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import * as React from 'react';
import unitless from '@emotion/unitless';
import { compile, serialize, stringify } from 'stylis';
import type Keyframes from '../Keyframes';
import type { Linter } from '../linters';
import { contentQuotesLinter, hashedAnimationLinter } from '../linters';
import type { HashPriority } from '../StyleContext';
import StyleContext, { ATTR_CACHE_PATH, ATTR_MARK, ATTR_TOKEN, CSS_IN_JS_INSTANCE } from '../StyleContext';
import { isClientSide, supportLayer } from '../util';
import { CSS_FILE_STYLE, existPath, getStyleAndHash } from '../util/cacheMapUtil';
import useGlobalCache from './useGlobalCache';
import { Theme } from '../theme';
import type { Transformer } from '../transformers/interface';

const SKIP_CHECK = '_skip_check_';
const MULTI_VALUE = '_multi_value_';

export type CSSProperties = Omit<CSS.PropertiesFallback<number | string>, 'animationName'> & {
  animationName?: CSS.PropertiesFallback<number | string>['animationName'] | Keyframes;
};

export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | readonly Extract<CSSProperties[K], string>[]
    | {
        [SKIP_CHECK]?: boolean;
        [MULTI_VALUE]?: boolean;
        value: CSSProperties[K] | CSSProperties[K][];
      };
};

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

type ArrayCSSInterpolation = readonly CSSInterpolation[];

export type InterpolationPrimitive = null | undefined | boolean | number | string | CSSObject;

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | Keyframes;

export type CSSOthersObject = Record<string, CSSInterpolation>;

export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {}

// ============================================================================
// ==                                 Parser                                 ==
// ============================================================================
// Preprocessor style content to browser support one
export function normalizeStyle(styleStr: string) {
  const serialized = serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ';');
}

function isCompoundCSSProperty(value: CSSObject[string]) {
  return typeof value === 'object' && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}

// 注入 hash 值
function injectSelectorHash(key: string, hashId: string, hashPriority?: HashPriority) {
  if (!hashId) {
    return key;
  }

  const hashClassName = `.${hashId}`;
  const hashSelector = hashPriority === 'low' ? `:where(${hashClassName})` : hashClassName;

  // 注入 hashId
  const keys = key.split(',').map(k => {
    const fullPath = k.trim().split(/\s+/);

    // 如果 Selector 第一个是 HTML Element，那我们就插到它的后面。反之，就插到最前面。
    let firstPath = fullPath[0] || '';
    const htmlElement = firstPath.match(/^\w+/)?.[0] || '';

    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;

    return [firstPath, ...fullPath.slice(1)].join(' ');
  });
  return keys.join(',');
}

export interface ParseConfig {
  hashId?: string;
  hashPriority?: HashPriority;
  layer?: string;
  path?: string;
  transformers?: Transformer[];
  linters?: Linter[];
}

export interface ParseInfo {
  root?: boolean;
  injectHash?: boolean;
  parentSelectors: string[];
}

// Parse CSSObject to style content
const parseStyle = (
  interpolation: CSSInterpolation,
  config: ParseConfig = {},
  { root, injectHash, parentSelectors }: ParseInfo = {
    root: true,
    parentSelectors: [],
  },
): [
  parsedStr: string,
  // Style content which should be unique on all of the style (e.g. Keyframes).
  // Firefox will flick with same animation name when exist multiple same keyframes.
  effectStyle: Record<string, string>,
] => {
  const { hashId, layer, path, hashPriority, transformers = [], linters = [] } = config;
  let styleStr = '';
  let effectStyle: Record<string, string> = {};

  function parseKeyframes(keyframes: Keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors,
      });

      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }

  function flattenList(list: ArrayCSSInterpolation, fullList: CSSObject[] = []) {
    list.forEach(item => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item as CSSObject);
      }
    });

    return fullList;
  }

  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);

  flattenStyleList.forEach(originStyle => {
    // Only root level can use raw string
    const style: CSSObject = typeof originStyle === 'string' && !root ? {} : originStyle;

    if (typeof style === 'string') {
      styleStr += `${style}\n`;
    } else if ((style as any)._keyframe) {
      // Keyframe
      parseKeyframes(style as unknown as Keyframes);
    } else {
      const mergedStyle = transformers.reduce((prev, trans) => trans?.visit?.(prev) || prev, style);

      // Normal CSSObject
      Object.keys(mergedStyle).forEach(key => {
        const value = mergedStyle[key];

        if (
          typeof value === 'object' &&
          value &&
          (key !== 'animationName' || !(value as Keyframes)._keyframe) &&
          !isCompoundCSSProperty(value)
        ) {
          let subInjectHash = false;

          // 当成嵌套对象来处理
          let mergedKey = key.trim();
          // Whether treat child as root. In most case it is false.
          let nextRoot = false;

          // 拆分多个选择器
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith('@')) {
              // 略过媒体查询，交给子节点继续插入 hashId
              subInjectHash = true;
            } else {
              // 注入 hashId
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root && !hashId && (mergedKey === '&' || mergedKey === '')) {
            // In case of `{ '&': { a: { color: 'red' } } }` or `{ '': { a: { color: 'red' } } }` without hashId,
            // we will get `&{a:{color:red;}}` or `{a:{color:red;}}` string for stylis to compile.
            // But it does not conform to stylis syntax,
            // and finally we will get `{color:red;}` as css, which is wrong.
            // So we need to remove key in root, and treat child `{ a: { color: 'red' } }` as root.
            mergedKey = '';
            nextRoot = true;
          }

          const [parsedStr, childEffectStyle] = parseStyle(value as any, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey],
          });

          effectStyle = {
            ...effectStyle,
            ...childEffectStyle,
          };

          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          function appendStyle(cssKey: string, cssValue: any) {
            if (process.env.NODE_ENV !== 'production' && (typeof value !== 'object' || !(value as any)?.[SKIP_CHECK])) {
              [contentQuotesLinter, hashedAnimationLinter, ...linters].forEach(linter =>
                linter(cssKey, cssValue, { path, hashId, parentSelectors }),
              );
            }

            // 如果是样式则直接插入
            const styleName = cssKey.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

            // Auto suffix with px
            let formatValue = cssValue;
            if (!unitless[cssKey] && typeof formatValue === 'number' && formatValue !== 0) {
              formatValue = `${formatValue}px`;
            }

            // handle animationName & Keyframe value
            if (cssKey === 'animationName' && (cssValue as Keyframes)?._keyframe) {
              parseKeyframes(cssValue as Keyframes);
              formatValue = (cssValue as Keyframes).getName(hashId);
            }

            styleStr += `${styleName}:${formatValue};`;
          }

          const actualValue = (value as any)?.value ?? value;
          if (typeof value === 'object' && (value as any)?.[MULTI_VALUE] && Array.isArray(actualValue)) {
            actualValue.forEach(item => {
              appendStyle(key, item);
            });
          } else {
            appendStyle(key, actualValue);
          }
        }
      });
    }
  });

  if (!root) {
    styleStr = `{${styleStr}}`;
  } else if (layer && supportLayer()) {
    const layerCells = layer.split(',');
    const layerName = layerCells[layerCells.length - 1].trim();
    styleStr = `@layer ${layerName} {${styleStr}}`;

    // Order of layer if needed
    if (layerCells.length > 1) {
      // zombieJ: stylis do not support layer order, so we need to handle it manually.
      styleStr = `@layer ${layer}{%%%:%}${styleStr}`;
    }
  }

  return [styleStr, effectStyle];
};

// ============================================================================
// ==                                Register                                ==
// ============================================================================
export function uniqueHash(path: (string | number)[], styleStr: string) {
  return hash(`${path.join('%')}${styleStr}`);
}

function Empty() {
  return null;
}

export const STYLE_PREFIX = 'style';

type StyleCacheValue = [
  styleStr: string,
  tokenKey: string,
  styleId: string,
  effectStyle: Record<string, string>,
  clientOnly: boolean | undefined,
  order: number,
];

/**
 * Register a style to the global style sheet.
 */
export default function useStyleRegister(
  info: {
    theme: Theme<any, any>;
    token: any;
    path: string[];
    hashId?: string;
    layer?: string;
    nonce?: string | (() => string);
    clientOnly?: boolean;
    /**
     * Tell cssinjs the insert order of style.
     * It's useful when you need to insert style
     * before other style to overwrite for the same selector priority.
     */
    order?: number;
  },
  styleFn: () => CSSInterpolation,
) {
  const { token, path, hashId, layer, nonce, clientOnly, order = 0 } = info;
  const { autoClear, mock, defaultCache, hashPriority, container, ssrInline, transformers, linters, cache } =
    React.useContext(StyleContext);
  const tokenKey = token._tokenKey as string;

  const fullPath = [tokenKey, ...path];

  // Check if need insert style
  let isMergedClientSide = isClientSide;
  if (process.env.NODE_ENV !== 'production' && mock !== undefined) {
    isMergedClientSide = mock === 'client';
  }

  const [cachedStyleStr, cachedTokenKey, cachedStyleId] = useGlobalCache<StyleCacheValue>(
    STYLE_PREFIX,
    fullPath,
    // Create cache if needed
    () => {
      const cachePath = fullPath.join('|');

      // Get style from SSR inline style directly
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, tokenKey, styleHash, {}, clientOnly, order];
        }
      }

      // Generate style
      const styleObj = styleFn();
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer,
        path: path.join('-'),
        transformers,
        linters,
      });

      const styleStr = normalizeStyle(parsedStyle);
      const styleId = uniqueHash(fullPath, styleStr);

      return [styleStr, tokenKey, styleId, effectStyle, clientOnly, order];
    },

    // Remove cache if no need
    ([, , styleId], fromHMR) => {
      if ((fromHMR || autoClear) && isClientSide) {
        removeCSS(styleId, { mark: ATTR_MARK });
      }
    },

    // Effect: Inject style here
    ([styleStr, _, styleId, effectStyle]) => {
      if (isMergedClientSide && styleStr !== CSS_FILE_STYLE) {
        const mergedCSSConfig: Parameters<typeof updateCSS>[2] = {
          mark: ATTR_MARK,
          prepend: 'queue',
          attachTo: container,
          priority: order,
        };

        const nonceStr = typeof nonce === 'function' ? nonce() : nonce;

        if (nonceStr) {
          mergedCSSConfig.csp = { nonce: nonceStr };
        }

        const style = updateCSS(styleStr, styleId, mergedCSSConfig);

        (style as any)[CSS_IN_JS_INSTANCE] = cache.instanceId;

        // Used for `useCacheToken` to remove on batch when token removed
        style.setAttribute(ATTR_TOKEN, tokenKey);

        // Debug usage. Dev only
        if (process.env.NODE_ENV !== 'production') {
          style.setAttribute(ATTR_CACHE_PATH, fullPath.join('|'));
        }

        // Inject client side effect style
        Object.keys(effectStyle).forEach(effectKey => {
          updateCSS(normalizeStyle(effectStyle[effectKey]), `_effect-${effectKey}`, mergedCSSConfig);
        });
      }
    },
  );

  return (node: React.ReactElement) => {
    let styleNode: React.ReactElement;

    if (!ssrInline || isMergedClientSide || !defaultCache) {
      styleNode = <Empty />;
    } else {
      styleNode = (
        <style
          {...{
            [ATTR_TOKEN]: cachedTokenKey,
            [ATTR_MARK]: cachedStyleId,
          }}
          dangerouslySetInnerHTML={{ __html: cachedStyleStr }}
        />
      );
    }

    return (
      <>
        {styleNode}
        {node}
      </>
    );
  };
}
