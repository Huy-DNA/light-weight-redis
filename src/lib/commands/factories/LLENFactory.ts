import CommandFactory from "../commandFactory";
import LLENCommand from "../commands_imp/LLEN";

export default class LLENFactory extends CommandFactory {
  constructor() {
    super(
      "LLEN",
      ["key"],
      [String],
      new RegExp(
        `^\\s*LLEN\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): LLENCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new LLENCommand(key);
    }
  }
}
