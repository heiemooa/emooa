const ui = require("..");
describe("ui", () => {
  it("exports modules correctly", () => {
    expect(Object.keys(ui)).toMatchSnapshot();
  });
});
