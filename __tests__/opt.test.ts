import { character, SUCCESS, integer, opt } from "..";

test("succeeds", () => {
  const maybeX = opt(character("x"));
  const maybeInteger = opt(integer);
  expect(maybeX("x")).toStrictEqual({
    __tag: SUCCESS,
    value: ["x", ""]
  });
  expect(maybeInteger("10")).toStrictEqual({
    __tag: SUCCESS,
    value: [10, ""]
  });
});

test("succeeds with unexpected input", () => {
  const maybeB = opt(character("b"));
  expect(maybeB("a")).toStrictEqual({
    __tag: SUCCESS,
    value: [undefined, "a"]
  });
});

test("succeeds with empty input", () => {
  const maybeB = opt(character("b"));
  expect(maybeB("")).toStrictEqual({
    __tag: SUCCESS,
    value: [undefined, ""]
  });
});
