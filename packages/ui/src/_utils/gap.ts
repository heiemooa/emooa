import { Size } from '@/config-provider/interface';

export function isPresetSize(size?: Size | string | number): size is Size {
  return ['mini', 'small', 'medium', 'large'].includes(size as string);
}

export function isValidGapNumber(size?: Size | string | number): size is number {
  if (!size) {
    // The case of size = 0 is deliberately excluded here, because the default value of the gap attribute in CSS is 0, so if the user passes 0 in, we can directly ignore it.
    return false;
  }
  return typeof size === 'number' && !Number.isNaN(size);
}
