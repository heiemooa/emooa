import { unit } from '@/_cssinjs';

export default function genMinMax(type: 'css' | 'js') {
  if (type === 'js') {
    return {
      min: Math.min,
      max: Math.max,
    };
  }
  return {
    min: (...args: (string | number)[]) => `min(${args.map(value => unit(value)).join(',')})`,
    max: (...args: (string | number)[]) => `max(${args.map(value => unit(value)).join(',')})`,
  };
}
