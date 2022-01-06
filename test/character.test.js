const { expect } = require("chai");

const { character } = require("..");

it('succeeds if first character of input is expected', () => {
  const parser = character('a')

  expect(parser('abcd')).to.deep.equal({
    success: true,
    value: ['a', 'bcd']
  })
})

it('fails if first character of input is expected', () => {
  const parser = character('a')

  expect(parser('xyz')).to.deep.equal({
    success: false,
    value: 'Expected a but got x'
  })
})
