import CommandFactory from "../commandFactory";
import SETCommand from "../commands_imp/EXPIRE";

export default class SETFactory extends CommandFactory {
  constructor() {
    super(
      "SET",
      ["key", "value"],
      [String, String],

      new RegExp(
        `^\\s*SET\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<value>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): SETCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key, value } = matchRes.groups!;
      return new SETCommand(key, value);
    }
  }
}
