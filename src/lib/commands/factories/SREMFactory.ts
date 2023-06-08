import CommandFactory from "../commandFactory";
import SREMCommand from "../commands_imp/SREM";

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

  create(rawString: string): SREMCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key, values: _values } = matchRes.groups!;
      const values = Array.from(
        _values.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig"))
      );
      return new SREMCommand(key, values);
    }
  }
}
