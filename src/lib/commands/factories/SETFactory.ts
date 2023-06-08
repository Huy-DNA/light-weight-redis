import CommandFactory from "../commandFactory";
import SETCommand from "../commands_imp/SET";
import Result from "../../result";

export default class SETFactory extends CommandFactory {
  constructor() {
    super(
      "SET",
      ["key", "value"],
      [String, String],

      new RegExp(
        `^\\s*SET\\s*(?<key>${CommandFactory.tokenPattern})\\s*(?<value>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<SETCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key, value } = matchRes.groups!;
      return Result.ok(new SETCommand(key, value));
    }
  }
}
