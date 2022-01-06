const { expect } = require("chai");

const { character, andThen } = require("..");

it('succeeds if both parsers succeed', () => {
  const parser1 = character('a')
  const parser2 = character('b')
  const combined = andThen(parser1, parser2)

  expect(combined('ab')).to.deep.equal({
    success: true,
    value: [['a', 'b'], '']
  })
})

it('fails if first parser fails', () => {
  const parser1 = character('1')
  const parser2 = character('0')
  const combined = andThen(parser1, parser2)

  expect(combined('20')).to.deep.equal({
    success: false,
    value: 'Expected 1 but got 2'
  })
})

it('fails if second parser fails', () => {
  const parser1 = character('1')
  const parser2 = character('0')
  const combined = andThen(parser1, parser2)

  expect(combined('15')).to.deep.equal({
    success: false,
    value: 'Expected 0 but got 5'
  })
})
