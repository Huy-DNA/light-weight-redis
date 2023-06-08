import CommandFactory from "../commandFactory";
import DELCommand from "../commands_imp/DEL";

export default class DELFactory extends CommandFactory {
  constructor() {
    super(
      "DEL",
      ["key"],
      [String],
      new RegExp(`^\\s*DEL\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): DELCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new DELCommand(key);
    }
  }
}
