import { includes } from 'lodash';

type PlacementType = 'default' | 'full' | 'left';
interface State {
  type: PlacementType;
  style: {
    width: number;
    height: number;
    transition?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface ReducerMapping {
  full: never;
  left: never;
  position: {
    x: number;
    y: number;
  };
  moving: {
    direction: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    movementX: number;
    movementY: number;
    min: {
      x: number;
      y: number;
    };
    max: {
      x: number;
      y: number;
    };
  };
  moved: DOMRect;
}

type Action<T extends keyof ReducerMapping, List extends keyof ReducerMapping> = T extends List
  ? {
      type: T;
      data: ReducerMapping[T];
    }
  : {
      type: T;
    };
export const defaultSize = {
  width: Math.min(400, window.innerWidth - 96),
  height: Math.min(600, window.innerHeight - 96),
};
export function reducer(state: State, action: Action<keyof ReducerMapping, 'moving' | 'position' | 'moved'>): State {
  switch (action.type) {
    case 'full': {
      if (state.type === 'full') {
        return {
          type: 'default',
          style: {
            width: defaultSize.width,
            height: defaultSize.height,
          },
          position: { x: 0, y: 0 },
        };
      } else {
        return {
          type: 'full',
          style: {
            width: Math.max(Math.ceil(window.innerWidth * 0.8), defaultSize.width),
            height: Math.max(Math.ceil(window.innerHeight * 0.8), defaultSize.height),
          },
          position: {
            x: 48 - (window.innerWidth - Math.max(Math.ceil(window.innerWidth * 0.8), defaultSize.width)) / 2,
            y: 48 - (window.innerHeight - Math.max(Math.ceil(window.innerHeight * 0.8), defaultSize.height)) / 2,
          },
        };
      }
    }
    case 'left': {
      if (state.type === 'left') {
        return {
          type: 'default',
          style: {
            width: defaultSize.width,
            height: defaultSize.height,
          },
          position: { x: 0, y: 0 },
        };
      } else {
        return {
          type: 'left',
          style: {
            width: defaultSize.width,
            height: window.innerHeight,
          },
          position: { x: 48, y: 48 },
        };
      }
    }
    case 'position': {
      return {
        type: state.type,
        position: action.data,
        style: {
          width: state.style.width,
          height: state.style.height,
          transition: 'initail',
        },
      };
    }
    case 'moving':
      const style = {
        width: state.style.width,
        height: state.style.height,
        transition: 'initail',
      };

      const position = {
        x: state.position.x,
        y: state.position.y,
      };

      switch (action.data.direction) {
        case 'top-left':
          style.width = Math.min(
            Math.max(Math.min(260, defaultSize.width), state.style.width - action.data.movementX),
            window.innerWidth,
          );
          style.height = Math.min(
            Math.max(Math.min(400, defaultSize.height), state.style.height - action.data.movementY),
            window.innerHeight,
          );
          break;
        case 'top-right':
          style.width = Math.min(
            Math.max(Math.min(260, defaultSize.width), state.style.width + action.data.movementX),
            window.innerWidth,
          );
          style.height = Math.min(
            Math.max(Math.min(400, defaultSize.height), state.style.height - action.data.movementY),
            window.innerHeight,
          );
          if (style.width <= window.innerWidth) {
            if (style.width === window.innerWidth) {
              position.x = Math.min(action.data.max.x, Math.max(action.data.min.x, position.x + action.data.movementX));
            } else {
              position.x = Math.max(action.data.min.x, position.x + action.data.movementX);
            }
          }
          break;
        case 'bottom-left':
          style.width = Math.min(
            Math.max(Math.min(260, defaultSize.width), state.style.width - action.data.movementX),
            window.innerWidth,
          );
          style.height = Math.min(
            Math.max(Math.min(400, defaultSize.height), state.style.height + action.data.movementY),
            window.innerHeight,
          );
          if (style.height <= window.innerHeight) {
            if (style.height === window.innerHeight) {
              position.y = Math.min(action.data.max.y, Math.max(action.data.min.y, position.y + action.data.movementY));
            } else {
              position.y = Math.max(action.data.min.y, position.y + action.data.movementY);
            }
          }
          break;
        case 'bottom-right':
          style.width = Math.min(
            Math.max(Math.min(260, defaultSize.width), state.style.width + action.data.movementX),
            window.innerWidth,
          );
          style.height = Math.min(
            Math.max(Math.min(400, defaultSize.height), state.style.height + action.data.movementY),
            window.innerHeight,
          );

          if (style.width <= window.innerWidth) {
            if (style.width === window.innerWidth) {
              position.x = Math.min(action.data.max.x, Math.max(action.data.min.x, position.x + action.data.movementX));
            } else {
              position.x = Math.max(action.data.min.x, position.x + action.data.movementX);
            }
          }
          if (style.height <= window.innerHeight) {
            if (style.height === window.innerHeight) {
              position.y = Math.min(action.data.max.y, Math.max(action.data.min.y, position.y + action.data.movementY));
            } else {
              position.y = Math.max(action.data.min.y, position.y + action.data.movementY);
            }
          }

          break;
        default:
          break;
      }
      return {
        type: state.type,
        position,
        style,
      };
    case 'moved': {
      const position = {
        x: Math.min(48, state.position.x),
        y: Math.min(48, state.position.y),
        transition: 'initail',
      };

      if (action.data.top < 0) {
        position.y = -(window.innerHeight - state.style.height - 48);
      }
      if (action.data.left < 0) {
        position.x = -(window.innerWidth - state.style.width - 48);
      }

      if (action.data.height >= window.innerHeight) {
        position.y = 48;
      }
      if (action.data.width >= window.innerWidth) {
        position.x = 48;
      }

      return {
        ...state,
        position,
      };
    }
    default:
      return state;
  }
}
