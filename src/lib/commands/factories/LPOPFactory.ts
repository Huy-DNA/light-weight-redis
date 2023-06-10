import CommandFactory from "../commandFactory";
import LPOPCommand from "../commands_imp/LPOP";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class LPOPFactory extends CommandFactory {
  constructor() {
    super("LPOP", ["key"], [String]);
  }

  create(rawString: string): Result<LPOPCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0].toUpperCase() !== "LPOP") return Result.err("Not a LPOP command");

    if (tokenList.length != 2) return Result.err("LPOP expects 1 argument");

    return Result.ok(new LPOPCommand(tokenList[1]));
  }
}
