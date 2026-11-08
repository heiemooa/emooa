const React = require('react');
const { createRoot } = require('react-dom/client');
const Document = require('../cjs/document').default;

it('preserves native link navigation after opening local content without global configuration', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  React.act(() => {
    root.render(
      React.createElement(Document, { content: 'Local content' }, 'Open'),
    );
  });
  await React.act(async () => container.querySelector('button').click());

  const link = document.createElement('a');
  link.href = 'https://docs.emooa.com/ui/document';
  container.appendChild(link);
  let prevented;
  const observeClick = event => {
    prevented = event.defaultPrevented;
    event.preventDefault(); // Avoid jsdom navigation after observing the Document listener.
  };
  document.addEventListener('click', observeClick);
  React.act(() => link.click());
  expect(prevented).toBe(false);
  expect(document.querySelector('.eui-document-content').textContent).toBe('Local content');
  document.removeEventListener('click', observeClick);
  React.act(() => root.unmount());
  container.remove();
});
