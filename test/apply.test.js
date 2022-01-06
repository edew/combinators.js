const { expect } = require("chai");

const { apply, character, ret } = require("..");

it('calls wrapped function if parser succeeds', () => {
  const toLowerCase = ret(x => x.toLowerCase());
  const parser = apply(toLowerCase, character('Z'));

  expect(parser('Z')).to.deep.equal({
    success: true,
    value: ['z', '']
  });
});

it('does not call wrapped function if parser fails', () => {
  const thrower = ret(() => { throw new Error('dont call me!') })
  const parser = apply(thrower, character('Z'));

  expect(parser('A')).to.deep.equal({
    success: false,
    value: 'Expected Z but got A'
  });
})
