import { AnyObject } from '../interface';
import { merge } from 'lodash';

const enableStatistic = process.env.NODE_ENV !== 'production';

let recording = true;

/**
 * This function will do as `Object.assign` in production. But will use Object.defineProperty:get to
 * pass all value access in development. To support statistic field usage with alias token.
 */
export function mergeToken<T extends AnyObject>(...objs: Partial<T>[]): T {
  /* istanbul ignore next */
  if (!enableStatistic) {
    return merge({}, ...objs);
  }

  recording = false;

  const ret = {} as T;

  objs.forEach(obj => {
    const keys = Object.keys(obj);

    keys.forEach(key => {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => obj[key],
      });
    });
  });

  recording = true;

  return ret;
}

/** @internal Internal Usage. Not use in your production. */
export const statistic: Record<string, { global: string[]; component: Record<string, string | number> }> = {};

/* istanbul ignore next */
function noop() {}

/** Statistic token usage case. Should use `merge` function if you do not want spread record. */
const statisticToken = <T extends AnyObject>(token: T) => {
  let tokenKeys: Set<string> | undefined;
  let proxy = token;
  let flush: (componentName: string, componentToken: Record<string, string | number>) => void = noop;

  if (enableStatistic && typeof Proxy !== 'undefined') {
    tokenKeys = new Set<string>();

    proxy = new Proxy(token, {
      get(obj: any, prop: any) {
        if (recording) {
          tokenKeys!.add(prop);
        }
        return obj[prop];
      },
    });

    flush = (componentName, componentToken) => {
      statistic[componentName] = {
        global: Array.from(tokenKeys!),
        component: {
          ...statistic[componentName]?.component,
          ...componentToken,
        },
      };
    };
  }

  return { token: proxy, keys: tokenKeys, flush };
};

export default statisticToken;
