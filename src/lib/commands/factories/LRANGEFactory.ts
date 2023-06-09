import CommandFactory from "../commandFactory";
import LRANGECommand from "../commands_imp/LRANGE";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class LRANGEFactory extends CommandFactory {
  constructor() {
    super("LRANGE", ["key", "start", "stop"], [String, Number, Number]);
  }

  create(rawString: string): Result<LRANGECommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("ERR invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "LRANGE")
      return Result.err("ERR not a LRANGE command");

    if (tokenList.length != 4)
      return Result.err("ERR SREM expects 3 arguments");

    return Result.ok(
      new LRANGECommand(
        tokenList[1],
        Number(tokenList[2]),
        Number(tokenList[3])
      )
    );
  }
}
