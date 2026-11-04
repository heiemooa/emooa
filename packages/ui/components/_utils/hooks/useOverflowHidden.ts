import { useEffect, useRef } from 'react';

interface Option {
  hidden: boolean;
}

interface OverflowLock {
  count: number;
  overflow: string;
  width: string;
  changedOverflow: boolean;
  changedWidth: boolean;
}

const overflowLocks = new WeakMap<HTMLElement, OverflowLock>();

export default function useOverflowHidden(getContainer: () => HTMLElement, { hidden }: Option) {
  const lockedContainer = useRef<HTMLElement | null>(null);

  const getScrollBarWidth = (element: HTMLElement) => {
    return element.tagName === 'BODY'
      ? window.innerWidth - (document.body.clientWidth || document.documentElement.clientWidth)
      : element.offsetWidth - element.clientWidth;
  };

  const setContainerStyle = () => {
    const container = getContainer();
    if (!container) return;
    if (lockedContainer.current === container) return;

    resetContainerStyle();

    const existingLock = overflowLocks.get(container);
    if (existingLock) {
      existingLock.count += 1;
      lockedContainer.current = container;
      return;
    }

    const lock: OverflowLock = {
      count: 1,
      overflow: container.style.overflow,
      width: container.style.width,
      changedOverflow: false,
      changedWidth: false,
    };

    if (container.style.overflow !== 'hidden') {
      const containerScrollBarWidth = getScrollBarWidth(container);
      if (containerScrollBarWidth) {
        container.style.width = `calc(${container.style.width || '100%'} - ${containerScrollBarWidth}px)`;
        lock.changedWidth = true;
      }
      container.style.overflow = 'hidden';
      lock.changedOverflow = true;
    }

    overflowLocks.set(container, lock);
    lockedContainer.current = container;
  };

  const resetContainerStyle = () => {
    const container = lockedContainer.current;
    if (!container) return;
    lockedContainer.current = null;

    const lock = overflowLocks.get(container);
    if (!lock) return;

    lock.count -= 1;
    if (lock.count > 0) return;

    if (lock.changedWidth) container.style.width = lock.width;
    if (lock.changedOverflow) container.style.overflow = lock.overflow;
    overflowLocks.delete(container);
  };

  useEffect(() => {
    hidden ? setContainerStyle() : resetContainerStyle();

    return () => {
      resetContainerStyle();
    };
  }, [getContainer, hidden]);

  return [resetContainerStyle, setContainerStyle];
}
