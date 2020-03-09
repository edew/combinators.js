import { SUCCESS, FAILURE, character } from "..";

test("succeeds", () => {
  const a = character("a");
  expect(a("a")).toStrictEqual({
    __tag: SUCCESS,
    value: ["a", ""]
  });
});

test("fails with unexpected input", () => {
  const b = character("b");
  expect(b("a")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected b but got a"
  });
});

test("fails with empty input", () => {
  const a = character("a");
  expect(a("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected a but got empty input"
  });
});
