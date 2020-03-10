import { str, SUCCESS, FAILURE } from "..";

test("succeeds", () => {
  const hello = str("hello");
  expect(hello("hello world")).toStrictEqual({
    __tag: SUCCESS,
    value: ["hello", " world"]
  });
});

test("fails with unexpected input", () => {
  const goodbye = str("goodbye");
  expect(goodbye("hello")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected g but got h"
  });
});

test("fails with empty input", () => {
  const hi = str("hi");
  expect(hi("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected h but got empty input"
  });
});
