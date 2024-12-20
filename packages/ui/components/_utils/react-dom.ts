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

/**
 * 鼠标复制 - 剪切板
 * @param text
 * @returns
 */
export async function clipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      // 仅在执行成功时返回
      return;
    } catch (err) {
      console.error(err ?? new DOMException('The request is not allowed', 'NotAllowedError'));
    }
  }

  const span = document.createElement('span');
  span.textContent = text;

  span.style.whiteSpace = 'pre';

  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    // eslint-disable-next-line
    console.log('error', err);
  }

  selection.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(new DOMException('The request is not allowed', 'NotAllowedError'));
}
