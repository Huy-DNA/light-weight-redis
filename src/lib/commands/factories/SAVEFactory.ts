import CommandFactory from "../commandFactory";
import SAVECommand from "../commands_imp/SAVE";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class SAVEFactory extends CommandFactory {
  constructor() {
    super("SAVE", [], []);
  }

  create(rawString: string): Result<SAVECommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0].toUpperCase() !== "SAVE") return Result.err("Not a SAVE command");

    if (tokenList.length != 1)
      return Result.err("SAVE does not accept any arguments");

    return Result.ok(new SAVECommand());
  }
}
