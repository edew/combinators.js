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

export const and = <T>(
  parser1: Parser<T>,
  parser2: Parser<T>
): Parser<Tuple<T, T>> => input => {
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
