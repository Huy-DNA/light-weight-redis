import CommandFactory from "../commandFactory";
import RPUSHCommand from "../commands_imp/RPUSH";

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

  create(rawString: string): RPUSHCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key, values: _values } = matchRes.groups!;
      const values = Array.from(
        _values.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig"))
      ).map((tuple) => tuple[0]);
      return new RPUSHCommand(key, values);
    }
  }
}
