const { character } = require("..");

test.each([["a"], ["b"], ["c"]])(
  'succeeds with expected input "%s"',
  expected => {
    const parser = character(expected);
    expect(parser(expected)).toStrictEqual({
      success: true,
      value: [expected, ""]
    });
  }
);

test.each([["a", "b", "c"]])('fails with unexpected input "%s"', actual => {
  const parser = character("z");
  expect(parser(actual)).toStrictEqual({
    success: false,
    value: "Expected z but got " + actual
  });
});
