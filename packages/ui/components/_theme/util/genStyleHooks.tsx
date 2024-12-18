/* eslint-disable no-redeclare */
import { useContext } from 'react';

import type { ComponentTokenMap, GlobalToken, OverrideToken, UseComponentStyleResult } from '../interface';
import useToken, { colorPreserve } from '../useToken';
import genCalc from './calc';
import type AbstractCalculator from './calc/calculator';
import genMinMax from './minmax';
import statisticToken, { mergeToken } from './statistic';
import { ConfigContext } from '@/config-provider';
import { CSSInterpolation, useStyleRegister } from '@/_cssinjs';
import { genCommonStyle, genLinkStyle } from '../style';
import { merge } from 'lodash';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<C extends OverrideComponent> = GlobalToken & ComponentTokenMap[C];

type ComponentToken<C extends OverrideComponent> = Exclude<OverrideToken[C], undefined>;

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
    const customToken = { ...(token[component] as ComponentToken<C>) };
    Object.keys(customToken).forEach(key => {
      if (colorPreserve[key]) {
        customToken[`${key}s`] = Object.assign({}, token[`${key}s`], { [6]: customToken[key] }, customToken[`${key}s`]);
      } else if (key.endsWith('s')) {
        const newKey = key.slice(0, -1);
        if (colorPreserve[newKey]) {
          customToken[key] = Object.assign({}, token[key], customToken[key]);
        }
      }
    });

    return (getDefaultToken as (token: GlobalToken) => OverrideTokenWithoutDerivative[C])(
      mergeToken<GlobalToken>(token, customToken),
    );
  }
  return getDefaultToken ?? {};
};

const getComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  defaultToken: OverrideTokenWithoutDerivative[C],
) => {
  const customToken = { ...(token[component] as ComponentToken<C>) };
  Object.keys(customToken).forEach(key => {
    if (colorPreserve[key]) {
      customToken[`${key}s`] = Object.assign({}, token[`${key}s`], { [6]: customToken[key] }, customToken[`${key}s`]);
    } else if (key.endsWith('s')) {
      const newKey = key.slice(0, -1);
      if (colorPreserve[newKey]) {
        customToken[key] = Object.assign({}, token[key], customToken[key]);
      }
    }
  });

  let mergedToken: any = merge({}, defaultToken, customToken);

  // Remove same value as global token to minimize size
  Object.keys(mergedToken).forEach(key => {
    if (mergedToken[key] === token[key as keyof GlobalToken]) {
      delete mergedToken[key];
    }
  });

  return mergedToken;
};

function genComponentStyleHook<C extends OverrideComponent>(
  componentName: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?:
    | null
    | OverrideTokenWithoutDerivative[C]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[C]),
) {
  const cells = (Array.isArray(componentName) ? componentName : [componentName, componentName]) as [C, string];

  const [component] = cells;
  const concatComponent = cells.join('-');

  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, realToken, hashId, token, scheme] = useToken();

    const { getPrefixCls } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    const type = 'js';
    const calc = genCalc(type);
    const { max, min } = genMinMax(type);

    // Shared config
    const sharedConfig: Omit<Parameters<typeof useStyleRegister>[0], 'path'> = {
      theme,
      token,
      hashId,
      nonce: () => '',
    };

    // Generate style for all a tags in eui component.
    useStyleRegister({ ...sharedConfig, clientOnly: false, path: ['Shared', rootPrefixCls] }, () => [
      {
        // Link
        '&': genLinkStyle(token),
      },
    ]);

    const wrapSSR = useStyleRegister({ ...sharedConfig, path: [concatComponent, prefixCls] }, () => {
      const { token: proxyToken, flush } = statisticToken(token);

      const defaultComponentToken = getDefaultComponentToken(component, realToken, getDefaultToken);

      const componentCls = `.${prefixCls}`;
      const componentToken = getComponentToken(component, realToken, defaultComponentToken);

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
        componentToken,
      );

      const styleInterpolation = styleFn(mergedToken as unknown as FullToken<C>, {
        hashId,
        prefixCls,
      });
      flush(component, componentToken);
      return [genCommonStyle(mergedToken, prefixCls), styleInterpolation];
    });

    return [wrapSSR, hashId];
  };
}

export interface SubStyleComponentProps {
  prefixCls: string;
}

export default function genStyleHooks<C extends OverrideComponent>(
  component: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?: GetDefaultToken<C>,
) {
  const useStyle = genComponentStyleHook(component, styleFn, getDefaultToken);

  return (prefixCls: string) => {
    const [, hashId] = useStyle(prefixCls);

    return [hashId] as const;
  };
}
