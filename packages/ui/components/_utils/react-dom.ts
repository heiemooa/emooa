import { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';

export const render = (
  app: ReactElement,
  container: Element | DocumentFragment,
): {
  render: (container: ReactElement) => void;
  _unmount: () => void;
} => {
  const root = ReactDOM.createRoot(container);

  root.render(app);

  root._unmount = function () {
    setTimeout(() => {
      root?.unmount?.();
    });
  };
  return root;
};
