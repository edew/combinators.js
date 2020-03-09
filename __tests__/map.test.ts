import { SUCCESS, character, and, map, any } from "..";

test.each([
  ["ab", ([a, b]: [string, string]) => a + b],
  ["ba", ([a, b]: [string, string]) => b + a]
])("concatenates results to %s", (expected, f) => {
  const ab = and(character("a"), character("b"));
  const mapped = map(f)(ab);
  expect(mapped("ab")).toStrictEqual({
    __tag: SUCCESS,
    value: [expected, ""]
  });
});
