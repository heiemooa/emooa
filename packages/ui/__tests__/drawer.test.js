const React = require('react');
const { createRoot } = require('react-dom/client');
const Drawer = require('../cjs/drawer').default;

function renderWithRoot(element) {
  const container = document.createElement('div');
  const root = createRoot(container);
  React.act(() => root.render(element));
  return {
    container,
    root,
    unmount: () => React.act(() => root.unmount()),
  };
}

describe('Drawer header', () => {
  it('renders the close button at the start by default and extra at the end', () => {
    const rendered = renderWithRoot(
      React.createElement(Drawer, {
        open: true,
        title: 'Title',
        extra: React.createElement('span', null, 'Actions'),
      }),
    );
    const header = document.body.querySelector('.eui-drawer-header');

    expect(header.querySelector('.eui-drawer-close-start')).not.toBeNull();
    expect(
      header.querySelector('.eui-drawer-header-title').firstElementChild.classList,
    ).toContain('eui-drawer-close-start');
    expect(header.lastElementChild.classList).toContain('eui-drawer-extra');
    expect(document.body.querySelector('.eui-drawer-footer').querySelectorAll('.eui-btn')).toHaveLength(2);
    rendered.unmount();
  });

  it('renders the close button after extra when placement is end', () => {
    const rendered = renderWithRoot(
      React.createElement(Drawer, {
        open: true,
        title: 'Title',
        extra: React.createElement('span', null, 'Actions'),
        closable: { placement: 'end' },
      }),
    );
    const header = document.body.querySelector('.eui-drawer-header');

    expect(header.lastElementChild.classList).toContain('eui-drawer-close-end');
    expect(header.children[1].classList).toContain('eui-drawer-extra');
    rendered.unmount();
  });

  it('prefers closable.closeIcon and preserves the close callback', () => {
    const onCancel = jest.fn();
    const rendered = renderWithRoot(
      React.createElement(Drawer, {
        open: true,
        title: 'Title',
        closable: {
          placement: 'end',
          closeIcon: React.createElement('span', null, 'Configured icon'),
        },
        closeIcon: React.createElement('span', null, 'Legacy icon'),
        onCancel,
      }),
    );
    const closeButton = document.body.querySelector('.eui-drawer-close-end');

    expect(closeButton.textContent).toBe('Configured icon');
    React.act(() => closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(onCancel).toHaveBeenCalledTimes(1);
    rendered.unmount();
  });

  it('renders a header for extra content when there is no title and closing is disabled', () => {
    const rendered = renderWithRoot(
      React.createElement(Drawer, {
        open: true,
        closable: false,
        extra: React.createElement('span', null, 'Actions'),
      }),
    );

    expect(document.body.querySelector('.eui-drawer-header')).not.toBeNull();
    expect(document.body.querySelector('.eui-drawer-title')).toBeNull();
    expect(document.body.querySelector('.eui-drawer-close-icon')).toBeNull();
    rendered.unmount();
  });
});
