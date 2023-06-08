import CommandFactory from "../commandFactory";
import EXPIRECommand from "../commands_imp/EXPIRE";
import Result from "../../result";
export default class EXPIREFactory extends CommandFactory {
  constructor() {
    super(
      "EXPIRE",
      ["key", "seconds"],
      [String, Number],

      new RegExp(
        `^\\s*EXPIRE\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<seconds>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<EXPIRECommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, seconds } = matchRes.groups!;
      return Result.ok(new EXPIRECommand(key, Number(seconds)));
    }
  }
}
