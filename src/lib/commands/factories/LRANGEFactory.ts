import CommandFactory from "../commandFactory";
import LRANGECommand from "../commands_imp/LRANGE";
import Result from "../../result";

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

  create(rawString: string): Result<LRANGECommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, start, stop } = matchRes.groups!;
      return Result.ok(new LRANGECommand(key, Number(start), Number(stop)));
    }
  }
}
