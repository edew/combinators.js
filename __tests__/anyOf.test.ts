import { anyOf, SUCCESS, FAILURE } from "..";

test("succeeds", () => {
  const aOrBOrC = anyOf(["a", "b", "c"]);
  expect(aOrBOrC("a")).toStrictEqual({
    __tag: SUCCESS,
    value: ["a", ""]
  });
  expect(aOrBOrC("b")).toStrictEqual({
    __tag: SUCCESS,
    value: ["b", ""]
  });
  expect(aOrBOrC("c")).toStrictEqual({
    __tag: SUCCESS,
    value: ["c", ""]
  });
});

test("fails with unexpected input", () => {
  const digit = anyOf(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  expect(digit("a")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected 9 but got a"
  });
  expect(digit("ax")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected 9 but got a"
  });
});

test("fails with empty input", () => {
  const xOrYOrZ = anyOf(["x", "y", "z"]);
  expect(xOrYOrZ("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected z but got empty input"
  });
});
