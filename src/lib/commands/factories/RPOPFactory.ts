import CommandFactory from "../commandFactory";
import RPOPCommand from "../commands_imp/RPOP";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class RPOPFactory extends CommandFactory {
  constructor() {
    super("RPOP", ["key"], [String]);
  }

  create(rawString: string): Result<RPOPCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("ERR invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "RPOP") return Result.err("ERR not a RPOP command");

    if (tokenList.length != 2) return Result.err("ERR RPOP expects 1 argument");

    return Result.ok(new RPOPCommand(tokenList[1]));
  }
}
