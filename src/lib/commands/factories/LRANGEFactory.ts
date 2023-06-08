import CommandFactory from "../commandFactory";
import LRANGECommand from "../commands_imp/LRANGE";

export default class LRANGEFactory extends CommandFactory {
  constructor() {
    super(
      "LRANGE",
      ["key", "start", "stop"],
      [String, Number, Number],
      new RegExp(
        `^\\s*LRANGE\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<start>${CommandFactory.tokenPattern})\\s*(?<stop>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): LRANGECommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key, start, stop } = matchRes.groups!;
      return new LRANGECommand(key, Number(start), Number(stop));
    }
  }
}
