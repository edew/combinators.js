import { integer, SUCCESS, FAILURE } from "..";

test("succeeds", () => {
  expect(integer("1")).toStrictEqual({
    __tag: SUCCESS,
    value: [1, ""]
  });
  expect(integer("123ABC")).toStrictEqual({
    __tag: SUCCESS,
    value: [123, "ABC"]
  });
  expect(integer("123456789")).toStrictEqual({
    __tag: SUCCESS,
    value: [123456789, ""]
  });
  expect(integer("-1")).toStrictEqual({
    __tag: SUCCESS,
    value: [-1, ""]
  });
});

test("fails with unexpected input", () => {
  expect(integer("a123")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected 9 but got a"
  });
});

test("fails with empty input", () => {
  expect(integer("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected 9 but got empty input"
  });
});
