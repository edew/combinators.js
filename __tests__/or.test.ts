import { SUCCESS, FAILURE, character, or } from "..";

test("succeeds", () => {
  const a = character("a");
  const b = character("b");
  const aOrB = or(a, b);
  expect(aOrB("a")).toStrictEqual({
    __tag: SUCCESS,
    value: ["a", ""]
  });
});

test("fails with unexpected input", () => {
  const a = character("a");
  const b = character("b");
  const aOrB = or(a, b);
  expect(aOrB("c")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected b but got c"
  });
});

test("fails with empty input", () => {
  const a = character("a");
  const b = character("b");
  const aOrB = or(a, b);
  expect(aOrB("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected b but got empty input"
  });
});
