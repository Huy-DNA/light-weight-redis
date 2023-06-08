import CommandFactory from "../commandFactory";
import SREMCommand from "../commands_imp/SREM";
import Result from "../../result";

export default class SREMFactory extends CommandFactory {
  constructor() {
    super(
      "SREM",
      ["key", "values"],
      [String, Array],

      new RegExp(
        `^\\s*SREM\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<values>${CommandFactory.tokenPattern}+)\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<SREMCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, values: _values } = matchRes.groups!;
      const values = Array.from(
        _values.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig"))
      ).map((tuple) => tuple[0]);
      return Result.ok(new SREMCommand(key, values));
    }
  }
}
