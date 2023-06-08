import CommandFactory from "../commandFactory";
import GETCommand from "../commands_imp/GET";
import Result from "../../result";

export default class GETFactory extends CommandFactory {
  constructor() {
    super(
      "GET",
      ["key"],
      [String],
      new RegExp(`^\\s*GET\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): Result<GETCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new GETCommand(key));
    }
  }
}
