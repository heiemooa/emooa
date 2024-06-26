const OLD_NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';
const ui = require('@emooa/ui');

describe('ui', () => {
  console.log('ui', ui);
  afterAll(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('exports modules correctly', () => {
    expect(Object.keys(ui)).toMatchSnapshot();
  });
});
