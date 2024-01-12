const ui = require('@emooa/ui');
describe('ui', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(ui)).toMatchSnapshot();
  });
});
