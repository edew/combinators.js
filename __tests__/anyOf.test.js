const { character, anyOf } = require("..");

test.each([
  [["a", "b", "c"], "a"],
  ["abcdefghijklmnopqrstuvwxyz".split(""), "z"],
  ["0123456789".split(""), "5"]
])('succeeds with expected input "%s"', (characters, expected) => {
  const parser = anyOf(characters);
  expect(parser(expected)).toStrictEqual({
    success: true,
    value: [expected, ""]
  });
});
