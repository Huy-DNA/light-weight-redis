import CommandFactory from "../commandFactory";
import TTLCommand from "../commands_imp/TTL";

export default class TTLFactory extends CommandFactory {
  constructor() {
    super(
      "TTL",
      ["key"],
      [String],
      new RegExp(`^\\s*TTL\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): TTLCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new TTLCommand(key);
    }
  }
}
