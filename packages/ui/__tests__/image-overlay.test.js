const React = require('react');
const { createRoot } = require('react-dom/client');
const Image = require('../cjs/image').default;

it('makes an empty overlay transparent to pointer events when loading finishes before the delay', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const onClick = jest.fn();

  try {
    React.act(() => {
      root.render(React.createElement(Image, { src: '/image.png', delay: 1000, onClick, preview: false }));
    });
    const img = container.querySelector('.eui-image-img');
    React.act(() => img.dispatchEvent(new Event('load')));
    const overlay = container.querySelector('.eui-image-overlay');

    expect(overlay.matches(':empty')).toBe(true);
    expect(overlay.style.display).not.toBe('none');
    expect(getComputedStyle(overlay).pointerEvents).toBe('none');
    React.act(() => img.click());
    expect(onClick).toHaveBeenCalledTimes(1);

    React.act(() => img.dispatchEvent(new Event('error')));
    expect(overlay.matches(':empty')).toBe(false);
    expect(getComputedStyle(overlay).pointerEvents).not.toBe('none');
  } finally {
    React.act(() => root.unmount());
    container.remove();
  }
});
