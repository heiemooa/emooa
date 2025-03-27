import { useEffect } from 'react';
import { throttle } from 'lodash';

export default function useResizeObserver(ref, setSize, delay = 300) {
  useEffect(() => {
    const handleResize = throttle(entries => {
      entries.forEach(entry => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    }, delay);

    const currentRef = ref?.current;
    if (currentRef) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(currentRef);

      return () => {
        resizeObserver.disconnect();
        handleResize.cancel(); // 取消 throttle
      };
    }
  }, [ref, setSize, delay]);
}
