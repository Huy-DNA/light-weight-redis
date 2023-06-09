import CommandFactory from "../commandFactory";
import RPUSHCommand from "../commands_imp/RPUSH";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class RPUSHFactory extends CommandFactory {
  constructor() {
    super("RPUSH", ["key", "values"], [String, Array]);
  }

  create(rawString: string): Result<RPUSHCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("(ERR) invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "RPUSH") return Result.err("(ERR) not a RPUSH command");

    if (tokenList.length < 3)
      return Result.err("(ERR) RPUSH expects at least 2 arguments");

    return Result.ok(new RPUSHCommand(tokenList[1], tokenList.slice(2)));
  }
}
