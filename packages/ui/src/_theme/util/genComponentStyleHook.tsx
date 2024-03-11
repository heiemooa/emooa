/* eslint-disable no-redeclare */
import type { ComponentType, FC, ReactElement } from 'react';
import React, { useContext } from 'react';
import { warning } from 'rc-util';

import type { ComponentTokenMap, GlobalToken, OverrideToken, UseComponentStyleResult } from '../interface';
import useToken, { ignore, unitless } from '../useToken';
import genCalc from './calc';
import type AbstractCalculator from './calc/calculator';
import genMinMax from './minmax';
import statisticToken, { merge as mergeToken } from './statistic';
import { ConfigContext } from '@/config-provider';
import { CSSInterpolation, token2CSSVar, useCSSVarRegister, useStyleRegister } from '@/_cssinjs';
import { genCommonStyle, genLinkStyle } from '../style';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<C extends OverrideComponent> = GlobalToken & ComponentTokenMap[C];

type ComponentToken<C extends OverrideComponent> = Exclude<OverrideToken[C], undefined>;
type ComponentTokenKey<C extends OverrideComponent> = keyof ComponentToken<C>;

export interface StyleInfo {
  hashId: string;
  prefixCls: string;
}

export type CSSUtil = {
  calc: (number: any) => AbstractCalculator;
  max: (...values: (number | string)[]) => number | string;
  min: (...values: (number | string)[]) => number | string;
};

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  /** Wrap icon class with `.` prefix */
  iconCls: string;
  /** Wrap eui prefixCls class with `.` prefix */
  euiCls: string;
} & CSSUtil;

export type FullToken<C extends OverrideComponent> = TokenWithCommonCls<GlobalTokenWithComponent<C>>;

export type GenStyleFn<C extends OverrideComponent> = (token: FullToken<C>, info: StyleInfo) => CSSInterpolation;

export type GetDefaultToken<C extends OverrideComponent> =
  | null
  | OverrideTokenWithoutDerivative[C]
  | ((token: GlobalToken) => OverrideTokenWithoutDerivative[C]);

export type FormatComponentToken<C extends OverrideComponent> = (
  token: NonNullable<OverrideTokenWithoutDerivative[C]>,
) => NonNullable<OverrideTokenWithoutDerivative[C]>;

const getDefaultComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  getDefaultToken: GetDefaultToken<C>,
) => {
  if (typeof getDefaultToken === 'function') {
    return (getDefaultToken as (token: GlobalToken) => OverrideTokenWithoutDerivative[C])(
      mergeToken<GlobalToken>(token, token[component] ?? {}),
    );
  }
  return getDefaultToken ?? {};
};

const getComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  defaultToken: OverrideTokenWithoutDerivative[C],
  options?: {
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    format?: FormatComponentToken<C>;
  },
) => {
  const customToken = { ...(token[component] as ComponentToken<C>) };
  if (options?.deprecatedTokens) {
    const { deprecatedTokens } = options;
    deprecatedTokens.forEach(([oldTokenKey, newTokenKey]) => {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          !customToken?.[oldTokenKey],
          `The token '${String(oldTokenKey)}' of ${component} had deprecated, use '${String(newTokenKey)}' instead.`,
        );
      }

      // Should wrap with `if` clause, or there will be `undefined` in object.
      if (customToken?.[oldTokenKey] || customToken?.[newTokenKey]) {
        customToken[newTokenKey] ??= customToken?.[oldTokenKey];
      }
    });
  }
  let mergedToken: any = { ...defaultToken, ...customToken };
  if (options?.format) {
    mergedToken = options.format(mergedToken);
  }

  // Remove same value as global token to minimize size
  Object.keys(mergedToken).forEach(key => {
    if (mergedToken[key] === token[key as keyof GlobalToken]) {
      delete mergedToken[key];
    }
  });

  return mergedToken;
};

const getCompVarPrefix = (component: string, prefix?: string) =>
  `${[prefix, component.replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2')]
    .filter(Boolean)
    .join('-')}`;

export default function genComponentStyleHook<C extends OverrideComponent>(
  componentName: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?:
    | null
    | OverrideTokenWithoutDerivative[C]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[C]),
  options: {
    resetStyle?: boolean;
    // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style. Default is -999.
     */
    order?: number;
    format?: FormatComponentToken<C>;
    injectStyle?: boolean;
  } = {},
) {
  const cells = (Array.isArray(componentName) ? componentName : [componentName, componentName]) as [C, string];

  const [component] = cells;
  const concatComponent = cells.join('-');

  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, realToken, hashId, token, cssVar] = useToken();
    const { getPrefixCls } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    const type = cssVar ? 'css' : 'js';
    const calc = genCalc(type);
    const { max, min } = genMinMax(type);

    // Shared config
    const sharedConfig: Omit<Parameters<typeof useStyleRegister>[0], 'path'> = {
      theme,
      token,
      hashId,
      nonce: () => '',
      clientOnly: options.clientOnly,

      // eui is always at top of styles
      order: options.order || -999,
    };

    // Generate style for all a tags in eui component.
    useStyleRegister({ ...sharedConfig, clientOnly: false, path: ['Shared', rootPrefixCls] }, () => [
      {
        // Link
        '&': genLinkStyle(token),
      },
    ]);

    const wrapSSR = useStyleRegister({ ...sharedConfig, path: [concatComponent, prefixCls] }, () => {
      if (options.injectStyle === false) {
        return [];
      }

      const { token: proxyToken, flush } = statisticToken(token);

      const defaultComponentToken = getDefaultComponentToken(component, realToken, getDefaultToken);

      const componentCls = `.${prefixCls}`;
      const componentToken = getComponentToken(component, realToken, defaultComponentToken, {
        deprecatedTokens: options.deprecatedTokens,
        format: options.format,
      });

      if (cssVar) {
        Object.keys(defaultComponentToken).forEach(key => {
          defaultComponentToken[key] = `var(${token2CSSVar(key, getCompVarPrefix(component, cssVar.prefix))})`;
        });
      }
      const mergedToken = mergeToken<TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>>(
        proxyToken,
        {
          componentCls,
          prefixCls,
          euiCls: `.${rootPrefixCls}`,
          calc,
          max,
          min,
        },
        cssVar ? defaultComponentToken : componentToken,
      );

      const styleInterpolation = styleFn(mergedToken as unknown as FullToken<C>, {
        hashId,
        prefixCls,
      });
      flush(component, componentToken);
      return [options.resetStyle === false ? null : genCommonStyle(mergedToken, prefixCls), styleInterpolation];
    });

    return [wrapSSR, hashId];
  };
}

export interface SubStyleComponentProps {
  prefixCls: string;
}

// Get from second argument
type RestParameters<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export const genSubStyleComponent: <C extends OverrideComponent>(
  componentName: [C, string],
  ...args: RestParameters<Parameters<typeof genComponentStyleHook<C>>>
) => ComponentType<SubStyleComponentProps> = (componentName, styleFn, getDefaultToken, options) => {
  const useStyle = genComponentStyleHook(componentName, styleFn, getDefaultToken, {
    resetStyle: false,

    // Sub Style should default after root one
    order: -998,
    ...options,
  });

  const StyledComponent: ComponentType<SubStyleComponentProps> = ({ prefixCls }: SubStyleComponentProps) => {
    useStyle(prefixCls);
    return null;
  };

  if (process.env.NODE_ENV !== 'production') {
    StyledComponent.displayName = `SubStyle_${Array.isArray(componentName) ? componentName.join('.') : componentName}`;
  }

  return StyledComponent;
};

export type CSSVarRegisterProps = {
  rootCls: string;
  component: string;
  cssVar: {
    prefix?: string;
    key?: string;
  };
};

const genCSSVarRegister = <C extends OverrideComponent>(
  component: C,
  getDefaultToken?: GetDefaultToken<C>,
  options?: {
    unitless?: {
      [key in ComponentTokenKey<C>]: boolean;
    };
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    format?: FormatComponentToken<C>;
    injectStyle?: boolean;
  },
) => {
  function prefixToken(key: string) {
    return `${component}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
  }

  const { unitless: originUnitless = {}, injectStyle = true } = options ?? {};
  const compUnitless: any = {
    [prefixToken('zIndexPopup')]: true,
  };
  Object.keys(originUnitless).forEach((key: keyof ComponentTokenKey<C>) => {
    compUnitless[prefixToken(key)] = originUnitless[key];
  });

  const CSSVarRegister: FC<CSSVarRegisterProps> = ({ rootCls, cssVar }) => {
    const [, realToken] = useToken();
    useCSSVarRegister(
      {
        path: [component],
        prefix: cssVar.prefix,
        key: cssVar?.key!,
        unitless: {
          ...unitless,
          ...compUnitless,
        },
        ignore,
        token: realToken,
        scope: rootCls,
      },
      () => {
        const defaultToken = getDefaultComponentToken(component, realToken, getDefaultToken);
        const componentToken = getComponentToken(component, realToken, defaultToken, {
          format: options?.format,
          deprecatedTokens: options?.deprecatedTokens,
        });
        Object.keys(defaultToken).forEach(key => {
          componentToken[prefixToken(key)] = componentToken[key];
          delete componentToken[key];
        });
        return componentToken;
      },
    );
    return null;
  };

  const useCSSVar = (rootCls: string) => {
    const [, , , , cssVar] = useToken();

    return [
      (node: ReactElement): ReactElement =>
        injectStyle && cssVar ? (
          <>
            <CSSVarRegister rootCls={rootCls} cssVar={cssVar} component={component} />
            {node}
          </>
        ) : (
          node
        ),
      cssVar?.key,
    ] as const;
  };

  return useCSSVar;
};

export const genStyleHooks = <C extends OverrideComponent>(
  component: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?: GetDefaultToken<C>,
  options?: {
    resetStyle?: boolean;
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    /**
     * Chance to format component token with user input.
     * Useful when need calculated token as css variables.
     */
    format?: FormatComponentToken<C>;
    /**
     * Component tokens that do not need unit.
     */
    unitless?: {
      [key in ComponentTokenKey<C>]: boolean;
    };
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style.
     * @default -999
     */
    order?: number;
    /**
     * Whether generate styles
     * @default true
     */
    injectStyle?: boolean;
  },
) => {
  const useStyle = genComponentStyleHook(component, styleFn, getDefaultToken, options);

  const useCSSVar = genCSSVarRegister(Array.isArray(component) ? component[0] : component, getDefaultToken, options);

  return (prefixCls: string, rootCls: string = prefixCls) => {
    const [, hashId] = useStyle(prefixCls);
    const [wrapCSSVar, cssVarCls] = useCSSVar(rootCls);

    return [wrapCSSVar, hashId, cssVarCls] as const;
  };
};
