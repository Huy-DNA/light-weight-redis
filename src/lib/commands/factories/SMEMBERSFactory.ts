import CommandFactory from "../commandFactory";
import SMEMBERSCommand from "../commands_imp/SMEMBERS";

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

  create(rawString: string): SMEMBERSCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new SMEMBERSCommand(key);
    }
  }
}
