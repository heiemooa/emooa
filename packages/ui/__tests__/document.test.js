const React = require('react');
const { createRoot } = require('react-dom/client');
const Document = require('../cjs/document').default;

function waitForTransition() {
  return React.act(async () => new Promise(resolve => setTimeout(resolve, 450)));
}

describe('Document local content', () => {
  it('updates the shared window from different triggers and keeps link behavior', async () => {
    await React.act(async () => {
      Document.config({
        patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/],
      });
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    React.act(() =>
      root.render(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            Document,
            { title: 'Document one', content: React.createElement('div', null, 'Content one') },
            'Document one',
          ),
          React.createElement(
            Document,
            { title: 'Document two', content: React.createElement('div', null, 'Content two') },
            'Document two',
          ),
          React.createElement('a', { href: 'https://docs.emooa.com/page' }, 'External document'),
        ),
      ),
    );

    const triggers = container.querySelectorAll('button');
    React.act(() => triggers[0].click());
    await waitForTransition();

    const windowElement = document.body.querySelector('.eui-document');
    expect(windowElement).not.toBeNull();
    expect(windowElement.querySelector('.eui-document-content').textContent).toBe('Content one');
    expect(windowElement.querySelector('.eui-document-footer')).toBeNull();

    React.act(() => triggers[1].click());
    expect(document.body.querySelectorAll('.eui-document')).toHaveLength(1);
    expect(document.body.querySelector('.eui-document')).toBe(windowElement);
    expect(windowElement.querySelector('.eui-document-title').textContent).toBe('Document two');
    expect(windowElement.querySelector('.eui-document-content').textContent).toBe('Content two');

    React.act(() => windowElement.querySelector('.eui-document-remark-icon button:last-child').click());
    await waitForTransition();
    React.act(() => triggers[0].click());
    await waitForTransition();
    expect(document.body.querySelector('.eui-document')).toBe(windowElement);
    expect(windowElement.querySelector('.eui-document-content').textContent).toBe('Content one');

    React.act(() => container.querySelector('a').click());
    await waitForTransition();
    expect(document.body.querySelector('.eui-document')).toBe(windowElement);
    expect(windowElement.querySelector('.eui-document-content iframe').getAttribute('src')).toBe(
      'https://docs.emooa.com/page',
    );
    expect(windowElement.querySelector('.eui-document-footer')).not.toBeNull();

    React.act(() => root.unmount());
    container.remove();
  });
});
