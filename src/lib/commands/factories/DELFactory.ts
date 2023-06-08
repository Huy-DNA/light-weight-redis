import CommandFactory from "../commandFactory";
import DELCommand from "../commands_imp/DEL";
import Result from "../../result";
export default class DELFactory extends CommandFactory {
  constructor() {
    super(
      "DEL",
      ["key"],
      [String],
      new RegExp(`^\\s*DEL\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): Result<DELCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new DELCommand(key));
    }
  }
}
