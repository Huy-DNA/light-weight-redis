import CommandFactory from "../commandFactory";
import SADDCommand from "../commands_imp/SADD";
import Result from "../../result";

export default class SADDFactory extends CommandFactory {
  constructor() {
    super(
      "SADD",
      ["key", "values"],
      [String, Array],

      new RegExp(
        `^\\s*SADD\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<values>${CommandFactory.tokenPattern}+)\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<SADDCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, values: _values } = matchRes.groups!;
      const values = Array.from(
        _values.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig"))
      ).map((tuple) => tuple[0]);
      return Result.ok(new SADDCommand(key, values));
    }
  }
}
