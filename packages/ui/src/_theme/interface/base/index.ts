import type { SeedToken } from '../seeds';
import type { ColorBaseToken } from './colors';
import type { FontBaseToken } from './font';
import type { SizeBaseToken } from './size';
import type { MotionBaseToken } from './motion';
import type { OtherBaseToken } from './other';

export * from './colors';
export * from './font';
export * from './size';
export * from './motion';
export * from './other';

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================

export interface BaseToken
  extends SeedToken,
    ColorBaseToken,
    SizeBaseToken,
    OtherBaseToken,
    FontBaseToken,
    MotionBaseToken {}
