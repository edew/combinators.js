const { character, andThen } = require("..");

test.each([
  ["ab", ["a", "b"], character("a"), character("b")],
  ["xy", ["x", "y"], character("x"), character("y")],
  ["10", ["1", "0"], character("1"), character("0")]
])('succeeds with expected input "%s"', (input, expected, parser1, parser2) => {
  const parser = andThen(parser1, parser2);
  expect(parser(input)).toStrictEqual({
    success: true,
    value: [expected, ""]
  });
});

test.each([
  ["ab", "Expected b but got a", character("b"), character("a")],
  ["az", "Expected z but got a", character("z"), character("z")]
])('fails with unexpected input "%s"', (input, expected, parser1, parser2) => {
  const parser = andThen(parser1, parser2);
  expect(parser(input)).toStrictEqual({
    success: false,
    value: expected
  });
});
