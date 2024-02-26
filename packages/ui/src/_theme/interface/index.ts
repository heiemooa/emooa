import { CSSInterpolation, Theme } from '@/_cssinjs';
import type { AliasToken } from './alias';
import { BaseToken } from './base';
import type { ComponentTokenMap } from './components';
import { SeedToken } from './seeds';

export type AnyObject = Record<PropertyKey, any>;

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

export type ComponentsToken = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    theme?: Theme<SeedToken, BaseToken>;
  };
};

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

export type { AliasToken } from './alias';
export type { ComponentTokenMap } from './components';
export type {
  ColorBaseToken,
  ColorNeutralBaseen,
  MotionBaseToken,
  FontBaseToken,
  BaseToken,
  SizeBaseToken,
  OtherBaseToken,
} from './base';
export { PresetColors } from './presetColors';
export type {
  ColorPalettes,
  PresetColorKey,
  PresetColorType,
  GenerateColorMap,
  GenerateNeutralColorMap,
} from './presetColors';
export type { SeedToken } from './seeds';

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

export type GenerateStyle<ComponentToken extends AnyObject = AliasToken, ReturnType = CSSInterpolation> = (
  token: ComponentToken,
) => ReturnType;
