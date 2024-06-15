import type { GenerateStyle } from './interface';
import type { FullToken, GetDefaultToken } from './util/genStyleHooks';
import { merge as mergeToken } from './util/statistic';

export { default as genStyleHooks } from './util/genStyleHooks';
export { mergeToken };
export type { FullToken, GenerateStyle, GetDefaultToken };
