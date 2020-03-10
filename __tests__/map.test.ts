import { SUCCESS, character, andThen, map } from "..";

test.each([
  ["ab", ([a, b]: [string, string]) => a + b],
  ["ba", ([a, b]: [string, string]) => b + a]
])("mapped function concatenates results to %s", (expected, f) => {
  const ab = andThen(character("a"), character("b"));
  const mapped = map(f)(ab);
  expect(mapped("ab")).toStrictEqual({
    __tag: SUCCESS,
    value: [expected, ""]
  });
});
