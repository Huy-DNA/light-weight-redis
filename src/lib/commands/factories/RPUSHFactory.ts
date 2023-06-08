import CommandFactory from "../commandFactory";
import RPUSHCommand from "../commands_imp/RPUSH";
import Result from "../../result";

export default class RPUSHFactory extends CommandFactory {
  constructor() {
    super(
      "RPUSH",
      ["key", "values"],
      [String, Array],

      new RegExp(
        `^\\s*RPUSH\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<values>${CommandFactory.tokenPattern}+)\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<RPUSHCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, values: _values } = matchRes.groups!;
      const values = Array.from(
        _values.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig"))
      ).map((tuple) => tuple[0]);
      return Result.ok(new RPUSHCommand(key, values));
    }
  }
}
