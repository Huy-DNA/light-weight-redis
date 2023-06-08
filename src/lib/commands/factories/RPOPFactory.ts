import CommandFactory from "../commandFactory";
import RPOPCommand from "../commands_imp/RPOP";

export default class RPOPFactory extends CommandFactory {
  constructor() {
    super(
      "RPOP",
      ["key"],
      [String],
      new RegExp(
        `^\\s*LRANGE\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<start>${CommandFactory.tokenPattern})\\s*(?<stop>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): RPOPCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new RPOPCommand(key);
    }
  }
}
