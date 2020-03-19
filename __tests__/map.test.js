const { character, map, ret } = require("..");

test("calls mapped function for successful result", () => {
  const onePlusOne = map(x => x + 1, ret(1));
  const numberThree = map(x => parseInt(x), character("3"));
  const arrayContainingA = map(x => [x], character("a"));
  expect(onePlusOne("")).toStrictEqual({
    success: true,
    value: [2, ""]
  });
  expect(numberThree("3")).toStrictEqual({
    success: true,
    value: [3, ""]
  });
  expect(arrayContainingA("abc")).toStrictEqual({
    success: true,
    value: [["a"], "bc"]
  });
});

test.each([["a"], ["b"], ["c"]])(
  "does not call function for failure results",
  input => {
    const x = character("x");
    const mock = jest.fn();
    const mapped = map(mock, x);
    expect(mapped(input)).toStrictEqual({
      success: false,
      value: "Expected x but got " + input
    });
    expect(mock).not.toBeCalled();
  }
);
