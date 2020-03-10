import { anyOf, SUCCESS, many, character, str } from "..";

test("succeeds", () => {
  const digit = anyOf(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const digits = many(digit);
  const abcdr = anyOf(["a", "b", "c", "d", "r"]);
  const manyAbc = many(abcdr);
  const hellos = many(str("hello"));
  const whitespace = many(anyOf([" ", "\t", "\n"]));
  expect(digits("12345ABCDE")).toStrictEqual({
    __tag: SUCCESS,
    value: [["1", "2", "3", "4", "5"], "ABCDE"]
  });
  expect(digits("123456789")).toStrictEqual({
    __tag: SUCCESS,
    value: [["1", "2", "3", "4", "5", "6", "7", "8", "9"], ""]
  });
  expect(digits("111")).toStrictEqual({
    __tag: SUCCESS,
    value: [["1", "1", "1"], ""]
  });
  expect(manyAbc("abracadabra")).toStrictEqual({
    __tag: SUCCESS,
    value: [["a", "b", "r", "a", "c", "a", "d", "a", "b", "r", "a"], ""]
  });
  expect(hellos("hellohello!")).toStrictEqual({
    __tag: SUCCESS,
    value: [["hello", "hello"], "!"]
  });
  expect(whitespace("\t \n")).toStrictEqual({
    __tag: SUCCESS,
    value: [["\t", " ", "\n"], ""]
  });
});

test("succeeds with unexpected input", () => {
  const digit = anyOf(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const digits = many(digit);
  expect(digits("abc")).toStrictEqual({
    __tag: SUCCESS,
    value: [[], "abc"]
  });
});

test("succeeds with empty input", () => {
  const manyA = many(character("A"));
  expect(manyA("")).toStrictEqual({
    __tag: SUCCESS,
    value: [[], ""]
  });
});
