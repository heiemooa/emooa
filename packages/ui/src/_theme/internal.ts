import type { GenerateStyle } from './interface';
import type { FullToken, GetDefaultToken } from './util/genComponentStyleHook';
import { genStyleHooks } from './util/genComponentStyleHook';
import { merge as mergeToken } from './util/statistic';

export { genStyleHooks, mergeToken };
export type { FullToken, GenerateStyle, GetDefaultToken };
