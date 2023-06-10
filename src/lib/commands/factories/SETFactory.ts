import CommandFactory from "../commandFactory";
import SETCommand from "../commands_imp/SET";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class SETFactory extends CommandFactory {
  constructor() {
    super("SET", ["key", "value"], [String, String]);
  }

  create(rawString: string): Result<SETCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "SET") return Result.err("Not a SET command");

    if (tokenList.length != 3) return Result.err("SET expects 2 arguments");

    return Result.ok(new SETCommand(tokenList[1], tokenList[2]));
  }
}
