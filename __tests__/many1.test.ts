import { character, SUCCESS, FAILURE, many1, anyOf, map } from "..";

test("succeeds", () => {
  const spaces = many1(character(" "));
  expect(spaces("   a")).toStrictEqual({
    __tag: SUCCESS,
    value: [[" ", " ", " "], "a"]
  });
});

test("fails with unexpected input", () => {
  const ms = many1(character("m"));
  expect(ms(" mmm")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected m but got  "
  });
});

test("fails with empty input", () => {
  const xs = many1(character("x"));
  expect(xs("")).toStrictEqual({
    __tag: FAILURE,
    value: "Expected x but got empty input"
  });
});
