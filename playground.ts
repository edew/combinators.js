type Tuple<A, B> = [A, B];

const fst = <A, _>(tuple: Tuple<A, _>): A => tuple[0];
const snd = <_, B>(tuple: Tuple<_, B>): B => tuple[1];
const mapFst = <A, B, C>(
  f: (value: A) => C,
  tuple: Tuple<A, B>
): Tuple<C, B> => [f(fst(tuple)), snd(tuple)];

type Ok<A> = { ok: true; value: A };
type Err<A> = { ok: false; value: A };
type Result<A, B> = Ok<A> | Err<B>;

type Parser<A> = (input: string) => Result<Tuple<A, string>, string>;

const ok = <A>(value: A): Result<A, never> => ({ ok: true, value });
const err = <B>(value: B): Result<never, B> => ({ ok: false, value });

const map = <A, B>(
  parser: Parser<A>,
  f: (value: A) => B
): Parser<B> => input => {
  const result = parser(input);
  return result.ok === true ? ok(mapFst(f, result.value)) : result;
};

const andThen = <A, B>(
  parser1: Parser<A>,
  parser2: Parser<B>
): Parser<Tuple<A, B>> => input => {
  const parser1Result = parser1(input);
  if (parser1Result.ok === false) return parser1Result;

  const [parsedByParser1, remainingInputAfterParser1] = parser1Result.value;
  const parser2Result = parser2(remainingInputAfterParser1);
  if (parser2Result.ok === false) return parser2Result;

  const [parsedByParser2, remainingInputAfterParser2] = parser2Result.value;
  return ok([[parsedByParser1, parsedByParser2], remainingInputAfterParser2]);
};

const orElse = <A>(parser1: Parser<A>, parser2: Parser<A>) => (
  input: string
) => {
  const parser1Result = parser1(input);
  if (parser1Result.ok === false) return parser2(input);

  return parser1Result;
};

const choice = <A>(parsers: Parser<A>[]): Parser<A> => parsers.reduce(orElse);

const ret = <A>(value: A): Parser<A> => input => ok([value, input]);

const apply = <A, B>(
  fParser: Parser<(_: A) => B>,
  parser: Parser<A>
): Parser<B> => map(andThen(fParser, parser), ([f, x]) => f(x));

const lift2 = <A, B, C>(
  f: (_: A, __: B) => C,
  parser1: Parser<A>,
  parser2: Parser<B>
) =>
  apply(
    apply(
      ret((a: A) => (b: B) => f(a, b)),
      parser1
    ),
    parser2
  );

const sequence = <A>(parsers: Parser<A>[]): Parser<A[]> =>
  parsers.length === 0
    ? ret([])
    : lift2<A, A[], A[]>(
        (head, tail) => [head].concat(tail),
        parsers[0],
        sequence(parsers.slice(1))
      );

const character = (expected: string): Parser<string> => input => {
  if (expected.length > 1)
    throw new Error(
      `The character function requires a string of length one but got ${expected}`
    );
  if (input.length === 0) err(`Expected ${expected} but got empty input`);
  if (input.length[0] !== expected)
    err(`Expected ${expected} but got ${input[0]}`);

  return ok([expected, input.slice(1)]);
};

const str = (expected: string) =>
  map(sequence(expected.split("").map(character)), characters =>
    characters.join("")
  );

const zeroOrMore = <A>(
  parser: Parser<A>,
  input: string
): Tuple<A[], string> => {
  const firstResult = parser(input);

  if (firstResult.ok === false) {
    return [[], input];
  }

  const [firstValue, inputAfterFirstParse] = firstResult.value;
  const subsequentResult = zeroOrMore(parser, inputAfterFirstParse);
  const [subsequentValues, remainingInput] = subsequentResult;
  return [[firstValue].concat(subsequentValues), remainingInput];
};

// zero or more
const many = <A>(parser: Parser<A>): Parser<A[]> => input =>
  ok(zeroOrMore(parser, input));

// one ore more
const many1 = <A>(parser: Parser<A>): Parser<A[]> => input => {
  const firstResult = parser(input);

  if (firstResult.ok === false) {
    return firstResult;
  }

  const [firstValue, inputAfterFirstParse] = firstResult.value;
  const [subsequentValues, remainingInput] = zeroOrMore(
    parser,
    inputAfterFirstParse
  );
  const values = [firstValue].concat(subsequentValues);
  return ok([values, remainingInput]);
};

const optional = <A>(parser: Parser<A>): Parser<A | undefined> =>
  orElse<A>(parser, ret(undefined));

const anyOf = (characters: string[]) => choice(characters.map(character));

const digit = anyOf(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const num = map(
  andThen(optional(character("-")), many1(digit)),
  ([sign, numberString]) =>
    sign ? -parseInt(numberString.join("")) : parseInt(numberString.join(""))
);

const alphabetical = anyOf("abcdefghijklmnopqrstuvwxyz".split(""));

const alphanumeric = orElse(alphabetical, digit);

type KeyValuePair<A, B> = { key: A; value: B };

const keyValuePair = map(
  andThen(
    andThen(sequence([alphanumeric]), character("=")),
    sequence([alphanumeric])
  ),
  tuple => ({ key: fst(fst(tuple)), value: snd(fst(tuple)) })
);
