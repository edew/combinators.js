const { expect } = require("chai");

const { ret } = require("..");

it('wraps string value', () => {
  const parser = ret('a')

  expect(parser('foobar')).to.deep.equal({
    success: true,
    value: ['a', 'foobar']
  })
})

it('wraps number value', () => {
  const parser = ret(1)

  expect(parser('foobar')).to.deep.equal({
    success: true,
    value: [1, 'foobar']
  })
})

it('wraps object value', () => {
  const parser = ret({ some: 'property', oh: 2 })

  expect(parser('foobar')).to.deep.equal({
    success: true,
    value: [{ some: 'property', oh: 2}, 'foobar']
  })
})
