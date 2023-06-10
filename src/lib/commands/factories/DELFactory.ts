import CommandFactory from "../commandFactory";
import DELCommand from "../commands_imp/DEL";
import Result from "../../result";
import extractToken from "../../utils/extractToken";
export default class DELFactory extends CommandFactory {
  constructor() {
    super("DEL", ["key"], [String]);
  }

  create(rawString: string): Result<DELCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;

    if (tokenList[0].toUpperCase() !== "DEL")
      return Result.err("Not a DEL command");
    if (tokenList.length != 2) return Result.err("DEL expects 1 argument");

    return Result.ok(new DELCommand(tokenList[1]));
  }
}
