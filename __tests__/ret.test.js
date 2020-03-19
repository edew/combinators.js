const { ret } = require("..");

test.each([["a"], [1], [{ foo: "bar" }]])(
  "returns expected value for %s",
  expected => {
    const parser = ret(expected);
    expect(parser("input")).toStrictEqual({
      success: true,
      value: [expected, "input"]
    });
  }
);
