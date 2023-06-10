import CommandFactory from "../commandFactory";
import SREMCommand from "../commands_imp/SREM";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class SREMFactory extends CommandFactory {
  constructor() {
    super("SREM", ["key", "values"], [String, Array]);
  }

  create(rawString: string): Result<SREMCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0].toUpperCase() !== "SREM") return Result.err("Not a SREM command");

    if (tokenList.length < 3)
      return Result.err("SREM expects at least 2 arguments");

    return Result.ok(new SREMCommand(tokenList[1], tokenList.slice(2)));
  }
}
