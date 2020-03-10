const { character, orElse } = require("..");

test.each([
  ["a", "a", character("a"), character("b")],
  ["b", "b", character("a"), character("b")],
  ["c", "c", character("c"), character("c")]
])('succeeds for expected input "%s"', (input, expected, parser1, parser2) => {
  const parser = orElse(parser1, parser2);
  expect(parser(input)).toStrictEqual({
    success: true,
    value: [expected, ""]
  });
});
