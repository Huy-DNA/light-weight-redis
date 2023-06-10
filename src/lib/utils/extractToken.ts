import Result from "../result";

export default function extractToken(str: string): Result<Array<string>> {
  //Negative lookbehind used - which the V8-engine supports but some may not
  //However, this is acceptable as it runs on the server-side.
  const tokenPattern =
    /(?:(?!<[^\s])[^\s"']*((?:"[^"]*")|(?:'[^']*'))?(?![^\s]))/gi;
  const tokenStreamPattern =
    /^(\s*(?:(?!<[^\s])[^\s"']*((?:"[^"]*")|(?:'[^']*'))?(?![^\s]))\s*)*$/i;

  if (!str.match(tokenStreamPattern))
    return Result.err("Input is not a valid stream of token");
  return Result.ok(
    [...str.matchAll(tokenPattern)]
      .map((tuple) => aposMerge(tuple[0]).value as string)
      .filter((str) => str !== "")
  );
}

export function aposMerge(str: string): Result<string> {
  const tokenPattern =
    /^\s*(?<first>[^\s"']*)(?<second>(?:"[^"]*")|(?:'[^']*'))?\s*$/i;
  const matched = str.match(tokenPattern);
  if (matched === null) return Result.err("Input is not a word");
  const groups = matched.groups;
  const first = groups!.first;
  const second = groups!.second;
  return Result.ok(
    first + (second === undefined ? "" : second.slice(1, second.length - 1))
  );
}
