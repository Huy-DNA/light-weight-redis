import CommandFactory from "../commandFactory";
import EXPIRECommand from "../commands_imp/EXPIRE";
import Result from "../../result";
import extractToken from "../../utils/extractToken";
export default class EXPIREFactory extends CommandFactory {
  constructor() {
    super("EXPIRE", ["key", "seconds"], [String, Number]);
  }

  create(rawString: string): Result<EXPIRECommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;

    if (tokenList[0] !== "EXPIRE") return Result.err("Not an EXPIRE command");
    if (tokenList.length != 3) return Result.err("EXPIRE expects 2 arguments");

    return Result.ok(new EXPIRECommand(tokenList[1], Number(tokenList[2])));
  }
}
