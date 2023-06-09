import CommandFactory from "../commandFactory";
import RESTORECommand from "../commands_imp/RESTORE";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class RESTOREFactory extends CommandFactory {
  constructor() {
    super("RESTORE", [], []);
  }

  create(rawString: string): Result<RESTORECommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("ERR invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "RESTORE")
      return Result.err("ERR not a RESTORE command");

    if (tokenList.length != 1)
      return Result.err("ERR RESTORE does not accept any arguments");

    return Result.ok(new RESTORECommand());
  }
}
