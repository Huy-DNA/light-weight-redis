import CommandFactory from "../commandFactory";
import LLENCommand from "../commands_imp/LLEN";
import Result from "../../result";

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

  create(rawString: string): Result<LLENCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new LLENCommand(key));
    }
  }
}
