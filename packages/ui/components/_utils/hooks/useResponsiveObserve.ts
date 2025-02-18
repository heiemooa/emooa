import { GlobalToken } from '@/_theme/interface';
import useToken from '@/_theme/useToken';
import React from 'react';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint, string>>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;

export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const validateBreakpoints = (token: GlobalToken) => {
  const screens: any = token['screens'];
  const revBreakpoints = [...responsiveArray].reverse();

  revBreakpoints.forEach((breakpoint: Breakpoint, i: number) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `${breakpointUpper}Min`;
    const screen = breakpointUpper;

    if (!(screens[screenMin] <= screens[screen])) {
      throw new Error(`${screenMin}<=${screen} fails : !(${screens[screenMin]}<=${screens[screen]})`);
    }

    if (i < revBreakpoints.length - 1) {
      const screenMax = `${breakpointUpper}Max`;

      if (!(screens[screen] <= screens[screenMax])) {
        throw new Error(`${screen}<=${screenMax} fails : !(${screens[screen]}<=${screens[screenMax]})`);
      }

      const nextBreakpointUpperMin: string = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `${nextBreakpointUpperMin}Min`;

      if (!(screens[screenMax] <= screens[nextScreenMin])) {
        throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${screens[screenMax]}<=${screens[nextScreenMin]})`);
      }
    }
  });
  return token;
};

const getResponsiveMap = (token: GlobalToken): BreakpointMap => ({
  xs: `(max-width: ${token.screens.XS}px)`,
  sm: `(min-width: ${token.screens.SM}px)`,
  md: `(min-width: ${token.screens.MD}px)`,
  lg: `(min-width: ${token.screens.LG}px)`,
  xl: `(min-width: ${token.screens.XL}px)`,
  xxl: `(min-width: ${token.screens.XXL}px)`,
});

type SubscribeFunc = (screens: ScreenMap, breakpointChecked?: Breakpoint) => void;

export default function useResponsiveObserver() {
  const [, token] = useToken();
  const responsiveMap: BreakpointMap = getResponsiveMap(validateBreakpoints(token));

  // To avoid repeat create instance, we add `useMemo` here.
  return React.useMemo(() => {
    const subscribers = new Map<number, SubscribeFunc>();
    let subUid = -1;
    let screens: Partial<Record<Breakpoint, boolean>> = {};

    return {
      matchHandlers: {} as {
        [prop: string]: {
          mql: MediaQueryList;
          listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void;
        };
      },
      dispatch(pointMap: ScreenMap) {
        screens = pointMap;
        subscribers.forEach(func => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func: SubscribeFunc): number {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      unregister() {
        Object.keys(responsiveMap).forEach(screen => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint];
          const handler = this.matchHandlers[matchMediaQuery];
          handler?.mql.removeListener(handler?.listener);
        });
        subscribers.clear();
      },
      register() {
        Object.keys(responsiveMap).forEach(screen => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint];
          const listener = ({ matches }: { matches: boolean }) => {
            this.dispatch({
              ...screens,
              [screen]: matches,
            });
          };
          const mql = window.matchMedia(matchMediaQuery);
          mql.addListener(listener);
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener,
          };
          listener(mql);
        });
      },
      responsiveMap,
    };
  }, [token]);
}

// const responsiveObserve = {
//   matchHandlers: {},
//   dispatch(pointMap: ScreenMap, breakpointChecked: Breakpoint) {
//     screens = pointMap;
//     if (subscribers.length < 1) {
//       return false;
//     }

//     subscribers.forEach(item => {
//       item.func(screens, breakpointChecked);
//     });

//     return true;
//   },
//   subscribe(func: SubscribeFunc) {
//     if (subscribers.length === 0) {
//       this.register();
//     }
//     const token = (++subUid).toString();
//     subscribers.push({
//       token,
//       func,
//     });
//     func(screens, null);
//     return token;
//   },
//   unsubscribe(token: string) {
//     subscribers = subscribers.filter(item => item.token !== token);
//     if (subscribers.length === 0) {
//       this.unregister();
//     }
//   },
//   unregister() {
//     Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
//       const matchMediaQuery = responsiveMap[screen];
//       const handler = this.matchHandlers[matchMediaQuery];
//       if (handler && handler.mql && handler.listener) {
//         handler.mql.removeListener(handler.listener);
//       }
//     });
//   },
//   register() {
//     Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
//       const matchMediaQuery = responsiveMap[screen];
//       const listener = ({ matches }: { matches: boolean }) => {
//         this.dispatch(
//           {
//             ...screens,
//             [screen]: matches,
//           },
//           screen,
//         );
//       };
//       const mql = window.matchMedia(matchMediaQuery);
//       mql.addListener(listener);
//       this.matchHandlers[matchMediaQuery] = {
//         mql,
//         listener,
//       };

//       listener(mql);
//     });
//   },
// };

// export default responsiveObserve;
