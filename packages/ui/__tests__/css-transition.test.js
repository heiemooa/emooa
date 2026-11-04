const React = require('react');
const { createRoot } = require('react-dom/client');
const EuiCSSTransition = require('../cjs/_utils/css-trasition').default;
const Spin = require('../cjs/spin').default;

describe('EuiCSSTransition', () => {
  it('uses the DOM node exposed by a forwardRef imperative handle', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    let transitionNode;

    const TransitionChild = React.forwardRef((props, ref) => {
      const nodeRef = React.useRef(null);
      React.useImperativeHandle(ref, () => ({ getRootDOMNode: () => nodeRef.current }), []);
      return React.createElement('div', { ...props, ref: nodeRef });
    });

    React.act(() => {
      root.render(
        React.createElement(
          EuiCSSTransition,
          {
            in: true,
            appear: true,
            timeout: 0,
            classNames: 'fade',
            onEnter: node => {
              transitionNode = node;
            },
          },
          React.createElement(TransitionChild),
        ),
      );
    });

    expect(transitionNode).toBe(container.firstChild);

    React.act(() => root.unmount());
  });

  it('renders the dot loading animation without findDOMNode', () => {
    const container = document.createElement('div');
    const root = createRoot(container);

    expect(() => {
      React.act(() => root.render(React.createElement(Spin, { dot: true })));
    }).not.toThrow();
    expect(container.querySelector('.eui-spin-dot')).not.toBeNull();

    React.act(() => root.unmount());
  });
});
