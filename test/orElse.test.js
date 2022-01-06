const { expect } = require("chai");

const { character, orElse } = require("..");

it('fails if both parsers fail', () => {
  const parser1 = character('a')
  const parser2 = character('b')
  const combined = orElse(parser1, parser2)

  expect(combined('c')).to.deep.equal({
    success: false,
    value: 'Expected b but got c'
  })
})

it('succeeds if first parser succeeds', () => {
  const parser1 = character('n')
  const parser2 = character('m')
  const combined = orElse(parser1, parser2)

  expect(combined('name')).to.deep.equal({
    success: true,
    value: ['n', 'ame']
  })
})

it('succeeds if second parser succeeds', () => {
  const parser1 = character('n')
  const parser2 = character('m')
  const combined = orElse(parser1, parser2)

  expect(combined('main')).to.deep.equal({
    success: true,
    value: ['m', 'ain']
  })
})
