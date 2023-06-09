import CommandFactory from "../commandFactory";
import GETCommand from "../commands_imp/GET";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class GETFactory extends CommandFactory {
  constructor() {
    super("GET", ["key"], [String]);
  }

  create(rawString: string): Result<GETCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("(ERR) invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "GET") return Result.err("(ERR) not a GET command");

    if (tokenList.length != 2) return Result.err("(ERR) GET expects 1 argument");

    return Result.ok(new GETCommand(tokenList[1]));
  }
}
