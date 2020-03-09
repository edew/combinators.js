import { SUCCESS, FAILURE, character, and } from "..";

test("succeeds", () => {
  const a = character("a");
  const b = character("b");
  const ab = and(a, b);
  expect(ab("ab")).toStrictEqual({
    __tag: SUCCESS,
    value: [["a", "b"], ""]
  });
});

test("fails with unexpected input", () => {
  const a = character("a");
  const b = character("b");
  const ab = and(a, b);
  expect(ab("xb")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected a but got x"
  });
  expect(ab("ax")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected b but got x"
  });
});

test("fails with empty input", () => {
  const a = character("a");
  const b = character("b");
  const ab = and(a, b);
  expect(ab("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected a but got empty input"
  });
});
