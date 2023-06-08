import CommandFactory from "../commandFactory";
import SINTERCommand from "../commands_imp/SINTER";

export default class SINTERFactory extends CommandFactory {
  constructor() {
    super(
      "SINTER",
      ["keys"],
      [Array],

      new RegExp(
        `^\\s*SINTER\\s*(?<keys>${CommandFactory.tokenPattern}+)\\s*$`,
        "i"
      )
    );
  }

  create(rawString: string): SINTERCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      const { keys: _keys } = matchRes.groups!;
      const keys = [
        ..._keys.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig")),
      ].map((tuple) => tuple[0]);
      return new SINTERCommand(keys);
    }
  }
}
