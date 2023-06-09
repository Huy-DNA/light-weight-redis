import CommandFactory from "../commandFactory";
import SINTERCommand from "../commands_imp/SINTER";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class SINTERFactory extends CommandFactory {
  constructor() {
    super("SINTER", ["keys"], [Array]);
  }

  create(rawString: string): Result<SINTERCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("(ERR) invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "SINTER")
      return Result.err("(ERR) not a SINTER command");

    if (tokenList.length < 2)
      return Result.err("(ERR) SINTER expects at least 1 arguments");

    return Result.ok(new SINTERCommand(tokenList.slice(1)));
  }
}
