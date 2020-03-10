import { SUCCESS, FAILURE, character, orElse, andThen } from "..";

test("succeeds", () => {
  const a = character("a");
  const bOrC = orElse(character("b"), character("c"));
  const aAndBOrC = andThen(a, bOrC);
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
  const bOrC = orElse(character("b"), character("c"));
  const aAndBOrC = andThen(a, bOrC);
  expect(aAndBOrC("xb")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected a but got x"
  });
  expect(aAndBOrC("ax")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected c but got x"
  });
});
