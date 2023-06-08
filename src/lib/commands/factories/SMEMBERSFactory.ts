import CommandFactory from "../commandFactory";
import SMEMBERSCommand from "../commands_imp/SMEMBERS";
import Result from "../../result";

export default class SMEMBERSFactory extends CommandFactory {
  constructor() {
    super(
      "SMEMBERS",
      ["key"],
      [String],
      new RegExp(
        `^\\s*SMEMBERS\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): Result<SMEMBERSCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { key } = matchRes.groups!;
      return Result.ok(new SMEMBERSCommand(key));
    }
  }
}
