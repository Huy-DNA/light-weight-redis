import CommandFactory from "../commandFactory";
import LPOPCommand from "../commands_imp/LPOP";

export default class LPOPFactory extends CommandFactory {
  constructor() {
    super(
      "LPOP",
      ["key"],
      [String],
      new RegExp(
        `^\\s*LPOP\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): LPOPCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new LPOPCommand(key);
    }
  }
}
