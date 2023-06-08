import CommandFactory from "../commandFactory";
import SINTERCommand from "../commands_imp/SINTER";
import Result from "../../result";

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

  create(rawString: string): Result<SINTERCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      const { keys: _keys } = matchRes.groups!;
      const keys = [
        ..._keys.matchAll(new RegExp(`${CommandFactory.tokenPattern}`, "ig")),
      ].map((tuple) => tuple[0]);
      return Result.ok(new SINTERCommand(keys));
    }
  }
}
