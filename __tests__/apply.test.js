const { apply, character, ret } = require("..");

test.each([
  [ret(x => x + 1), ret(10), "", 11],
  [ret(x => x + " billion dollars!"), ret("1"), "", "1 billion dollars!"],
  [ret(x => parseInt(x)), character("1"), "1", 1]
])(
  "applies function wrapped in parser to result of second parser",
  (functionWrappedInParser, secondParser, input, expected) => {
    const applied = apply(functionWrappedInParser, secondParser);
    expect(applied(input)).toStrictEqual({
      success: true,
      value: [expected, ""]
    });
  }
);

test.each([["a"], ["b"], ["c"]])(
  "does not apply function when second parser fails",
  input => {
    const mock = jest.fn();
    const functionWrappedInParser = ret(mock);
    const secondParser = character("x");
    const applied = apply(functionWrappedInParser, secondParser);
    expect(applied(input)).toStrictEqual({
      success: false,
      value: "Expected x but got " + input
    });
    expect(mock).not.toBeCalled();
  }
);
