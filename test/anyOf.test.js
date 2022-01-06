const { expect } = require("chai");

const { character, anyOf } = require("..");

it('succeeds if any of the parsers succeed', () => {
  const parser = anyOf([
    character('a'),
    character('b'),
    character('c')
  ])

  expect(parser('c')).to.deep.equal({
    success: true,
    value: ['c', '']
  })
})

it('fails if all of the parsers fail', () => {
  const parser = anyOf([
    character('a'),
    character('b'),
    character('c')
  ])

  expect(parser('d')).to.deep.equal({
    success: false,
    value: 'Expected c but got d'
  })
})