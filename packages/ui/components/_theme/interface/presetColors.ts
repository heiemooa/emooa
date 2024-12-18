import { ColorNeutralBaseen } from './base/colors';

export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

export type PresetColorKey = (typeof PresetColors)[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}${ColorPaletteKeyIndex}`]: string;
};

type ColorMap = Record<ColorPaletteKeyIndex, string>;
export type GenerateColorMap = (baseColor: string) => ColorMap;
export type GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => ColorNeutralBaseen;
