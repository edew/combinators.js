const { expect } = require("chai");

const { character, map } = require("..");

it("calls mapped function if parser succeeds", () => {
  const parser = map(x => x + '!', character('Z'));

  expect(parser('Z')).to.deep.equal({
    success: true,
    value: ['Z!', '']
  });
});

it('does not call mapped function if parser fails', () => {
  const parser = map(x => { throw new Error('dont call me!') }, character('Z'));

  expect(parser('z')).to.deep.equal({
    success: false,
    value: 'Expected Z but got z'
  })
})
