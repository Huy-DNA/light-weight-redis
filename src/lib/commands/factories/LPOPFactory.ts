import CommandFactory from "../commandFactory";
import LPOPCommand from "../commands_imp/LPOP";
import Result from "../../result";

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

  create(rawString: string): Result<LPOPCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new LPOPCommand(key));
    }
  }
}
