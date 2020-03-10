export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export type Result<T> =
  | {
      __tag: "SUCCESS";
      value: T;
    }
  | {
      __tag: "FAILURE";
      value: string;
    };

type Tuple<A, B> = [A, B];

type Parser<T> = (value: string) => Result<Tuple<T, string>>;

const success = <T>(value: T): Result<T> => ({ __tag: SUCCESS, value });
const failure = <T>(value: string): Result<T> => ({ __tag: FAILURE, value });

export const character = (expected: string): Parser<string> => (
  input: string
) => {
  if (input.length === 0) {
    return failure("Expected " + expected + " but got empty input");
  }

  if (input[0] !== expected) {
    return failure("Expected " + expected + " but got " + input[0]);
  }

  return success([expected, input.slice(1)]);
};

export const and = <T, T2>(
  parser1: Parser<T>,
  parser2: Parser<T2>
): Parser<Tuple<T, T2>> => input => {
  const result1 = parser1(input);

  switch (result1.__tag) {
    case FAILURE:
      return result1;
    case SUCCESS:
      const result2 = parser2(result1.value[1]);

      switch (result2.__tag) {
        case FAILURE:
          return result2;
        case SUCCESS:
          return success([
            [result1.value[0], result2.value[0]],
            result2.value[1]
          ]);
      }
  }
};

export const or = <T>(
  parser1: Parser<T>,
  parser2: Parser<T>
): Parser<T> => input => {
  const result1 = parser1(input);

  if (result1.__tag === SUCCESS) {
    return result1;
  }

  return parser2(input);
};

export const any = <T>(parsers: Parser<T>[]) => {
  return parsers.reduce(or);
};

export const map = <T, T2>(f: (value: T) => T2) => (
  parser: Parser<T>
): Parser<T2> => input => {
  const result = parser(input);

  if (result.__tag === SUCCESS) {
    return success([f(result.value[0]), result.value[1]]);
  }

  return result;
};

export const ret = <T>(value: T): Parser<T> => (input: string) =>
  success([value, input]);

export const apply = <T, T2>(parser1: Parser<(_: T) => T2>) => (
  parser2: Parser<T>
): Parser<T2> => {
  return map(([f, x]: Tuple<(_: T) => T2, T>) => f(x))(and(parser1, parser2));
};

export const lift2 = <A, B, C>(f: (_: A) => (_: B) => C) => (
  parser1: Parser<A>
) => (parser2: Parser<B>) => apply(apply(ret(f))(parser1))(parser2);
