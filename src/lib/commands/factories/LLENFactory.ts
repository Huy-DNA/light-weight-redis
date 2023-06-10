import CommandFactory from "../commandFactory";
import LLENCommand from "../commands_imp/LLEN";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class LLENFactory extends CommandFactory {
  constructor() {
    super("LLEN", ["key"], [String]);
  }

  create(rawString: string): Result<LLENCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0].toUpperCase() !== "LLEN") return Result.err("Not a LLEN command");

    if (tokenList.length != 2) return Result.err("LLEN expects 1 argument");

    return Result.ok(new LLENCommand(tokenList[1]));
  }
}
