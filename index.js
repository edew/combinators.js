const success = value => ({ success: true, value });
const failure = value => ({ success: false, value });

const uncons = sliceable => [sliceable.slice(0, 1), sliceable.slice(1)];

const character = expected => input => {
  const [head, tail] = uncons(input);

  if (!head) return failure("Expected " + expected + " but got end of input");
  if (head !== expected)
    return failure("Expected " + expected + " but got " + head);

  return success([expected, tail]);
};

const andThen = (parser1, parser2) => input => {
  const result1 = parser1(input);

  if (!result1.success) return result1;

  const [parsed1, remainingInput1] = result1.value;
  const result2 = parser2(remainingInput1);

  if (!result2.success) return result2;

  const [parsed2, remainingInput2] = result2.value;
  return success([[parsed1, parsed2], remainingInput2]);
};

const orElse = (parser1, parser2) => input => {
  const result1 = parser1(input);

  if (!result1.success) return parser2(input);

  return result1;
};

const choice = parsers => parsers.reduce(orElse);

const anyOf = characters => choice(characters.map(character));

const ret = value => input => success([value, input]);

const map = (f, parser) => input => {
  const result = parser(input);

  if (!result.success) return result;

  const [parsed, remainingInput] = result.value;

  return success([f(parsed), remainingInput]);
};

const apply = (fParser, parser) =>
  map(([f, x]) => f(x), andThen(fParser, parser));

module.exports = {
  character,
  andThen,
  orElse,
  ret,
  map,
  apply
};
