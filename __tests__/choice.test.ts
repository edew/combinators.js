import { SUCCESS, FAILURE, choice, character } from "..";

test("succeeds", () => {
  const a_or_b_or_c = choice([character("a"), character("b"), character("c")]);
  expect(a_or_b_or_c("a")).toStrictEqual({
    __tag: SUCCESS,
    value: ["a", ""]
  });
  expect(a_or_b_or_c("b")).toStrictEqual({
    __tag: SUCCESS,
    value: ["b", ""]
  });
  expect(a_or_b_or_c("c")).toStrictEqual({
    __tag: SUCCESS,
    value: ["c", ""]
  });
});

test("fails with unexpected input", () => {
  const a_or_b_or_c = choice([character("a"), character("b"), character("c")]);
  expect(a_or_b_or_c("x")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected c but got x"
  });
});

test("fails with empty input", () => {
  const a_or_b_or_c = choice([character("a"), character("b"), character("c")]);
  expect(a_or_b_or_c("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected c but got empty input"
  });
});
