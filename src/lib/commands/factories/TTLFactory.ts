import CommandFactory from "../commandFactory";
import TTLCommand from "../commands_imp/TTL";
import Result from "../../result";

export default class TTLFactory extends CommandFactory {
  constructor() {
    super(
      "TTL",
      ["key"],
      [String],
      new RegExp(`^\\s*TTL\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): Result<TTLCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new TTLCommand(key));
    }
  }
}
