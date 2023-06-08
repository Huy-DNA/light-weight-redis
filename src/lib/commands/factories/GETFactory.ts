import CommandFactory from "../commandFactory";
import GETCommand from "../commands_imp/GET";

export default class GETFactory extends CommandFactory {
  constructor() {
    super(
      "GET",
      ["key"],
      [String],
      new RegExp(`^\\s*GET\\s*(?<key>${CommandFactory.tokenPattern})\\s*$`, "i")
    );
  }

  create(rawString: string): GETCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { key } = matchRes.groups!;
      return new GETCommand(key);
    }
  }
}
