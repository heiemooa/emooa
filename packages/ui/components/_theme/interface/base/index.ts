import type { SeedToken } from '../seeds';
import type { ColorBaseToken } from './colors';
import type { FontBaseToken } from './font';
import type { SizeBaseToken } from './size';
import type { OtherBaseToken } from './other';
import type { MotionBaseToken } from './motion';

export * from './colors';
export * from './font';
export * from './size';
export * from './other';
export * from './motion';

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================

export interface BaseToken extends SeedToken, ColorBaseToken, OtherBaseToken {
  fonts: Partial<FontBaseToken>;
  sizes: Partial<SizeBaseToken>;
  motions: Partial<MotionBaseToken>;
}
