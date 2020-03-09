import { SUCCESS, FAILURE, character, or, and } from "..";

test("succeeds", () => {
  const a = character("a");
  const bOrC = or(character("b"), character("c"));
  const aAndBOrC = and(a, bOrC);
  expect(aAndBOrC("ab")).toStrictEqual({
    __tag: SUCCESS,
    value: [["a", "b"], ""]
  });
  expect(aAndBOrC("ac")).toStrictEqual({
    __tag: SUCCESS,
    value: [["a", "c"], ""]
  });
});

test("fails with unexpected input", () => {
  const a = character("a");
  const bOrC = or(character("b"), character("c"));
  const aAndBOrC = and(a, bOrC);
  expect(aAndBOrC("xb")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected a but got x"
  });
  expect(aAndBOrC("ax")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected c but got x"
  });
});
