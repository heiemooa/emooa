const React = require('react');
const { createRoot } = require('react-dom/client');
const useOverflowHidden = require('../cjs/_utils/hooks/useOverflowHidden').default;
const Modal = require('../cjs/modal').default;
const Drawer = require('../cjs/drawer').default;
const Image = require('../cjs/image').default;

function OverflowLock({ hidden }) {
  useOverflowHidden(() => document.body, { hidden });
  return null;
}

function renderWithRoot(element) {
  const container = document.createElement('div');
  const root = createRoot(container);
  React.act(() => root.render(element));
  return {
    container,
    root,
    render: nextElement => React.act(() => root.render(nextElement)),
    unmount: () => React.act(() => root.unmount()),
  };
}

describe('Modal and image regressions', () => {
  it('keeps the shared container locked until every overlay releases it', () => {
    document.body.style.overflow = 'auto';
    document.body.style.width = '80%';
    const first = renderWithRoot(React.createElement(OverflowLock, { hidden: true }));
    const second = renderWithRoot(React.createElement(OverflowLock, { hidden: true }));

    expect(document.body.style.overflow).toBe('hidden');
    first.unmount();
    expect(document.body.style.overflow).toBe('hidden');
    second.unmount();

    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.width).toBe('80%');
    document.body.style.overflow = '';
    document.body.style.width = '';
  });

  it.each([
    ['Modal', Modal],
    ['Drawer', Drawer],
  ])('keeps the first %s dialog id stable across renders', (name, Component) => {
    const props = { open: true, title: `${name} title` };
    const rendered = renderWithRoot(React.createElement(Component, props));
    const dialog = document.body.querySelector('[role="dialog"]');
    const initialId = dialog.getAttribute('aria-labelledby');

    rendered.render(React.createElement(Component, { ...props, confirmLoading: true }));

    expect(document.body.querySelector('[role="dialog"]').getAttribute('aria-labelledby')).toBe(initialId);
    rendered.unmount();
  });

  it('updates the preview source when the image source changes', async () => {
    const props = { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', preview: { visible: true } };
    const rendered = renderWithRoot(React.createElement(Image, props));
    const image = rendered.container.querySelector('img.eui-image-img');

    Object.defineProperty(image, 'complete', { configurable: true, value: true });
    await React.act(async () => {
      image.dispatchEvent(new Event('load', { bubbles: true }));
      await Promise.resolve();
    });
    const nextSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==#updated';
    await React.act(async () => {
      rendered.root.render(React.createElement(Image, { ...props, src: nextSrc }));
      await Promise.resolve();
    });

    const previewImage = document.body.querySelector('.eui-image-preview-img');
    expect(previewImage.getAttribute('src')).toBe(nextSrc);
    rendered.unmount();
  });

  it('preloads preview group items when forceRender is enabled', () => {
    const rendered = renderWithRoot(
      React.createElement(Image.PreviewGroup, {
        items: ['/first.png', '/second.png'],
        forceRender: true,
      }),
    );

    const preloadContainer = rendered.container.querySelector('div[style="display: none;"]');
    expect(preloadContainer.querySelectorAll('img')).toHaveLength(2);
    expect(Array.from(preloadContainer.querySelectorAll('img'), image => image.getAttribute('src'))).toEqual([
      '/first.png',
      '/second.png',
    ]);
    rendered.unmount();
  });

  it('uses updated scale steps after the scales prop changes', async () => {
    const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    const props = { visible: true, src, actionsLayout: ['zoomIn'], scales: [100, 200] };
    const rendered = renderWithRoot(React.createElement(Image.Preview, props));
    const image = document.body.querySelector('.eui-image-preview-img');

    Object.defineProperty(image, 'complete', { configurable: true, value: true });
    await React.act(async () => {
      image.dispatchEvent(new Event('load', { bubbles: true }));
      await Promise.resolve();
    });
    await React.act(async () => {
      rendered.root.render(React.createElement(Image.Preview, { ...props, scales: [100, 300] }));
      await Promise.resolve();
    });

    React.act(() => {
      document.body.querySelector('.eui-image-preview-tools-action').dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });

    expect(document.body.querySelector('.eui-image-preview-scale-value').textContent).toBe('300%');
    rendered.unmount();
  });
});
